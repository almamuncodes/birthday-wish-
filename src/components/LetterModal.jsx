"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Heart, Sparkles, Copy, Check } from "lucide-react";
import { birthdayData } from "../data/birthdayData";
import { soundFx } from "../utils/audioEffects";
import { triggerSparkleBurst } from "../utils/confetti";

export default function LetterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { letter } = birthdayData;

  const handleOpenLetter = () => {
    setIsOpen(true);
    soundFx.playCelebrationMelody();
    triggerSparkleBurst();
  };

  const handleCopyText = () => {
    const fullText = letter.content.join("\n\n") + `\n\n${letter.closing}\n${letter.signature}`;
    navigator.clipboard?.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Footer Envelope Trigger Area */}
      <footer className="relative py-20 px-4 sm:px-6 text-center">
        <div className="max-w-md mx-auto flex flex-col items-center">
          {/* Animated Glowing Envelope Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleOpenLetter}
            className="cursor-pointer group relative"
          >
            {/* Glowing Ring Behind */}
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition-opacity" />

            <div className="relative glass-panel rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-3 border border-white/80 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/25 group-hover:rotate-6 transition-transform">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
                  তোমার জন্য একটি বিশেষ চিঠি 💌
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  হাত দিয়ে লেখা মোম-সিল দেওয়া চিঠিটি পড়তে ক্লিক করো
                </p>
              </div>
            </div>
          </motion.div>

          <p className="mt-8 text-xs text-slate-400 font-medium">
            আমার প্রিয়তম আপুর জন্য অকৃত্রিম ভালোবাসায় তৈরি • চিরকাল তোমার পাশে ❤️
          </p>
        </div>
      </footer>

      {/* Unfolding Digital Letter Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/40 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative border border-white/90 bg-white/95"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Header */}
              <div className="border-b border-pink-100 pb-5 mb-6">
                <div className="flex items-center gap-2 text-pink-600 text-xs font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{letter.date}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-snug">
                  {letter.subject}
                </h2>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2.5 font-medium">
                  <span>প্রাপক: {letter.recipient}</span>
                  <span>প্রেরক: {letter.sender}</span>
                </div>
              </div>

              {/* Letter Body */}
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
                  className="px-4 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-pink-200 shadow-sm"
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

              {/* Wax Seal Decorative Badge */}
              <div className="flex justify-center mt-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 shadow-md flex items-center justify-center text-white text-sm font-bold border-2 border-rose-300">
                  ❤️
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
