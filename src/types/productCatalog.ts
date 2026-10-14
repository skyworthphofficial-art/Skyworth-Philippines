export type CatalogImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
};


export type CatalogCollection = {
  id: number;
  name: string;
  slug: string;
};

export type CatalogProduct = {
  id: number;
  name: string;
  slug: string;
  modelCode: string;
  series: string;
  category: string;
  categorySlug: string;
  collections: CatalogCollection[];
  summary: string;
  description: string[];
  
sizesInches: number[];
sizeVariants: {
  size: number;
  images: CatalogImage[];
}[];

  features: string[];
  specifications: { label: string; value: string }[];
  images: CatalogImage[];
  brochureUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};
