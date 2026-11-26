
import { Heart } from "lucide-react";
import { reasons } from "../data/memories";

function Reasons() {
  return (
    <section className="reasons-section section" id="reasons">
      <div className="section-heading">
        <p className="eyebrow">A PAGE I COULD FILL FOREVER</p>

        <h2>
          20 little reasons
          <br />
          <em>you are loved.</em>
        </h2>

        <p className="section-subtitle">
          Just twenty tiny windows into how I see you.
        </p>
      </div>

      <div className="reasons-grid">
        {reasons.map((reason, index) => (
          <article className="reason-card" key={index}>
            <span className="reason-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <p>{reason}</p>

            <Heart
              className="reason-heart"
              size={17}
            />
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reasons;
