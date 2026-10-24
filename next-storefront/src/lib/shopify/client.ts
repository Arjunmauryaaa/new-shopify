import "server-only";

/**
 * Thin, typed wrapper around the Shopify Storefront GraphQL endpoint.
 *
 * This module is marked `server-only`: importing it from a Client Component
 * fails the build. That guarantees SHOPIFY_STOREFRONT_PRIVATE_TOKEN can never
 * end up in a browser bundle, regardless of what any other file does.
 */

const API_VERSION = process.env.SHOPIFY_API_VERSION || "2026-07";

export class ShopifyApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShopifyApiError";
  }
}

export function isShopifyConfigured(): boolean {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN || process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN;
  return Boolean(domain && token);
}

/**
 * Fragments in this project are composed by string interpolation and often
 * embed the same shared fragment (e.g. MoneyFragment/ImageFragment) from more
 * than one place in a single query — Shopify's GraphQL server rejects a
 * document that defines the same fragment name twice. Rather than requiring
 * every query to hand-track its transitive fragment dependencies, strip
 * repeat definitions here and keep the first occurrence of each.
 */
function dedupeFragments(query: string): string {
  const fragmentStart = /fragment\s+(\w+)\s+on\s+\w+\s*\{/g;
  const seen = new Set<string>();
  const ranges: { start: number; end: number; keep: boolean }[] = [];

  let match: RegExpExecArray | null;
  while ((match = fragmentStart.exec(query))) {
    let depth = 1;
    let index = fragmentStart.lastIndex;
    while (depth > 0 && index < query.length) {
      if (query[index] === "{") depth++;
      else if (query[index] === "}") depth--;
      index++;
    }
    const name = match[1];
    ranges.push({ start: match.index, end: index, keep: !seen.has(name) });
    seen.add(name);
    fragmentStart.lastIndex = index;
  }

  if (ranges.length === 0) return query;

  let result = "";
  let cursor = 0;
  for (const range of ranges) {
    result += query.slice(cursor, range.start);
    if (range.keep) result += query.slice(range.start, range.end);
    cursor = range.end;
  }
  return result + query.slice(cursor);
}

interface ShopifyFetchOptions<TVariables> {
  query: string;
  variables?: TVariables;
  cache?: RequestCache;
  tags?: string[];
}

interface GraphQLResponse<TData> {
  data?: TData;
  errors?: { message: string }[];
}

export async function shopifyFetch<TData, TVariables = Record<string, unknown>>({
  query,
  variables,
  cache = "force-cache",
  tags,
}: ShopifyFetchOptions<TVariables>): Promise<TData> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
  const publicToken = process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN;

  if (!domain || (!privateToken && !publicToken)) {
    throw new ShopifyApiError(
      "Shopify is not configured. Set SHOPIFY_STORE_DOMAIN and a storefront token in your environment."
    );
  }

  const endpoint = `https://${domain}/api/${API_VERSION}/graphql.json`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  // The private token is more privileged (server-to-server only) and is preferred
  // when present; otherwise fall back to the public storefront access token.
  if (privateToken) {
    headers["Shopify-Storefront-Private-Token"] = privateToken;
  } else {
    headers["X-Shopify-Storefront-Access-Token"] = publicToken as string;
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: dedupeFragments(query), variables }),
      cache,
      ...(tags ? { next: { tags } } : {}),
    });
  } catch (error) {
    throw new ShopifyApiError(
      `Could not reach the Shopify Storefront API: ${error instanceof Error ? error.message : "unknown error"}`
    );
  }

  if (!response.ok) {
    throw new ShopifyApiError(`Shopify Storefront API responded with status ${response.status}`);
  }

  const json = (await response.json()) as GraphQLResponse<TData>;

  if (json.errors?.length) {
    throw new ShopifyApiError(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new ShopifyApiError("Shopify Storefront API returned an empty response.");
  }

  return json.data;
}
