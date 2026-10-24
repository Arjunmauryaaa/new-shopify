import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

const PRODUCT_TOPICS = new Set(["products/create", "products/update", "products/delete"]);
const COLLECTION_TOPICS = new Set(["collections/create", "collections/update", "collections/delete"]);
const INVENTORY_TOPICS = new Set(["inventory_levels/update", "inventory_items/update"]);

function isValidSignature(rawBody: string, hmacHeader: string, secret: string): boolean {
  const digest = createHmac("sha256", secret).update(rawBody, "utf8").digest();
  const provided = Buffer.from(hmacHeader, "base64");
  if (digest.length !== provided.length) return false;
  return timingSafeEqual(digest, provided);
}

/**
 * Shopify calls this the moment a product, collection, or inventory level
 * changes in Admin. It tells Next.js's data cache exactly which fetches are
 * now stale, so the live site reflects the change on the next request
 * instead of showing whatever was cached at last deploy.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  const hmacHeader = request.headers.get("x-shopify-hmac-sha256");
  const topic = request.headers.get("x-shopify-topic") ?? "";

  if (!secret || !hmacHeader) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 401 });
  }

  const rawBody = await request.text();

  if (!isValidSignature(rawBody, hmacHeader, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: { handle?: string } = {};
  try {
    payload = JSON.parse(rawBody);
  } catch {
    // Some topics (e.g. inventory) don't carry a handle — an unparsable
    // body just means we fall back to the broad tag revalidation below.
  }

  if (PRODUCT_TOPICS.has(topic)) {
    revalidateTag("products");
    if (payload.handle) revalidateTag(`product-${payload.handle}`);
  } else if (COLLECTION_TOPICS.has(topic)) {
    revalidateTag("collections");
    if (payload.handle) revalidateTag(`collection-${payload.handle}`);
  } else if (INVENTORY_TOPICS.has(topic)) {
    revalidateTag("products");
  }

  return NextResponse.json({ revalidated: true, topic });
}
