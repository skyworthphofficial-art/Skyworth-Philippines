import { getPayload } from "payload";
import config from "@payload-config";

import type {
  Product,
  Media,
  ProductCollection,
} from "@/payload-types";

import type {
  CatalogImage,
  CatalogProduct,
  CatalogCollection,
  CatalogSpecificationGroup,
} from "@/types/productCatalog";


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
function getSpecificationGroups(
  product: Product
): CatalogSpecificationGroup[] {
  const groups: CatalogSpecificationGroup[] = (
    product.specificationGroups || []
  )
    .slice(0, 7)
    .map((group, groupIndex) => ({
      id: group.id || `group-${groupIndex}`,
      title: (group.title || "").trim(),
      items: (group.items || [])
        .slice(0, 10)
        .map((item, itemIndex) => ({
          id: item.id || `item-${groupIndex}-${itemIndex}`,
          label: (item.label || "").trim(),
          value: (item.value || "").trim(),
        }))
        .filter((item) => item.label !== "" && item.value !== ""),
    }))
    .filter((group) => group.title !== "" && group.items.length > 0);

  if (groups.length > 0) return groups;

  // Keep existing specifications visible until grouped data is entered.
  const legacyItems = (product.specifications || [])
    .map((item, index) => ({
      id: item.id || `legacy-${index}`,
      label: (item.label || "").trim(),
      value: (item.value || "").trim(),
    }))
    .filter((item) => item.label !== "" && item.value !== "");

  return legacyItems.length > 0
    ? [
        {
          id: "legacy-specifications",
          title: "Specifications",
          items: legacyItems,
        },
      ]
    : [];
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
    
collections: (product.collections || [])
  .filter(
    (item): item is ProductCollection =>
      typeof item === "object" && item !== null
  )
  .filter((item) => {
    const collectionCategoryId =
      typeof item.category === "number"
        ? item.category
        : item.category.id;

    const productCategoryId =
      typeof product.category === "number"
        ? product.category
        : product.category.id;

    return collectionCategoryId === productCategoryId;
  })
  .map(({ id, name, slug }) => ({
    id,
    name,
    slug,
  })),

    summary: product.summary || "",
    description: richTextParagraphs(product.description),
    
sizesInches: (product.sizesInches || []).map(
  (item) => item.size
),

sizeVariants: (product.sizesInches || []).map(
  (item) => ({
    size: item.size,
    images: (item.images || [])
      .map(imageFromMedia)
      .filter(
        (image): image is CatalogImage => image !== null
      ),
  })
),

        features: (product.features || []).map((item) => item.text),

    specifications: (product.specifications || []).map(
      ({ label, value }) => ({ label, value })
    ),

    specificationGroups: getSpecificationGroups(product),

    images: (product.images || [])
      .map(imageFromMedia)
      .filter((image): image is CatalogImage => image !== null),
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

export async function getCategoryCatalog(
  categoryName: string
): Promise<{
  products: CatalogProduct[];
  collections: CatalogCollection[];
}> {
  const payload = await getPayload({ config });

  const categoryResult = await payload.find({
    collection: "categories",
    where: {
      name: {
        equals: categoryName,
      },
    },
    depth: 0,
    limit: 1,
    overrideAccess: false,
  });

  const category = categoryResult.docs[0];

  if (!category) {
    return {
      products: [],
      collections: [],
    };
  }

  const products: CatalogProduct[] = [];
  const collections: CatalogCollection[] = [];

  // Retrieve all published products for this category.
  for (let page = 1; ; page++) {
    const result = await payload.find({
      collection: "products",
      where: {
        and: [
          publicStatus,
          {
            category: {
              equals: category.id,
            },
          },
        ],
      },
      draft: false,
      overrideAccess: false,
      depth: 2,
      sort: "-updatedAt",
      limit: 100,
      page,
    });

    products.push(...result.docs.map(toCatalogProduct));

    if (!result.hasNextPage) break;
  }

  // Retrieve collections assigned to this category.
  for (let page = 1; ; page++) {
    const result = await payload.find({
      collection: "product-collections",
      where: {
        category: {
          equals: category.id,
        },
      },
      overrideAccess: false,
      depth: 0,
      sort: "sortOrder",
      limit: 100,
      page,
    });

    collections.push(
      ...result.docs.map(({ id, name, slug }) => ({
        id,
        name,
        slug,
      }))
    );

    if (!result.hasNextPage) break;
  }

  return {
    products,
    collections,
  };
}
