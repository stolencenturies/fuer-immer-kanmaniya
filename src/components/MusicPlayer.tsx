
import { useRef, useState } from "react";
import { Music2, Play, Pause, Volume2 } from "lucide-react";

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  async function togglePlayback() {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  }

  return (
    <section className="music-section section" id="music">
      <div className="music-card">
        <div className="music-art">
          <Music2 size={48} />
          <span>♡</span>
        </div>

        <div className="music-info">
          <p className="eyebrow">A LITTLE SOUNDTRACK</p>

          <h2>Our song corner</h2>

          <p>
            Some songs feel like memories. Add a favourite
            song or a little voice note to this section.
          </p>

          <audio
            ref={audioRef}
            src="/audio/our-song.mp3"
            onEnded={() => setPlaying(false)}
          />

          <button
            className="music-button"
            onClick={togglePlayback}
          >
            {playing ? <Pause size={17} /> : <Play size={17} />}

            {playing ? "Pause our song" : "Play our song"}
          </button>

          <span className="music-caption">
            <Volume2 size={14} />
            Add your audio file to public/audio/our-song.mp3
          </span>
        </div>
      </div>
    </section>
  );
}

export default MusicPlayer;
