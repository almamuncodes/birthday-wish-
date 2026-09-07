"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wind, RotateCcw, Gift, ArrowRight } from "lucide-react";
import { soundFx } from "../utils/audioEffects";
import { triggerSparkleBurst, triggerCelebrationConfetti } from "../utils/confetti";
import { birthdayData } from "../data/birthdayData";

export default function VirtualCakeSurprise({ onNextStep }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showSmoke, setShowSmoke] = useState(false);
  const [wishUnlocked, setWishUnlocked] = useState(false);

  const {
    sectionTitle,
    sectionSubtitle,
    cakeMessage,
    wishUnlockedTitle,
    wishUnlockedMessage,
  } = birthdayData.surpriseCake;

  // Blow candle interaction
  const handleBlowCandles = () => {
    if (!candlesLit) return;

    soundFx.playBlowingSound();
    setCandlesLit(false);
    setShowSmoke(true);

    setTimeout(() => {
      triggerSparkleBurst();
      triggerCelebrationConfetti(4500);
      setWishUnlocked(true);
    }, 400);

    setTimeout(() => {
      setShowSmoke(false);
    }, 2000);
  };

  // Relight candles
  const handleRelight = () => {
    setCandlesLit(true);
    soundFx.playCelebrationMelody();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-20 pb-12 max-w-4xl mx-auto text-center">
      {/* Step Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100/70 text-rose-700 text-xs sm:text-sm font-semibold border border-rose-200/50 mb-3 shadow-sm">
          <Gift className="w-4 h-4 text-rose-500" />
          <span>জন্মদিনের বিশেষ শুভমুহূর্ত</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-800">
          {sectionTitle}
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
          {sectionSubtitle}
        </p>
      </motion.div>

      {/* Main Cake Stage */}
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mt-8 mb-6 border border-white/80 bg-white/80">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400" />

        <div className="flex flex-col items-center justify-center">
          {/* 3D Glass Cake Display */}
          <div className="relative w-72 sm:w-80 h-72 sm:h-80 flex flex-col items-center justify-end pb-8 select-none">
            {/* Candles Layer */}
            <div className="flex items-end justify-center gap-5 sm:gap-6 z-20 mb-[-4px]">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="relative flex flex-col items-center">
                  <div className="h-10 flex items-center justify-center relative">
                    <AnimatePresence>
                      {candlesLit ? (
                        <motion.div
                          key="flame"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="relative flex items-center justify-center cursor-pointer"
                          onClick={handleBlowCandles}
                        >
                          <div className="w-4 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 animate-flame shadow-[0_0_16px_rgba(245,158,11,0.9)]" />
                          <div className="absolute w-8 h-8 rounded-full bg-amber-400/20 blur-sm pointer-events-none" />
                        </motion.div>
                      ) : showSmoke ? (
                        <motion.div
                          key="smoke"
                          className="w-3 h-5 rounded-full bg-slate-300/60 blur-xs animate-smoke"
                        />
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <div className="w-[2px] h-3 bg-slate-600 rounded-t" />

                  <div
                    className={`w-3.5 h-16 rounded-t-sm shadow-md border-t border-white/80 ${
                      idx === 1
                        ? "h-20 bg-gradient-to-b from-pink-300 to-rose-400"
                        : "bg-gradient-to-b from-purple-300 to-indigo-400"
                    }`}
                  >
                    <div className="w-full h-2 bg-white/40 my-2" />
                    <div className="w-full h-2 bg-white/40" />
                  </div>
                </div>
              ))}
            </div>

            {/* Cake Top Layer */}
            <div className="relative w-48 sm:w-56 h-16 rounded-2xl bg-gradient-to-b from-white/95 via-pink-100/90 to-pink-200/90 border border-white/90 shadow-lg flex items-center justify-center z-10">
              <div className="absolute -bottom-2 inset-x-3 flex justify-between px-2">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full bg-pink-200/90 shadow-sm"
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-bold tracking-wide text-rose-600/90">
                {cakeMessage}
              </p>
            </div>

            {/* Cake Bottom Layer */}
            <div className="relative w-64 sm:w-72 h-20 rounded-2xl bg-gradient-to-b from-pink-200/90 via-purple-100/80 to-purple-200/90 border border-white/80 shadow-2xl flex items-center justify-center -mt-2">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xs sm:text-sm">
                    ✨
                  </span>
                ))}
              </div>
            </div>

            {/* Cake Plate Stand */}
            <div className="w-72 sm:w-80 h-4 rounded-full bg-white/80 shadow-md border border-slate-200/60 -mt-1" />
            <div className="w-40 sm:w-44 h-3 rounded-b-xl bg-slate-200/80 shadow-sm" />
          </div>

          {/* Action Button: Blow or Relight */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            {candlesLit ? (
              <button
                onClick={handleBlowCandles}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 active:scale-95 text-white font-semibold text-base shadow-xl shadow-pink-500/30 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
              >
                <Wind className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span>মোমবাতিতে ফুঁ দাও ও উইশ করো! 🎂</span>
              </button>
            ) : (
              <button
                onClick={handleRelight}
                className="px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 active:scale-95 border border-slate-200 text-xs font-semibold shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-pink-500" />
                <span>মোমবাতি আবার জ্বালাও</span>
              </button>
            )}
          </div>

          {/* Unlocked Wish Card */}
          <AnimatePresence>
            {wishUnlocked && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-rose-500/15 border border-pink-300/60 text-center max-w-xl shadow-lg relative overflow-hidden"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  <span>তোমার উইশ ও দোয়া গৃহীত হয়েছে</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                  {wishUnlockedTitle}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {wishUnlockedMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Next Step Action Button */}
      <div className="mt-4">
        <button
          onClick={onNextStep}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 active:scale-95 text-white font-semibold text-sm sm:text-base shadow-xl shadow-pink-500/25 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
        >
          <span>পরবর্তী ধাপ: তুমি কেন সেরা আপু</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
