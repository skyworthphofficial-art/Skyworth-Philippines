import Link from "next/link";
type Props = { eyebrow: string; title: string; description: string; cards: { title: string; body: string }[] };
export default function InfoPage({ eyebrow, title, description, cards }: Props) {
  return <section className="section page-top"><div className="container-wide">
    <div className="page-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
    <div className="info-grid">{cards.map((card,i) => <div key={card.title} className="info-card"><span className="eyebrow">0{i+1} / SKYWORTH</span><h2>{card.title}</h2><p>{card.body}</p></div>)}</div>
    <div className="info-contact"><div><h2>Discover more with SKYWORTH.</h2><p>Explore our collections and find your next favorite experience.</p></div><Link className="button button--blue" href="/products">Explore Products ↗</Link></div>
  </div></section>;
}
