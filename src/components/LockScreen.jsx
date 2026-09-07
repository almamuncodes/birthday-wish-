"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, KeyRound, Sparkles, AlertCircle, HelpCircle, Heart } from "lucide-react";
import { soundFx } from "../utils/audioEffects";
import { triggerSparkleBurst } from "../utils/confetti";
import { birthdayData } from "../data/birthdayData";

export default function LockScreen({ onUnlock }) {
  const [passcode, setPasscode] = useState("");
  const [hasError, setHasError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const { question, correctAnswer, hint, subtitle } = birthdayData.security;

  const handleAttemptUnlock = (e) => {
    if (e) e.preventDefault();

    // Support both English '2023' and Bengali digits '২০২৩'
    const normalizedInput = passcode
      .trim()
      .replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d));

    if (
      normalizedInput === correctAnswer.trim() ||
      passcode.trim() === "২০২৩" ||
      passcode.trim() === "2023"
    ) {
      setIsUnlocking(true);
      setHasError(false);

      // Play chime & sparkle burst
      soundFx.playUnlockChime();
      triggerSparkleBurst();

      // Delay to let the unlock animation & sound play smoothly
      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setHasError(true);
      if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(200);
      }
      setTimeout(() => {
        setHasError(false);
      }, 800);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/30 backdrop-blur-xl"
    >
      <motion.div
        animate={hasError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel rounded-3xl p-7 sm:p-9 shadow-2xl relative overflow-hidden"
      >
        {/* Glowing Top Edge Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-400/80 to-transparent" />

        {/* Header Icon */}
        <div className="flex justify-center mb-5">
          <motion.div
            animate={
              isUnlocking
                ? { scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] }
                : { y: [0, -4, 0] }
            }
            transition={{ duration: 2, repeat: isUnlocking ? 0 : Infinity, ease: "easeInOut" }}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
              isUnlocking
                ? "bg-gradient-to-tr from-emerald-400 to-teal-300 text-white shadow-emerald-300/40"
                : "bg-gradient-to-tr from-pink-400 via-rose-400 to-purple-400 text-white shadow-pink-300/40"
            }`}
          >
            {isUnlocking ? (
              <Unlock className="w-8 h-8" />
            ) : (
              <Lock className="w-8 h-8" />
            )}
          </motion.div>
        </div>

        {/* Title and Question */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-pink-100/70 text-pink-600 mb-2.5 border border-pink-200/60">
            <Sparkles className="w-3.5 h-3.5" />
            আপু স্পেশাল সারপ্রাইজ
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            গোপন প্রবেশদ্বার 🔐
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {subtitle}
          </p>
        </div>

        {/* Security Question Card */}
        <div className="mb-5 p-4 rounded-2xl bg-white/50 border border-white/80 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-pink-500 font-semibold mb-1">
            নিরাপত্তা প্রশ্ন
          </p>
          <p className="text-sm sm:text-base font-semibold text-slate-700 leading-snug">
            "{question}"
          </p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleAttemptUnlock} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="সালটি লিখুন (যেমন: 2023)..."
              autoFocus
              className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/70 border text-slate-800 placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none transition-all duration-200 ${
                hasError
                  ? "border-rose-400 ring-2 ring-rose-200"
                  : "border-slate-200/90 focus:border-pink-400 focus:ring-4 focus:ring-pink-100/80"
              }`}
            />
          </div>

          {/* Error Message */}
          {hasError && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 text-xs text-rose-500 font-semibold pl-1"
            >
              <AlertCircle className="w-4 h-4" />
              <span>ভুল উত্তর! ২০২৩ সালের কথা একটু মনে করে দেখো...</span>
            </motion.div>
          )}

          {/* Unlock Action Button */}
          <button
            type="submit"
            disabled={isUnlocking}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:via-rose-600 hover:to-purple-600 active:scale-[0.98] text-white font-semibold text-sm sm:text-base shadow-lg shadow-pink-500/25 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            {isUnlocking ? (
              <span>সারপ্রাইজ আনলক হচ্ছে... ✨</span>
            ) : (
              <>
                <span>সাইট আনলক করুন</span>
                <Heart className="w-4 h-4 fill-white/20 group-hover:scale-110 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Hint Section */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-slate-500 hover:text-pink-600 inline-flex items-center gap-1 transition-colors cursor-pointer font-medium"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showHint ? "হিন্ট লুকিয়ে ফেলুন" : "একটু সাহায্য বা হিন্ট দরকার?"}
          </button>

          {showHint && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 text-xs text-purple-700 bg-purple-50/80 p-2.5 rounded-xl border border-purple-100 font-medium"
            >
              {hint}
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
