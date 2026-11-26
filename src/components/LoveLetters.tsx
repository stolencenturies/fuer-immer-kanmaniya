
import { useState } from "react";
import { Mail, X } from "lucide-react";
import { openWhenLetters } from "../data/memories";

function LoveLetters() {
  const [openedIndex, setOpenedIndex] = useState<number | null>(
    null
  );

  const selectedLetter =
    openedIndex !== null
      ? openWhenLetters[openedIndex]
      : null;

  return (
    <section className="letters-section section" id="letters">
      <div className="section-heading">
        <p className="eyebrow">FOR EVERY KIND OF DAY</p>

        <h2>
          Open when... <em>♡</em>
        </h2>

        <p className="section-subtitle">
          Little letters, folded up like tiny keepsakes.
        </p>
      </div>

      <div className="envelope-grid">
        {openWhenLetters.map((letter, index) => (
          <button
            className="envelope"
            key={letter.title}
            onClick={() =>
              setOpenedIndex(
                openedIndex === index ? null : index
              )
            }
          >
            <span className="envelope-symbol">
              {letter.icon}
            </span>

            <Mail size={25} />

            <span className="envelope-title">
              {letter.title}
            </span>

            <span className="envelope-action">
              OPEN LETTER ↗
            </span>
          </button>
        ))}
      </div>

      {selectedLetter && (
        <div className="letter-overlay">
          <article className="letter-paper">
            <button
              className="letter-close"
              onClick={() => setOpenedIndex(null)}
              aria-label="Close letter"
            >
              <X size={20} />
            </button>

            <span className="letter-decoration">♡</span>

            <p className="eyebrow">A LITTLE NOTE FOR YOU</p>

            <h3>{selectedLetter.title}</h3>

            <p className="letter-message">
              {selectedLetter.message}
            </p>

            <p className="letter-signature">
              with love, always ♡
            </p>
          </article>
        </div>
      )}
    </section>
  );
}

export default LoveLetters;
