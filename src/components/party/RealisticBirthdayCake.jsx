"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData } from "../../data/birthdayData";

export default function RealisticBirthdayCake({
  candlesLit = true,
  onBlowCandles,
  isCut = false,
  isCutting = false,
  showKnife = false,
  onCutCake,
  showSmoke = false,
}) {
  const { cakePlaqueText, englishName, sisterName } = birthdayData;

  return (
    <div className="relative w-full max-w-[420px] h-[370px] sm:h-[410px] mx-auto flex flex-col items-center justify-end select-none">
      
      {/* 1. CANDLES ON TOP OF THE CAKE */}
      <div className="absolute top-2 sm:top-0 inset-x-0 flex items-end justify-center gap-6 sm:gap-8 z-30 pointer-events-auto">
        {[0, 1, 2].map((idx) => (
          <div key={idx} className="relative flex flex-col items-center">
            {/* Flame / Smoke */}
            <div className="h-10 flex items-center justify-center relative">
              <AnimatePresence>
                {candlesLit ? (
                  <motion.div
                    key="flame"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={onBlowCandles}
                    className="relative flex items-center justify-center cursor-pointer group"
                    title="ফুঁ দিতে ক্লিক করুন"
                  >
                    {/* Inner core blue flame */}
                    <div className="absolute bottom-0 w-2 h-2.5 rounded-full bg-cyan-300 opacity-80" />
                    {/* Main glowing fire */}
                    <div className="w-4 h-7 sm:w-4.5 sm:h-8 rounded-[50%_50%_40%_40%/70%_70%_30%_30%] bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 animate-flame shadow-[0_0_20px_6px_rgba(245,158,11,0.95)]" />
                    {/* Outer ambient glow halo */}
                    <div className="absolute -inset-2 rounded-full bg-amber-400/25 blur-md pointer-events-none group-hover:scale-125 transition-transform" />
                  </motion.div>
                ) : showSmoke ? (
                  <motion.div
                    key="smoke"
                    className="w-3 h-6 rounded-full bg-slate-400/70 blur-xs animate-smoke"
                  />
                ) : null}
              </AnimatePresence>
            </div>

            {/* Candle Wick */}
            <div className="w-[2.5px] h-3 bg-slate-800 rounded-t" />

            {/* Realistic Candle Stick with spiraled pastel stripes */}
            <div
              className={`w-4 rounded-t-sm shadow-md border-t border-l border-white/70 relative overflow-hidden ${
                idx === 1
                  ? "h-20 bg-gradient-to-b from-rose-300 via-pink-400 to-rose-500"
                  : idx === 0
                  ? "h-16 bg-gradient-to-b from-purple-300 via-indigo-400 to-purple-500"
                  : "h-16 bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-400"
              }`}
            >
              {/* Spiral stripes */}
              <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#fff,#fff_4px,transparent_4px,transparent_8px)]" />
              {/* Wax drop detail */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-white/60 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* 2. TOP CAKE TIER (with berries, cream swirls & Name Plaque) */}
      <div className="relative w-56 sm:w-64 z-20 flex flex-col items-center">
        
        {/* Strawberries & Cherries Garnishing */}
        <div className="w-full flex justify-around px-3 -mb-3 z-30 pointer-events-none">
          <span className="text-xl sm:text-2xl filter drop-shadow-md">🍓</span>
          <span className="text-lg sm:text-xl filter drop-shadow-md">🍒</span>
          <span className="text-xl sm:text-2xl filter drop-shadow-md">🍓</span>
          <span className="text-lg sm:text-xl filter drop-shadow-md">🍒</span>
          <span className="text-xl sm:text-2xl filter drop-shadow-md">🍓</span>
        </div>

        {/* Piped cream rosettes on top edge */}
        <div className="w-full flex justify-between px-2 -mb-2 z-20">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full bg-gradient-to-b from-white via-rose-50 to-pink-100 shadow-sm border border-white/90"
            />
          ))}
        </div>

        {/* Top Tier Cylinder Body */}
        <div className="relative w-full h-20 sm:h-22 rounded-2xl bg-gradient-to-b from-rose-100 via-pink-200 to-rose-300 shadow-xl border-t-2 border-white/90 flex flex-col items-center justify-center overflow-hidden">
          {/* Strawberry Ganache Drips */}
          <div className="absolute top-0 inset-x-0 flex justify-around opacity-90">
            {[10, 16, 8, 18, 12, 16, 9].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}px` }}
                className="w-4 rounded-b-full bg-gradient-to-b from-rose-400 to-pink-500 shadow-inner"
              />
            ))}
          </div>

          {/* Golden Chocolate Plaque with Sister's Name: Happy Birthday Fatimatuj Johura */}
          <div className="relative z-10 px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 border border-amber-300 shadow-lg text-center max-w-[90%]">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
            <p className="text-[10px] uppercase font-bold tracking-wider text-amber-200">
              Happy Birthday
            </p>
            <p className="text-xs sm:text-sm font-black tracking-wide text-amber-100 font-serif drop-shadow-sm whitespace-nowrap">
              {englishName}
            </p>
          </div>

          {/* Pearl cream border at base of top tier */}
          <div className="absolute bottom-0 inset-x-0 h-2 flex justify-between px-1">
            {[...Array(14)].map((_, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full bg-white shadow-xs -mb-1"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM CAKE TIER (Wider, rich velvet cream with details) */}
      <div className="relative w-72 sm:w-84 -mt-2 z-15 flex flex-col items-center">
        {/* Piped swirls connecting tiers */}
        <div className="w-full flex justify-between px-3 -mb-2 z-20">
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full bg-gradient-to-b from-white via-pink-100 to-rose-100 shadow-sm"
            />
          ))}
        </div>

        {/* Bottom Tier Cylinder Body */}
        <div className="relative w-full h-24 sm:h-28 rounded-3xl bg-gradient-to-b from-pink-200 via-rose-200 to-purple-200 shadow-2xl border-t border-white/90 flex items-center justify-center overflow-hidden">
          {/* Chocolate Ganache Drips */}
          <div className="absolute top-0 inset-x-0 flex justify-between px-2 opacity-85">
            {[12, 20, 14, 24, 16, 22, 12, 18, 14].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}px` }}
                className="w-5 rounded-b-full bg-gradient-to-b from-amber-900 via-rose-800 to-pink-900 shadow-sm"
              />
            ))}
          </div>

          {/* Decorative Sparkles & Heart Accents */}
          <div className="flex items-center gap-3 text-pink-700/80 font-bold text-xs sm:text-sm">
            <span>✨</span>
            <span className="bg-white/70 px-3 py-1 rounded-full border border-white/80 shadow-xs">
              👑 {sisterName}
            </span>
            <span>✨</span>
          </div>

          {/* Sliced Piece sliding out if cut */}
          <AnimatePresence>
            {isCut && (
              <motion.div
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.8 }}
                animate={{ x: 80, y: -25, opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -right-8 sm:-right-12 top-0 p-3 sm:p-4 rounded-3xl bg-white border-2 border-pink-300 shadow-2xl flex items-center gap-2 z-30"
              >
                <div className="text-3xl">🍰</div>
                <div className="text-left">
                  <p className="text-xs font-black text-rose-600 leading-tight">
                    কেকের স্পেশাল স্লাইস!
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {sisterName} আপুর জন্য 🍓
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cut Slice Line on Cake if cut */}
          {isCut && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              className="absolute inset-y-0 w-1 bg-rose-700/70 shadow-[0_0_10px_rgba(225,29,72,0.9)]"
            />
          )}

          {/* Base border pearls */}
          <div className="absolute bottom-0 inset-x-0 h-2.5 flex justify-between px-2">
            {[...Array(16)].map((_, i) => (
              <span
                key={i}
                className="w-3.5 h-3.5 rounded-full bg-white shadow-xs -mb-1"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4. REALISTIC PORCELAIN & SILVER PEDESTAL CAKE STAND */}
      <div className="w-80 sm:w-96 h-5 rounded-full bg-gradient-to-r from-slate-200 via-white to-slate-200 shadow-xl border border-slate-300/80 -mt-1 z-10 flex items-center justify-center">
        {/* Silver rim shine */}
        <div className="w-full h-[1px] bg-white opacity-80" />
      </div>
      <div className="w-48 sm:w-56 h-4 rounded-b-3xl bg-gradient-to-b from-slate-300 to-slate-400 shadow-md z-5" />

      {/* 5. INTERACTIVE KNIFE (Hovering above cake when showKnife is true) */}
      {showKnife && (
        <motion.div
          animate={
            isCutting
              ? { y: [0, 95], rotate: [25, 0] }
              : !isCut
              ? { y: [0, -12, 0], rotate: [20, 26, 20] }
              : { opacity: 0, scale: 0 }
          }
          transition={
            isCutting
              ? { duration: 0.55, ease: "easeInOut" }
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
          onClick={onCutCake}
          className="absolute top-2 right-6 sm:right-10 z-40 flex flex-col items-center cursor-pointer pointer-events-auto filter drop-shadow-2xl"
          title="কেক কাটতে এখানে ক্লিক করুন"
        >
          {/* Wooden / Gold Handle */}
          <div className="w-4 h-16 rounded-t-lg bg-gradient-to-b from-amber-700 via-yellow-800 to-amber-950 shadow-md border-t border-amber-300" />
          {/* Silver Mirror Blade */}
          <div className="w-6 h-28 bg-gradient-to-b from-slate-100 via-white to-slate-300 shadow-2xl border border-slate-300 rounded-b-[40px_10px]" />
          <span className="text-[10px] font-black bg-rose-500 text-white px-2.5 py-0.5 rounded-full mt-1 shadow-md animate-bounce">
            ছুরি 🔪
          </span>
        </motion.div>
      )}
    </div>
  );
}
