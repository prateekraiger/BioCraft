import React from "react";
import BioGenerator from "@/components/BioGenerator";

const BioGeneratorPage = () => {
  return (
    <div className="w-full min-h-screen bg-white/70 backdrop-blur-sm pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Social Media Bio Generator
          </h1>
          <p className="text-base sm:text-lg text-black/70 max-w-2xl mx-auto">
            Create engaging and professional bios for your social media profiles in seconds
          </p>
        </div>
        <BioGenerator />
      </div>
    </div>
  );
};

export default BioGeneratorPage;
