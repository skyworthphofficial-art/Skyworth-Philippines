"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { CatalogProduct } from "@/types/productCatalog";

type Props = { products: CatalogProduct[] };

export default function ProductCatalog({ products }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requested = searchParams.get("category") || "";
  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);
  const category = categories.includes(requested) ? requested : "All";
  const [search, setSearch] = useState("");

  function selectCategory(next: string) {
    router.replace(next === "All" ? "/products" : `/products?category=${encodeURIComponent(next)}`, { scroll: false });
  }
  const filtered = useMemo(() => products.filter((product) =>
    (category === "All" || product.category === category) &&
    `${product.name} ${product.modelCode} ${product.series} ${product.summary} ${product.category}`.toLowerCase().includes(search.toLowerCase())
  ), [products, category, search]);

  return <>
    <div className="catalog-controls">
      <div className="catalog-filters" role="group" aria-label="Filter by product category">
        {(["All", ...categories]).map((item) => <button type="button" key={item} onClick={() => selectCategory(item)} aria-pressed={category === item} className={`filter-chip ${category === item ? "filter-chip--active" : ""}`}>{item}</button>)}
      </div>
      <label className="catalog-search"><span className="sr-only">Search products</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search SKYWORTH products..." type="search" /><span aria-hidden="true">⌕</span></label>
    </div>
    <p className="catalog-count">Showing {filtered.length} {filtered.length === 1 ? "product" : "products"}</p>
    {filtered.length ? <div className="catalog-grid">{filtered.map(product => <Link href={`/products/${product.slug}`} className="catalog-card" key={product.id}>
      <div className="catalog-product-image">
        {product.images[0]
          ? <Image src={product.images[0].url} alt={product.images[0].alt} width={product.images[0].width} height={product.images[0].height} unoptimized />
          : <span className="catalog-image-fallback">SKYWORTH</span>}
      </div>
      <div className="catalog-card-body"><span className="eyebrow">{product.category}</span><h2>{product.name}</h2><p>{product.summary || product.modelCode}</p><span className="text-link">View Product ↗</span></div>
    </Link>)}</div>
      : <div className="empty-results">{products.length === 0 ? "Our product catalog is being prepared. Please check back soon." : "No products match your search. Try a different keyword or category."}</div>}
  </>;
}
