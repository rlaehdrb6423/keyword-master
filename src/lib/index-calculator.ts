import {
  BLOG_INDEX_THRESHOLDS,
  SELLER_INDEX_THRESHOLDS,
  VOLUME_SCALE,
  MIN_VOLUME_THRESHOLD,
  BLOG_GRADE_LABELS,
  SELLER_GRADE_LABELS,
} from "@/config/index-thresholds";
import type { Grade, VolumeScale, IndexResult } from "@/types/keyword";

function getVolumeScale(volume: number): VolumeScale {
  if (volume >= VOLUME_SCALE.LARGE) return "대";
  if (volume >= VOLUME_SCALE.MEDIUM) return "중";
  return "소";
}

function getGrade(
  rawScore: number,
  thresholds: { A: number; B: number; C: number }
): Grade {
  if (rawScore >= thresholds.A) return "A";
  if (rawScore >= thresholds.B) return "B";
  if (rawScore >= thresholds.C) return "C";
  return "D";
}

export function calculateBlogIndex(
  volume: number,
  docCount: number
): IndexResult {
  if (volume < MIN_VOLUME_THRESHOLD) {
    return { grade: "N/A", label: BLOG_GRADE_LABELS["N/A"], score: 0 };
  }

  const safeDocCount = Math.max(docCount, 1);
  const rawScore = (volume / safeDocCount) * 100;
  const grade = getGrade(rawScore, BLOG_INDEX_THRESHOLDS);
  const volumeScale = getVolumeScale(volume);

  return {
    grade,
    label: `${BLOG_GRADE_LABELS[grade]} (${volumeScale}량 키워드)`,
    score: Math.round(rawScore * 100) / 100,
  };
}

export function calculateSellerIndex(
  volume: number,
  productCount: number
): IndexResult {
  if (volume < MIN_VOLUME_THRESHOLD) {
    return { grade: "N/A", label: SELLER_GRADE_LABELS["N/A"], score: 0 };
  }

  if (productCount === 0) {
    return {
      grade: "A",
      label: `신규 시장 (${getVolumeScale(volume)}량 키워드)`,
      score: 9999,
    };
  }

  const rawScore = (volume / productCount) * 100;
  const grade = getGrade(rawScore, SELLER_INDEX_THRESHOLDS);
  const volumeScale = getVolumeScale(volume);

  return {
    grade,
    label: `${SELLER_GRADE_LABELS[grade]} (${volumeScale}량 키워드)`,
    score: Math.round(rawScore * 100) / 100,
  };
}
