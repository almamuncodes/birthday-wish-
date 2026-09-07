"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Cake, Heart, PartyPopper, ArrowRight } from "lucide-react";
import { triggerCelebrationConfetti } from "../utils/confetti";
import { birthdayData } from "../data/birthdayData";

export default function HeroSection({ onNextStep }) {
  const { sisterName, tagline, subtext, badges } = birthdayData.hero;

  useEffect(() => {
    triggerCelebrationConfetti(6000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 pb-12 max-w-4xl mx-auto">
      {/* Floating Badges */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-wrap items-center justify-center gap-2 mb-6"
      >
        {badges.map((badge, idx) => (
          <span
            key={idx}
            className="glass-pill px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 shadow-sm border border-white/80"
          >
            {badge}
          </span>
        ))}
      </motion.div>

      {/* Main Heading */}
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 text-pink-600 border border-pink-200/60 text-xs sm:text-sm font-medium mb-5 shadow-sm"
        >
          <Cake className="w-4 h-4 text-pink-500" />
          <span>{sisterName}-এর জন্য ভালোবাসার বিশেষ আয়োজন</span>
          <Sparkles className="w-4 h-4 text-amber-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-800 leading-[1.2]"
        >
          শুভ জন্মদিন,{" "}
          <span className="text-gradient-pink font-extrabold relative inline-block">
            {sisterName} মনি!
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="inline-block ml-2 text-3xl sm:text-5xl"
            >
              👑
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle / Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          {tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed"
        >
          {subtext}
        </motion.p>
      </div>

      {/* Action Buttons: Next Step & Confetti */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <button
          onClick={onNextStep}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 active:scale-95 text-white font-semibold text-sm sm:text-base shadow-xl shadow-pink-500/25 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
        >
          <span>পরবর্তী ধাপ: আমাদের স্মৃতির পাতা</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => triggerCelebrationConfetti(5000)}
          className="glass-pill px-6 py-4 rounded-full text-slate-700 hover:text-pink-600 hover:bg-white/80 active:scale-95 text-sm sm:text-base font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-md border border-white/80"
        >
          <PartyPopper className="w-4 h-4 text-pink-500" />
          <span>আরও কনফেটি ওড়াও!</span>
        </button>
      </motion.div>
    </div>
  );
}
