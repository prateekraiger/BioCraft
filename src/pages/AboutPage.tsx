import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Target, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              BioCraft
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Crafting the perfect social media presence, one bio at a time.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-muted/30 p-6 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-muted-foreground">
              To help individuals and businesses create compelling social media
              bios that truly represent their brand and personality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-muted/30 p-6 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">What We Do</h2>
            </div>
            <p className="text-muted-foreground">
              We use advanced AI technology to generate creative, engaging, and
              platform-optimized bios for all major social media platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-muted/30 p-6 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Our Approach</h2>
            </div>
            <p className="text-muted-foreground">
              We combine AI technology with platform-specific best practices to
              create bios that are both creative and effective.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-muted/30 p-6 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Who We Serve</h2>
            </div>
            <p className="text-muted-foreground">
              From individuals to businesses, influencers to professionals, we
              help everyone create the perfect social media presence.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Ready to Create Your Perfect Bio?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of users who have already transformed their social
            media presence with BioCraft.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
