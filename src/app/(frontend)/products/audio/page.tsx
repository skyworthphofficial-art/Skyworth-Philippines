
import type { Metadata } from "next";
import CategoryLandingPage from
  "@/components/products/CategoryLandingPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Audio",
  description:
    "Discover SKYWORTH soundbars, speakers, and home audio products.",
};

export default function AudioPage() {
  return (
    <CategoryLandingPage
      categoryName="Audio"
      title="Audio"
      description="Feel every beat and experience every detail. Explore SKYWORTH audio products made for immersive sound."
    />
  );
}
