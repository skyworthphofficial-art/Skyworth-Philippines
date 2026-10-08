"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductVisual from "@/components/ProductVisual";
import { categories, products, type ProductCategory } from "@/data/products";

export default function ProductCatalog() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("category");
  const [category, setCategory] = useState<ProductCategory | "All">(
    categories.find(c => c === initial) ?? "All"
  );
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => products.filter(product =>
    (category === "All" || product.category === category) &&
    `${product.name} ${product.summary} ${product.category}`.toLowerCase().includes(search.toLowerCase())
  ), [category, search]);

  return <>
    <div className="catalog-controls">
      <div className="catalog-filters" role="group" aria-label="Filter by product category">
        {(["All", ...categories] as const).map(item => <button type="button" key={item} onClick={() => setCategory(item)} aria-pressed={category === item} className={`filter-chip ${category === item ? "filter-chip--active" : ""}`}>{item}</button>)}
      </div>
      <label className="catalog-search"><span className="sr-only">Search products</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search product collections..." type="search" /><span aria-hidden="true">⌕</span></label>
    </div>
    <p className="catalog-count">Showing {filtered.length} {filtered.length === 1 ? "collection" : "collections"}</p>
    {filtered.length ? <div className="catalog-grid">{filtered.map(product => <Link href={`/products/${product.slug}`} className="catalog-card" key={product.slug}>
      <ProductVisual type={product.visual} />
      <div className="catalog-card-body"><span className="eyebrow">{product.category}</span><h2>{product.name}</h2><p>{product.summary}</p><span className="text-link">Explore Collection ↗</span></div>
    </Link>)}</div> : <div className="empty-results">No collections match your search. Try a different keyword or category.</div>}
  </>;
}
