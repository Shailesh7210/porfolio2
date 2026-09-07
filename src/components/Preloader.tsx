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
    // Lock body scroll during loading phase
    document.body.style.overflow = 'hidden';

    let frameId: number;
    let startTimestamp: number | null = null;
    const duration = 2400; // 2.4s smooth progress timing

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      // Smooth cubic easing for percentage progression
      const easeProgress = Math.round((1 - Math.pow(1 - progressRatio, 3)) * 100);
      setProgress(easeProgress);

      if (progressRatio < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setIsComplete(true);
          document.body.style.overflow = 'unset';
          onComplete();
        }, 300);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  // Determine current intro phrase based on loading progression window
  let currentPhrase = "HI, I AM";
  if (progress >= 35 && progress < 70) {
    currentPhrase = "SHAILESH JAISWAL";
  } else if (progress >= 70) {
    currentPhrase = "FULL STACK DEVELOPER";
  }

  const gateTransition = {
    duration: 1.1,
    ease: [0.85, 0, 0.15, 1] as const,
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <div className="fixed inset-0 z-[100] select-none pointer-events-auto flex overflow-hidden">
          {/* Left Opening Gate Panel */}
          <motion.div
            initial={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={gateTransition}
            className="w-1/2 h-full bg-[#070708] bg-noise border-r border-[#ccff00]/30 relative z-20 flex flex-col justify-between p-6 sm:p-12"
          >
            {/* Top Left Branding */}
            <div className="font-mono text-xs tracking-widest text-[#888890] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping"></span>
              <span>SHAILESH JAISWAL</span>
            </div>

            {/* Bottom Info Left */}
            <div className="font-mono text-[10px] sm:text-xs text-[#888890] uppercase">
              <span>SYSTEM INITIALIZING // 2026</span>
            </div>
          </motion.div>

          {/* Right Opening Gate Panel */}
          <motion.div
            initial={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={gateTransition}
            className="w-1/2 h-full bg-[#070708] bg-noise border-l border-[#ccff00]/30 relative z-20 flex flex-col justify-between p-6 sm:p-12"
          >
            {/* Top Right Status */}
            <div className="font-mono text-xs tracking-widest text-[#ccff00] uppercase text-right">
              <span>PORTFOLIO OS // V2.0</span>
            </div>

            {/* Bottom Info Right */}
            <div className="font-mono text-[10px] sm:text-xs text-[#888890] uppercase text-right">
              <span>BENGALURU, INDIA</span>
            </div>
          </motion.div>

          {/* Center Stage Floating Content (Layered over the opening gates) */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 pointer-events-none"
          >
            {/* Animated Sequential Intro Phrase */}
            <div className="h-16 sm:h-24 overflow-hidden mb-2 text-center">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentPhrase}
                  initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -40, opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                  className="font-extrabold text-3xl sm:text-6xl md:text-7xl tracking-tighter uppercase text-[#ccff00] font-mono drop-shadow-[0_0_25px_rgba(204,255,0,0.3)]"
                >
                  {currentPhrase}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Giant 0-100% Loading Counter */}
            <div className="flex items-baseline justify-center">
              <span className="font-extrabold tracking-tighter text-[16vw] sm:text-[14vw] leading-none font-mono text-[#f4f4f5]">
                {progress < 10 ? `0${progress}` : progress}
              </span>
              <span className="font-mono text-3xl sm:text-6xl text-[#ccff00] font-light">%</span>
            </div>

            {/* Center Gate Seam Laser Line */}
            <div className="w-64 max-w-full h-[2px] bg-gradient-to-r from-transparent via-[#ccff00] to-transparent mt-4 opacity-80 animate-pulse"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
