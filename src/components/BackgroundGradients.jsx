"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BackgroundGradients() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Animated Pastel Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[15%] -left-[10%] w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] rounded-full bg-gradient-to-tr from-pink-300/45 via-rose-200/40 to-purple-300/35 blur-3xl opacity-75"
      />

      <motion.div
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 60, -50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-[28%] -right-[12%] w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full bg-gradient-to-bl from-purple-300/45 via-indigo-200/40 to-pink-200/35 blur-3xl opacity-70"
      />

      <motion.div
        animate={{
          x: [0, 40, -60, 0],
          y: [0, 70, -30, 0],
          scale: [1, 1.1, 0.92, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute -bottom-[15%] left-[20%] w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] rounded-full bg-gradient-to-tr from-sky-200/45 via-teal-100/35 to-rose-200/40 blur-3xl opacity-65"
      />

      {/* Subtle Noise / Ambient Light Shimmer */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
    </div>
  );
}
