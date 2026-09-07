"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Sparkles, ArrowRight, PartyPopper } from "lucide-react";
import { soundFx } from "../../utils/audioEffects";
import { triggerCelebrationConfetti } from "../../utils/confetti";
import { birthdayData } from "../../data/birthdayData";

export default function LightsStage({ onNextStep }) {
  const [isLightOn, setIsLightOn] = useState(false);
  const { lights, sisterName } = birthdayData;

  const handleToggleLight = () => {
    soundFx.playSwitchClick();
    setIsLightOn(true);
    setTimeout(() => {
      triggerCelebrationConfetti(5500);
    }, 200);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center relative transition-colors duration-1000 px-4 sm:px-6 pt-16 pb-12 select-none overflow-hidden ${
        isLightOn
          ? "bg-gradient-to-b from-pink-100/90 via-purple-50/80 to-amber-50/70"
          : "bg-slate-950"
      }`}
    >
      {/* Real Colorful Hanging Balloons from ceiling (visible when light is ON) */}
      <AnimatePresence>
        {isLightOn && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-0 inset-x-0 flex justify-around px-2 sm:px-6 pointer-events-none z-20 overflow-hidden"
          >
            {[
              { color: "from-pink-400 to-rose-500", stringH: "h-20 sm:h-24", rot: [-4, 4, -4], dur: 3.2 },
              { color: "from-purple-400 to-indigo-500", stringH: "h-14 sm:h-18", rot: [4, -4, 4], dur: 3.8 },
              { color: "from-amber-300 to-orange-400", stringH: "h-24 sm:h-30", rot: [-3, 3, -3], dur: 3.5 },
              { color: "from-rose-400 to-pink-500", stringH: "h-16 sm:h-20", rot: [5, -5, 5], dur: 4.1 },
              { color: "from-emerald-300 to-teal-400", stringH: "h-22 sm:h-28", rot: [-4, 4, -4], dur: 3.6 },
              { color: "from-sky-300 to-blue-400", stringH: "h-14 sm:h-18", rot: [3, -3, 3], dur: 3.9 },
              { color: "from-fuchsia-400 to-purple-600", stringH: "h-20 sm:h-26", rot: [-5, 5, -5], dur: 3.4 },
            ].map((balloon, i) => (
              <motion.div
                key={i}
                animate={{
                  rotate: balloon.rot,
                  y: [-3, 3, -3],
                }}
                transition={{
                  duration: balloon.dur,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center origin-top"
              >
                {/* Long string reaching down from ceiling so balloons hang safely below header */}
                <div className={`w-[1px] ${balloon.stringH} bg-slate-400/50`} />
                {/* Knot */}
                <div className="w-2 h-1 bg-black/30 rounded-t-xs" />
                {/* 3D Glossy Balloon Body */}
                <div
                  className={`w-7 h-9 sm:w-9 sm:h-12 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-tr ${balloon.color} shadow-lg relative flex items-center justify-center border-t border-l border-white/60 -mt-0.5`}
                >
                  {/* Glossy curved highlight */}
                  <div className="absolute top-1.5 left-1.5 w-1.5 h-3.5 rounded-full bg-white/50 blur-[0.3px] -rotate-25" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating party flags / Bunting (placed cleanly below header, when light is ON) */}
      <AnimatePresence>
        {isLightOn && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="absolute top-24 sm:top-28 inset-x-0 flex justify-center gap-1 sm:gap-1.5 px-2 pointer-events-none z-10"
          >
            {["শু", "ভ", " ", "জ", "ন্ম", "দি", "ন", " ", "ফা", "তে", "মা", " ", "আ", "পু", "!", "👑"].map(
              (char, idx) => (
                <motion.span
                  key={idx}
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 2,
                    delay: idx * 0.08,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-b-lg sm:rounded-b-xl text-[11px] sm:text-xs md:text-sm font-black shadow-sm ${
                    char === " "
                      ? "w-1 sm:w-2"
                      : idx % 3 === 0
                      ? "bg-pink-500 text-white"
                      : idx % 3 === 1
                      ? "bg-purple-500 text-white"
                      : "bg-amber-400 text-slate-900"
                  }`}
                >
                  {char}
                </motion.span>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Stage: Switch or Celebration Banner */}
      <div className="relative z-30 max-w-xl mx-auto text-center flex flex-col items-center">
        {!isLightOn ? (
          /* DARK ROOM SWITCH */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            {/* Pulsing Lightbulb Icon */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 20px rgba(251,191,36,0.3)",
                  "0 0 45px rgba(251,191,36,0.7)",
                  "0 0 20px rgba(251,191,36,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-900 flex items-center justify-center mb-6 cursor-pointer"
              onClick={handleToggleLight}
            >
              <Lightbulb className="w-12 h-12 sm:w-14 sm:h-14 fill-slate-900" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              রুমটা একদম অন্ধকার... 🚪
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
              {lights.darkSubtitle}
            </p>

            {/* Glowing Big Switch Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleLight}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-yellow-200 text-slate-900 font-extrabold text-base sm:text-lg shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center gap-2.5 cursor-pointer transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 text-slate-900" />
              <span>{lights.switchPrompt}</span>
            </motion.button>
          </motion.div>
        ) : (
          /* LIGHT IS ON - CELEBRATION */
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center mt-14 sm:mt-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-600 border border-pink-200/80 text-xs sm:text-sm font-bold mb-4 shadow-sm">
              <PartyPopper className="w-4 h-4 text-pink-500" />
              <span>পার্টি রুমের বাতি জ্বলে উঠেছে! 💡✨</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-800 tracking-tight leading-[1.2]">
              {lights.partyBanner}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium max-w-lg mx-auto leading-relaxed">
              {lights.lightOnSubtitle}
            </p>

            {/* Next Step Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-10"
            >
              <button
                onClick={onNextStep}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 active:scale-95 text-white font-bold text-base sm:text-lg shadow-xl shadow-pink-500/30 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
              >
                <span>{lights.nextStepPrompt}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
