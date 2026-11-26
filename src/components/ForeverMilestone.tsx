
import { useEffect, useState, type FormEvent } from "react";
import {
  CalendarHeart,
  Camera,
  Check,
  Clock,
  Edit3,
  Heart,
  LockKeyhole,
  Sparkles,
  X,
} from "lucide-react";

type MeetingMemory = {
  date: string;
  description: string;
  photoUrl: string;
};

const STORAGE_KEY = "fuer-immer-first-meeting";

function getSavedMeeting(): MeetingMemory | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? (JSON.parse(saved) as MeetingMemory) : null;
  } catch {
    return null;
  }
}

function ForeverMilestone() {
  const [meeting, setMeeting] = useState<MeetingMemory | null>(
    getSavedMeeting
  );

  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(meeting?.date ?? "");
  const [description, setDescription] = useState(
    meeting?.description ?? ""
  );
  const [photoUrl, setPhotoUrl] = useState(meeting?.photoUrl ?? "");

  useEffect(() => {
    if (meeting) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(meeting));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [meeting]);

  function openEditor() {
    setDate(meeting?.date ?? "");
    setDescription(meeting?.description ?? "");
    setPhotoUrl(meeting?.photoUrl ?? "");
    setIsEditing(true);
  }

  function saveMeeting(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!date || !description.trim()) return;

    if (photoUrl.trim()) {
      try {
        const parsedUrl = new URL(photoUrl.trim());

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          alert("Please enter a valid image URL.");
          return;
        }
      } catch {
        alert("Please enter a valid image URL.");
        return;
      }
    }

    setMeeting({
      date,
      description: description.trim(),
      photoUrl: photoUrl.trim(),
    });

    setIsEditing(false);
  }

  function resetMeeting() {
    const confirmed = window.confirm(
      "Remove this meeting memory? This cannot be undone."
    );

    if (!confirmed) return;

    setMeeting(null);
    setDate("");
    setDescription("");
    setPhotoUrl("");
    setIsEditing(false);
  }

  return (
    <section className="meeting-section section" id="first-meeting">
      <div className="section-heading">
        <p className="eyebrow">A DAY WE WILL ALWAYS REMEMBER</p>

        <h2>
          Until We Meet <em>♡</em>
        </h2>

        <p className="section-subtitle">
          A little space for a chapter that is still waiting to be written.
        </p>
      </div>

      <div className="meeting-card">
        <div className="meeting-card-top">
          <div className="meeting-icon">
            <CalendarHeart size={25} />
          </div>

          <span>OUR FUTURE MILESTONE</span>
          <Sparkles size={18} />
        </div>

        {!meeting ? (
          <div className="meeting-waiting">
            <div className="meeting-lock">
              <LockKeyhole size={28} />
            </div>

            <h3>Our first hello, in person.</h3>

            <p>
              This page is waiting for the day when an online story
              becomes a real-life memory. Until then, let's keep
              writing all the chapters that come before it.
            </p>

            <div className="meeting-waiting-note">
              <Clock size={15} />
              <span>Not yet written — and that's okay.</span>
            </div>

            <button
              className="meeting-record-button"
              onClick={openEditor}
              type="button"
            >
              <Heart size={16} />
              Record our meeting
            </button>
          </div>
        ) : (
          <div className="meeting-completed">
            <div className="meeting-completed-icon">
              <Check size={27} />
            </div>

            <p className="eyebrow">THE DAY WE FINALLY MET</p>

            <h3>
              We made this memory. ♡
            </h3>

            <p className="meeting-completed-date">
              {new Date(`${meeting.date}T12:00:00`).toLocaleDateString(
                undefined,
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>

            {meeting.photoUrl && (
              <img
                className="meeting-photo"
                src={meeting.photoUrl}
                alt="Our first meeting"
              />
            )}

            <p className="meeting-description">
              {meeting.description}
            </p>

            <div className="meeting-actions">
              <button onClick={openEditor} type="button">
                <Edit3 size={15} />
                Edit memory
              </button>

              <button onClick={resetMeeting} type="button">
                <X size={15} />
                Remove entry
              </button>
            </div>
          </div>
        )}

        {isEditing && (
          <form className="meeting-form" onSubmit={saveMeeting}>
            <div className="meeting-form-heading">
              <div>
                <p className="eyebrow">A NEW CHAPTER</p>
                <h3>Record the day</h3>
              </div>

              <button
                type="button"
                className="memory-close-button"
                onClick={() => setIsEditing(false)}
                aria-label="Close meeting form"
              >
                <X size={20} />
              </button>
            </div>

            <label htmlFor="meeting-date">The date we met</label>
            <input
              id="meeting-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />

            <label htmlFor="meeting-description">
              Tell us about that day
            </label>
            <textarea
              id="meeting-description"
              rows={6}
              maxLength={5000}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What happened? What did you do together? What do you want to remember?"
              required
            />

            <label htmlFor="meeting-photo">
              <Camera size={15} />
              Photograph URL (optional)
            </label>
            <input
              id="meeting-photo"
              type="url"
              value={photoUrl}
              onChange={(event) => setPhotoUrl(event.target.value)}
              placeholder="https://..."
            />

            <div className="meeting-form-actions">
              <button
                type="button"
                className="meeting-cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

              <button type="submit" className="meeting-record-button">
                <Heart size={15} />
                Save this milestone
              </button>
            </div>
          </form>
        )}

        <div className="meeting-card-footer">
          <span>One day, another beautiful page.</span>
          <span>Für immer ♡</span>
        </div>
      </div>
    </section>
  );
}

export default ForeverMilestone;
