/**
 * Ultimate Birthday Party Sound Synthesizer
 * Supports: switch, balloon pop, candle blow, knife slice, Happy Birthday song,
 * eating nom-nom, wheel spin ticking, firework launches & booms, and gift fanfare.
 */

class BirthdaySoundEngine {
  constructor() {
    this.ctx = null;
    this.ambientTimeout = null;
    this.isMusicPlaying = false;
    this.songTimeouts = [];
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playHarmonicNote(freq, startTime, duration, volume = 0.2, type = "triangle") {
    if (!this.ctx || !freq) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    gain2.gain.setValueAtTime(0.001, startTime);
    gain2.gain.linearRampToValueAtTime(volume * 0.35, startTime + 0.03);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.7);

    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);

    osc2.start(startTime);
    osc2.stop(startTime + duration + 0.05);
  }

  // 1. Light Switch Click
  playSwitchClick() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(900, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.06);

      setTimeout(() => this.playUnlockChime(), 150);
    } catch (e) {
      console.warn("Switch sound error:", e);
    }
  }

  // 2. Balloon Pop
  playBalloonPop() {
    try {
      this.init();
      if (!this.ctx) return;

      const snapOsc = this.ctx.createOscillator();
      const snapGain = this.ctx.createGain();
      snapOsc.type = "square";
      snapOsc.frequency.setValueAtTime(1500, this.ctx.currentTime);
      snapOsc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.03);

      snapGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      snapGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);

      snapOsc.connect(snapGain);
      snapGain.connect(this.ctx.destination);

      snapOsc.start(this.ctx.currentTime);
      snapOsc.stop(this.ctx.currentTime + 0.04);

      const bufferSize = this.ctx.sampleRate * 0.1;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(this.ctx.currentTime);
      noise.stop(this.ctx.currentTime + 0.1);
    } catch (e) {
      console.warn("Pop error:", e);
    }
  }

  // 3. Candle Wind Blow
  playBlowingSound() {
    try {
      this.init();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(500, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.75);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.75);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(this.ctx.currentTime);
      noise.stop(this.ctx.currentTime + 0.8);
    } catch (e) {
      console.warn("Blow sound error:", e);
    }
  }

  // 4. Cake Knife Slice
  playKnifeSlice() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.32);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.35);

      setTimeout(() => {
        this.playFullHappyBirthdaySong();
      }, 350);
    } catch (e) {
      console.warn("Slice sound error:", e);
    }
  }

  // 5. Eating Nom-Nom Sound
  playEatingSound() {
    try {
      this.init();
      if (!this.ctx) return;

      [0, 0.18, 0.36].forEach((delay, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        const freqs = [350, 420, 390];
        osc.frequency.setValueAtTime(freqs[idx], this.ctx.currentTime + delay);
        osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + delay + 0.12);

        gain.gain.setValueAtTime(0.01, this.ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + delay + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + 0.14);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + delay);
        osc.stop(this.ctx.currentTime + delay + 0.15);
      });

      setTimeout(() => {
        this.playCelebrationMelody();
      }, 600);
    } catch (e) {
      console.warn("Eating sound error:", e);
    }
  }

  // 6. Spinning Wheel Click Tick
  playWheelTick() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {
      // ignore
    }
  }

  // 7. Firework Launch Whoosh & Boom!
  playFirework() {
    try {
      this.init();
      if (!this.ctx) return;

      // Rocket whistle upwards
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.36);

      // Boom burst
      setTimeout(() => {
        if (!this.ctx) return;
        const bufferSize = this.ctx.sampleRate * 0.4;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(250, this.ctx.currentTime);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        noise.start(this.ctx.currentTime);
        noise.stop(this.ctx.currentTime + 0.42);

        // Twinkle sparkles
        this.playCelebrationMelody();
      }, 350);
    } catch (e) {
      console.warn("Firework error:", e);
    }
  }

  // 8. Origami Note Unfold Chime
  playNoteUnfold() {
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [659.25, 880.0, 1046.5];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.01, this.ctx.currentTime + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + i * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + i * 0.08);
        osc.stop(this.ctx.currentTime + i * 0.08 + 0.55);
      });
    } catch (e) {
      // ignore
    }
  }

  // 9. Full Happy Birthday Song
  playFullHappyBirthdaySong() {
    try {
      this.init();
      if (!this.ctx) return;

      this.stopSong();

      const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.0, A4 = 440.0, B4 = 493.88;
      const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99;

      const beat = 0.52;
      const melody = [
        { f: G4, d: 0.75 * beat, t: 0 },
        { f: G4, d: 0.25 * beat, t: 0.75 * beat },
        { f: A4, d: 1.0 * beat, t: 1.0 * beat },
        { f: G4, d: 1.0 * beat, t: 2.0 * beat },
        { f: C5, d: 1.0 * beat, t: 3.0 * beat },
        { f: B4, d: 2.0 * beat, t: 4.0 * beat },

        { f: G4, d: 0.75 * beat, t: 6.0 * beat },
        { f: G4, d: 0.25 * beat, t: 6.75 * beat },
        { f: A4, d: 1.0 * beat, t: 7.0 * beat },
        { f: G4, d: 1.0 * beat, t: 8.0 * beat },
        { f: D5, d: 1.0 * beat, t: 9.0 * beat },
        { f: C5, d: 2.0 * beat, t: 10.0 * beat },

        { f: G4, d: 0.75 * beat, t: 12.0 * beat },
        { f: G4, d: 0.25 * beat, t: 12.75 * beat },
        { f: G5, d: 1.0 * beat, t: 13.0 * beat },
        { f: E5, d: 1.0 * beat, t: 14.0 * beat },
        { f: C5, d: 1.0 * beat, t: 15.0 * beat },
        { f: B4, d: 1.0 * beat, t: 16.0 * beat },
        { f: A4, d: 1.5 * beat, t: 17.0 * beat },

        { f: F5, d: 0.75 * beat, t: 18.5 * beat },
        { f: F5, d: 0.25 * beat, t: 19.25 * beat },
        { f: E5, d: 1.0 * beat, t: 19.5 * beat },
        { f: C5, d: 1.0 * beat, t: 20.5 * beat },
        { f: D5, d: 1.0 * beat, t: 21.5 * beat },
        { f: C5, d: 2.5 * beat, t: 22.5 * beat },
      ];

      const startBaseTime = this.ctx.currentTime + 0.1;

      melody.forEach((m) => {
        this.playHarmonicNote(m.f, startBaseTime + m.t, m.d * 0.9, 0.24, "triangle");
      });

      const cheerTimeout = setTimeout(() => {
        this.playCelebrationMelody();
      }, 22.5 * beat * 1000);

      this.songTimeouts.push(cheerTimeout);
    } catch (e) {
      console.warn("Full Happy Birthday Song error:", e);
    }
  }

  stopSong() {
    this.songTimeouts.forEach((t) => clearTimeout(t));
    this.songTimeouts = [];
  }

  playGiftOpenFanfare() {
    try {
      this.init();
      if (!this.ctx) return;

      const chords = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      chords.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.01, this.ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.85);
      });
    } catch (e) {
      console.warn("Fanfare error:", e);
    }
  }

  playUnlockChime() {
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.1);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + index * 0.1);
        gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + index * 0.1 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + index * 0.1 + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + index * 0.1);
        osc.stop(this.ctx.currentTime + index * 0.1 + 0.75);
      });
    } catch (e) {
      console.warn("Chime error:", e);
    }
  }

  playCelebrationMelody() {
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [659.25, 783.99, 987.77, 1046.5, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + idx * 0.1 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.1 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + idx * 0.1 + 0.85);
      });
    } catch (e) {
      console.warn("Celebration error:", e);
    }
  }

  toggleAmbientMusic(onStateChange) {
    this.init();
    if (!this.ctx) return false;

    if (this.isMusicPlaying) {
      this.stopAmbientMusic();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.startAmbientMusic();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  startAmbientMusic() {
    try {
      this.init();
      if (!this.ctx) return;

      this.isMusicPlaying = true;
      const chords = [
        [261.63, 329.63, 392.0],
        [220.0, 261.63, 329.63],
        [174.61, 220.0, 261.63],
        [196.0, 246.94, 293.66],
      ];

      let chordIdx = 0;
      const playNextChord = () => {
        if (!this.isMusicPlaying || !this.ctx) return;
        const currentChord = chords[chordIdx % chords.length];
        chordIdx++;

        currentChord.forEach((freq) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.8);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(this.ctx.currentTime);
          osc.stop(this.ctx.currentTime + 4.0);
        });

        this.ambientTimeout = setTimeout(playNextChord, 3500);
      };

      playNextChord();
    } catch (e) {
      console.warn("Ambient music:", e);
    }
  }

  stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.ambientTimeout) {
      clearTimeout(this.ambientTimeout);
      this.ambientTimeout = null;
    }
  }
}

export const soundFx = new BirthdaySoundEngine();
