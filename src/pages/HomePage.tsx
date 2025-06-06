import React from "react";
import { HeroSection } from "@/components/HeroSection";
import BioGenerator from "@/components/BioGenerator";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div id="bio-generator" className="py-8">
        <BioGenerator />
      </div>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© 2024 BioCraft. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
