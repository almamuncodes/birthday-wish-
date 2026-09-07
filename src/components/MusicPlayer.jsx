"use client";

import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundFx } from "../utils/audioEffects";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    const nextState = soundFx.toggleAmbientMusic((state) => {
      setIsPlaying(state);
    });
    setIsPlaying(nextState);
  };

  return (
    <div className="fixed top-5 right-5 z-40">
      <button
        onClick={toggleMusic}
        title={isPlaying ? "মিউজিক বন্ধ করুন" : "মিউজিক চালু করুন"}
        className="glass-pill px-4 py-2.5 rounded-full flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-pink-600 active:scale-95 shadow-lg border border-white/80 cursor-pointer transition-all duration-200"
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3.5">
              <span className="w-1 bg-pink-500 rounded-full animate-pulse h-3" />
              <span className="w-1 bg-pink-400 rounded-full animate-bounce h-4" />
              <span className="w-1 bg-purple-500 rounded-full animate-pulse h-2" />
            </div>
            <Volume2 className="w-4 h-4 text-pink-500" />
            <span className="hidden sm:inline">মিষ্টি সুর বাজছে</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">মিউজিক শুনুন</span>
          </>
        )}
      </button>
    </div>
  );
}
