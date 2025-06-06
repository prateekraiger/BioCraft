import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Instagram,
  Twitter,
  Linkedin,
  MessageCircle,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] w-full overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6">
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight mb-6"
        >
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            BioCraft
          </span>
          <br />
          <span className="text-foreground">Craft Your Perfect Social Bio</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Generate engaging, platform-optimized bios for all your social media
          profiles in seconds. Stand out with perfectly crafted bios that
          reflect your unique personality.
        </motion.p>

        {/* Social media icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {[
            { icon: Instagram, label: "Instagram" },
            { icon: Twitter, label: "Twitter" },
            { icon: Linkedin, label: "LinkedIn" },
            { icon: MessageCircle, label: "WhatsApp" },
            { icon: Facebook, label: "Facebook" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 hover:bg-muted transition-colors duration-200"
            >
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-primary hover:bg-primary/90"
            onClick={() => {
              const formSection = document.getElementById("bio-generator");
              formSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              Generate Your Bio
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </Button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            {
              title: "Platform Optimized",
              description:
                "Tailored bios for each social media platform's unique requirements",
              icon: "🎯",
            },
            {
              title: "AI-Powered",
              description:
                "Advanced AI technology to generate creative and engaging bios",
              icon: "✨",
            },
            {
              title: "Instant Results",
              description: "Get multiple bio options in seconds, ready to use",
              icon: "⚡",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
