"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Lock, RotateCcw, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";
import { soundFx } from "../../utils/audioEffects";
import { triggerCelebrationConfetti, triggerSparkleBurst } from "../../utils/confetti";
import { birthdayData } from "../../data/birthdayData";

export default function BalloonsStage({ onNextStep }) {
  const { balloons } = birthdayData;
  const [poppedIds, setPoppedIds] = useState(new Set());
  const [lastPoppedWish, setLastPoppedWish] = useState(null);

  const bengaliNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const toBengaliNumber = (num) =>
    String(num).replace(/[0-9]/g, (digit) => bengaliNumbers[Number(digit)] || digit);

  const totalBalloons = balloons.wishes.length;
  const poppedCount = poppedIds.size;
  const isAllPopped = poppedCount === totalBalloons;
  const remainingCount = totalBalloons - poppedCount;

  // Pop a balloon with realistic audio, coordinate-based confetti & unlock animation
  const handlePopBalloon = (e, idx, wish) => {
    if (poppedIds.has(idx)) return;

    // Pop sound
    soundFx.playBalloonPop();

    // Spawn burst confetti at the exact click position
    if (typeof window !== "undefined") {
      const rect = e?.currentTarget?.getBoundingClientRect?.();
      const originX = rect
        ? (rect.left + rect.width / 2) / window.innerWidth
        : 0.5;
      const originY = rect
        ? (rect.top + rect.height / 2) / window.innerHeight
        : 0.5;

      confetti({
        particleCount: 35,
        spread: 65,
        origin: { x: originX, y: originY },
        colors: ["#f472b6", "#c084fc", "#fb7185", "#fde047", "#60a5fa", "#34d399"],
        zIndex: 9999,
      });
    }

    triggerSparkleBurst();

    // Register popped
    const nextSet = new Set([...poppedIds, idx]);
    setPoppedIds(nextSet);
    setLastPoppedWish(wish);

    // If this pop completes all 7
    if (nextSet.size === totalBalloons) {
      setTimeout(() => {
        soundFx.playCelebrationMelody();
        triggerCelebrationConfetti(5000);
      }, 400);
    }
  };

  // Re-inflate balloons if user wants to play again
  const handleResetBalloons = () => {
    setPoppedIds(new Set());
    setLastPoppedWish(null);
    soundFx.playUnlockChime?.();
  };

  // Organic floating settings for 7 balloons to prevent overlap on both desktop & mobile
  const balloonPhysics = [
    { yFloat: [-12, 12, -12], xFloat: [-4, 6, -4], rot: [-3, 3, -3], duration: 3.4, delay: 0 },
    { yFloat: [10, -14, 10], xFloat: [5, -5, 5], rot: [3, -3, 3], duration: 4.0, delay: 0.4 },
    { yFloat: [-15, 10, -15], xFloat: [-5, 5, -5], rot: [-2, 4, -2], duration: 3.6, delay: 0.8 },
    { yFloat: [12, -12, 12], xFloat: [6, -4, 6], rot: [4, -2, 4], duration: 4.2, delay: 0.2 },
    { yFloat: [-10, 14, -10], xFloat: [-4, 4, -4], rot: [-3, 3, -3], duration: 3.8, delay: 0.6 },
    { yFloat: [14, -10, 14], xFloat: [5, -6, 5], rot: [3, -4, 3], duration: 3.5, delay: 1.0 },
    { yFloat: [-14, 12, -14], xFloat: [-6, 5, -6], rot: [-4, 3, -4], duration: 3.9, delay: 0.5 },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between px-3 sm:px-6 pt-20 pb-12 relative overflow-hidden select-none max-w-5xl mx-auto">
      
      {/* 1. Header Section */}
      <div className="text-center z-10 w-full max-w-2xl px-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-700 text-xs sm:text-sm font-bold border border-pink-200/80 mb-2 shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>বেলুন পপিং অ্যাক্টিভিটি</span>
        </motion.div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {balloons.heading}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          {balloons.subtitle}
        </p>

        {/* Dynamic Progress Counter Pill */}
        <div className="mt-3 inline-flex items-center">
          <AnimatePresence mode="wait">
            {!isAllPopped ? (
              <motion.div
                key="counter-ongoing"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="px-4 py-1.5 rounded-full bg-white/90 border border-pink-200/90 text-xs font-bold text-slate-700 shadow-xs flex items-center gap-1.5 backdrop-blur-xs"
              >
                <span>🎈</span>
                <span>
                  {toBengaliNumber(poppedCount)} / {toBengaliNumber(totalBalloons)}{" "}
                  {balloons.poppedCountLabel}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="counter-completed"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-100 via-pink-100 to-purple-100 border border-pink-300 text-xs sm:text-sm font-black text-pink-800 shadow-md flex items-center gap-2"
              >
                <PartyPopper className="w-4 h-4 text-pink-600" />
                <span>{balloons.allUnlockedLabel}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Middle Interactive Floating Balloons Arena */}
      <div className="relative w-full max-w-4xl min-h-[360px] sm:min-h-[400px] flex flex-col items-center justify-center my-4 py-2">
        
        {/* Subtle decorative background sparkles and floaters */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-around opacity-30 text-pink-300">
          <span className="animate-pulse text-sm">✨</span>
          <span className="animate-bounce text-xs">💖</span>
          <span className="animate-pulse text-sm">✨</span>
          <span className="animate-bounce text-xs">🌸</span>
        </div>

        {/* Balloons Floating Field */}
        {!isAllPopped ? (
          <div className="w-full flex flex-wrap justify-center items-center gap-5 sm:gap-8 px-2 sm:px-6">
            {balloons.wishes.map((wish, idx) => {
              const isPopped = poppedIds.has(idx);
              const physics = balloonPhysics[idx % balloonPhysics.length];

              return (
                <AnimatePresence key={wish.id}>
                  {!isPopped ? (
                    <motion.div
                      layout
                      initial={{ y: 50, opacity: 0, scale: 0.5 }}
                      animate={{
                        y: physics.yFloat,
                        x: physics.xFloat,
                        rotate: physics.rot,
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        scale: [1, 1.45, 0],
                        opacity: [1, 0.8, 0],
                        filter: ["blur(0px)", "blur(4px)", "blur(10px)"],
                        transition: { duration: 0.22, ease: "easeOut" },
                      }}
                      transition={{
                        y: {
                          duration: physics.duration,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        x: {
                          duration: physics.duration + 0.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        rotate: {
                          duration: physics.duration + 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        opacity: { duration: 0.4 },
                      }}
                      whileHover={{ scale: 1.12, y: -6 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={(e) => handlePopBalloon(e, idx, wish)}
                      className="cursor-pointer flex flex-col items-center group relative z-20"
                    >
                      {/* Floating Category Mini-Badge */}
                      <div className="absolute -top-3 px-2 py-0.5 rounded-full bg-white/90 shadow-sm border border-slate-200 text-[10px] font-bold text-slate-700 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all flex items-center gap-1 z-30">
                        <span>{wish.icon}</span>
                        <span>#{toBengaliNumber(idx + 1)}</span>
                      </div>

                      {/* 3D Glossy Balloon Body */}
                      <div
                        className={`w-20 h-24 sm:w-24 sm:h-28 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-tr ${wish.color} shadow-xl ${wish.shadow} relative flex items-center justify-center border-t border-l border-white/60 transition-transform`}
                      >
                        {/* Realistic Glossy Curved Highlight */}
                        <div className="absolute top-2.5 left-3.5 w-3.5 h-6 rounded-full bg-white/45 blur-[0.5px] -rotate-25" />
                        
                        {/* Center Icon and pop text */}
                        <div className="flex flex-col items-center justify-center text-white text-center">
                          <span className="text-xl sm:text-2xl filter drop-shadow group-hover:scale-115 transition-transform">
                            {wish.icon}
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-wider text-white/90 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5">
                            ফাটান 💥
                          </span>
                        </div>
                      </div>

                      {/* Balloon Knot */}
                      <div className="w-3.5 h-2 bg-black/25 rounded-b-xs -mt-0.5" />

                      {/* Dangling String */}
                      <div className="w-[1.5px] h-12 sm:h-14 bg-gradient-to-b from-slate-400/80 to-transparent" />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              );
            })}
          </div>
        ) : (
          /* Victory Celebratory Card when all 7 balloons are popped */
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-pink-50/95 via-rose-50/90 to-purple-50/95 border-2 border-pink-200/90 shadow-2xl text-center max-w-md mx-4"
          >
            <div className="text-4xl mb-2 animate-bounce">🎉👑🎈</div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              দারুণ! ৭টি সারপ্রাইজই উন্মোচিত!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              ফাতিমা আপুর জন্য রাখা মনের সব ভালোবাসার কথা নিচে আনলক হয়েছে। এবার জন্মদিনের কেকের টেবিলে যাওয়ার সময়!
            </p>

            <button
              onClick={handleResetBalloons}
              className="mt-4 px-4 py-1.5 rounded-full bg-white border border-pink-200 text-xs font-bold text-pink-600 hover:bg-pink-50 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>আবার বেলুন ফাটান 🎈</span>
            </button>
          </motion.div>
        )}

        {/* Newly Unlocked Wish Spotlight Banner */}
        <AnimatePresence>
          {lastPoppedWish && !isAllPopped && (
            <motion.div
              key={lastPoppedWish.id}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="mt-3 px-4 py-2 rounded-2xl bg-white/95 border border-pink-200 shadow-lg backdrop-blur-sm flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 z-30"
            >
              <span className="text-base">{lastPoppedWish.icon}</span>
              <span className="text-pink-600 font-extrabold">{lastPoppedWish.concept}:</span>
              <span>"{lastPoppedWish.text}"</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Revealed & Locked Messages Section (Pill Chips) */}
      <div className="w-full max-w-3xl mb-6">
        <div className="glass-panel rounded-3xl p-4 sm:p-6 shadow-xl border border-white/90 bg-white/85">
          <div className="text-center mb-3.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              🎁 ভালোবাসার সারপ্রাইজ বার্তাসমূহ ({toBengaliNumber(poppedCount)} / {toBengaliNumber(totalBalloons)} উন্মোচিত)
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center items-center">
            {balloons.wishes.map((wish, idx) => {
              const isUnlocked = poppedIds.has(idx);

              return (
                <AnimatePresence mode="wait" key={wish.id}>
                  {isUnlocked ? (
                    <motion.div
                      key={`unlocked-${wish.id}`}
                      initial={{ scale: 0.8, opacity: 0, y: 8 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold text-slate-800 bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 border border-pink-200/90 flex items-center gap-1.5 shadow-xs"
                    >
                      <span className="text-sm">{wish.icon}</span>
                      <span>{wish.text}</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`locked-${wish.id}`}
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 1 }}
                      className="px-3.5 py-2 rounded-full text-xs font-semibold text-slate-400 bg-slate-50/80 border border-dashed border-pink-200/80 flex items-center gap-1.5 shadow-2xs backdrop-blur-xs select-none"
                    >
                      <Lock className="w-3.5 h-3.5 text-pink-400" />
                      <span>{wish.lockedTitle}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Bottom Action Button */}
      <div className="z-30 w-full flex justify-center">
        {isAllPopped ? (
          <motion.button
            initial={{ scale: 0.95 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNextStep}
            className="px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-extrabold text-sm sm:text-base shadow-2xl shadow-pink-500/40 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
          >
            <span>{balloons.nextStepPrompt}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        ) : (
          <button
            disabled
            className="px-7 sm:px-9 py-3.5 rounded-full bg-slate-200/75 text-slate-400 font-bold text-xs sm:text-sm border border-slate-300/70 shadow-xs flex items-center gap-2 cursor-not-allowed select-none"
          >
            <Lock className="w-4 h-4 text-slate-400" />
            <span>আরও {toBengaliNumber(remainingCount)}টা surprise বাকি 🎈</span>
          </button>
        )}
      </div>
    </div>
  );
}
