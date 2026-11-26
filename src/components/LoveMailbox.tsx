
import { useEffect, useState } from "react";
import {
  Mail,
  MailOpen,
  Plus,
  Send,
  Trash2,
  X,
  Heart,
  Inbox,
} from "lucide-react";

type Sender = "You" | "Ayantika";

type MailLetter = {
  id: string;
  sender: Sender;
  title: string;
  message: string;
  createdAt: string;
};

const STORAGE_KEY = "fuer-immer-love-mailbox";

function getSavedLetters(): MailLetter[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    return Array.isArray(parsed) ? (parsed as MailLetter[]) : [];
  } catch {
    return [];
  }
}

function LoveMailbox() {
  const [letters, setLetters] = useState<MailLetter[]>(getSavedLetters);
  const [sender, setSender] = useState<Sender>("You");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(
    null
  );
  const [showComposer, setShowComposer] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
    } catch {
      console.error("Could not save mailbox letters.");
    }
  }, [letters]);

  const selectedLetter =
    letters.find((letter) => letter.id === selectedLetterId) ?? null;

  function saveLetter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !message.trim()) return;

    const newLetter: MailLetter = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      sender,
      title: title.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    setLetters((currentLetters) => [newLetter, ...currentLetters]);

    setTitle("");
    setMessage("");
    setShowComposer(false);
  }

  function deleteLetter(id: string) {
    setLetters((currentLetters) =>
      currentLetters.filter((letter) => letter.id !== id)
    );

    if (selectedLetterId === id) {
      setSelectedLetterId(null);
    }
  }

  return (
    <section className="mailbox-section section" id="mailbox">
      <div className="section-heading">
        <p className="eyebrow">A LITTLE PLACE FOR BOTH OF US</p>

        <h2>
          Letters Across Our <em>Little World ♡</em>
        </h2>

        <p className="section-subtitle">
          Two hearts, two pens, and a mailbox full of things we want to
          remember.
        </p>
      </div>

      <div className="mailbox">
        <div className="mailbox-header">
          <div className="mailbox-heading">
            <div className="mailbox-icon">
              <Mail size={25} />
            </div>

            <div>
              <h3>Our little mailbox</h3>
              <p>Every letter deserves a place to stay.</p>
            </div>
          </div>

          <button
            className="compose-button"
            onClick={() => {
              setSelectedLetterId(null);
              setShowComposer(true);
            }}
          >
            <Plus size={17} />
            Write a letter
          </button>
        </div>

        <div className="mailbox-count">
          <Inbox size={16} />
          <span>
            {letters.length} {letters.length === 1 ? "letter" : "letters"} saved
          </span>
          <Heart size={14} />
        </div>

        {showComposer && (
          <form className="mail-composer" onSubmit={saveLetter}>
            <div className="composer-top">
              <div>
                <p className="eyebrow">A FRESH LITTLE PAGE</p>
                <h3>Write from the heart</h3>
              </div>

              <button
                type="button"
                className="mail-close"
                onClick={() => setShowComposer(false)}
                aria-label="Close composer"
              >
                <X size={20} />
              </button>
            </div>

            <label htmlFor="mail-sender">This letter is from</label>

            <select
              id="mail-sender"
              value={sender}
              onChange={(event) => setSender(event.target.value as Sender)}
            >
              <option value="You">You</option>
              <option value="Ayantika">Ayantika</option>
            </select>

            <label htmlFor="mail-title">Letter title</label>

            <input
              id="mail-title"
              type="text"
              placeholder="A little thought for you..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={70}
              required
            />

            <label htmlFor="mail-message">Your letter</label>

            <textarea
              id="mail-message"
              placeholder="Dear favourite person..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={7}
              maxLength={5000}
              required
            />

            <div className="composer-footer">
              <span>{message.length}/5000 characters</span>

              <button className="save-letter-button" type="submit">
                <Send size={16} />
                Save letter
              </button>
            </div>
          </form>
        )}

        {selectedLetter && (
          <article className="opened-mail">
            <button
              className="mail-close"
              onClick={() => setSelectedLetterId(null)}
              aria-label="Close opened letter"
            >
              <X size={20} />
            </button>

            <div className="opened-mail-decoration">♡</div>

            <p className="eyebrow">
              A LETTER FROM {selectedLetter.sender.toUpperCase()}
            </p>

            <h3>{selectedLetter.title}</h3>

            <p className="opened-mail-date">
              {new Date(selectedLetter.createdAt).toLocaleDateString(
                undefined,
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>

            <p className="opened-mail-message">{selectedLetter.message}</p>

            <p className="opened-mail-signature">with love ♡</p>

            <button
              className="delete-letter-button"
              onClick={() => deleteLetter(selectedLetter.id)}
            >
              <Trash2 size={15} />
              Delete this letter
            </button>
          </article>
        )}

        {!showComposer && !selectedLetter && (
          <div className="mail-list">
            {letters.length === 0 ? (
              <div className="empty-mailbox">
                <MailOpen size={42} strokeWidth={1.2} />

                <h3>Your mailbox is waiting...</h3>

                <p>
                  The first letter is waiting to be written. Leave a little
                  piece of your day here.
                </p>

                <button
                  className="empty-compose-button"
                  onClick={() => setShowComposer(true)}
                >
                  Write our first letter ♡
                </button>
              </div>
            ) : (
              letters.map((letter) => (
                <article className="mail-list-item" key={letter.id}>
                  <div className="mail-list-icon">
                    <Mail size={21} />
                  </div>

                  <button
                    className="mail-list-content"
                    onClick={() => setSelectedLetterId(letter.id)}
                  >
                    <span className="mail-list-sender">
                      From {letter.sender}
                    </span>

                    <strong>{letter.title}</strong>

                    <span className="mail-list-preview">
                      {letter.message.slice(0, 85)}
                      {letter.message.length > 85 ? "..." : ""}
                    </span>

                    <span className="mail-list-date">
                      {new Date(letter.createdAt).toLocaleDateString()}
                    </span>
                  </button>

                  <button
                    className="quick-delete-button"
                    onClick={() => deleteLetter(letter.id)}
                    aria-label={`Delete ${letter.title}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </article>
              ))
            )}
          </div>
        )}

        <div className="mailbox-footer">
          <span>Keep every little word. Keep every little memory.</span>
          <span>Für immer ♡</span>
        </div>
      </div>
    </section>
  );
}

export default LoveMailbox;
