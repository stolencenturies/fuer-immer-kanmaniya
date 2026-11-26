
import { timeline } from "../data/memories";

function Timeline() {
  return (
    <section className="timeline-section section" id="story">
      <div className="section-heading">
        <p className="eyebrow">THE PAGES SO FAR</p>
        <h2>
          Our little <em>timeline</em>
        </h2>
        <p className="section-subtitle">
          Four chapters, one beautiful story.
        </p>
      </div>

      <div className="timeline">
        {timeline.map((memory, index) => (
          <article
            className={`timeline-item ${
              index % 2 === 0 ? "left" : "right"
            }`}
            key={memory.chapter}
          >
            <div className="timeline-dot">
              {memory.symbol}
            </div>

            <div className="timeline-card">
              <span className="timeline-date">
                {memory.date}
              </span>

              <h3>{memory.title}</h3>

              <p>{memory.description}</p>

              <span className="timeline-chapter">
                {memory.chapter}
              </span>
            </div>
          </article>
        ))}
      </div>

      <p className="timeline-footer">
        And the best chapters are still unwritten. ♡
      </p>
    </section>
  );
}

export default Timeline;
