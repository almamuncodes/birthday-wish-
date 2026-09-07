"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, RotateCcw, PartyPopper, Flame, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import { soundFx } from "../../utils/audioEffects";
import { triggerCelebrationConfetti, triggerSparkleBurst } from "../../utils/confetti";
import { birthdayData } from "../../data/birthdayData";

// Initial set of festive carnival balloons
const initialBalloons = [
  { id: 1, size: "lg", color: "from-pink-400 via-rose-400 to-pink-500", shadow: "shadow-pink-500/30", label: "💖", popText: "Pop! 💥" },
  { id: 2, size: "md", color: "from-purple-400 via-fuchsia-400 to-indigo-500", shadow: "shadow-purple-500/30", label: "✨", popText: "Boom! 🎆" },
  { id: 3, size: "lg", color: "from-amber-400 via-yellow-400 to-orange-500", shadow: "shadow-amber-500/30", label: "🌟", popText: "Yay! 🎉" },
  { id: 4, size: "sm", color: "from-rose-400 via-pink-500 to-red-500", shadow: "shadow-rose-500/30", label: "🌸", popText: "Wow! 🥳" },
  { id: 5, size: "lg", color: "from-emerald-400 via-teal-400 to-cyan-500", shadow: "shadow-emerald-500/30", label: "🎉", popText: "Super! ⚡" },
  { id: 6, size: "md", color: "from-sky-400 via-blue-400 to-indigo-500", shadow: "shadow-sky-500/30", label: "👑", popText: "Bang! 🎈" },
  { id: 7, size: "lg", color: "from-fuchsia-400 via-pink-400 to-purple-600", shadow: "shadow-fuchsia-500/30", label: "🥳", popText: "Awesome! 💖" },
  { id: 8, size: "md", color: "from-rose-400 via-amber-300 to-orange-400", shadow: "shadow-orange-500/30", label: "🎀", popText: "Magic! ✨" },
  { id: 9, size: "sm", color: "from-violet-400 via-purple-500 to-pink-500", shadow: "shadow-purple-500/30", label: "🔥", popText: "Nice! 🚀" },
];

