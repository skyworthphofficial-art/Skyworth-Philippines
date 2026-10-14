"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { href: "/technologies", label: "Technology" },
  { href: "/about", label: "About Us" },
  { href: "/where-to-buy", label: "Where to Buy" },
  { href: "/support", label: "Support" },
];


const productCategories = [
  {
    name: "Television",
    category: "Televisions",
    href: "/products/televisions",
    visual: "tv",
    number: "01",
    caption: "Brilliant viewing",
  },
  {
    name: "Audio",
    category: "Audio",
    href: "/products/audio",
    visual: "audio",
    number: "02",
    caption: "Sound that surrounds",
  },
  {
    name: "Commercial Screen",
    category: "Commercial Screen",
    href: "/products/commercial-screen",
    visual: "commercial",
    number: "03",
    caption: "Displays for business",
  },
  {
    name: "Air Conditioner",
    category: "Air Conditioners",
    href: "/products/air-conditioners",
    visual: "aircon",
    number: "04",
    caption: "Everyday comfort",
  },
];


export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setProductsOpen(false);
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProductsOpen(false);
        setMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  function closeMenus() {
    setMenuOpen(false);
    setProductsOpen(false);
  }

  return (
    
<header
  className="site-header"
  onMouseLeave={() => setProductsOpen(false)}
>

      <div className="container-wide nav-inner">
        <Link href="/" className="brand-wordmark" aria-label="SKYWORTH Philippines home" onClick={closeMenus}>
          <Image src="/images/SKYWORTH LOGO Black .png" width={583} height={83} alt="SKYWORTH" className="brand-logo" priority />
        </Link>

        <nav id="site-menu" aria-label="Main navigation" className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          
<div
  className="products-nav-wrap"
  ref={menuRef}
  onMouseEnter={() => {
    if (
      window.matchMedia(
        "(hover: hover) and (min-width: 761px)"
      ).matches
    ) {
      setProductsOpen(true);
    }
  }}
>

            <div className="products-nav-trigger">
              <Link href="/products" className={`nav-link ${pathname.startsWith("/products") ? "nav-link--active" : ""}`} onClick={closeMenus}>Products</Link>
              <button className="products-nav-toggle" type="button" aria-label="Toggle product categories" aria-controls="products-mega-menu" aria-expanded={productsOpen} onClick={() => setProductsOpen(v => !v)}>
                <span aria-hidden="true" className={`products-chevron ${productsOpen ? "products-chevron--open" : ""}`}>⌄</span>
              </button>
            </div>
            <div id="products-mega-menu" className={`products-mega ${productsOpen ? "products-mega--open" : ""}`} inert={!productsOpen}>
              <div className="products-mega-intro">
                <span className="products-mega-kicker">DISCOVER SKYWORTH</span>
                <h2>Find your<br />next brilliant<br /><em>experience.</em></h2>
                <p>Picture, sound, business displays, and comfort—all in one place.</p>
                <Link href="/products" className="products-mega-all" onClick={closeMenus}>Explore all products <span aria-hidden="true">↗</span></Link>
              </div>
              <div className="products-mega-categories">
                {productCategories.map(item => (
                <Link key={item.category}href={item.href} onClick={closeMenus}className="products-mega-card">
                    <span className="products-mega-count">{item.number} / PRODUCTS</span>
                    <span className={`products-mega-art products-mega-art--${item.visual}`} aria-hidden="true">
                      {item.visual === "tv" && <Image
                        src="/images/technologies/TV.webp"
                        alt=""
                        width={420}
                        height={280}
                        className="products-mega-tv-image"
                        unoptimized
                      />}
                      {item.visual === "audio" && <><span className="mega-soundbar" /><span className="mega-speaker" /></>}
                      {item.visual === "commercial" && <><span className="mega-signage" /><span className="mega-signage-foot" /></>}
                      {item.visual === "aircon" && <span className="mega-aircon" />}
                    </span>
                    <strong>{item.name}</strong>
                    <span className="products-mega-description">{item.caption}</span>
                    <span className="products-mega-arrow" aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navigation.map(({ href, label }) => (
            <Link key={href} className={`nav-link ${pathname.startsWith(href) ? "nav-link--active" : ""}`} href={href} onClick={closeMenus}>{label}</Link>
          ))}
          <Link className="nav-link nav-link--mobile-extra" href="/promotions" onClick={closeMenus}>Promotions</Link>
          <Link className="nav-link nav-link--mobile-extra" href="/news" onClick={closeMenus}>News</Link>
        </nav>
        <div className="nav-right">
          <Link href="/products" className="nav-cta" onClick={closeMenus}>Explore Products <span aria-hidden="true">↗</span></Link>
          <button type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => { setMenuOpen(v => !v); setProductsOpen(false); }}>
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
