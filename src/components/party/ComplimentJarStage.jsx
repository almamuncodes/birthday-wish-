"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowRight, BookOpen, Check } from "lucide-react";
import { soundFx } from "../../utils/audioEffects";
import { triggerSparkleBurst } from "../../utils/confetti";
import { birthdayData } from "../../data/birthdayData";

export default function ComplimentJarStage({ onNextStep }) {
  const [activeNoteIdx, setActiveNoteIdx] = useState(0);
  const [openedNotes, setOpenedNotes] = useState(new Set([0]));
  const { complimentJar, sisterName } = birthdayData;

  const currentNote = complimentJar.notes[activeNoteIdx];

  const handleSelectNote = (idx) => {
    setActiveNoteIdx(idx);
    setOpenedNotes((prev) => new Set([...prev, idx]));
    soundFx.playNoteUnfold();
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
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-800 text-xs sm:text-sm font-bold border border-rose-200/80 mb-2.5 shadow-sm">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
          <span>ভালোবাসার চিরকুট বয়াম</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-800">
          {complimentJar.heading}
        </h2>
        <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
          {complimentJar.subtitle}
        </p>
      </motion.div>

      {/* Main Glass Jar and Note Unfold Showcase */}
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mt-6 mb-6 border border-white/90 bg-white/85 flex flex-col md:flex-row items-center justify-around gap-6">
        
        {/* The Illustrated Glass Jar with Origami Notes */}
        <div className="flex flex-col items-center">
          <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-[30px_30px_40px_40px] bg-white/50 backdrop-blur-md border-4 border-white/90 shadow-2xl flex flex-col items-center justify-end pb-4 overflow-hidden group">
            
            {/* Wooden / Cork Lid */}
            <div className="absolute top-0 inset-x-4 h-7 rounded-b-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 shadow-md border-b-2 border-amber-900" />
            <div className="absolute top-0 inset-x-8 h-2 rounded-t-lg bg-amber-800" />

            {/* Tie Ribbon around neck */}
            <div className="absolute top-7 inset-x-3 h-1.5 bg-pink-500 shadow-xs" />
            <div className="absolute top-6 left-6 text-sm">🎀</div>

            {/* Floating Origami Paper Stars inside the Jar */}
            <div className="w-full h-full pt-12 p-3 grid grid-cols-2 gap-2 content-center items-center">
              {complimentJar.notes.map((note, idx) => {
                const isSelected = activeNoteIdx === idx;
                const colors = [
                  "bg-pink-300 text-pink-800",
                  "bg-purple-300 text-purple-800",
                  "bg-amber-300 text-amber-800",
                  "bg-emerald-300 text-emerald-800",
                  "bg-sky-300 text-sky-800",
                ];
                const color = colors[idx % colors.length];

                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSelectNote(idx)}
                    className={`p-2 rounded-xl text-xs font-black shadow-md border border-white/80 cursor-pointer transition-all ${color} ${
                      isSelected ? "ring-2 ring-pink-500 scale-105" : "opacity-85"
                    }`}
                  >
                    <span>💌 চিরকুট #{idx + 1}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
          <span className="text-[11px] font-bold text-slate-500 mt-2">
            (চিরকুটে চাপ দিয়ে খুলে পড়ুন 👆)
          </span>
        </div>

        {/* The Unfolded Paper Note on the Right */}
        <div className="flex-1 max-w-md w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNoteIdx}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-50/90 via-pink-50/80 to-purple-50/80 border-2 border-pink-200 shadow-xl text-left relative"
            >
              {/* Note Header */}
              <div className="flex items-center justify-between border-b border-pink-200/80 pb-3 mb-3">
                <div className="flex items-center gap-1.5 text-pink-600 font-black text-sm">
                  <BookOpen className="w-4 h-4" />
                  <span>{currentNote.title}</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                  নোট {activeNoteIdx + 1}/{complimentJar.notes.length}
                </span>
              </div>

              {/* Note Body Text */}
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                {currentNote.text}
              </p>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-pink-200/60 flex items-center justify-between text-xs text-slate-400">
                <span>চিরকাল হৃদয়ে অমলিন ❤️</span>
                <Heart className="w-4 h-4 text-pink-500 fill-pink-400" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Note Selector Pills */}
          <div className="flex justify-center gap-1.5 mt-4">
            {complimentJar.notes.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelectNote(i)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                  activeNoteIdx === i
                    ? "bg-pink-600 scale-125"
                    : "bg-pink-200 hover:bg-pink-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Next Step Action Button */}
      <div className="mt-2">
        <button
          onClick={onNextStep}
          className="px-9 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 active:scale-95 text-white font-black text-sm sm:text-base shadow-xl shadow-pink-500/30 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
        >
          <span>{complimentJar.nextStepPrompt}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
