"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Heart, Image as ImageIcon, MapPin, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { birthdayData } from "../data/birthdayData";

function MemoryImage({ src, alt, tag }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100/70 via-purple-50/60 to-indigo-100/70 border border-white/60 flex items-center justify-center group shadow-inner">
      {!imageFailed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageFailed(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-white/80 shadow-md flex items-center justify-center text-pink-500">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-pink-600">
              {tag || "স্মৃতির ছবি"}
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-[220px] leading-relaxed">
              ছবি যোগ করার পাথ: <br />
              <code className="bg-pink-100/70 text-pink-700 px-1.5 py-0.5 rounded text-[11px] font-mono">
                {src}
              </code>
            </p>
          </div>
        </div>
      )}

      {/* Floating Tag over image */}
      <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>{tag}</span>
      </div>
    </div>
  );
}

export default function MemoryTimeline({ onNextStep }) {
  const { timeline } = birthdayData;
  const [activeMemoryIdx, setActiveMemoryIdx] = useState(0);

  const currentMemory = timeline[activeMemoryIdx];
  const bengaliNumbers = ["১", "২", "৩", "৪"];

  const handleNextMemory = () => {
    if (activeMemoryIdx < timeline.length - 1) {
      setActiveMemoryIdx((prev) => prev + 1);
    }
  };

  const handlePrevMemory = () => {
    if (activeMemoryIdx > 0) {
      setActiveMemoryIdx((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-20 pb-12 max-w-4xl mx-auto text-center">
      {/* Step Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/70 text-purple-700 text-xs sm:text-sm font-semibold border border-purple-200/50 mb-3 shadow-sm">
          <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-400" />
          <span>আমাদের সম্পর্কের মধুর স্মৃতিগুলো</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-800">
          আমাদের ভাই-বোনের পথচলা
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
          স্মৃতি {bengaliNumbers[activeMemoryIdx]} / {bengaliNumbers[timeline.length - 1]} : প্রতিটি মুহূর্ত আমাদের হৃদয়ে অমলিন
        </p>
      </motion.div>

      {/* Memory Nav Indicators (Pill tabs) */}
      <div className="flex items-center justify-center gap-2 mt-6 mb-8 flex-wrap">
        {timeline.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActiveMemoryIdx(idx)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeMemoryIdx === idx
                ? "bg-pink-500 text-white shadow-md shadow-pink-500/30 scale-105"
                : "bg-white/70 text-slate-600 hover:bg-white border border-slate-200/80"
            }`}
          >
            {item.date}
          </button>
        ))}
      </div>

      {/* Main Active Memory Card with Slide Animation */}
      <div className="w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMemory.id}
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel-interactive rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative border border-white/80 bg-white/85 text-left"
          >
            {/* Soft Ambient Glow */}
            <div
              className={`absolute -right-16 -bottom-16 w-56 h-56 rounded-full bg-gradient-to-br ${currentMemory.accentColor} blur-3xl pointer-events-none opacity-60`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Image Frame */}
              <MemoryImage
                src={currentMemory.image}
                alt={currentMemory.title}
                tag={currentMemory.tag}
              />

              {/* Story Content */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <div className="inline-flex items-center gap-1.5 font-bold text-pink-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{currentMemory.date}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/90 border border-slate-200 font-bold text-slate-700 text-xs shadow-xs">
                    {currentMemory.year}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-snug mt-1">
                  {currentMemory.title}
                </h3>

                <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {currentMemory.description}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-pink-400" />
                    হৃদয়ে চির অমলিন
                  </span>

                  {/* Intra-memory next/prev arrows */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrevMemory}
                      disabled={activeMemoryIdx === 0}
                      className={`p-2 rounded-full border ${
                        activeMemoryIdx === 0
                          ? "opacity-30 cursor-not-allowed border-slate-200"
                          : "hover:bg-white cursor-pointer border-slate-300 text-slate-700"
                      }`}
                      title="আগের স্মৃতি"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextMemory}
                      disabled={activeMemoryIdx === timeline.length - 1}
                      className={`p-2 rounded-full border ${
                        activeMemoryIdx === timeline.length - 1
                          ? "opacity-30 cursor-not-allowed border-slate-200"
                          : "hover:bg-white cursor-pointer border-slate-300 text-slate-700"
                      }`}
                      title="পরের স্মৃতি"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next Step Action Button */}
      <div className="mt-10">
        <button
          onClick={onNextStep}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 active:scale-95 text-white font-semibold text-sm sm:text-base shadow-xl shadow-pink-500/25 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
        >
          <span>পরবর্তী ধাপ: জন্মদিনের কেক কাটুন</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
