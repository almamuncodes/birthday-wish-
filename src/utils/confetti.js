import confetti from "canvas-confetti";

/**
 * Fires a joyful multi-second confetti celebration
 * @param {number} durationMs - Duration in milliseconds (default 6000ms = 6s)
 */
export const triggerCelebrationConfetti = (durationMs = 6000) => {
  if (typeof window === "undefined") return;

  const animationEnd = Date.now() + durationMs;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 9999,
    colors: ["#f472b6", "#c084fc", "#60a5fa", "#fde047", "#fb7185", "#a78bfa"],
  };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / durationMs);

    // Left cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });

    // Right cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};

/**
 * Quick magical sparkle pop (for unlock or candle blown)
 */
export const triggerSparkleBurst = () => {
  if (typeof window === "undefined") return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ["#ec4899", "#d946ef", "#a855f7"],
  });
  fire(0.2, {
    spread: 60,
    colors: ["#f43f5e", "#fb7185", "#fbcfe8"],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ["#38bdf8", "#818cf8", "#c084fc"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ["#fbbf24", "#fef08a"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ["#f472b6", "#e879f9"],
  });
};
