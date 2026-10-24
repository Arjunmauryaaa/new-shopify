import { NextResponse } from "next/server";
import { getProductProvider } from "@/lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return NextResponse.json({ products: [] });
  }

  try {
    const provider = await getProductProvider();
    const products = await provider.searchProducts(query, 8);
    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ products: [], error: "Search is temporarily unavailable." }, { status: 502 });
  }
}
