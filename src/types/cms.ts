/**
 * Domain-facing content contracts for the upcoming CMS.
 * These are TypeScript types only; they do not connect a database.
 */
export type ContentStatus = "draft" | "published";

export type ProductCategorySlug =
  | "televisions"
  | "air-conditioners"
  | "washing-machines"
  | "audio";

export interface MediaAsset {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  modelCode: string;
  category: ProductCategorySlug;
  series?: string;
  summary: string;
  features: string[];
  specifications: Record<string, string>;
  availableSizes?: number[];
  images: MediaAsset[];
  brochureUrl?: string;
  status: ContentStatus;
  updatedAt?: string;
}

export interface Dealer {
  id: string;
  name: string;
  city: string;
  province: string;
  address: string;
  websiteUrl?: string;
  status: ContentStatus;
}
