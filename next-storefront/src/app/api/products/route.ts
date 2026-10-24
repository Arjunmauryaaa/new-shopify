import { NextResponse } from "next/server";
import { getProductProvider } from "@/lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handles = searchParams.get("handles")?.split(",").filter(Boolean) ?? [];

  if (handles.length === 0) {
    return NextResponse.json({ products: [] });
  }

  const provider = await getProductProvider();
  const products = await Promise.all(handles.map((handle) => provider.getProductByHandle(handle)));

  return NextResponse.json({ products: products.filter((p) => p !== null) });
}
