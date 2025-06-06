import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-black" />
            <span className="text-xl font-bold text-black">BioCraft</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-black ${
              isActive("/") ? "text-black" : "text-black/70"
            }`}
          >
            Home
          </Link>
          <Link
            to="/bio-generator"
            className={`text-sm font-medium transition-colors hover:text-black ${
              isActive("/bio-generator") ? "text-black" : "text-black/70"
            }`}
          >
            Bio Generator
          </Link>
          <Link to="/bio-generator">
            <Button className="bg-black text-white hover:bg-black/90">
              Get Started
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black/70 hover:text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-black/10 bg-white/90 backdrop-blur-sm">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-black ${
                isActive("/") ? "text-black" : "text-black/70"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/bio-generator"
              className={`text-sm font-medium transition-colors hover:text-black ${
                isActive("/bio-generator") ? "text-black" : "text-black/70"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Bio Generator
            </Link>
            <Link to="/bio-generator" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-black text-white hover:bg-black/90">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
