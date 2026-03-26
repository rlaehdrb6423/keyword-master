import { getSearchVolume } from "./naver-api";
import { fetchBlogRSS } from "./blog-analyzer";

// 간단한 동시성 제한 함수
function pLimit(concurrency: number) {
  let active = 0;
  const queue: (() => void)[] = [];

  return <T>(fn: () => Promise<T>): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const run = () => {
        active++;
        fn()
          .then(resolve)
          .catch(reject)
          .finally(() => {
            active--;
            if (queue.length > 0) queue.shift()!();
          });
      };

      if (active < concurrency) {
        run();
      } else {
        queue.push(run);
      }
    });
  };
}

// 불용어 리스트
const STOP_WORDS = new Set([
  // 블로그 관용어
  "추천", "후기", "방법", "정리", "총정리", "비교", "리뷰", "소개", "안내",
  "베스트", "가이드", "모음", "필수", "완벽", "최고", "인기", "꿀팁",
  "공유", "알아", "보기", "정보", "이야기", "사용", "활용", "선택",
  "장단점", "차이", "종류", "특징", "효과", "주의", "확인", "경험",
  "블로그", "포스팅", "글쓰기", "일상", "기록", "이벤트", "체험",
  // 시간/수량
  "오늘", "내일", "어제", "최근", "요즘", "올해", "작년", "매일",
  "이번", "지난", "다음", "올해", "내년", "하루", "한달",
  // 수식어
  "진짜", "완전", "역대", "최대", "최소", "무료", "유료", "실제",
  "솔직", "직접", "나만", "우리", "모든", "처음", "마지막", "다시",
  "새로운", "다양한", "간단한", "특별한", "가장", "너무", "정말",
  // 동사/형용사 어근
  "만들기", "시작", "도전", "성공", "실패", "준비", "예정",
  "알려", "드리는", "해보는", "느끼는", "되는", "하는", "있는", "없는",
  // 접속/조사 포함 단어
  "하는법", "하기", "할때", "인데", "에서", "이란", "부터", "까지",
  "대로", "처럼", "만큼", "위한", "통한", "관한", "대한",
  "에게", "으로", "에서의", "이랑", "하고", "랑",
  // 기타 범용어
  "사진", "영상", "내용", "부분", "정도", "이상", "이하", "대상",
  "전문", "관련", "중요", "필요", "가능", "결과", "과정", "상황",
]);

// 조사/어미 패턴 - 이것으로 끝나는 단어는 제거
const SUFFIX_PATTERNS = [
  "에서", "으로", "에게", "이의", "까지", "부터", "에는", "에도",
  "이고", "이며", "이면", "이라", "이나", "이든", "이랑", "처럼",
  "만큼", "대로", "밖에", "조차", "마저", "따라", "통해", "관한",
  "했던", "하는", "되는", "인데", "지만", "는데", "해서",
  "했다", "한다", "된다", "이다", "였다", "겠다",
];

interface BlogPost {
  title: string;
  link: string;
  bloggerName: string;
  postdate: string;
}

interface KeywordFrequency {
  keyword: string;
  count: number;
  blogs: string[];
}

interface GapTopic {
  keyword: string;
  monthlyVolume: number;
  competition: string;
  rivalPosts: { title: string; blogId: string }[];
}

export interface BlogGapAnalysisResult {
  rivalTrends: KeywordFrequency[];
  myKeywords: KeywordFrequency[];
  gapTopics: GapTopic[];
}

// RSS로 특정 블로그의 최근 글 가져오기 (정확한 데이터)
async function fetchBlogPosts(blogId: string): Promise<BlogPost[]> {
  const rssUrl = `https://rss.blog.naver.com/${blogId}.xml`;
  const rssData = await fetchBlogRSS(rssUrl);

  if (!rssData) return [];

  return rssData.posts.map((post) => ({
    title: post.title,
    link: post.link,
    bloggerName: blogId,
    postdate: post.pubDate,
  }));
}

