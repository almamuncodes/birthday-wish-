"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Sparkles, Copy, Check, RotateCcw, Heart } from "lucide-react";
import { birthdayData } from "../data/birthdayData";
import { soundFx } from "../utils/audioEffects";
import { triggerCelebrationConfetti, triggerSparkleBurst } from "../utils/confetti";

export default function LetterStep({ onRestart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { letter } = birthdayData;

  const handleOpenLetter = () => {
    setIsOpen(true);
    soundFx.playCelebrationMelody();
    triggerSparkleBurst();
    triggerCelebrationConfetti(5000);
  };

  const handleCopyText = () => {
    const fullText =
      letter.content.join("\n\n") + `\n\n${letter.closing}\n${letter.signature}`;
    navigator.clipboard?.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-20 pb-16 max-w-3xl mx-auto text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/80 text-pink-700 text-xs sm:text-sm font-bold border border-pink-200/60 mb-3 shadow-sm">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>চূড়ান্ত সারপ্রাইজ • ভালোবাসার পত্র</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-800">
          দূরত্ব পেরিয়ে আপুর জন্মদিনে
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base">
          মনের গভীর থেকে লেখা কয়েকটি কথা তোমার জন্য
        </p>
      </motion.div>

      {/* Envelope Card or Unfolded Letter */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenLetter}
            className="w-full max-w-md glass-panel rounded-3xl p-8 sm:p-10 shadow-2xl cursor-pointer border border-white/90 bg-white/80 relative group"
          >
            {/* Glowing Accent */}
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition-opacity" />

            <div className="relative flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-500 text-white flex items-center justify-center shadow-xl shadow-pink-500/30 group-hover:rotate-6 transition-transform">
                <Mail className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
                  চিঠিটি খুলতে এখানে ক্লিক করুন 💌
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  মোম-সিল দেওয়া ডিজিটাল চিঠিটি পড়তে চাপুন
                </p>
              </div>

              <div className="mt-2 px-5 py-2 rounded-full bg-pink-50 text-pink-600 text-xs font-bold border border-pink-200">
                চিঠি পড়ুন ✨
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative border border-white/90 bg-white/95 text-left"
          >
            {/* Letter Header */}
            <div className="border-b border-pink-100 pb-5 mb-6">
              <div className="flex items-center gap-2 text-pink-600 text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{letter.date}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-snug">
                {letter.subject}
              </h3>
              <div className="flex items-center justify-between text-xs text-slate-500 mt-2.5 font-medium">
                <span>প্রাপক: {letter.recipient}</span>
                <span>প্রেরক: {letter.sender}</span>
              </div>
            </div>

            {/* Letter Content Paragraphs */}
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              {letter.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Closing & Signature */}
            <div className="mt-8 pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500 italic">{letter.closing}</p>
                <p className="text-base font-bold text-pink-600 mt-0.5">
                  {letter.signature}
                </p>
              </div>

              {/* Copy Letter Button */}
              <button
                onClick={handleCopyText}
                className="px-4 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-pink-200 shadow-xs"
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

            {/* Decorative Heart Seal */}
            <div className="flex justify-center mt-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 shadow-md flex items-center justify-center text-white text-sm font-bold border-2 border-rose-300">
                ❤️
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Restart Journey Button */}
      <div className="mt-10">
        <button
          onClick={onRestart}
          className="px-6 py-3 rounded-full bg-white/80 hover:bg-white text-slate-700 active:scale-95 border border-slate-200 text-xs sm:text-sm font-semibold shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer mx-auto"
        >
          <RotateCcw className="w-4 h-4 text-pink-500" />
          <span>প্রথম থেকে আবার শুরু করুন</span>
        </button>
      </div>

      <p className="mt-8 text-xs text-slate-400 font-medium">
        আমার প্রিয়তম আপুর জন্য অকৃত্রিম ভালোবাসায় তৈরি • চিরকাল তোমার পাশে ❤️
      </p>
    </div>
  );
}
