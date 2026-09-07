"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RotateCcw, Trophy, Award, Gift } from "lucide-react";
import { soundFx } from "../../utils/audioEffects";
import { triggerCelebrationConfetti, triggerSparkleBurst } from "../../utils/confetti";
import { birthdayData } from "../../data/birthdayData";

export default function SpinWheelStage({ onNextStep }) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonVoucher, setWonVoucher] = useState(null);
  const { spinWheel, sisterName } = birthdayData;

  const segmentAngle = 360 / spinWheel.vouchers.length;

  const handleSpinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonVoucher(null);

    // Random winner index
    const winningIdx = Math.floor(Math.random() * spinWheel.vouchers.length);
    // At least 4 full turns + target angle to land under top pointer (270 deg)
    const extraRotations = 360 * 5;
    const targetAngle = extraRotations + (360 - winningIdx * segmentAngle) - segmentAngle / 2;

    // Ticking audio while spinning
    let tickInterval = setInterval(() => {
      soundFx.playWheelTick();
    }, 120);

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      clearInterval(tickInterval);
    }, 2800);

    setTimeout(() => {
      setIsSpinning(false);
      setWonVoucher(spinWheel.vouchers[winningIdx]);
      triggerSparkleBurst();
      triggerCelebrationConfetti(5000);
      soundFx.playCelebrationMelody();
    }, 3800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 pt-20 pb-12 max-w-4xl mx-auto text-center select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/90 text-amber-800 text-xs sm:text-sm font-bold border border-amber-200/80 mb-2.5 shadow-sm">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>ম্যাজিক ভাগ্যের খেলা</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-800">
          {spinWheel.heading}
        </h2>
        <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
          {spinWheel.subtitle}
        </p>
      </motion.div>

      {/* Wheel Stage Container */}
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mt-6 mb-6 border border-white/90 bg-white/85 flex flex-col items-center">
        
        {/* Top Pointer Indicator Arrow */}
        <div className="relative z-30 -mb-5 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[26px] border-t-rose-600 filter drop-shadow-md" />
        </div>

        {/* The Spinning Wheel */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-tr from-amber-400 via-pink-400 to-purple-500 shadow-2xl flex items-center justify-center border-4 border-white">
          <motion.div
            style={{ rotate: rotation }}
            transition={{
              duration: 3.8,
              ease: [0.25, 0.1, 0.25, 1], // Realistic deceleration
            }}
            className="w-full h-full rounded-full relative overflow-hidden bg-white"
          >
            {/* 6 Wheel Segments */}
            {spinWheel.vouchers.map((v, i) => {
              const bgColors = [
                "#f43f5e",
                "#8b5cf6",
                "#06b6d4",
                "#10b981",
                "#f59e0b",
                "#ec4899",
              ];
              const angle = i * segmentAngle;

              return (
                <div
                  key={v.id}
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "50% 50%",
                    clipPath: "polygon(50% 50%, 0 0, 100% 0)",
                    backgroundColor: bgColors[i % bgColors.length],
                  }}
                  className="absolute inset-0 flex items-start justify-center pt-3 text-white"
                >
                  <span className="text-xs sm:text-sm font-black tracking-wide drop-shadow-sm rotate-90 mt-4">
                    🎁 #{i + 1}
                  </span>
                </div>
              );
            })}

            {/* Central Wheel Hub */}
            <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white shadow-xl border-4 border-amber-300 flex items-center justify-center z-20">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
          </motion.div>
        </div>

        {/* Spin Button */}
        <div className="mt-7 z-30">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleSpinWheel}
            disabled={isSpinning}
            className="px-9 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-orange-500/35 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
          >
            <span>{isSpinning ? "চাকা ঘুরছে... 🎡" : spinWheel.spinButtonText}</span>
          </motion.button>
        </div>

        {/* Winning Voucher Ticket Popup */}
        <AnimatePresence>
          {wonVoucher && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-50 via-pink-50 to-purple-50 border-2 border-amber-300 shadow-xl max-w-md w-full relative overflow-hidden"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/90 text-amber-900 text-xs font-black mb-2">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>{wonVoucher.badge}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-1 leading-snug">
                🎉 অভিনন্দন {sisterName}!
              </h3>
              <p className="text-base sm:text-lg font-extrabold text-pink-600 mt-2 leading-relaxed">
                "{wonVoucher.title}"
              </p>
              <p className="text-[11px] text-slate-500 mt-2">
                (এই ভাউচারটি আজীবন বৈধ থাকবে! 💖)
              </p>

              <button
                onClick={handleSpinWheel}
                className="mt-3.5 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 mx-auto cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-pink-500" />
                <span>আবার ঘুরিয়ে দেখুন</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Next Step Action Button */}
      <div className="mt-2">
        <button
          onClick={onNextStep}
          className="px-9 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 active:scale-95 text-white font-black text-sm sm:text-base shadow-xl shadow-pink-500/30 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
        >
          <span>{spinWheel.nextStepPrompt}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
