// 지수 임계값 설정
// ※ 초기 추정치이며, 실데이터 수집 후 조정 예정

export const BLOG_INDEX_THRESHOLDS = {
  A: 50, // 매우 좋음 - 검색량 대비 문서 적음, 상위노출 쉬움
  B: 20, // 좋음
  C: 5,  // 보통
  // D: < 5 (문서 포화, 경쟁 심함)
} as const;

export const SELLER_INDEX_THRESHOLDS = {
  A: 30, // 블루오션 - 수요 대비 상품 적음
  B: 10, // 유망
  C: 3,  // 보통
  // D: < 3 (레드오션)
} as const;

export const VOLUME_SCALE = {
  LARGE: 10000,  // 대량 키워드
  MEDIUM: 1000,  // 중량 키워드
  // 소량: < 1000
} as const;

export const MIN_VOLUME_THRESHOLD = 10; // 이 미만은 "데이터 부족"

export const BLOG_GRADE_LABELS: Record<string, string> = {
  A: "매우 좋음",
  B: "좋음",
  C: "보통",
  D: "어려움",
  "N/A": "데이터 부족",
};

export const SELLER_GRADE_LABELS: Record<string, string> = {
  A: "블루오션",
  B: "유망",
  C: "보통",
  D: "레드오션",
  "N/A": "데이터 부족",
};
