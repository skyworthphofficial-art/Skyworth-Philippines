export type ProductCategory = "Televisions" | "Air Conditioners" | "Washing Machines" | "Audio";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  eyebrow: string;
  summary: string;
  features: string[];
  visual: "tv" | "aircon" | "washer" | "audio";
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
    slug: "air-conditioner-collection",
    name: "Air Conditioner Collection",
    category: "Air Conditioners",
    eyebrow: "Home Comfort",
    summary: "Explore cooling solutions for different spaces and everyday routines.",
    features: ["Discover available types", "Find the right capacity", "Explore support options"],
    visual: "aircon",
  },
  {
    slug: "washing-machine-collection",
    name: "Washing Machine Collection",
    category: "Washing Machines",
    eyebrow: "Everyday Care",
    summary: "Find laundry solutions built for modern homes.",
    features: ["Explore different designs", "Compare key features", "Find dealers near you"],
    visual: "washer",
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
];

export const categories: ProductCategory[] = [
  "Televisions",
  "Air Conditioners",
  "Washing Machines",
  "Audio",
];
