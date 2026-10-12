import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedProductBySlug } from "@/lib/server/publicProducts";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);
  return {
    title: product?.seoTitle || product?.name || "Product",
    description: product?.seoDescription || product?.summary || undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);
  if (!product) notFound();

  return <>
    <section className="product-detail-hero"><div className="container-wide product-detail-grid">
      <div>
        <Link href="/products" className="back-link">← All Products</Link>
        <span className="eyebrow">{product.category} / {product.series || product.modelCode}</span>
        <h1>{product.name}</h1>
        <p>{product.summary}</p>
        {product.sizesInches.length > 0 && <p><strong>Available size{product.sizesInches.length > 1 ? "s" : ""}:</strong> {product.sizesInches.map(size => `${size}″`).join(" · ")}</p>}
        <Link href="/where-to-buy" className="button button--blue">Where to Buy ↗</Link>
      </div>
      <div className="product-detail-media">
        {product.images[0]
          ? <Image src={product.images[0].url} alt={product.images[0].alt} width={product.images[0].width} height={product.images[0].height} unoptimized priority />
          : <span className="catalog-image-fallback">SKYWORTH</span>}
      </div>
    </div></section>

    {product.description.length > 0 && <section className="section product-content-section"><div className="container-wide">
      <span className="eyebrow">PRODUCT OVERVIEW</span>
      <h2 className="detail-subheading">Designed for your everyday.</h2>
      {product.description.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    </div></section>}

    {product.images.length > 1 && <section className="section section--soft"><div className="container-wide">
      <span className="eyebrow">PRODUCT GALLERY</span><h2 className="detail-subheading">Every angle, considered.</h2>
      <div className="product-gallery">
        {product.images.map((image, index) => <div key={index} className="product-gallery-item"><div className="product-gallery-image"><Image src={image.url} alt={image.alt} fill sizes="(max-width: 500px) 90vw, (max-width: 760px) 45vw, 360px" style={{ objectFit: "contain" }} unoptimized /></div></div>)}
      </div>
    </div></section>}

    {product.features.length > 0 && <section className="section"><div className="container-wide">
      <span className="eyebrow">PRODUCT HIGHLIGHTS</span><h2 className="detail-subheading">Discover what matters.</h2>
      <div className="feature-list">{product.features.map((feature, index) => <div key={index} className="feature-item"><span>{String(index + 1).padStart(2, "0")}</span><strong>{feature}</strong><span aria-hidden="true">↗</span></div>)}</div>
    </div></section>}

    {(product.specifications.length > 0 || product.brochureUrl) && <section className="section section--soft"><div className="container-wide">
      <span className="eyebrow">PRODUCT INFORMATION</span><h2 className="detail-subheading">Specifications & downloads.</h2>
      {product.specifications.length > 0 && <dl className="product-spec-list">{product.specifications.map(({ label, value }, index) => <div className="product-spec-row" key={index}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
      {product.brochureUrl && <a className="button button--blue product-brochure" href={product.brochureUrl} target="_blank" rel="noopener noreferrer">View Product Brochure ↗</a>}
    </div></section>}
  </>;
}
