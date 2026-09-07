"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Heart } from "lucide-react";

export default function StepProgressBar({ currentStep, totalSteps, stepTitle, onPrevStep }) {
  const progressPercent = (currentStep / totalSteps) * 100;
  const bengaliNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const toBengaliNumber = (num) =>
    String(num).replace(/[0-9]/g, (digit) => bengaliNumbers[Number(digit)]);

  return (
    <div className="fixed top-4 left-0 right-0 z-40 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-3 pointer-events-auto">
        {/* Previous Step Button */}
        {currentStep > 1 ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrevStep}
            className="glass-pill px-3.5 py-2 rounded-full flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-pink-600 bg-white/85 shadow-md border border-white/90 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">পূর্ববর্তী ধাপ</span>
          </motion.button>
        ) : (
          <div className="w-10" />
        )}

        {/* Center Progress Pill */}
        <div className="glass-panel px-4 py-2 rounded-full flex flex-col items-center gap-1 shadow-lg border border-white/90 bg-white/85 min-w-[210px] sm:min-w-[280px]">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <span className="text-pink-600 font-black">
              ধাপ {toBengaliNumber(currentStep)}/{toBengaliNumber(totalSteps)}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 truncate max-w-[140px] sm:max-w-[180px]">
              {stepTitle}
            </span>
          </div>

          {/* Micro Progress Bar */}
          <div className="w-full h-1.5 bg-pink-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-full"
            />
          </div>
        </div>

        {/* Small Heart Icon */}
        <div className="glass-pill w-9 h-9 rounded-full flex items-center justify-center text-pink-500 bg-white/85 shadow-md border border-white/90">
          <Heart className="w-4 h-4 fill-pink-400 text-pink-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
