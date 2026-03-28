import { getSearchVolume, getBlogDocCount, getNewsCount, getCafeCount, getWebDocCount, getBlogPlatformCount, getShoppingProductCount, getShoppingRelatedKeywords } from "@/lib/naver-api";
import { calculateBlogIndex, calculateSellerIndex } from "@/lib/index-calculator";
import { getCached, setCache, makeCacheKey } from "@/lib/cache";
import type { BlogKeywordResult, SellerKeywordResult } from "@/types/keyword";

function calculateSuccessRate(totalVolume: number, totalCompetition: number, _grade: string): number {
  if (totalCompetition === 0) return 95;
  const ratio = totalVolume / totalCompetition;

  let base = 0;
  if (ratio >= 30) base = 85;
  else if (ratio >= 10) base = 65;
  else if (ratio >= 3) base = 40;
  else base = 15;

  if (totalVolume >= 100 && totalVolume <= 5000) base += 10;
  else if (totalVolume > 5000) base += 5;

  return Math.min(99, Math.max(5, base));
}

function calcCompetition(totalVolume: number, totalCompetition: number) {
  let competitionGrade: string;
  let competitionLabel: string;
  if (totalCompetition === 0) {
    competitionGrade = "A";
    competitionLabel = "매우낮음";
  } else {
    const compRatio = totalVolume / totalCompetition;
    if (compRatio >= 30) { competitionGrade = "A"; competitionLabel = "매우낮음"; }
    else if (compRatio >= 10) { competitionGrade = "B"; competitionLabel = "낮음"; }
    else if (compRatio >= 3) { competitionGrade = "C"; competitionLabel = "보통"; }
    else if (compRatio >= 1) { competitionGrade = "D"; competitionLabel = "높음"; }
    else { competitionGrade = "E"; competitionLabel = "매우높음"; }
  }
  return { competitionGrade, competitionLabel };
}

export async function analyzeBlogKeyword(keyword: string): Promise<BlogKeywordResult | null> {
  const cacheKey = makeCacheKey("blog2", keyword);
  const cached = await getCached<BlogKeywordResult>(cacheKey);
  if (cached) return cached;

  const [volumeData, blogDocCount, newsCount, cafeCount, webDocCount, platformCount] = await Promise.all([
    getSearchVolume(keyword),
    getBlogDocCount(keyword),
    getNewsCount(keyword),
    getCafeCount(keyword),
    getWebDocCount(keyword),
    getBlogPlatformCount(keyword),
  ]);

  if (!volumeData) return null;

  const totalVolume = volumeData.pcVolume + volumeData.mobileVolume;
  const docCount = blogDocCount ?? 0;
  const news = newsCount ?? 0;
  const cafe = cafeCount ?? 0;
  const webDoc = webDocCount ?? 0;

  const ratio = docCount > 0 ? totalVolume / docCount : 0;
  const indexResult = calculateBlogIndex(totalVolume, docCount);
  const totalCompetition = docCount + news + cafe + webDoc;
  const { competitionGrade, competitionLabel } = calcCompetition(totalVolume, totalCompetition);

  const result: BlogKeywordResult = {
    keyword: volumeData.keyword,
    pcVolume: volumeData.pcVolume,
    mobileVolume: volumeData.mobileVolume,
    totalVolume,
    blogDocCount: docCount,
    newsCount: news,
    cafeCount: cafe,
    webDocCount: webDoc,
    totalCompetition,
    competitionGrade,
    competitionLabel,
    ratio: Math.round(ratio * 100) / 100,
    grade: indexResult.grade,
    gradeLabel: indexResult.label,
    relatedKeywords: volumeData.relatedKeywords,
    successRate: calculateSuccessRate(totalVolume, totalCompetition, competitionGrade),
    compIdx: volumeData.compIdx,
    avgClickCnt: volumeData.avgClickCnt,
    avgCtr: volumeData.avgCtr,
    platformCount: {
      naver: platformCount.naver,
      tistory: platformCount.tistory,
      wordpress: platformCount.wordpress,
    },
  };

  await setCache(cacheKey, result);
  return result;
}

export async function analyzeSellerKeyword(keyword: string): Promise<SellerKeywordResult | null> {
  const cacheKey = makeCacheKey("seller2", keyword);
  const cached = await getCached<SellerKeywordResult>(cacheKey);
  if (cached) return cached;

  const [volumeData, naverProductCount, blogCount, newsCount, cafeCount] = await Promise.all([
    getSearchVolume(keyword),
    getShoppingProductCount(keyword),
    getBlogDocCount(keyword),
    getNewsCount(keyword),
    getCafeCount(keyword),
  ]);

  if (!volumeData) return null;

  const totalVolume = volumeData.pcVolume + volumeData.mobileVolume;
  const naverCount = naverProductCount ?? 0;
  const blog = blogCount ?? 0;
  const news = newsCount ?? 0;
  const cafe = cafeCount ?? 0;
  const naverRatio = naverCount > 0 ? totalVolume / naverCount : 0;

  const indexResult = calculateSellerIndex(totalVolume, naverCount);
  const totalCompetition = naverCount + blog + news + cafe;
  const { competitionGrade, competitionLabel } = calcCompetition(totalVolume, totalCompetition);

  const result: SellerKeywordResult = {
    keyword: volumeData.keyword,
    pcVolume: volumeData.pcVolume,
    mobileVolume: volumeData.mobileVolume,
    totalVolume,
    naverProductCount: naverCount,
    blogCount: blog,
    newsCount: news,
    cafeCount: cafe,
    totalCompetition,
    competitionGrade,
    competitionLabel,
    naverRatio: Math.round(naverRatio * 100) / 100,
    grade: indexResult.grade,
    gradeLabel: indexResult.label,
    relatedKeywords: volumeData.relatedKeywords.length > 0
      ? volumeData.relatedKeywords
      : await getShoppingRelatedKeywords(keyword),
    successRate: calculateSuccessRate(totalVolume, totalCompetition, competitionGrade),
    compIdx: volumeData.compIdx,
    avgClickCnt: volumeData.avgClickCnt,
    avgCtr: volumeData.avgCtr,
  };

  await setCache(cacheKey, result, false);
  return result;
}
