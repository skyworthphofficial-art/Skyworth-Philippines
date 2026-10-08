import Link from "next/link";
import ProductVisual from "@/components/ProductVisual";
import { products } from "@/data/products";

const categoryCards = [
  { title: "Televisions", caption: "Picture-perfect moments", visual: "tv" as const, number: "01" },
  { title: "Air Conditioners", caption: "Comfort for every space", visual: "aircon" as const, number: "02" },
  { title: "Washing Machines", caption: "Everyday care, made simple", visual: "washer" as const, number: "03" },
  { title: "Audio", caption: "Feel every sound", visual: "audio" as const, number: "04" },
];

export default function HomePage() {
  return <>
    <section className="hero" aria-labelledby="home-heading">
      <div className="hero-shine" />
      <div className="container-wide hero-inner">
        <div className="hero-copy">
          <div className="eyebrow eyebrow--light"><span className="eyebrow-line" /> A NEW PERSPECTIVE ON ENTERTAINMENT</div>
          <h1 id="home-heading">Brilliant living.<br /><span>Made possible.</span></h1>
          <p>Welcome to a world of remarkable home experiences. Discover the next chapter of SKYWORTH Philippines.</p>
          <div className="hero-actions">
            <Link className="button button--white" href="/products">Explore Products <span aria-hidden="true">↗</span></Link>
            <Link className="button button--outline-white" href="/technologies">Discover Our Technology <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-caption"><span className="hero-caption-dot" /> TECHNOLOGY FOR MODERN HOMES</div>
        </div>
        <div className="hero-visual" aria-label="Illustrative television visual; not an actual product photo" role="img">
          <div className="hero-orbit hero-orbit--one" /><div className="hero-orbit hero-orbit--two" />
          <div className="hero-television">
            <div className="hero-screen"><div className="hero-screen-horizon" /><div className="hero-screen-ridge" /><div className="hero-screen-glow" /></div>
            <div className="hero-tv-foot" />
          </div>
          <div className="hero-visual-label"><span>THE BRILLIANT VIEW</span><span>SKYWORTH DISPLAY EXPERIENCE</span></div>
        </div>
      </div>
      <div className="hero-bottom container-wide"><span>DISCOVER MORE</span><a href="#discover" aria-label="Scroll to discover products">↓</a><span>01 / 04</span></div>
    </section>

    <section className="section section--white" id="discover">
      <div className="container-wide">
        <div className="section-heading">
          <div><span className="eyebrow">MADE FOR YOUR EVERYDAY</span><h2>More than a screen.<br /><span className="muted-heading">More ways to live.</span></h2></div>
          <p>From unforgettable movie nights to everyday comfort, find the SKYWORTH experience that fits your home.</p>
        </div>
        <div className="category-grid">
          {categoryCards.map(card => <Link href={`/products?category=${encodeURIComponent(card.title)}`} key={card.title} className="category-card">
            <div className="category-meta"><span>{card.number} / EXPLORE</span><span aria-hidden="true">↗</span></div>
            <ProductVisual type={card.visual} />
            <div className="category-bottom"><h3>{card.title}</h3><p>{card.caption}</p></div>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="technology-feature" id="technology">
      <div className="container-wide tech-layout">
        <div className="technology-text"><span className="eyebrow eyebrow--light">THE TECHNOLOGY BEHIND THE MOMENT</span><h2>Every detail<br />deserves to<br /><span>be seen.</span></h2><p>Explore the display ideas, viewing experiences, and thoughtful technology behind SKYWORTH entertainment.</p><Link className="button button--white" href="/technologies">Explore Technology <span aria-hidden="true">↗</span></Link></div>
        <div className="technology-art" aria-hidden="true"><div className="technology-glow"/><div className="technology-ring technology-ring--one"/><div className="technology-ring technology-ring--two"/><div className="technology-glass"/><div className="technology-glass technology-glass--second"/><span className="technology-note">A CLOSER LOOK AT BRILLIANCE</span></div>
      </div>
    </section>

    <section className="section section--white" id="featured">
      <div className="container-wide">
        <div className="section-heading section-heading--inline"><div><span className="eyebrow">EXPLORE THE COLLECTION</span><h2>Find your<br /><span className="muted-heading">perfect match.</span></h2></div><Link className="text-link" href="/products">View all products <span aria-hidden="true">↗</span></Link></div>
        <div className="featured-grid">
          {products.slice(0, 3).map(product => <Link className="featured-card" key={product.slug} href={`/products/${product.slug}`}>
            <div className="featured-card-top"><span>{product.eyebrow.toUpperCase()}</span><span aria-hidden="true">↗</span></div>
            <ProductVisual type={product.visual} />
            <h3>{product.name}</h3><p>{product.summary}</p>
          </Link>)}
        </div>
        <p className="demo-disclaimer">Collection labels and illustrations are placeholders for the design prototype. Final content will use approved local product data.</p>
      </div>
    </section>

    <section className="section section--soft" id="dealers"><div className="container-wide dealer-layout">
      <div><span className="eyebrow">CLOSER TO YOU</span><h2>Experience SKYWORTH<br /><span className="muted-heading">in your own way.</span></h2><p>Browse our product collections and discover where to find SKYWORTH through authorized retail partners.</p><Link className="button button--blue" href="/where-to-buy">Where to Buy <span aria-hidden="true">↗</span></Link></div>
      <div className="dealer-art"><div className="dealer-card dealer-card--one"><div className="dealer-pin">⌖</div><strong>Explore</strong><small>Available retailers</small></div><div className="dealer-card dealer-card--two"><span className="dealer-small-line"/><span className="dealer-small-line dealer-small-line--short"/><span className="dealer-small-line"/></div></div>
    </div></section>
  </>;
}
