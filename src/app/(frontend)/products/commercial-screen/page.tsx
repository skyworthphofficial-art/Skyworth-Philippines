
import type { Metadata } from "next";
import CategoryLandingPage from
  "@/components/products/CategoryLandingPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Commercial Screen",
  description:
    "Explore SKYWORTH commercial display solutions for businesses.",
};

export default function CommercialScreenPage() {
  return (
    <CategoryLandingPage
      categoryName="Commercial Screen"
      title="Commercial Screen"
      description="Powerful displays for modern businesses. Discover commercial screen solutions built to communicate and connect."
    />
  );
}