export default function BalloonsStage({ onNextStep }) {
  const { sisterName } = birthdayData;
  const [balloonsList, setBalloonsList] = useState(initialBalloons);
  const [poppedCount, setPoppedCount] = useState(0);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [flyingShards, setFlyingShards] = useState([]);
  const targetPops = 7; // Reach 7 pops to unlock next stage

  const bengaliNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const toBengaliNumber = (num) =>
    String(num).replace(/[0-9]/g, (digit) => bengaliNumbers[Number(digit)] || digit);

  const isTargetAchieved = poppedCount >= targetPops;
  const progressPercent = Math.min(100, Math.round((poppedCount / targetPops) * 100));

  // Pop a balloon with realistic sound, particle shards, coordinate confetti and floating pop badges
  const handlePopBalloon = (e, balloon) => {
    // Sound FX
    soundFx.playBalloonPop();

    // Position coordinates
    const rect = e?.currentTarget?.getBoundingClientRect?.();
    const clientX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const clientY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    // Trigger canvas confetti burst from exact click position
    if (typeof window !== "undefined") {
      confetti({
        particleCount: 35,
        spread: 75,
        origin: {
          x: clientX / window.innerWidth,
          y: clientY / window.innerHeight,
        },
        colors: ["#f472b6", "#c084fc", "#fb7185", "#fde047", "#60a5fa", "#34d399"],
        zIndex: 9999,
      });
    }

    // Add temporary floating pop text
    const textId = Date.now() + Math.random();
    setFloatingTexts((prev) => [
      ...prev,
      { id: textId, x: clientX, y: clientY, text: balloon.popText },
    ]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== textId));
    }, 900);

    // Spawn 6 burst shards flying outward
    const shards = Array.from({ length: 6 }).map((_, i) => {
      const angle = (i * 60 * Math.PI) / 180;
      return {
        id: Math.random(),
        startX: clientX,
        startY: clientY,
        dx: Math.cos(angle) * (50 + Math.random() * 40),
        dy: Math.sin(angle) * (50 + Math.random() * 40),
        color: balloon.color,
      };
    });
    setFlyingShards((prev) => [...prev, ...shards]);
    setTimeout(() => {
      setFlyingShards((prev) => prev.filter((s) => !shards.includes(s)));
    }, 600);

    // Update state
    const newCount = poppedCount + 1;
    setPoppedCount(newCount);
    setBalloonsList((prev) => prev.filter((b) => b.id !== balloon.id));

    // When target achieved for the first time
    if (newCount === targetPops) {
      setTimeout(() => {
        soundFx.playCelebrationMelody();
        triggerCelebrationConfetti(5000);
      }, 300);
    }
  };

  // Re-spawn all balloons to keep popping
  const handleResetBalloons = () => {
    soundFx.playUnlockChime?.();
    triggerSparkleBurst();
    setBalloonsList(
      initialBalloons.map((b) => ({
        ...b,
        id: Date.now() + Math.random(),
      }))
    );
  };

  // Organic physics for floating bobbing motion
  const physicsVariations = [
    { y: [-12, 12, -12], x: [-5, 5, -5], rot: [-3, 3, -3], dur: 3.2, delay: 0 },
    { y: [10, -14, 10], x: [6, -4, 6], rot: [3, -3, 3], dur: 3.8, delay: 0.3 },
    { y: [-14, 10, -14], x: [-4, 6, -4], rot: [-2, 4, -2], dur: 3.5, delay: 0.7 },
    { y: [12, -12, 12], x: [5, -5, 5], rot: [4, -2, 4], dur: 4.1, delay: 0.1 },
    { y: [-10, 14, -10], x: [-6, 4, -6], rot: [-3, 3, -3], dur: 3.6, delay: 0.5 },
    { y: [14, -10, 14], x: [4, -6, 4], rot: [2, -4, 2], dur: 3.9, delay: 0.9 },
    { y: [-15, 12, -15], x: [-5, 5, -5], rot: [-4, 3, -4], dur: 3.4, delay: 0.4 },
    { y: [11, -13, 11], x: [6, -5, 6], rot: [3, -2, 3], dur: 4.0, delay: 0.8 },
    { y: [-13, 13, -13], x: [-4, 4, -4], rot: [-2, 3, -2], dur: 3.7, delay: 0.2 },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between px-3 sm:px-6 pt-20 pb-12 relative overflow-hidden select-none max-w-5xl mx-auto">
      
      {/* 1. Header & Party Energy Status */}
      <div className="text-center z-10 w-full max-w-2xl px-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-700 text-xs sm:text-sm font-bold border border-pink-200/80 mb-2 shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>বার্থডে পার্টি কার্নিভাল • বেলুন পপিং 🎈</span>
        </motion.div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
          রঙিন বেলুন ফাটিয়ে পার্টি শুরু করো! 🎈💥
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          বেলুনগুলোতে ট্যাপ করে ফাটাও আর {sisterName} আপুর জন্মদিনের পার্টি এনার্জি ১০০% পূর্ণ করো!
        </p>

        {/* Party Energy Progress Bar Meter */}
        <div className="mt-4 max-w-md mx-auto p-3.5 rounded-2xl bg-white/90 border border-pink-200/90 shadow-md backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span className="flex items-center gap-1.5">
              <Flame className={`w-4 h-4 ${isTargetAchieved ? "text-amber-500 animate-bounce" : "text-pink-500"}`} />
              <span>পার্টি এনার্জি:</span>
            </span>
            <span className="text-pink-600 font-extrabold">
              {isTargetAchieved ? "১০০% ফুল! 🎉" : `${toBengaliNumber(progressPercent)}%`}
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-3.5 bg-pink-100/70 rounded-full overflow-hidden p-0.5 relative">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 shadow-sm"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 font-medium">
            <span>🎈 ফাটানো হয়েছে: {toBengaliNumber(poppedCount)} টি</span>
            <span>
              {isTargetAchieved
                ? "🎉 লক্ষ্য পূরণ হয়েছে!"
                : `লক্ষ্য: ${toBengaliNumber(targetPops)} টি বেলুন`}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Interactive Balloon Playground Area */}
      <div className="relative w-full max-w-4xl min-h-[420px] sm:min-h-[460px] flex items-center justify-center my-4 py-4 px-2">
        
        {/* Ambient Decorative Floating Particles in the background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-around opacity-40 text-pink-300">
          <span className="animate-pulse text-base">✨</span>
          <span className="animate-bounce text-sm">💖</span>
          <span className="animate-pulse text-base">✨</span>
          <span className="animate-bounce text-sm">🌸</span>
          <span className="animate-pulse text-base">✨</span>
        </div>

        {/* Floating Flying Shards after pop */}
        {flyingShards.map((s) => (
          <motion.div
            key={s.id}
            initial={{ x: s.startX, y: s.startY, opacity: 1, scale: 1 }}
            animate={{
              x: s.startX + s.dx,
              y: s.startY + s.dy,
              opacity: 0,
              scale: 0.2,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed pointer-events-none w-3 h-3 rounded-full bg-gradient-to-tr ${s.color} z-50`}
          />
        ))}

        {/* Floating Pop Text Badges */}
        {floatingTexts.map((ft) => (
          <motion.div
            key={ft.id}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -45, scale: 1.3 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            style={{ left: ft.x - 30, top: ft.y - 40 }}
            className="fixed pointer-events-none text-sm sm:text-base font-black text-pink-600 bg-white/95 px-3 py-1 rounded-full shadow-lg border border-pink-200 z-50 select-none"
          >
            {ft.text}
          </motion.div>
        ))}

        {/* The Balloons Cluster */}
        {balloonsList.length > 0 ? (
          <div className="w-full flex flex-wrap justify-center items-center gap-6 sm:gap-10 px-2 sm:px-6 z-20">
            {balloonsList.map((balloon, idx) => {
              const phys = physicsVariations[idx % physicsVariations.length];
              const sizeClasses =
                balloon.size === "lg"
                  ? "w-24 h-30 sm:w-28 sm:h-34"
                  : balloon.size === "sm"
                  ? "w-18 h-22 sm:w-20 sm:h-25"
                  : "w-20 h-26 sm:w-24 sm:h-30";

              return (
                <motion.div
                  key={balloon.id}
                  layout
                  initial={{ scale: 0, opacity: 0, y: 40 }}
                  animate={{
                    y: phys.y,
                    x: phys.x,
                    rotate: phys.rot,
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{
                    scale: [1, 1.4, 0],
                    opacity: [1, 0.8, 0],
                    transition: { duration: 0.2 },
                  }}
                  transition={{
                    y: { duration: phys.dur, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: phys.dur + 0.5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: phys.dur + 0.3, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 0.4 },
                  }}
                  whileHover={{ scale: 1.15, y: -8 }}
                  whileTap={{ scale: 0.88 }}
                  onClick={(e) => handlePopBalloon(e, balloon)}
                  className="cursor-pointer flex flex-col items-center group relative select-none"
                >
                  {/* Floating Pin/Pop Hint Badge */}
                  <div className="absolute -top-3.5 px-2 py-0.5 rounded-full bg-white/90 shadow-sm border border-slate-200 text-[10px] font-black text-slate-700 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all flex items-center gap-1 z-30">
                    <span>📌</span>
                    <span>ফাটান!</span>
                  </div>

                  {/* 3D Glossy Balloon Body */}
                  <div
                    className={`${sizeClasses} rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-tr ${balloon.color} shadow-2xl ${balloon.shadow} relative flex items-center justify-center border-t border-l border-white/60 transition-transform`}
                  >
                    {/* Glossy Curved Highlight */}
                    <div className="absolute top-2.5 left-3.5 w-3.5 h-7 rounded-full bg-white/45 blur-[0.5px] -rotate-25" />

                    {/* Cute Center Emoji */}
                    <span className="text-xl sm:text-2xl filter drop-shadow group-hover:scale-125 transition-transform text-white">
                      {balloon.label}
                    </span>
                  </div>

                  {/* Balloon Knot */}
                  <div className="w-3.5 h-2 bg-black/25 rounded-b-xs -mt-0.5" />

                  {/* Dangling String with subtle wave */}
                  <div className="w-[1.5px] h-12 sm:h-16 bg-gradient-to-b from-slate-400/80 to-transparent" />
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* When all balloons on the screen are popped */
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-tr from-pink-50/95 via-rose-50/90 to-purple-50/95 border-2 border-pink-300 shadow-2xl text-center max-w-md mx-4 z-30"
          >
            <div className="text-5xl mb-3 animate-bounce">🎉👑🎈</div>
            <h3 className="text-2xl font-black text-slate-800">
              সবগুলো বেলুন ফাটিয়ে শেষ!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              পার্টি এনার্জি এখন ভরপুর! এবার কেকের টেবিলে গিয়ে আপুর কেক কাটার উৎসব শুরু করো!
            </p>

            <button
              onClick={handleResetBalloons}
              className="mt-5 px-5 py-2.5 rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-xs sm:text-sm font-bold text-pink-600 flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>আরও বেলুন ফোটাও 🎈</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* 3. Re-inflate Floating Balloons Button (always accessible) */}
      {balloonsList.length > 0 && (
        <div className="mb-4 z-20">
          <button
            onClick={handleResetBalloons}
            className="px-4 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-pink-600 border border-slate-200 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-pink-500" />
            <span>নতুন বেলুন আনো 🎈</span>
          </button>
        </div>
      )}

      {/* 4. Bottom Next Step Action Button */}
      <div className="z-30 w-full flex justify-center mt-2">
        {isTargetAchieved ? (
          <motion.button
            initial={{ scale: 0.95 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNextStep}
            className="px-9 sm:px-11 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-extrabold text-sm sm:text-base shadow-2xl shadow-pink-500/40 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
          >
            <span>পরবর্তী ধাপ: কেকের টেবিলে চলো 🎂 ➔</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        ) : (
          <button
            disabled
            className="px-8 sm:px-10 py-3.5 rounded-full bg-slate-200/80 text-slate-400 font-bold text-xs sm:text-sm border border-slate-300/70 shadow-xs flex items-center gap-2 cursor-not-allowed select-none"
          >
            <span>আরেকটু বেলুন ফাটাও 🎈 (আর {toBengaliNumber(targetPops - poppedCount)}টি বাকি)</span>
          </button>
        )}
      </div>
    </div>
  );
}
