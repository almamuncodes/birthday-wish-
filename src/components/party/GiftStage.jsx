"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Copy, Check, RotateCcw, Heart } from "lucide-react";
import { soundFx } from "../../utils/audioEffects";
import { triggerCelebrationConfetti, triggerSparkleBurst } from "../../utils/confetti";
import { birthdayData } from "../../data/birthdayData";

export default function GiftStage({ onRestart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { giftBox, sisterName } = birthdayData;

  const handleOpenGift = () => {
    soundFx.playGiftOpenFanfare();
    setIsOpen(true);
    triggerSparkleBurst();
    triggerCelebrationConfetti(6500);
  };

  const handleCopy = () => {
    const text =
      giftBox.paragraphs.join("\n\n") +
      `\n\n${giftBox.closing}\n${giftBox.signature}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 pt-20 pb-16 max-w-3xl mx-auto text-center select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-700 text-xs sm:text-sm font-bold border border-pink-200/80 mb-2.5 shadow-sm">
          <Gift className="w-4 h-4 text-pink-500" />
          <span>চূড়ান্ত উপহার পর্ব</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-800">
          {giftBox.heading}
        </h2>
        <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
          {giftBox.subtitle}
        </p>
      </motion.div>

      {/* Gift Box or Revealed Letter */}
      <div className="w-full flex justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* WRAPPED 3D GIFT BOX */
            <motion.div
              key="box"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGift}
              className="w-full max-w-sm glass-panel rounded-3xl p-8 shadow-2xl cursor-pointer border-2 border-white/90 bg-white/85 relative group"
            >
              {/* Glowing Halo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 rounded-3xl blur-md opacity-50 group-hover:opacity-85 transition-opacity" />

              <div className="relative flex flex-col items-center gap-4">
                {/* 3D Gift Box Graphic */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  {/* Floating Box Container */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-28 h-28 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 shadow-xl relative flex items-center justify-center border-t-2 border-white/60"
                  >
                    {/* Vertical Ribbon */}
                    <div className="absolute inset-y-0 w-6 bg-gradient-to-b from-amber-300 to-yellow-400 shadow-sm" />
                    {/* Horizontal Ribbon */}
                    <div className="absolute inset-x-0 h-6 bg-gradient-to-r from-amber-300 to-yellow-400 shadow-sm" />
                    {/* Top Bow */}
                    <div className="absolute -top-4 text-3xl filter drop-shadow">
                      🎀
                    </div>
                  </motion.div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 group-hover:text-pink-600 transition-colors">
                    {giftBox.openBoxPrompt}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    বক্সটি স্পর্শ করলেই চিঠিটি আনবক্স হবে ✨
                  </p>
                </div>

                <span className="px-5 py-2 rounded-full bg-pink-100 text-pink-700 text-xs font-bold border border-pink-200">
                  উপহার আনবক্স করুন 🎁
                </span>
              </div>
            </motion.div>
          ) : (
            /* OPENED LETTER CARD */
            <motion.div
              key="letter"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative border border-white/90 bg-white/95 text-left"
            >
              {/* Letter Header */}
              <div className="border-b border-pink-100 pb-4 mb-5">
                <div className="flex items-center gap-2 text-pink-600 text-xs font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{giftBox.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
                  {giftBox.letterSubject}
                </h3>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2 font-medium">
                  <span>প্রাপক: {giftBox.recipient}</span>
                  <span>প্রেরক: {giftBox.sender}</span>
                </div>
              </div>

              {/* Letter Paragraphs */}
              <div className="space-y-3.5 text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                {giftBox.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Closing & Signature */}
              <div className="mt-6 pt-5 border-t border-pink-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-500 italic">{giftBox.closing}</p>
                  <p className="text-sm sm:text-base font-bold text-pink-600 mt-0.5">
                    {giftBox.signature}
                  </p>
                </div>

                {/* Copy Letter Button */}
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-pink-200 shadow-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>চিঠিটি কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>চিঠিটি কপি করুন</span>
                    </>
                  )}
                </button>
              </div>

              {/* Decorative Wax Heart */}
              <div className="flex justify-center mt-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 shadow-md flex items-center justify-center text-white text-xs font-bold border-2 border-rose-300">
                  ❤️
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Restart Button */}
      <div className="mt-8">
        <button
          onClick={onRestart}
          className="px-6 py-3 rounded-full bg-white/90 hover:bg-white text-slate-700 active:scale-95 border border-slate-200 text-xs sm:text-sm font-bold shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer mx-auto"
        >
          <RotateCcw className="w-4 h-4 text-pink-500" />
          <span>{giftBox.restartPrompt}</span>
        </button>
      </div>

      <p className="mt-6 text-xs text-slate-400 font-medium">
        আমার প্রিয়তম আপুর জন্য অকৃত্রিম ভালোবাসায় তৈরি • চিরকাল তোমার পাশে ❤️
      </p>
    </div>
  );
}
