
import { useEffect, useState } from "react";
import { Heart, Clock3, Sparkles } from "lucide-react";

// Relationship beginning: 26 August 2026, 9:50 PM IST
const START_DATE = new Date("2026-08-26T21:50:00+05:30");

type TimeElapsed = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateElapsed(): TimeElapsed {
  const difference = Math.max(0, Date.now() - START_DATE.getTime());

  const totalSeconds = Math.floor(difference / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function DayCounter() {
  const [elapsed, setElapsed] = useState<TimeElapsed>(
    calculateElapsed
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setElapsed(calculateElapsed());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "DAYS", value: elapsed.days },
    { label: "HOURS", value: elapsed.hours },
    { label: "MINUTES", value: elapsed.minutes },
    { label: "SECONDS", value: elapsed.seconds },
  ];

  return (
    <section className="forever-section section" id="our-forever">
      <div className="section-heading">
        <p className="eyebrow">EVERY SECOND IS A LITTLE MEMORY</p>

        <h2>
          Our Little <em>Forever ♡</em>
        </h2>

        <p className="section-subtitle">
          Somewhere between that day and today, a thousand little
          memories became our story.
        </p>
      </div>

      <div className="forever-card">
        <div className="forever-decoration forever-decoration-one">
          ♡
        </div>

        <div className="forever-decoration forever-decoration-two">
          ✿
        </div>

        <div className="forever-top">
          <div className="forever-icon">
            <Heart size={22} />
          </div>

          <p>OUR STORY BEGAN</p>

          <Sparkles size={17} className="forever-sparkle" />
        </div>

        <h3 className="forever-date">
          26 August 2026
        </h3>

        <p className="forever-start-time">
          <Clock3 size={14} />
          9:50 PM · Indian Standard Time
        </p>

        <div className="forever-divider">
          <span />
          <Heart size={13} />
          <span />
        </div>

        <p className="forever-counter-label">
          WE HAVE BEEN WRITING OUR STORY FOR
        </p>

        <div className="forever-counter">
          {timeUnits.map((unit) => (
            <div className="forever-time-unit" key={unit.label}>
              <strong>
                {String(unit.value).padStart(2, "0")}
              </strong>

              <span>{unit.label}</span>
            </div>
          ))}
        </div>

        <p className="forever-message">
          One beginning, countless little moments,
          and so many chapters still waiting for us.
        </p>

        <div className="forever-bottom">
          <span>Du bist mein Lieblingsmensch</span>
          <span>♡ Für immer</span>
        </div>
      </div>
    </section>
  );
}

export default DayCounter;
