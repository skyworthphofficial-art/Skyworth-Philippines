
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import type {
  CatalogProduct,
  CatalogCollection,
} from "@/types/productCatalog";

type Props = {
  products: CatalogProduct[];
  collections: CatalogCollection[];
  categoryName: string;
};

export default function CategoryCollectionGrid({
  products,
  collections,
  categoryName,
}: Props) {
  const [selectedCollection, setSelectedCollection] =
    useState<string | null>(null);

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCollection =
        selectedCollection === null ||
        product.collections.some(
          (collection) =>
            collection.slug === selectedCollection
        );

      const searchableText = [
        product.name,
        product.modelCode,
        product.series,
        product.summary,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCollection &&
        searchableText.includes(keyword)
      );
    });
  }, [products, selectedCollection, search]);

  const selectedName =
    collections.find(
      (collection) =>
        collection.slug === selectedCollection
    )?.name || "All Products";

  return (
    <div className="category-collection-content">
      <div className="catalog-controls">
        <div
          className="catalog-filters"
          role="group"
          aria-label={`${categoryName} collections`}
        >
          <button
            type="button"
            className={`filter-chip ${
              selectedCollection === null
                ? "filter-chip--active"
                : ""
            }`}
            aria-pressed={selectedCollection === null}
            onClick={() => setSelectedCollection(null)}
          >
            All
          </button>

          {collections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              className={`filter-chip ${
                selectedCollection === collection.slug
                  ? "filter-chip--active"
                  : ""
              }`}
              aria-pressed={
                selectedCollection === collection.slug
              }
              onClick={() =>
                setSelectedCollection(collection.slug)
              }
            >
              {collection.name}
            </button>
          ))}
        </div>

        <label className="catalog-search">
          <span className="sr-only">
            Search {categoryName} products
          </span>

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder={`Search ${categoryName}...`}
          />

          <span aria-hidden="true">⌕</span>
        </label>
      </div>

      <div className="category-results-heading">
        <h2>{selectedName}</h2>
        <p className="catalog-count" aria-live="polite">
          Showing {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "product"
            : "products"}
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="catalog-grid">
          {filteredProducts.map((product) => {
            const image =
              product.images[0] ??
              product.sizeVariants.find(
                (variant) => variant.images.length > 0
              )?.images[0];

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="catalog-card"
              >
                <div className="catalog-product-image">
                  {image ? (
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      unoptimized
                    />
                  ) : (
                    <span className="catalog-image-fallback">
                      SKYWORTH
                    </span>
                  )}
                </div>

                <div className="catalog-card-body">
                  <span className="eyebrow">
                    {product.series || product.category}
                  </span>

                  <h2>{product.name}</h2>

                  <p>
                    {product.summary || product.modelCode}
                  </p>

                  <span className="text-link">
                    Explore Product ↗
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="empty-results">
          {products.length === 0
            ? "Products for this category are coming soon."
            : "No products match this selection. Try another collection or search."}
        </div>
      )}
    </div>
  );
}
