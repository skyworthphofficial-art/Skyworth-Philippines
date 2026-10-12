import type { Product } from "@/data/products";

type Props = {
  type: Product["visual"];
  className?: string;
};

export default function ProductVisual({ type, className = "" }: Props) {
  return (
    <div className={`product-visual product-visual--${type} ${className}`} aria-hidden="true">
      {type === "tv" && (
        <div className="product-tv">
          <div className="product-tv-screen" />
          <div className="product-tv-stand" />
        </div>
      )}
      {type === "aircon" && (
        <div className="product-aircon">
          <div className="product-aircon-line" />
          <div className="product-aircon-light" />
        </div>
      )}
      {type === "commercial" && (
        <div className="product-commercial">
          <div className="product-commercial-display">
            <div className="product-commercial-glow" />
            <div className="product-commercial-message" />
            <div className="product-commercial-message product-commercial-message--short" />
          </div>
          <div className="product-commercial-base" />
        </div>
      )}
      {type === "audio" && (
        <div className="product-audio">
          <div className="product-audio-grille" />
          <div className="product-audio-bass" />
        </div>
      )}
    </div>
  );
}
