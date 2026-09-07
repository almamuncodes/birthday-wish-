"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Flame } from "lucide-react";
import { soundFx } from "../../utils/audioEffects";
import { triggerCelebrationConfetti, triggerSparkleBurst } from "../../utils/confetti";
import { birthdayData } from "../../data/birthdayData";

export default function FireworksStage({ onNextStep }) {
  const [fireworks, setFireworks] = useState([]);
  const { fireworks: fwData, sisterName, englishName } = birthdayData;

  const handleLaunchFirework = (e) => {
    soundFx.playFirework();

    // Get click position relative to container
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const colors = ["#f43f5e", "#ec4899", "#a855f7", "#3b82f6", "#eab308", "#10b981"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const id = Date.now() + Math.random();
    setFireworks((prev) => [...prev, { id, x, y, color: randomColor }]);

    setTimeout(() => {
      setFireworks((prev) => prev.filter((fw) => fw.id !== id));
    }, 1200);
  };

  const handleAutoFireworks = () => {
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        soundFx.playFirework();
        triggerSparkleBurst();
      }, i * 350);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 pt-20 pb-12 max-w-4xl mx-auto text-center select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-100/90 text-indigo-800 text-xs sm:text-sm font-bold border border-indigo-200/80 mb-2.5 shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>আকাশে আলোর মেলা</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-800">
          {fwData.heading}
        </h2>
        <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
          {fwData.subtitle}
        </p>
      </motion.div>

      {/* Interactive Dark Sky Canvas */}
      <div
        onClick={handleLaunchFirework}
        className="w-full h-80 sm:h-96 rounded-3xl p-6 shadow-2xl relative overflow-hidden mt-6 mb-6 border border-slate-700 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center cursor-crosshair"
      >
        {/* Distant Stars in Night Sky */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <span
              key={i}
              style={{
                top: `${(i * 17) % 95}%`,
                left: `${(i * 23) % 95}%`,
                opacity: 0.4 + (i % 5) * 0.12,
              }}
              className="absolute text-white text-[10px] animate-pulse"
            >
              ★
            </span>
          ))}
        </div>

        {/* Central Sparkling Sister Name Banner */}
        <div className="relative z-10 p-5 sm:p-7 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl pointer-events-none text-center max-w-md">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest font-black text-amber-300 mb-1">
            ✨ Glowing in the Sky ✨
          </p>
          <h3 className="text-2xl sm:text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-yellow-200 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">
            {fwData.sparklerText}
          </h3>
          <p className="text-xs sm:text-sm text-pink-200 mt-2 font-medium">
            {fwData.celebrationText}
          </p>
        </div>

        {/* Hint to click */}
        <div className="absolute bottom-3 text-center pointer-events-none">
          <span className="text-[11px] text-slate-400 bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
            👆 আকাশের যেকোনো জায়গায় টাচ করে আতশবাজি ফুটান!
          </span>
        </div>

        {/* Exploding Firework Elements */}
        {fireworks.map((fw) => (
          <div
            key={fw.id}
            style={{ left: fw.x, top: fw.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
          >
            {[...Array(12)].map((_, idx) => {
              const angle = (idx * 30 * Math.PI) / 180;
              const distance = 55;
              const dx = Math.cos(angle) * distance;
              const dy = Math.sin(angle) * distance;

              return (
                <motion.div
                  key={idx}
                  initial={{ x: 0, y: 0, scale: 1.5, opacity: 1 }}
                  animate={{ x: dx, y: dy, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  style={{ backgroundColor: fw.color }}
                  className="absolute w-3 h-3 rounded-full shadow-[0_0_12px_3px] shadow-current"
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Button to Auto-launch grand fireworks */}
      <div className="mb-4">
        <button
          onClick={handleAutoFireworks}
          className="px-6 py-2.5 rounded-full bg-white text-indigo-700 text-xs sm:text-sm font-extrabold border border-indigo-200 hover:bg-indigo-50 shadow-md flex items-center gap-1.5 cursor-pointer mx-auto transition-colors"
        >
          <Flame className="w-4 h-4 text-orange-500" />
          <span>একসাথে অনেক আতশবাজি ফুটান 🎆</span>
        </button>
      </div>

      {/* Next Step Action Button */}
      <div className="mt-2">
        <button
          onClick={onNextStep}
          className="px-9 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 active:scale-95 text-white font-black text-sm sm:text-base shadow-xl shadow-pink-500/30 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
        >
          <span>{fwData.nextStepPrompt}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
