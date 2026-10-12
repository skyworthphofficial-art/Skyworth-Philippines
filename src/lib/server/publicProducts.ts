import { getPayload } from "payload";
import config from "@payload-config";
import type { Product, Media } from "@/payload-types";
import type { CatalogImage, CatalogProduct } from "@/types/productCatalog";

// Public website reads must NEVER use Payload's default access override or draft mode.
const publicStatus = { _status: { equals: "published" as const } };

function imageFromMedia(value: number | Media): CatalogImage | null {
  if (typeof value === "number" || !value.url || !value.mimeType?.startsWith("image/")) {
    return null;
  }
  // Support Payload's relative /api/media/file/* URLs and future HTTPS cloud storage.
  const url = value.url;
  if (!(url.startsWith("/") && !url.startsWith("//")) && !url.startsWith("https://")) {
    return null;
  }
  return {
    url,
    alt: value.alt || "SKYWORTH product image",
    width: value.width || 1000,
    height: value.height || 750,
  };
}

function richTextParagraphs(value: Product["description"]): string[] {
  if (!value?.root?.children) return [];
  function textOf(node: unknown): string {
    if (!node || typeof node !== "object") return "";
    const entry = node as { text?: unknown; children?: unknown };
    if (typeof entry.text === "string") return entry.text;
    if (!Array.isArray(entry.children)) return "";
    return entry.children.map(textOf).join("");
  }
  return value.root.children.map(textOf).map((line) => line.trim()).filter(Boolean);
}

function toCatalogProduct(product: Product): CatalogProduct {
  const category = typeof product.category === "object" && product.category
    ? product.category
    : null;
  const brochure = product.brochure && typeof product.brochure === "object"
    ? product.brochure
    : null;
  const brochureUrl = brochure?.url;
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    modelCode: product.modelCode,
    series: product.series || "",
    category: category?.name || "Other Products",
    categorySlug: category?.slug || "",
    summary: product.summary || "",
    description: richTextParagraphs(product.description),
    sizesInches: (product.sizesInches || []).map((item) => item.size),
    features: (product.features || []).map((item) => item.text),
    specifications: (product.specifications || []).map(({ label, value }) => ({ label, value })),
    images: (product.images || []).map(imageFromMedia).filter((image): image is CatalogImage => image !== null),
    brochureUrl: brochureUrl && (brochureUrl.startsWith("/") && !brochureUrl.startsWith("//") || brochureUrl.startsWith("https://"))
      ? brochureUrl
      : null,
    seoTitle: product.seoTitle || null,
    seoDescription: product.seoDescription || null,
  };
}

export async function getPublishedProducts(): Promise<CatalogProduct[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "products",
    where: publicStatus,
    draft: false,
    overrideAccess: false,
    depth: 2,
    sort: "-updatedAt",
    limit: 100,
  });
  return result.docs.map(toCatalogProduct);
}

export async function getPublishedProductBySlug(slug: string): Promise<CatalogProduct | null> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "products",
    where: { and: [publicStatus, { slug: { equals: slug } }] },
    draft: false,
    overrideAccess: false,
    depth: 2,
    limit: 1,
  });
  return result.docs[0] ? toCatalogProduct(result.docs[0]) : null;
}
