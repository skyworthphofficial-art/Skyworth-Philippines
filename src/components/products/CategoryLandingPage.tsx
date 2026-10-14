
import Link from "next/link";

import CategoryCollectionGrid from
  "@/components/products/CategoryCollectionGrid";

import { getCategoryCatalog } from
  "@/lib/server/publicProducts";

type Props = {
  categoryName: string;
  title: string;
  description: string;
};

export default async function CategoryLandingPage({
  categoryName,
  title,
  description,
}: Props) {
  const { products, collections } =
    await getCategoryCatalog(categoryName);

  return (
    <section className="section page-top">
      <div className="container-wide">
        <nav
          className="category-page-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/products">Products</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>

        <header className="category-hero">
          <div className="category-hero-content">
            <span className="eyebrow">
              DISCOVER SKYWORTH
            </span>

            <h1>{title}</h1>

            <p>{description}</p>
          </div>

          <span
            className="category-hero-decoration"
            aria-hidden="true"
          >
            SKYWORTH
          </span>
        </header>

        <CategoryCollectionGrid
          products={products}
          collections={collections}
          categoryName={title}
        />
      </div>
    </section>
  );
}
