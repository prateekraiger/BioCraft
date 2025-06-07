import React from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Zap,
  Wand2,
  Sparkles,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Youtube,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="pt-20 pb-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
          Craft Your Perfect Bio
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Generate professional, engaging bios for any social platform with AI
        </p>
        <Link
          to="/generateBio"
          className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-xl group"
        >
          <Sparkles className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
          Generate Bio
        </Link>

        {/* Social Media Icons */}
        <div className="mt-12 flex justify-center items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Instagram className="w-8 h-8 text-black/80" />
            <span className="text-sm text-gray-600">Instagram</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Twitter className="w-8 h-8 text-black/80" />
            <span className="text-sm text-gray-600">Twitter</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Linkedin className="w-8 h-8 text-black/80" />
            <span className="text-sm text-gray-600">LinkedIn</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Facebook className="w-8 h-8 text-black/80" />
            <span className="text-sm text-gray-600">Facebook</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Youtube className="w-8 h-8 text-black/80" />
            <span className="text-sm text-gray-600">YouTube</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            BioCraft
          </span>
          ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300">
            <div className="flex justify-center mb-4">
              <Target className="w-10 h-10 text-black/80" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Platform Optimized</h3>
            <p className="text-gray-600">
              Tailored bios for Instagram, Twitter, LinkedIn, and more
            </p>
          </div>
          <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300">
            <div className="flex justify-center mb-4">
              <Wand2 className="w-10 h-10 text-black/80" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-600">
              Advanced AI technology for perfect bio generation
            </p>
          </div>
          <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300">
            <div className="flex justify-center mb-4">
              <Zap className="w-10 h-10 text-black/80" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
            <p className="text-gray-600">
              Get your bio in seconds, ready to use
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  // Implementation of HowItWorksSection
  return null;
};

const TestimonialsSection = () => {
  // Implementation of TestimonialsSection
  return null;
};

const PricingSection = () => {
  // Implementation of PricingSection
  return null;
};

const FAQSection = () => {
  // Implementation of FAQSection
  return null;
};

const CTASection = () => {
  // Implementation of CTASection
  return null;
};

export default HomePage;
