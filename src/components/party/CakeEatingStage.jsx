"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowRight, Utensils, Smile } from "lucide-react";
import { soundFx } from "../../utils/audioEffects";
import { triggerCelebrationConfetti, triggerSparkleBurst } from "../../utils/confetti";
import { birthdayData } from "../../data/birthdayData";

export default function CakeEatingStage({ onNextStep }) {
  const [isEating, setIsEating] = useState(false);
  const [bitesTaken, setBitesTaken] = useState(1);
  const { sisterName, englishName } = birthdayData;

  const handleFeedCake = () => {
    setIsEating(true);
    soundFx.playEatingSound();
    triggerSparkleBurst();
    setBitesTaken((prev) => prev + 1);

    setTimeout(() => {
      setIsEating(false);
    }, 2200);
  };

  useEffect(() => {
    // Auto-feed first bite when entering stage
    const timer = setTimeout(() => {
      handleFeedCake();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 pt-20 pb-12 max-w-4xl mx-auto text-center select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-700 text-xs sm:text-sm font-bold border border-pink-200/80 mb-2.5 shadow-sm">
          <Smile className="w-4 h-4 text-pink-500" />
          <span>আপুকে কেক খাওয়ানোর সুন্দর মুহূর্ত</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-800">
          কেক খাওয়ার মিষ্টি পর্ব 🍰😋
        </h2>
        <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
          {sisterName} আপুকে এক টুকরো মিষ্টি কেক মুখে তুলে খাইয়ে দাও!
        </p>
      </motion.div>

      {/* Main Character Stage Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mt-6 mb-6 border border-white/90 bg-white/90 flex flex-col items-center"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400" />

        {/* Speech Bubble Above Girl */}
        <motion.div
          animate={isEating ? { scale: [1, 1.04, 1], y: [0, -3, 0] } : {}}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-50 via-white to-purple-50 shadow-md border border-pink-200 text-center max-w-[340px]"
        >
          <p className="text-xs sm:text-sm font-extrabold text-pink-700 leading-snug">
            {isEating
              ? "উম্মম্ম! কেকটা ভীষণ মিষ্টি আর ইয়াম্মি হয়েছে! থ্যাংক ইউ সো মাচ! 😋🍰💖"
              : `ওয়াও! কেকটা অনেক অনেক টেস্টি! আরেক টুকরো খাবো! 🥰`}
          </p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-b border-r border-pink-200 rotate-45" />
        </motion.div>

        {/* Beautiful Illustrated Character */}
        <div className="relative w-56 h-60 sm:w-64 sm:h-68 flex items-center justify-center my-2">
          
          {/* Floating Emoji Reactions when eating */}
          <AnimatePresence>
            {isEating && (
              <>
                <motion.span
                  initial={{ y: 0, opacity: 1, scale: 0.6 }}
                  animate={{ y: -60, opacity: 0, scale: 1.4 }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="absolute -top-4 -left-4 text-3xl z-30"
                >
                  💖
                </motion.span>
                <motion.span
                  initial={{ y: 0, opacity: 1, scale: 0.6 }}
                  animate={{ y: -70, opacity: 0, scale: 1.5 }}
                  transition={{ duration: 1.6, delay: 0.2, repeat: Infinity }}
                  className="absolute -top-8 right-0 text-3xl z-30"
                >
                  ✨
                </motion.span>
                <motion.span
                  initial={{ y: 0, opacity: 1, scale: 0.6 }}
                  animate={{ y: -50, opacity: 0, scale: 1.3 }}
                  transition={{ duration: 1.3, delay: 0.5, repeat: Infinity }}
                  className="absolute top-10 -right-6 text-2xl z-30"
                >
                  🥰
                </motion.span>
              </>
            )}
          </AnimatePresence>

          {/* High Quality Vector Character */}
          <svg
            viewBox="0 0 240 260"
            className="w-full h-full filter drop-shadow-2xl select-none"
          >
            {/* Background Soft Halo */}
            <circle cx="120" cy="130" r="105" fill="#fdf2f8" opacity="0.8" />

            {/* Hair Back Layers */}
            <ellipse cx="120" cy="135" rx="72" ry="76" fill="#3b2112" />
            <path
              d="M55 140 Q38 200 48 230 Q65 235 78 200 Z"
              fill="#3b2112"
            />
            <path
              d="M185 140 Q202 200 192 230 Q175 235 162 200 Z"
              fill="#3b2112"
            />

            {/* Shoulders & Pretty Pink Party Dress */}
            <path
              d="M60 255 Q120 230 180 255 Q185 260 55 260 Z"
              fill="#ec4899"
            />
            <path
              d="M95 240 Q120 250 145 240 Z"
              fill="#fbcfe8"
            />
            {/* Pearl Necklace */}
            <circle cx="106" cy="236" r="3" fill="#ffffff" />
            <circle cx="113" cy="239" r="3.5" fill="#ffffff" />
            <circle cx="120" cy="240" r="4" fill="#ffffff" />
            <circle cx="127" cy="239" r="3.5" fill="#ffffff" />
            <circle cx="134" cy="236" r="3" fill="#ffffff" />

            {/* Neck */}
            <rect x="110" y="175" width="20" height="25" fill="#fde68a" rx="8" />

            {/* Face */}
            <ellipse cx="120" cy="130" rx="55" ry="54" fill="#fde68a" />
            <ellipse cx="120" cy="132" rx="53" ry="52" fill="#fed7aa" />

            {/* Soft Rosy Blushing Cheeks */}
            <ellipse
              cx="86"
              cy="148"
              rx="12"
              ry="7"
              fill="#fb7185"
              opacity={isEating ? "0.9" : "0.6"}
            />
            <ellipse
              cx="154"
              cy="148"
              rx="12"
              ry="7"
              fill="#fb7185"
              opacity={isEating ? "0.9" : "0.6"}
            />

            {/* Eyes */}
            {isEating ? (
              /* Happy Closed Curved Eyes (^‿^) */
              <g stroke="#3b2112" strokeWidth="4" strokeLinecap="round" fill="none">
                <path d="M82 128 Q94 116 106 128" />
                <path d="M134 128 Q146 116 158 128" />
              </g>
            ) : (
              /* Big Sparkling Joyful Eyes */
              <g>
                <ellipse cx="94" cy="125" rx="9" ry="11" fill="#3b2112" />
                <circle cx="91" cy="121" r="3.5" fill="#ffffff" />
                <circle cx="97" cy="128" r="2" fill="#ffffff" />
                <ellipse cx="146" cy="125" rx="9" ry="11" fill="#3b2112" />
                <circle cx="143" cy="121" r="3.5" fill="#ffffff" />
                <circle cx="149" cy="128" r="2" fill="#ffffff" />
                {/* Eyelashes */}
                <path
                  d="M84 118 Q94 113 104 116"
                  stroke="#3b2112"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M136 116 Q146 113 156 118"
                  stroke="#3b2112"
                  strokeWidth="3"
                  fill="none"
                />
              </g>
            )}

            {/* Mouth */}
            {isEating ? (
              /* Chewing Nom-Nom Mouth */
              <ellipse cx="120" cy="158" rx="8" ry="9" fill="#e11d48">
                <animate
                  attributeName="ry"
                  values="9;5;10;6;9"
                  dur="0.55s"
                  repeatCount="indefinite"
                />
              </ellipse>
            ) : (
              /* Sweet Big Smile */
              <path
                d="M108 152 Q120 172 132 152"
                stroke="#e11d48"
                strokeWidth="4"
                fill="#fda4af"
                strokeLinecap="round"
              />
            )}

            {/* Front Hair Bangs */}
            <path
              d="M68 110 Q120 85 172 110 Q174 130 168 148 Q162 105 120 102 Q78 105 72 148 Z"
              fill="#3b2112"
            />

            {/* Royal Princess Crown 👑 */}
            <g transform="translate(86, 50)">
              <path
                d="M0 30 L12 6 L34 22 L56 6 L68 30 Z"
                fill="#f59e0b"
                stroke="#d97706"
                strokeWidth="2.5"
              />
              <circle cx="12" cy="6" r="4" fill="#ef4444" />
              <circle cx="34" cy="22" r="4.5" fill="#3b82f6" />
              <circle cx="56" cy="6" r="4" fill="#10b981" />
            </g>

            {/* Hand holding Dessert Spoon with Cake */}
            <g
              transform={
                isEating
                  ? "translate(122, 154) scale(0.95)"
                  : "translate(142, 178) scale(1)"
              }
              className="transition-transform duration-500"
            >
              {/* Silver Spoon Handle */}
              <line
                x1="0"
                y1="30"
                x2="0"
                y2="-6"
                stroke="#cbd5e1"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Spoon Bowl */}
              <ellipse cx="0" cy="-14" rx="7" ry="9" fill="#cbd5e1" />
              {/* Delicious Pink Cake Bite on Spoon */}
              <polygon points="-8,-24 8,-24 0,-14" fill="#fb7185" />
              {/* Red Strawberry Topping on spoon */}
              <circle cx="0" cy="-24" r="3.5" fill="#e11d48" />
            </g>

            {/* Dessert Plate with remaining Cake Slice held in front */}
            <g transform="translate(70, 215)">
              {/* White Porcelain Plate */}
              <ellipse cx="50" cy="15" rx="42" ry="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              {/* Cake Slice on Plate */}
              <polygon points="35,14 65,14 50,-2" fill="#f472b6" />
              <polygon points="40,14 60,14 50,2" fill="#fda4af" />
              {/* Strawberry on top of cake slice */}
              <circle cx="50" cy="-2" r="4" fill="#ef4444" />
            </g>
          </svg>
        </div>

        {/* Sister Name Badge */}
        <div className="mt-2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-xs sm:text-sm font-black text-pink-700 shadow-xs">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>{sisterName} • কেক খাচ্ছে 🍰</span>
        </div>

        {/* Action: Feed another bite */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleFeedCake}
          disabled={isEating}
          className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-pink-500/25 flex items-center gap-2 cursor-pointer transition-all"
        >
          <Utensils className="w-4 h-4" />
          <span>আরেক চামচ কেক খাওয়ান 🍰</span>
        </motion.button>
      </motion.div>

      {/* Next Step Action Button: Goes directly to Gift Stage */}
      <div className="mt-2">
        <button
          onClick={onNextStep}
          className="px-9 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 active:scale-95 text-white font-black text-sm sm:text-base shadow-xl shadow-pink-500/30 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
        >
          <span>পরবর্তী ধাপ: উপহারের বক্স খুলুন 🎁</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
