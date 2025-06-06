import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/50">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-black transition-transform duration-300 group-hover:rotate-12" />
            <div className="absolute -inset-1 rounded-full bg-black/5 blur-sm group-hover:bg-black/10 transition-all duration-300" />
          </div>
          <span className="text-xl font-bold text-black">BioCraft</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-black/70 hover:text-black transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-all duration-300 hover:text-black relative group ${
              location.pathname === "/" ? "text-black" : "text-black/70"
            }`}
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            to="/generator"
            className={`text-sm font-medium transition-all duration-300 hover:text-black relative group ${
              location.pathname === "/generator"
                ? "text-black"
                : "text-black/70"
            }`}
          >
            Bio Generator
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/generator">
            <Button className="font-medium bg-black text-white hover:bg-black/90 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-black/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Create Bio
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-black/10 md:hidden">
            <div className="container px-4 py-4 space-y-4">
              <Link
                to="/"
                className={`block text-sm font-medium transition-all duration-300 hover:text-black ${
                  location.pathname === "/" ? "text-black" : "text-black/70"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/generator"
                className={`block text-sm font-medium transition-all duration-300 hover:text-black ${
                  location.pathname === "/generator"
                    ? "text-black"
                    : "text-black/70"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Bio Generator
              </Link>
              <Link to="/generator" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full font-medium bg-black text-white hover:bg-black/90 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-black/20">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Bio
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
