import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductVisual from "@/components/ProductVisual";
import { products } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);
  return { title: product?.name ?? "Collection", description: product?.summary };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);
  if (!product) notFound();
  return <>
    <section className="product-detail-hero"><div className="container-wide product-detail-grid">
      <div><Link href="/products" className="back-link">← All Products</Link><span className="eyebrow">{product.category} / {product.eyebrow}</span><h1>{product.name}</h1><p>{product.summary}</p><Link href="/where-to-buy" className="button button--blue">Where to Buy ↗</Link></div>
      <ProductVisual type={product.visual} />
    </div></section>
    <section className="section"><div className="container-wide"><span className="eyebrow">EXPLORE THIS COLLECTION</span><h2 className="detail-subheading">Discover what matters.</h2><div className="feature-list">{product.features.map((feature, index) => <div key={feature} className="feature-item"><span>0{index + 1}</span><strong>{feature}</strong><span aria-hidden="true">↗</span></div>)}</div><p className="demo-disclaimer">This page is a layout prototype. Official model specifications, photos, brochures and downloads will be added after content approval.</p></div></section>
  </>;
}
