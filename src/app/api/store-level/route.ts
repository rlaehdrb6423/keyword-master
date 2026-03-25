import { NextResponse } from "next/server";
import {
  parseStoreId,
  fetchStoreInfo,
  checkStoreSearchVisibility,
  calculateStoreLevel,
} from "@/lib/store-analyzer";
import type { ApiErrorResponse } from "@/types/keyword";

export async function POST(request: Request) {
  let body: { storeId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ApiErrorResponse>(
      { error: "잘못된 요청 형식입니다.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const rawInput = body.storeId?.trim();
  if (!rawInput) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "스토어 ID 또는 URL을 입력해주세요.", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const storeId = parseStoreId(rawInput);
  if (!storeId) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "올바른 스토어 ID 형식이 아닙니다. (예: storeId 또는 smartstore.naver.com/storeId)", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const storeData = await fetchStoreInfo(storeId);
  if (!storeData) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "스토어를 찾을 수 없습니다. ID를 확인해주세요.", code: "INVALID_INPUT" },
      { status: 404 }
    );
  }

  const { storeName, products } = storeData;
  const totalProducts = products.length;

  const searchVisibility = await checkStoreSearchVisibility(storeId, products);

  const { level, label, tips } = calculateStoreLevel(totalProducts, searchVisibility);

  return NextResponse.json({
    storeId,
    storeName,
    totalProducts,
    recentProducts: products.slice(0, 10).map((p) => ({
      title: p.title,
      link: p.link,
    })),
    searchVisibility,
    level,
    levelLabel: label,
    tips,
  });
}
