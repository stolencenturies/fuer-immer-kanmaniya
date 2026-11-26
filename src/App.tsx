
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DayCounter from "./components/DayCounter";
import Timeline from "./components/Timeline";
import Reasons from "./components/Reasons";
import LoveLetters from "./components/LoveLetters";
import LoveMailbox from "./components/LoveMailbox";
import MemoryJournal from "./components/MemoryJournal";
import ForeverMilestone from "./components/ForeverMilestone";
import HiddenNotes from "./components/HiddenNotes";
import StarrySky from "./components/StarrySky";
import MusicPlayer from "./components/MusicPlayer";
import FinalLetter from "./components/FinalLetter";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <DayCounter />
        <Timeline />
        <Reasons />
        <LoveLetters />
        <LoveMailbox />
        <MemoryJournal />
        <ForeverMilestone />
        <HiddenNotes />
        <StarrySky />
        <MusicPlayer />
        <FinalLetter />
      </main>

      <footer className="footer">
        Made with love, for our little forever ♡
      </footer>
    </>
  );
}

export default App;
