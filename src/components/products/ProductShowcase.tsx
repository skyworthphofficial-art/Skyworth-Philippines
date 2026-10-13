
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CatalogProduct } from "@/types/productCatalog";

export default function ProductShowcase({
  product,
}: {
  product: CatalogProduct;
}) {
  const [activeImage, setActiveImage] = useState(0);
 const [selectedSize, setSelectedSize] = useState<number | null>(null);
 

  
const selectedVariant = product.sizeVariants.find(
  (variant) => variant.size === selectedSize
);

const images =
  selectedVariant && selectedVariant.images.length > 0
    ? selectedVariant.images
    : product.images;

const image = images[activeImage];

function selectSize(size: number) {
  setSelectedSize(size);
  setActiveImage(0);
}


  return (
    <section className="sky-showcase">
      <div className="container-wide">
        <nav className="sky-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          <span>/</span>
          <span>{product.modelCode}</span>
        </nav>

        <div className="sky-showcase-grid">
          <div className="sky-showcase-gallery">
            <div className="sky-showcase-main">
              {image ? (
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  unoptimized
                  priority
                />
              ) : (
                <span className="catalog-image-fallback">
                  SKYWORTH
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div
                className="sky-showcase-thumbnails"
                aria-label="Product image gallery"
              >
                {images.map((item, index) => (
                  <button
                    key={`${item.url}-${index}`}
                    type="button"
                    className={`sky-showcase-thumb ${
                      activeImage === index ? "is-active" : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={activeImage === index}
                  >
                    <Image
                      src={item.url}
                      alt={item.alt}
                      width={100}
                      height={80}
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}

            {images.length > 1 && (
              <p className="sky-gallery-hint">
                Select an image to view another angle.
              </p>
            )}
          </div>

          <div className="sky-showcase-info">
            <span className="sky-model-code">
              {product.modelCode}
            </span>

            <h1>{product.name}</h1>

            {product.summary && (
              <p className="sky-showcase-summary">
                {product.summary}
              </p>
            )}

            {product.features.length > 0 && (
              <ul className="sky-showcase-features">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}

            {product.sizesInches.length > 0 && (
              <div className="sky-showcase-sizes">
                <h2>Choose your size</h2>

                <div className="sky-size-options">
                  {product.sizesInches.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`sky-size-button ${
                        selectedSize === size ? "is-active" : ""
                      }`}
                      aria-pressed={selectedSize === size}
                      onClick={() => selectSize(size)}
                    >
                      {size}"
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/where-to-buy"
              className="sky-showcase-buy"
            >
              Where to Buy ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
