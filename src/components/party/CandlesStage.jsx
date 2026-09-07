"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, RotateCcw, ArrowRight, Sparkles, Gift } from "lucide-react";
import { soundFx } from "../../utils/audioEffects";
import { triggerCelebrationConfetti, triggerSparkleBurst } from "../../utils/confetti";
import { birthdayData } from "../../data/birthdayData";
import RealisticBirthdayCake from "./RealisticBirthdayCake";

export default function CandlesStage({ onNextStep }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showSmoke, setShowSmoke] = useState(false);
  const [wishUnlocked, setWishUnlocked] = useState(false);
  const { candles, sisterName } = birthdayData;

  const handleBlowCandles = () => {
    if (!candlesLit) return;

    soundFx.playBlowingSound();
    setCandlesLit(false);
    setShowSmoke(true);

    setTimeout(() => {
      triggerSparkleBurst();
      triggerCelebrationConfetti(4500);
      setWishUnlocked(true);
    }, 450);

    setTimeout(() => {
      setShowSmoke(false);
    }, 2200);
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWishUnlocked(false);
    soundFx.playCelebrationMelody();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 pt-20 pb-12 max-w-4xl mx-auto text-center select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100/80 text-rose-700 text-xs sm:text-sm font-bold border border-rose-200/80 mb-2.5 shadow-sm">
          <Gift className="w-4 h-4 text-rose-500" />
          <span>মোমবাতি নেভানোর শুভক্ষণ</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-800">
          {candles.heading}
        </h2>
        <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
          {candles.subtitle}
        </p>
      </motion.div>

      {/* Realistic Cake Stage */}
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mt-6 mb-6 border border-white/90 bg-white/85">
        <div className="flex flex-col items-center justify-center">
          
          {/* Realistic 3D Birthday Cake */}
          <RealisticBirthdayCake
            candlesLit={candlesLit}
            onBlowCandles={handleBlowCandles}
            showSmoke={showSmoke}
          />

          {/* Blow / Relight Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 z-30">
            {candlesLit ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBlowCandles}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white font-bold text-base shadow-xl shadow-pink-500/30 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
              >
                <Wind className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span>{candles.blowButtonText}</span>
              </motion.button>
            ) : (
              <button
                onClick={handleRelight}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 active:scale-95 border border-slate-200 text-xs font-bold shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-pink-500" />
                <span>{candles.relightButtonText}</span>
              </button>
            )}
          </div>

          {/* Wish Unlocked Card */}
          <AnimatePresence>
            {wishUnlocked && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-rose-500/15 border border-pink-300/80 text-center max-w-lg shadow-lg relative overflow-hidden"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  <span>উইশ করা সম্পন্ন! 🎂</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1.5">
                  {candles.wishUnlockedTitle}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {candles.wishUnlockedMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Next Step Action Button */}
      <div className="mt-2">
        <button
          onClick={onNextStep}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 active:scale-95 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-500/25 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
        >
          <span>{candles.nextStepPrompt}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
