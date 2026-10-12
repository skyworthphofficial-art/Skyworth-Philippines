export type ProductCategory = "Televisions" | "Audio" | "Commercial Screen" | "Air Conditioners";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  eyebrow: string;
  summary: string;
  features: string[];
  visual: "tv" | "audio" | "commercial" | "aircon";
};

// DEMO CONTENT ONLY. Replace with approved SKYWORTH Philippines products and specifications.
export const products: Product[] = [
  {
    slug: "mini-led-collection",
    name: "QD-Mini LED Collection",
    category: "Televisions",
    eyebrow: "Premium Viewing",
    summary: "Explore a picture experience designed around contrast, depth and detail.",
    features: ["Explore available screen sizes", "Discover display features", "Find authorized dealers"],
    visual: "tv",
  },
  {
    slug: "qled-plus-collection",
    name: "QLED+ Collection",
    category: "Televisions",
    eyebrow: "Color & Clarity",
    summary: "Discover smart entertainment and vivid picture experiences.",
    features: ["Browse model choices", "Compare technologies", "View product information"],
    visual: "tv",
  },
  {
    slug: "audio-collection",
    name: "Audio Collection",
    category: "Audio",
    eyebrow: "More Immersive Sound",
    summary: "Discover entertainment audio for your favorite moments.",
    features: ["Browse sound solutions", "Learn about features", "Find authorized sellers"],
    visual: "audio",
  },
  {
    slug: "commercial-screen-collection",
    name: "Commercial Screen Collection",
    category: "Commercial Screen",
    eyebrow: "Business Display",
    summary: "Explore commercial display solutions for modern business environments.",
    features: ["Discover digital signage possibilities", "Explore business display formats", "Contact SKYWORTH for details"],
    visual: "commercial",
  },
  {
    slug: "air-conditioner-collection",
    name: "Air Conditioner Collection",
    category: "Air Conditioners",
    eyebrow: "Home Comfort",
    summary: "Explore cooling solutions for different spaces and everyday routines.",
    features: ["Discover available types", "Find the right capacity", "Explore support options"],
    visual: "aircon",
  },
];

export const categories: ProductCategory[] = [
  "Televisions",
  "Audio",
  "Commercial Screen",
  "Air Conditioners",
];
