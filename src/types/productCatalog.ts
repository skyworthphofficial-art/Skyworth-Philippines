export type CatalogImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type CatalogProduct = {
  id: number;
  name: string;
  slug: string;
  modelCode: string;
  series: string;
  category: string;
  categorySlug: string;
  summary: string;
  description: string[];
  sizesInches: number[];
  features: string[];
  specifications: { label: string; value: string }[];
  images: CatalogImage[];
  brochureUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};
