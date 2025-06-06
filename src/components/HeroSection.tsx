import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Instagram,
  Twitter,
  Linkedin,
  MessageCircle,
  Facebook,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] w-full overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="text-left">
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
              <span className="text-foreground">
                Craft Your Perfect Social Bio
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8"
            >
              Generate engaging, platform-optimized bios for all your social
              media profiles in seconds. Stand out with perfectly crafted bios
              that reflect your unique personality.
            </motion.p>

            {/* Social media icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-8"
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
            >
              <Link to="/bio-generator">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-primary hover:bg-primary/90"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                    Generate Your Bio
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Video */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative aspect-video rounded-lg overflow-hidden shadow-2xl"
          >
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/dk3pg4zly/video/upload/v1748456663/cursorful-video-1748456489610_q2ti3l.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              onClick={togglePlay}
            />
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              onClick={togglePlay}
            >
              {!isPlaying && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-16 h-16 rounded-full bg-black/50 hover:bg-black/70 text-white"
                >
                  <Play className="w-8 h-8" />
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
