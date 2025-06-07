import { motion } from "framer-motion";
import { Sparkles, Zap, Target, Users } from "lucide-react";

export function AboutPage() {
  return (
    <div className="min-h-screen  py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="text-black">BioGen</span>
          </h1>
          <p className="text-gray-600">
            Crafting the perfect social media presence, one bio at a time.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-50 p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-black" />
              <h2 className="text-xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-gray-600">
              To help individuals and businesses create compelling social media
              bios that truly represent their brand and personality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-50 p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-black" />
              <h2 className="text-xl font-semibold">What We Do</h2>
            </div>
            <p className="text-gray-600">
              We use advanced AI technology to generate creative, engaging, and
              platform-optimized bios for all major social media platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-50 p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-black" />
              <h2 className="text-xl font-semibold">Our Approach</h2>
            </div>
            <p className="text-gray-600">
              We combine AI technology with platform-specific best practices to
              create bios that are both creative and effective.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-50 p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-black" />
              <h2 className="text-xl font-semibold">Who We Serve</h2>
            </div>
            <p className="text-gray-600">
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
          <p className="text-gray-600 mb-6">
            Join thousands of users who have already transformed their social
            media presence with BioGen.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-black text-white hover:bg-black/90 transition-colors"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </div>
  );
}
