"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, ArrowRight, Sparkles } from "lucide-react";
import { birthdayData } from "../data/birthdayData";

export default function ReasonsStep({ onNextStep }) {
  const [activeReasonIndex, setActiveReasonIndex] = useState(0);
  const { reasonsTitle, reasons } = birthdayData.surpriseCake;

  const bengaliNumbers = ["১", "২", "৩", "৪", "৫"];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-20 pb-12 max-w-5xl mx-auto text-center">
      {/* Step Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/70 text-amber-800 text-xs sm:text-sm font-bold border border-amber-200/50 mb-3 shadow-sm">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>সেরা বোনের খেতাব</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-800">
          {reasonsTitle}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
          তুমি কেন আমাদের সবার কাছে এত স্পেশাল আর অনন্য, তার কয়েকটি ছোট্ট কারণ:
        </p>
      </motion.div>

      {/* 5 Interactive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 w-full text-left">
        {reasons.map((reason, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            onClick={() => setActiveReasonIndex(idx)}
            className={`glass-panel-interactive rounded-2xl p-6 cursor-pointer relative overflow-hidden border transition-all duration-300 ${
              activeReasonIndex === idx
                ? "border-pink-400 ring-4 ring-pink-200/60 bg-white/95 scale-[1.02] shadow-xl"
                : "border-white/70 bg-white/70 hover:bg-white/90"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl p-3 rounded-2xl bg-white/90 shadow-sm border border-slate-100 flex-shrink-0">
                {reason.emoji}
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-800">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-normal">
                  {reason.desc}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-500">
                কারণ #{bengaliNumbers[idx]}
              </span>
              <Heart
                className={`w-4 h-4 transition-colors ${
                  activeReasonIndex === idx
                    ? "text-pink-500 fill-pink-500"
                    : "text-pink-300"
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Next Step Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-12"
      >
        <button
          onClick={onNextStep}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 active:scale-95 text-white font-semibold text-sm sm:text-base shadow-xl shadow-pink-500/25 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
        >
          <span>পরবর্তী ধাপ: ভালোবাসার গোপন চিঠি</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
