
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedProductBySlug } from "@/lib/server/publicProducts";
import ProductShowcase from "@/components/products/ProductShowcase";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);

  return {
    title: product?.seoTitle || product?.name || "Product",
    description:
      product?.seoDescription || product?.summary || undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);

  if (!product) notFound();

  return (
    <>
      <ProductShowcase product={product} />

      {product.description.length > 0 && (
        <section className="section product-content-section">
          <div className="container-wide">
            <span className="eyebrow">PRODUCT OVERVIEW</span>
            <h2 className="detail-subheading">
              Designed for your everyday.
            </h2>

            {product.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {product.features.length > 0 && (
        <section className="section">
          <div className="container-wide">
            <span className="eyebrow">PRODUCT HIGHLIGHTS</span>
            <h2 className="detail-subheading">
              Discover what matters.
            </h2>

            <div className="feature-list">
              {product.features.map((feature, index) => (
                <div className="feature-item" key={index}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{feature}</strong>
                  <span aria-hidden="true">↗</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(product.specifications.length > 0 ||
        product.brochureUrl) && (
        <section className="section section--soft">
          <div className="container-wide">
            <span className="eyebrow">PRODUCT INFORMATION</span>
            <h2 className="detail-subheading">
              Specifications & Downloads
            </h2>

            {product.specifications.length > 0 && (
              <dl className="product-spec-list">
                {product.specifications.map(
                  ({ label, value }, index) => (
                    <div className="product-spec-row" key={index}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  )
                )}
              </dl>
            )}

            {product.brochureUrl && (
              <a
                className="button button--blue product-brochure"
                href={product.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Product Brochure ↗
              </a>
            )}
          </div>
        </section>
      )}
    </>
  );
}
