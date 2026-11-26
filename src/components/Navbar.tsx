
import { Heart, Printer } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#home" className="logo">
        F<span>♡</span>K
      </a>

      <div className="nav-links">
        <a href="#story">Our Story</a>
        <a href="#reasons">Little Things</a>
        <a href="#letters">Letters</a>
        <a href="#sky">Our Sky</a>
      </div>

      <button
        className="print-button"
        onClick={() => window.print()}
      >
        <Printer size={15} />
        <span>Save as PDF</span>
      </button>
    </nav>
  );
}

export default Navbar;
