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
  MessageSquare,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <HeroSection />
      <VideoPreviewSection />
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
        <div className="mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col items-center gap-2 transform transition-transform hover:scale-110">
            <Instagram className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black/80" />
            <span className="text-xs sm:text-sm text-gray-600">Instagram</span>
          </div>
          <div className="flex flex-col items-center gap-2 transform transition-transform hover:scale-110">
            <Twitter className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black/80" />
            <span className="text-xs sm:text-sm text-gray-600">Twitter</span>
          </div>
          <div className="flex flex-col items-center gap-2 transform transition-transform hover:scale-110">
            <Linkedin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black/80" />
            <span className="text-xs sm:text-sm text-gray-600">LinkedIn</span>
          </div>
          <div className="flex flex-col items-center gap-2 transform transition-transform hover:scale-110">
            <Facebook className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black/80" />
            <span className="text-xs sm:text-sm text-gray-600">Facebook</span>
          </div>
          <div className="flex flex-col items-center gap-2 transform transition-transform hover:scale-110">
            <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black/80" />
            <span className="text-xs sm:text-sm text-gray-600">WhatsApp</span>
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

const VideoPreviewSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-200 mx-auto transform hover:scale-[1.01] transition-all duration-300">
          <video
            className="w-full h-auto"
            controls
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://res.cloudinary.com/dk3pg4zly/video/upload/v1749282325/BioCraft_Preview_zbycrt.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <p className="mt-8 text-lg text-gray-600 max-w-3xl mx-auto text-center">
          Watch how easily you can create professional, engaging bios for all
          your social media profiles in just a few clicks.
        </p>
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
