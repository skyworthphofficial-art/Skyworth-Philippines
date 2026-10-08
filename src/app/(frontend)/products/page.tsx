import type { Metadata } from "next";
import { Suspense } from "react";
import ProductCatalog from "@/components/ProductCatalog";
export const metadata: Metadata = { title: "Products", description: "Browse SKYWORTH Philippines product collections." };
export default function ProductsPage() {
  return <section className="section page-top"><div className="container-wide">
    <div className="page-intro"><span className="eyebrow">PRODUCTS</span><h1>Designed around<br /><span className="muted-heading">your everyday.</span></h1><p>Explore SKYWORTH products and find what fits your home.</p></div>
    <Suspense fallback={<p>Loading product collections...</p>}><ProductCatalog /></Suspense>
    <p className="demo-disclaimer">Prototype: sample collections only. Actual Philippine models, prices, and specifications will be reviewed and added through the CMS.</p>
  </div></section>;
}
