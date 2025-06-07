import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Zap, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                BioCraft
              </span>
              ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Create engaging bios that make your social media profiles stand
              out
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Platform Optimized",
                description:
                  "Tailored bios for each social media platform's unique requirements",
                icon: <Target className="w-10 h-10 text-black/80" />,
              },
              {
                title: "AI-Powered",
                description:
                  "Advanced AI technology to generate creative and engaging bios",
                icon: <Wand2 className="w-10 h-10 text-black/80" />,
              },
              {
                title: "Instant Results",
                description:
                  "Get multiple bio options in seconds, ready to use",
                icon: <Zap className="w-10 h-10 text-black/80" />,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/generateBio">
              <Button className="px-8 py-6 text-lg bg-black text-white hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-xl group relative overflow-hidden">
                <span className="flex items-center gap-2 relative z-10">
                  <Sparkles className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                  Generate Your Bio
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
