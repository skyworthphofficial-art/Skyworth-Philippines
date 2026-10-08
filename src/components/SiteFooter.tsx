import Link from "next/link";
import Image from "next/image";

const groups = [
  { name: "Explore", links: [{ text: "Products", href: "/products" }, { text: "Technology", href: "/technologies" }, { text: "Promotions", href: "/promotions" }] },
  { name: "Company", links: [{ text: "About Us", href: "/about" }, { text: "News", href: "/news" }, { text: "Where to Buy", href: "/where-to-buy" }] },
  { name: "Assistance", links: [{ text: "Support", href: "/support" }, { text: "Product Catalog", href: "/products" }] },
];
export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="container-wide footer-top">
      <div className="footer-intro">
        <Link href="/" className="brand-wordmark" aria-label="SKYWORTH Philippines home"><Image src="/images/skyworth-logo-black.png" width={583} height={85} alt="SKYWORTH" className="brand-logo brand-logo--footer" /></Link>
        <p>A brilliant view made for modern living.</p>
      </div>
      {groups.map(group => <div key={group.name} className="footer-col">
        <h3>{group.name}</h3>
        {group.links.map(link => <Link key={link.href} href={link.href}>{link.text}</Link>)}
      </div>)}
    </div>
    <div className="container-wide footer-bottom">
      <span>© {new Date().getFullYear()} SKYWORTH Philippines. Website design prototype.</span>
      <span>Independent corporate website concept · No online checkout</span>
    </div>
  </footer>;
}
