
import type { Metadata } from "next";
import CategoryLandingPage from
  "@/components/products/CategoryLandingPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Air Conditioners",
  description:
    "Explore SKYWORTH air conditioning solutions for home comfort.",
};

export default function AirConditionersPage() {
  return (
    <CategoryLandingPage
      categoryName="Air Conditioners"
      title="Air Conditioner"
      description="Designed for refreshing everyday comfort. Discover SKYWORTH air conditioners for your living spaces."
    />
  );
}
