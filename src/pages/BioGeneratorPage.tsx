import React from "react";
import BioGenerator from "@/components/BioGenerator";

const BioGeneratorPage = () => {
  return (
    <div className="w-full min-h-screen bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
              Social Media Bio Generator
            </h1>
            <p className="text-base sm:text-lg text-black/70 max-w-2xl mx-auto">
              Create engaging and professional bios for your social media
              profiles. Perfect for personal branding, business accounts, and
              professional networking.
            </p>
          </div>
          <BioGenerator />
        </div>
      </div>
    </div>
  );
};

export default BioGeneratorPage;
