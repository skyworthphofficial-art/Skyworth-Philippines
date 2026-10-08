import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "SKYWORTH Philippines | A Brilliant View", template: "%s | SKYWORTH Philippines" },
  description: "Explore SKYWORTH Philippines products, display technology, dealers, and customer support.",
  robots: { index: false, follow: false }, // STAGING ONLY. Remove after SEO review before live launch.
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></body></html>;
}