// 글 제목에서 키워드 추출
function extractKeywords(title: string): string[] {
  const clean = title
    .replace(/&[a-z]+;/gi, " ")
    .replace(/[0-9]+/g, " ")
    .replace(/[^\uAC00-\uD7A3a-zA-Z\s]/g, " ");

  const words = clean.split(/\s+/).filter((w) => {
    const trimmed = w.trim();
    if (trimmed.length < 2 || trimmed.length > 6) return false;
    if (!/^[\uAC00-\uD7A3]+$/.test(trimmed)) return false;
    if (STOP_WORDS.has(trimmed)) return false;
    // 조사/어미로 끝나는 단어 제거
    if (SUFFIX_PATTERNS.some((s) => trimmed.length > s.length && trimmed.endsWith(s))) return false;
    return true;
  });

  return Array.from(new Set(words));
}

// 키워드 빈도 집계
function countKeywords(
  posts: BlogPost[],
  blogId: string
): Map<string, { count: number; blogs: Set<string>; posts: BlogPost[] }> {
  const freq = new Map<string, { count: number; blogs: Set<string>; posts: BlogPost[] }>();

  for (const post of posts) {
    const keywords = extractKeywords(post.title);
    for (const kw of keywords) {
      const existing = freq.get(kw) || { count: 0, blogs: new Set<string>(), posts: [] };
      existing.count++;
      existing.blogs.add(blogId);
      existing.posts.push(post);
      freq.set(kw, existing);
    }
  }

  return freq;
}

// 메인 분석 함수
export async function analyzeGap(
  myBlogId: string,
  rivalBlogIds: string[]
): Promise<BlogGapAnalysisResult> {
  // 1. 모든 블로그 글 병렬 수집
  const [myPosts, ...rivalPostsArr] = await Promise.all([
    fetchBlogPosts(myBlogId),
    ...rivalBlogIds.map((id) => fetchBlogPosts(id)),
  ]);

  // 2. 내 블로그 키워드 추출
  const myFreq = countKeywords(myPosts, myBlogId);
  const myKeywords: KeywordFrequency[] = Array.from(myFreq.entries())
    .map(([keyword, data]) => ({
      keyword,
      count: data.count,
      blogs: [myBlogId],
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  const myKeywordSet = new Set(myFreq.keys());

  // 3. 경쟁 블로그 키워드 통합 추출
  const rivalFreq = new Map<string, { count: number; blogs: Set<string>; posts: BlogPost[] }>();

  for (let i = 0; i < rivalBlogIds.length; i++) {
    const blogId = rivalBlogIds[i];
    const posts = rivalPostsArr[i];
    const freq = countKeywords(posts, blogId);

    freq.forEach((data, keyword) => {
      const existing = rivalFreq.get(keyword) || { count: 0, blogs: new Set<string>(), posts: [] };
      existing.count += data.count;
      data.blogs.forEach((b) => existing.blogs.add(b));
      existing.posts.push(...data.posts);
      rivalFreq.set(keyword, existing);
    });
  }

  const rivalTrends: KeywordFrequency[] = Array.from(rivalFreq.entries())
    .map(([keyword, data]) => ({
      keyword,
      count: data.count,
      blogs: Array.from(data.blogs),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  // 4. 틈새 주제 찾기 (경쟁자에 있고 나에게 없는 것)
  const gapKeywords = Array.from(rivalFreq.entries())
    .filter(([keyword]) => !myKeywordSet.has(keyword))
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 15);

  // 5. 틈새 키워드의 검색량 조회 (병렬, 최대 3개 동시)
  const limit = pLimit(3);
  const gapWithVolume = await Promise.all(
    gapKeywords.map(([keyword, data]) =>
      limit(async () => {
        const volume = await getSearchVolume(keyword);
        return {
          keyword,
          monthlyVolume: volume ? volume.pcVolume + volume.mobileVolume : 0,
          competition: volume?.compIdx || "정보없음",
          rivalPosts: data.posts.slice(0, 2).map((p) => ({
            title: p.title,
            blogId: Array.from(data.blogs)[0] || "",
          })),
        };
      })
    )
  );

  // 6. 검색량 순 정렬, 검색량 0인 것 제외
  const gapTopics: GapTopic[] = gapWithVolume
    .filter((g) => g.monthlyVolume > 0)
    .sort((a, b) => b.monthlyVolume - a.monthlyVolume)
    .slice(0, 10);

  return { rivalTrends, myKeywords, gapTopics };
}
