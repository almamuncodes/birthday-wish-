"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Utensils } from "lucide-react";
import { soundFx } from "../../utils/audioEffects";
import { triggerSparkleBurst } from "../../utils/confetti";
import { birthdayData } from "../../data/birthdayData";

export default function GirlEatingCake({ autoFeed = true }) {
  const [isEating, setIsEating] = useState(false);
  const [bitesCount, setBitesCount] = useState(1);
  const { sisterName, englishName } = birthdayData;

  const handleTakeBite = () => {
    setIsEating(true);
    soundFx.playEatingSound();
    triggerSparkleBurst();
    setBitesCount((prev) => prev + 1);

    setTimeout(() => {
      setIsEating(false);
    }, 2400);
  };

  useEffect(() => {
    if (autoFeed) {
      const timer = setTimeout(() => {
        handleTakeBite();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [autoFeed]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto my-6 p-6 rounded-3xl bg-gradient-to-b from-pink-50/95 to-purple-50/90 border-2 border-pink-200/90 shadow-2xl relative overflow-hidden flex flex-col items-center select-none"
    >
      {/* Background Soft Glow */}
      <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-pink-300/30 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-purple-300/30 blur-2xl pointer-events-none" />

      {/* Speech Bubble Above Girl */}
      <motion.div
        animate={isEating ? { scale: [1, 1.05, 1], y: [0, -3, 0] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative mb-3 px-5 py-2.5 rounded-2xl bg-white shadow-md border border-pink-200 text-center max-w-[320px]"
      >
        <p className="text-xs sm:text-sm font-extrabold text-pink-700 leading-snug">
          {isEating
            ? "উম্মম্ম! কেকটা অনেক অনেক ইয়াম্মি হয়েছে! থ্যাংক ইউ সো মাচ! 😋🍰💖"
            : `ওয়াও! কেকটা অসাধারণ মিষ্টি হয়েছে! থ্যাংকস এ লট! 🥰`}
        </p>
        {/* Speech Bubble Arrow pointing down */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-pink-200 rotate-45" />
      </motion.div>

      {/* Cute Animated Girl Character SVG */}
      <div className="relative w-44 h-48 sm:w-48 sm:h-52 flex items-center justify-center">
        
        {/* Floating Hearts & Stars when eating */}
        {isEating && (
          <>
            <motion.span
              initial={{ y: 0, opacity: 1, scale: 0.5 }}
              animate={{ y: -50, opacity: 0, scale: 1.3 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-4 -left-2 text-2xl"
            >
              💖
            </motion.span>
            <motion.span
              initial={{ y: 0, opacity: 1, scale: 0.5 }}
              animate={{ y: -60, opacity: 0, scale: 1.4 }}
              transition={{ duration: 1.8, delay: 0.3, repeat: Infinity }}
              className="absolute -top-6 right-2 text-2xl"
            >
              ✨
            </motion.span>
            <motion.span
              initial={{ y: 0, opacity: 1, scale: 0.5 }}
              animate={{ y: -45, opacity: 0, scale: 1.2 }}
              transition={{ duration: 1.4, delay: 0.6, repeat: Infinity }}
              className="absolute top-8 -right-4 text-xl"
            >
              🥰
            </motion.span>
          </>
        )}

        <svg
          viewBox="0 0 200 220"
          className="w-full h-full filter drop-shadow-xl"
        >
          {/* Hair back layer */}
          <ellipse cx="100" cy="115" rx="60" ry="62" fill="#3d2314" />
          <path
            d="M50 120 Q35 170 42 195 Q55 200 65 170 Z"
            fill="#3d2314"
          />
          <path
            d="M150 120 Q165 170 158 195 Q145 200 135 170 Z"
            fill="#3d2314"
          />

          {/* Shoulders & Dress */}
          <path
            d="M60 215 Q100 195 140 215 Q145 220 55 220 Z"
            fill="#f472b6"
          />
          <path
            d="M85 200 Q100 208 115 200 Z"
            fill="#fbcfe8"
          />

          {/* Neck */}
          <rect x="92" y="148" width="16" height="20" fill="#fed7aa" rx="6" />

          {/* Face */}
          <ellipse cx="100" cy="110" rx="46" ry="46" fill="#fde68a" />
          <ellipse cx="100" cy="112" rx="44" ry="43" fill="#fed7aa" />

          {/* Cheeks blush */}
          <ellipse
            cx="72"
            cy="124"
            rx="9"
            ry="6"
            fill="#fb7185"
            opacity={isEating ? "0.85" : "0.55"}
          />
          <ellipse
            cx="128"
            cy="124"
            rx="9"
            ry="6"
            fill="#fb7185"
            opacity={isEating ? "0.85" : "0.55"}
          />

          {/* Eyes (Happy closed curves or sparkles) */}
          {isEating ? (
            /* Happy curved eyes (^‿^) */
            <g stroke="#3d2314" strokeWidth="3.5" strokeLinecap="round" fill="none">
              <path d="M68 108 Q78 98 88 108" />
              <path d="M112 108 Q122 98 132 108" />
            </g>
          ) : (
            /* Big sparkling joyful eyes */
            <g>
              <ellipse cx="78" cy="106" rx="7" ry="8.5" fill="#3d2314" />
              <circle cx="76" cy="103" r="3" fill="#ffffff" />
              <circle cx="81" cy="109" r="1.5" fill="#ffffff" />
              <ellipse cx="122" cy="106" rx="7" ry="8.5" fill="#3d2314" />
              <circle cx="120" cy="103" r="3" fill="#ffffff" />
              <circle cx="125" cy="109" r="1.5" fill="#ffffff" />
              {/* Eyelashes */}
              <path
                d="M71 100 Q78 96 85 99"
                stroke="#3d2314"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M115 99 Q122 96 129 100"
                stroke="#3d2314"
                strokeWidth="2.5"
                fill="none"
              />
            </g>
          )}

          {/* Mouth (Chewing or big happy smile) */}
          {isEating ? (
            /* Chewing munching mouth */
            <ellipse
              cx="100"
              cy="133"
              rx="6"
              ry="7"
              fill="#e11d48"
            >
              <animate
                attributeName="ry"
                values="7;4;8;5;7"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </ellipse>
          ) : (
            /* Sweet open smile */
            <path
              d="M90 128 Q100 144 110 128"
              stroke="#e11d48"
              strokeWidth="3.5"
              fill="#fda4af"
              strokeLinecap="round"
            />
          )}

          {/* Front Hair & Bangs */}
          <path
            d="M58 92 Q100 70 142 92 Q144 110 138 125 Q135 90 100 86 Q65 90 62 125 Z"
            fill="#3d2314"
          />

          {/* Birthday Crown 👑 on head */}
          <g transform="translate(72, 42)">
            <path
              d="M0 25 L10 5 L28 18 L46 5 L56 25 Z"
              fill="#f59e0b"
              stroke="#d97706"
              strokeWidth="2"
            />
            {/* Jewels on crown */}
            <circle cx="10" cy="5" r="3" fill="#ef4444" />
            <circle cx="28" cy="18" r="3.5" fill="#3b82f6" />
            <circle cx="46" cy="5" r="3" fill="#10b981" />
          </g>

          {/* Hand holding fork with cake slice */}
          <g
            transform={
              isEating
                ? "translate(102, 130) scale(0.95)"
                : "translate(118, 150) scale(1)"
            }
            className="transition-transform duration-500"
          >
            {/* Fork */}
            <line
              x1="0"
              y1="25"
              x2="0"
              y2="-8"
              stroke="#94a3b8"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M-4 -8 L-4 -18 M0 -8 L0 -19 M4 -8 L4 -18"
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Cake bite on fork */}
            <polygon
              points="-8,-28 8,-28 0,-18"
              fill="#fb7185"
            />
            <circle cx="0" cy="-28" r="3" fill="#ef4444" />
          </g>
        </svg>
      </div>

      {/* Sister Name Label */}
      <div className="mt-1 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-pink-200 text-xs font-black text-pink-700 shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        <span>{sisterName} (কেক খাচ্ছে 🍰)</span>
      </div>

      {/* Button to feed another bite */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleTakeBite}
        disabled={isEating}
        className="mt-3.5 px-5 py-2 rounded-full bg-white hover:bg-pink-50 text-pink-600 border border-pink-300 text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors"
      >
        <Utensils className="w-3.5 h-3.5" />
        <span>আরেকটু কেক খাওয়ান 😋</span>
      </motion.button>
    </motion.div>
  );
}
