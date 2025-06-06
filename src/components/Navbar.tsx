import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">BioCraft</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/generator"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/generator"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Bio Generator
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/generator">
            <Button className="font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Create Bio
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
