export type Grade = "A" | "B" | "C" | "D" | "N/A";

export type VolumeScale = "대" | "중" | "소";

export interface IndexResult {
  grade: Grade;
  label: string;
  score: number;
}

export interface BlogKeywordResult {
  keyword: string;
  pcVolume: number;
  mobileVolume: number;
  totalVolume: number;
  blogDocCount: number;
  ratio: number;
  grade: Grade;
  gradeLabel: string;
  relatedKeywords: string[];
}

export interface SellerKeywordResult {
  keyword: string;
  pcVolume: number;
  mobileVolume: number;
  totalVolume: number;
  naverProductCount: number;
  naverRatio: number;
  grade: Grade;
  gradeLabel: string;
}

export interface KeywordVolume {
  keyword: string;
  pcVolume: number;
  mobileVolume: number;
  relatedKeywords: string[];
}

export interface ApiErrorResponse {
  error: string;
  code: "API_LIMIT" | "TIMEOUT" | "INVALID_INPUT" | "SERVER_ERROR";
}

export interface BulkRequest {
  keywords: string[];
  type: "blog" | "seller";
}

export interface BulkResponse {
  results: (BlogKeywordResult | SellerKeywordResult)[];
  errors: { keyword: string; error: string }[];
}
