import type { Metadata } from "next";
import { Suspense } from "react";
import ProductCatalog from "@/components/ProductCatalog";
import { getPublishedProducts } from "@/lib/server/publicProducts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Products", description: "Browse SKYWORTH Philippines products and discover your next brilliant experience." };

export default async function ProductsPage() {
  const products = await getPublishedProducts();

  return <section className="section page-top"><div className="container-wide">
    <div className="page-intro"><span className="eyebrow">PRODUCTS</span><h1>Designed around<br /><span className="muted-heading">your everyday.</span></h1><p>Explore SKYWORTH products and find what fits your home.</p></div>
    <Suspense fallback={<p>Loading product collections...</p>}><ProductCatalog products={products} /></Suspense>
  </div></section>;
}
