"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundGradients from "../components/BackgroundGradients";
import StepProgressBar from "../components/StepProgressBar";
import MusicPlayer from "../components/MusicPlayer";
import LightsStage from "../components/party/LightsStage";
import BalloonsStage from "../components/party/BalloonsStage";
import CandlesStage from "../components/party/CandlesStage";
import CakeCutStage from "../components/party/CakeCutStage";
import CakeEatingStage from "../components/party/CakeEatingStage";
import ComplimentJarStage from "../components/party/ComplimentJarStage";
import GiftStage from "../components/party/GiftStage";

const stepTitles = {
  1: "বাতি জ্বালানো 💡",
  2: "বেলুন ফাটানো 🎈",
  3: "মোমবাতি নেভানো 🕯️",
  4: "কেক কাটা 🎂",
  5: "কেক খাওয়ানো 🍰",
  6: "চিরকুট বয়াম 🫙",
  7: "উপহার ও চিঠি 🎁",
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const totalSteps = 7;

  const goToNextStep = () => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restartParty = () => {
    setDirection(-1);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden selection:bg-pink-300 selection:text-slate-900">
      {/* Background Orbs (only when lights are on / step > 1) */}
      {currentStep > 1 && <BackgroundGradients />}

      {/* Floating Ambient Music Audio Player */}
      <MusicPlayer />

      {/* Top Step Progress Bar */}
      <StepProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepTitle={stepTitles[currentStep] || ""}
        onPrevStep={goToPrevStep}
      />

      {/* 7 Streamlined Party Stages */}
      <div className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait" custom={direction}>
          {currentStep === 1 && (
            <motion.div
              key="stage-1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <LightsStage onNextStep={goToNextStep} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="stage-2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <BalloonsStage onNextStep={goToNextStep} />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="stage-3"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <CandlesStage onNextStep={goToNextStep} />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="stage-4"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <CakeCutStage onNextStep={goToNextStep} />
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="stage-5"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <CakeEatingStage onNextStep={goToNextStep} />
            </motion.div>
          )}

          {currentStep === 6 && (
            <motion.div
              key="stage-6"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <ComplimentJarStage onNextStep={goToNextStep} />
            </motion.div>
          )}

          {currentStep === 7 && (
            <motion.div
              key="stage-7"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <GiftStage onRestart={restartParty} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
