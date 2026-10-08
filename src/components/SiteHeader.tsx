"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "/products", label: "Products" },
  { href: "/technologies", label: "Technology" },
  { href: "/about", label: "About Us" },
  { href: "/where-to-buy", label: "Where to Buy" },
  { href: "/support", label: "Support" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container-wide nav-inner">
        <Link href="/" className="brand-wordmark" aria-label="SKYWORTH Philippines home" onClick={() => setMenuOpen(false)}>
          <Image src="/images/skyworth-logo-black.png" width={583} height={85} alt="SKYWORTH" className="brand-logo" priority />
        </Link>
        <nav id="site-menu" aria-label="Main navigation" className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          {navigation.map(({ href, label }) => (
            <Link
              key={href}
              className={`nav-link ${pathname.startsWith(href) ? "nav-link--active" : ""}`}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link className="nav-link nav-link--mobile-extra" href="/promotions" onClick={() => setMenuOpen(false)}>Promotions</Link>
          <Link className="nav-link nav-link--mobile-extra" href="/news" onClick={() => setMenuOpen(false)}>News</Link>
        </nav>
        <div className="nav-right">
          <Link href="/products" className="nav-cta">Explore Products <span aria-hidden="true">↗</span></Link>
          <button type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
