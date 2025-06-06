import React from "react";
import BioGenerator from "@/components/BioGenerator";

const BioGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Bio Generator
            </span>
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Create the perfect bio for your social media profiles
          </p>
          <BioGenerator />
        </div>
      </div>
    </div>
  );
};

export default BioGeneratorPage;
