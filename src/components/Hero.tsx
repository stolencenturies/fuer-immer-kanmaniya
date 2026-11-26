
import { ArrowDown, Heart, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-decoration flower-left">✿</div>
      <div className="hero-decoration flower-right">❀</div>
      <div className="hero-decoration tiny-heart">♡</div>

      <div className="hero-content">
        <p className="hero-eyebrow">
          <span /> FOUR MONTHS OF US <span />
        </p>

        <div className="hero-icon">
          <Heart size={21} />
          <Sparkles size={14} />
        </div>

        <h1>
          Für immer,
          <br />
          <em>Kanmaniya.</em>
        </h1>

        <p className="hero-description">
          A little universe made of memories,
          <br />
          tiny moments and all the love
          <br />
          tucked between these pages.
        </p>

        <a href="#story" className="hero-button">
          Explore our story
          <ArrowDown size={16} />
        </a>

        <p className="hero-handwriting">
          mit ganz viel Liebe ♡
        </p>
      </div>

      <div className="hero-footer">
        <span>VOL. IV</span>
        <span>EST. WITH LOVE</span>
        <span>2026 — ∞</span>
      </div>
    </section>
  );
}

export default Hero;
