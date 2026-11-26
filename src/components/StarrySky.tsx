
import { useState } from "react";

const wishes = [
  "May we keep growing, gently and together.",
  "May your dreams always have room to bloom.",
  "May we never stop finding wonder in small things.",
  "May kindness always be the language of our love.",
  "May every new chapter bring something beautiful.",
  "May we always celebrate each other's happiness.",
  "May our future be full of peaceful little adventures.",
];

function StarrySky() {
  const [selectedWish, setSelectedWish] = useState<number | null>(
    null
  );

  const stars = Array.from({ length: 35 }, (_, index) => ({
    id: index,
    left: `${(index * 37 + 11) % 94}%`,
    top: `${(index * 53 + 7) % 88}%`,
    delay: `${(index % 7) * 0.3}s`,
  }));

  return (
    <section className="sky-section section" id="sky">
      <div className="sky-content">
        <p className="eyebrow">SOMEWHERE UNDER THE SAME SKY</p>

        <h2>
          Our little <em>constellation.</em>
        </h2>

        <p className="sky-description">
          Tap a star. Each one is holding a little wish.
        </p>

        <div className="star-map">
          {stars.map((star) => (
            <button
              key={star.id}
              className={`star ${
                selectedWish === star.id ? "active" : ""
              }`}
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.delay,
              }}
              onClick={() =>
                setSelectedWish(star.id)
              }
              aria-label={`Reveal star ${star.id + 1}`}
            >
              ✦
            </button>
          ))}

          <div className="sky-initials">
            S <span>♡</span> S
          </div>
        </div>

        <p className="star-wish">
          {selectedWish === null
            ? "Choose a star to reveal a wish..."
            : wishes[selectedWish % wishes.length]}
        </p>

        <p className="sky-signature">
          Gute Nacht, mein Lieblingsmensch.
        </p>
      </div>
    </section>
  );
}

export default StarrySky;
