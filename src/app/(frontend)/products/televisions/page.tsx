
import type { Metadata } from "next";
import CategoryLandingPage from
  "@/components/products/CategoryLandingPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Televisions",
  description:
    "Explore SKYWORTH Televisions, including Mini LED, QD-Mini LED, QLED, NEXO, and more.",
};

export default function TelevisionsPage() {
  return (
    <CategoryLandingPage
      categoryName="Televisions"
      title="Television"
      description="Explore a brilliant world of entertainment. Discover SKYWORTH televisions designed for every viewing experience."
    />
  );
}
