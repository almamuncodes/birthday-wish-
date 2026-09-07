"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Utensils, ArrowRight, Volume2, Music, Sparkles } from "lucide-react";
import { soundFx } from "../../utils/audioEffects";
import { triggerCelebrationConfetti, triggerSparkleBurst } from "../../utils/confetti";
import { birthdayData } from "../../data/birthdayData";
import RealisticBirthdayCake from "./RealisticBirthdayCake";

export default function CakeCutStage({ onNextStep }) {
  const [isCut, setIsCut] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [isPlayingSong, setIsPlayingSong] = useState(false);
  const { cakeCutting, sisterName, englishName } = birthdayData;

  const handleCutCake = () => {
    if (isCut || isCutting) return;

    setIsCutting(true);
    soundFx.playKnifeSlice(); // Triggers full Happy Birthday song!

    setTimeout(() => {
      setIsCut(true);
      setIsCutting(false);
      setIsPlayingSong(true);
      triggerSparkleBurst();
      triggerCelebrationConfetti(6500);
    }, 600);
  };

  const handleReplaySong = () => {
    soundFx.playFullHappyBirthdaySong();
    setIsPlayingSong(true);
    triggerSparkleBurst();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 pt-20 pb-12 max-w-4xl mx-auto text-center select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/80 text-amber-800 text-xs sm:text-sm font-bold border border-amber-200/80 mb-2.5 shadow-sm">
          <Utensils className="w-4 h-4 text-amber-600" />
          <span>কেক কাটার আনন্দ ও গান</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-800">
          {cakeCutting.heading}
        </h2>
        <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
          ছুরি দিয়ে কেক কেটে নাও এবং {sisterName} আপুর জন্য হ্যাপি বার্থডে গান শুনো! 🎵
        </p>
      </motion.div>

      {/* Realistic Cake Stage with Interactive Knife */}
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mt-6 mb-6 border border-white/90 bg-white/85">
        <div className="flex flex-col items-center justify-center">
          
          {/* Realistic 3D Birthday Cake */}
          <RealisticBirthdayCake
            candlesLit={false}
            isCut={isCut}
            isCutting={isCutting}
            showKnife={true}
            onCutCake={handleCutCake}
          />

          {/* Action: Cut Cake Button / Playing Song Banner */}
          <div className="mt-6 flex flex-col items-center gap-4 w-full">
            {!isCut ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCutCake}
                disabled={isCutting}
                className="px-9 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-orange-500/35 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
              >
                <span>
                  {isCutting ? "কেক কাটা হচ্ছে... 🔪" : cakeCutting.cutButtonText}
                </span>
              </motion.button>
            ) : (
              /* Once Cake is cut: Song banner & Next step button */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 rounded-3xl bg-pink-50 border border-pink-300/80 max-w-lg shadow-md w-full flex flex-col items-center"
              >
                <div className="flex items-center justify-center gap-2 text-pink-700 font-extrabold text-base sm:text-lg mb-1">
                  <Volume2 className="w-5 h-5 text-pink-600 animate-bounce" />
                  <span>🎶 "Happy Birthday to you, dear {englishName}!"</span>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  কেক কাটা সফলভাবে সম্পন্ন হয়েছে! মিষ্টি গান বাজছে... 🍓
                </p>

                <button
                  onClick={handleReplaySong}
                  className="px-4 py-1.5 rounded-full bg-white text-pink-600 text-xs font-bold border border-pink-200 hover:bg-pink-100 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>গানটি আবার শুনুন 🎵</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Next Step Action Button: Goes to dedicated Cake Eating Stage! */}
      {isCut && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2"
        >
          <button
            onClick={onNextStep}
            className="px-9 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 active:scale-95 text-white font-black text-sm sm:text-base shadow-xl shadow-pink-500/30 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
          >
            <span>পরবর্তী ধাপ: আপুকে কেক খাওয়ান 🍰</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
