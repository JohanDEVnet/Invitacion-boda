"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);
  const intervalRef = useRef(null);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      stopSoundscape();
    };
  }, []);

  const startSoundscape = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Force resume to bypass browser autoplay security blocks
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const nodes = [];

      // ── 1. LOW JUNGLE DRONE ──
      // Detuned oscillators to create a warm, beating acoustic drone (D2 note)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const droneGain = ctx.createGain();
      const droneFilter = ctx.createBiquadFilter();

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(73.42, ctx.currentTime); // D2
      
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(73.80, ctx.currentTime); // Beating detune

      droneFilter.type = "lowpass";
      droneFilter.frequency.setValueAtTime(140, ctx.currentTime);

      droneGain.gain.setValueAtTime(0.24, ctx.currentTime); // Louder, clearly audible drone

      osc1.connect(droneFilter);
      osc2.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      nodes.push(osc1, osc2, droneGain);

      // ── 2. WIND / RIVER AMBIENCE ──
      // Generate noise buffer
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.Q.setValueAtTime(2.5, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.065, ctx.currentTime); // Audible river wind

      // Slow LFO to modulate noise frequency (simulates river/wind gusts)
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 12s wave
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(180, ctx.currentTime); // Sweep range

      lfo.connect(lfoGain);
      lfoGain.connect(noiseFilter.frequency);
      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      lfo.start();
      whiteNoise.start();
      nodes.push(whiteNoise, lfo, lfoGain, noiseGain);

      // ── 3. SHAMANIC FLUTE PENTATONIC MELODY ──
      // Random soft notes in D Minor Pentatonic playing every 6-9 seconds
      const fluteNotes = [146.83, 164.81, 196.00, 220.00, 261.63, 293.66, 329.63, 392.00];
      
      const playFluteNote = () => {
        const freq = fluteNotes[Math.floor(Math.random() * fluteNotes.length)];
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const noteFilter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        noteFilter.type = "lowpass";
        noteFilter.frequency.setValueAtTime(900, ctx.currentTime);

        // Soft, breathing volume envelope (slow attack, long release) using stable linear ramps
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.8);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 6.0);

        osc.connect(noteFilter);
        noteFilter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 6.5);
      };

      // Play first note immediately, then repeat
      playFluteNote();
      intervalRef.current = setInterval(playFluteNote, 7500);

      nodesRef.current = nodes;
      setIsPlaying(true);
    } catch (e) {
      console.error("Failed to start soundscape:", e);
    }
  };

  const stopSoundscape = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    nodesRef.current.forEach((n) => {
      if (n && n.stop && typeof n.stop === "function") {
        try {
          n.stop();
        } catch (err) {}
      }
      if (n && n.disconnect && typeof n.disconnect === "function") {
        try {
          n.disconnect();
        } catch (err) {}
      }
    });
    nodesRef.current = [];
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (err) {}
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  };

  return (
    <div className="fixed top-5 left-5 z-50">
      <motion.button
        id="audio-toggle"
        onClick={handleToggle}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0a180e]/95 border-2 border-[#E8C86B]/70 shadow-lg shadow-[#E8C86B]/20 flex items-center justify-center cursor-pointer text-[#E8C86B] relative"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle ambient music"
      >
        {isPlaying ? (
          // Speaker playing waves
          <div className="relative flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            <motion.span 
              className="absolute -inset-1 rounded-full border border-[#E8C86B]/60"
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          </div>
        ) : (
          // Speaker muted with musical note overlay indicator to signify what this button does
          <div className="relative flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
            <span className="absolute -bottom-1 -right-1 text-[10px] animate-bounce">🎵</span>
          </div>
        )}
      </motion.button>
    </div>
  );
}
