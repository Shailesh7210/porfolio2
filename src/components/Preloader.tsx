"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Lock body scroll during initialization
    document.body.style.overflow = 'hidden';

    let frameId: number;
    let startTimestamp: number | null = null;
    const duration = 6500; // 6.5s total loading duration for ample screen reading time

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      // High-precision smooth cubic easing for percentage progression
      const easeProgress = Math.round((1 - Math.pow(1 - progressRatio, 2.2)) * 100);
      setProgress(easeProgress);

      if (progressRatio < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        // Generous 1.5s hold pause at 100% so "FULL STACK DEVELOPER" has plenty of screen time
        setTimeout(() => {
          setIsComplete(true);
          document.body.style.overflow = 'unset';
          onComplete();
        }, 1500);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  // Extended Phase timing for comfortable screen reading
  let phaseTitle = "HI, I AM";
  let phaseSub = "// 01. WELCOME TO CREATIVE PORTFOLIO";
  if (progress >= 30 && progress < 60) {
    phaseTitle = "SHAILESH JAISWAL";
    phaseSub = "// 02. MERN STACK & GEN AI ARCHITECT";
  } else if (progress >= 60) {
    phaseTitle = "FULL STACK DEVELOPER";
    phaseSub = "// 03. BENGALURU, KARNATAKA, INDIA";
  }

  const slabEase = [0.83, 0, 0.17, 1] as const;

  return (
    <AnimatePresence>
      {!isComplete && (
        <div className="fixed inset-0 z-[100] select-none pointer-events-auto overflow-hidden bg-[#040507]">
          {/* Top Monolithic Shutter Slab */}
          <motion.div
            initial={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 1.2, ease: slabEase }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#07070a] bg-noise border-b border-[#ccff00]/30 z-20 flex flex-col justify-between p-6 sm:p-12"
          >
            {/* Top Header Telemetry */}
            <div className="flex items-center justify-between font-mono text-xs tracking-widest text-[#888890] uppercase">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-ping"></span>
                <span className="text-[#f4f4f5] font-bold">SHAILESH JAISWAL</span>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-[10px]">
                <span>LATENCY: 0.2MS</span>
                <span>STATUS: ONLINE</span>
                <span className="text-[#ccff00]">PORTFOLIO OS // V2.0</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom Monolithic Shutter Slab */}
          <motion.div
            initial={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 1.2, ease: slabEase }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#07070a] bg-noise border-t border-[#ccff00]/30 z-20 flex flex-col justify-end p-6 sm:p-12"
          >
            {/* Bottom Progress Line */}
            <div className="w-full max-w-5xl mx-auto space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[#888890]">
                <span>INITIALIZING SPATIAL FLIGHT DECK</span>
                <span className="text-[#ccff00] font-bold">{progress}% COMPLETED</span>
              </div>
              <div className="w-full h-1 bg-white/10 overflow-hidden relative rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00f0ff] via-[#ccff00] to-[#ccff00] rounded-full shadow-[0_0_15px_#ccff00]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>

          {/* Center Stage Floating Content (Layered over the monolithic shutters) */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15, filter: 'blur(20px)', transition: { duration: 0.7 } }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 pointer-events-none"
          >
            {/* Rotating Background Tech Aperture Ring */}
            <div className="absolute w-72 h-72 sm:w-[480px] sm:h-[480px] rounded-full border border-dashed border-[#ccff00]/20 animate-[spin_15s_linear_infinite] flex items-center justify-center">
              <div className="w-56 h-56 sm:w-[360px] sm:h-[360px] rounded-full border border-dotted border-[#00f0ff]/25 animate-[spin_10s_linear_infinite_reverse]"></div>
            </div>

            {/* Subtext Badge */}
            <div className="relative z-10 overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phaseSub}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-mono text-xs sm:text-sm text-[#00f0ff] uppercase tracking-widest bg-white/5 border border-[#00f0ff]/30 px-4 py-1.5 rounded-full backdrop-blur-md"
                >
                  {phaseSub}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Title Text (Spacious Container - Never Cuts Off "DEVELOPER") */}
            <div className="relative z-10 min-h-[110px] sm:min-h-[140px] flex items-center justify-center text-center max-w-6xl px-4 my-2">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={phaseTitle}
                  initial={{ y: 50, opacity: 0, filter: 'blur(12px)', scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
                  exit={{ y: -50, opacity: 0, filter: 'blur(12px)', scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-extrabold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase text-[#f4f4f5] font-mono leading-tight"
                >
                  {phaseTitle}
                  <span className="text-[#ccff00]">.</span>
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Giant Digital Counter */}
            <div className="relative z-10 flex items-baseline justify-center">
              <span className="font-extrabold tracking-tighter text-[18vw] sm:text-[13vw] leading-none font-mono text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f4f4f5] to-white/10 select-none">
                {progress < 10 ? `0${progress}` : progress}
              </span>
              <span className="font-mono text-3xl sm:text-6xl text-[#ccff00] font-light">%</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
