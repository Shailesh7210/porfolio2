"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Terminal, Bot } from 'lucide-react';

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
    const duration = 6000; // 6s smooth loading duration for ample reading time

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      const easeProgress = Math.round((1 - Math.pow(1 - progressRatio, 2.2)) * 100);
      setProgress(easeProgress);

      if (progressRatio < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        // Generous 1.2s hold pause at 100% so everything stays on screen
        setTimeout(() => {
          setIsComplete(true);
          document.body.style.overflow = 'unset';
          onComplete();
        }, 1200);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  // Stage content mapping
  let phaseTitle = "HI, I AM";
  let phaseTag = "01 // FRONTEND & CREATIVE";
  let Icon = Code2;
  let phaseTech = "NEXT.JS 16 • REACT • TYPESCRIPT • TAILWIND • GSAP";
  let iconAccent = "#ccff00";

  if (progress >= 33 && progress < 66) {
    phaseTitle = "SHAILESH JAISWAL";
    phaseTag = "02 // BACKEND & SCALABLE SYSTEMS";
    Icon = Terminal;
    phaseTech = "NODE.JS • EXPRESS • MONGODB • REST APIS • SOCKET.IO";
    iconAccent = "#00f0ff";
  } else if (progress >= 66) {
    phaseTitle = "FULL STACK DEVELOPER";
    phaseTag = "03 // GENERATIVE AI & AGENTS";
    Icon = Bot;
    phaseTech = "OPENAI API • LANGCHAIN • LANGGRAPH • PINECONE RAG";
    iconAccent = "#a78bfa";
  }

  const gateTransition = {
    duration: 1.2,
    ease: [0.85, 0, 0.15, 1] as const,
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <div className="fixed inset-0 z-[100] select-none pointer-events-auto overflow-hidden bg-[#040507]">
          
          {/* LEFT OPENING GATE DOOR */}
          <motion.div
            initial={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={gateTransition}
            className="absolute top-0 left-0 w-full lg:w-1/2 h-1/2 lg:h-full bg-[#07070a] bg-noise border-r border-white/10 z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-14"
          >
            {/* Top Left Header Branding */}
            <div className="flex items-center justify-between font-mono text-xs tracking-widest text-[#888890] uppercase">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-ping" />
                <span className="text-[#f4f4f5] font-bold">SHAILESH JAISWAL</span>
              </div>
              <span className="text-[#ccff00] font-semibold hidden sm:inline">PORTFOLIO // V2.0</span>
            </div>

            {/* Center Left Development Card (Balanced Alignment) */}
            <div className="my-auto w-full max-w-md mx-auto lg:mr-8 lg:ml-auto space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phaseTag}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-3"
                >
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border border-white/15 bg-white/5 font-mono text-xs text-[#888890] uppercase tracking-wider backdrop-blur-md">
                    <div style={{ color: iconAccent }}>
                      <Icon size={18} />
                    </div>
                    <span className="text-[#f4f4f5] font-bold">{phaseTag}</span>
                  </div>

                  <div className="p-4 rounded-2xl glass-panel font-mono text-xs text-[#ccff00] leading-relaxed border border-white/10 shadow-lg">
                    <span className="text-[#888890] block text-[10px] uppercase tracking-widest mb-1">// ACTIVE TECH STACK:</span>
                    {phaseTech}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Left Spacer for Center Loader Alignment */}
            <div className="h-16 hidden lg:block" />
          </motion.div>

          {/* RIGHT OPENING GATE DOOR */}
          <motion.div
            initial={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={gateTransition}
            className="absolute bottom-0 right-0 w-full lg:w-1/2 h-1/2 lg:h-full bg-[#07070a] bg-noise border-l border-white/10 z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-14"
          >
            {/* Top Right Metadata */}
            <div className="flex items-center justify-end font-mono text-xs tracking-widest text-[#888890] uppercase">
              <span className="text-[#ccff00]">BENGALURU, INDIA</span>
            </div>

            {/* Center Right Editorial Title (Balanced Alignment) */}
            <div className="my-auto w-full max-w-md mx-auto lg:ml-8 lg:mr-auto flex items-center min-h-[100px]">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={phaseTitle}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-extrabold text-3xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight uppercase text-[#f4f4f5] font-mono leading-tight"
                >
                  {phaseTitle}
                  <span style={{ color: iconAccent }}>.</span>
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Bottom Right Spacer for Center Loader Alignment */}
            <div className="h-16 hidden lg:block" />
          </motion.div>

          {/* CENTERED OVERLAY: LOADER BAR + 0 TO 100% PERCENTAGE COUNTER */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.4 } }}
            className="absolute inset-x-0 bottom-6 sm:bottom-10 lg:bottom-12 z-30 flex flex-col items-center justify-center text-center pointer-events-none px-4"
          >
            {/* Big Centered Percentage Counter */}
            <div className="relative flex items-baseline justify-center font-mono mb-2">
              <span className="font-extrabold tracking-tighter text-6xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f4f4f5] to-white/20 drop-shadow-[0_0_25px_rgba(204,255,0,0.2)]">
                {progress < 10 ? `0${progress}` : progress}
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl text-[#ccff00] font-light ml-1.5">%</span>
            </div>

            {/* Centered Progress Loader Bar */}
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg space-y-2 font-mono">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative p-[1px] border border-white/10 backdrop-blur-md">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00f0ff] via-[#ccff00] to-[#a78bfa] rounded-full shadow-[0_0_15px_#ccff00]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#888890] tracking-widest uppercase px-1">
                <span>SYSTEM INITIALIZATION</span>
                <span className="text-[#ccff00] font-semibold">{progress === 100 ? "READY" : "LOADING..."}</span>
              </div>
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
