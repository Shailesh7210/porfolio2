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
    const duration = 5800; // 5.8s loading duration

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      const easeProgress = Math.round((1 - Math.pow(1 - progressRatio, 2.2)) * 100);
      setProgress(easeProgress);

      if (progressRatio < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        // Hold pause at 100% for smooth reading
        setTimeout(() => {
          setIsComplete(true);
          document.body.style.overflow = 'unset';
          onComplete();
        }, 1100);
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
          
          {/* LEFT DUAL OPENING GATE DOOR */}
          <motion.div
            initial={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={gateTransition}
            className="absolute top-0 left-0 w-1/2 h-full bg-[#07070a] bg-noise border-r border-white/10 z-10"
          />

          {/* RIGHT DUAL OPENING GATE DOOR */}
          <motion.div
            initial={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={gateTransition}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#07070a] bg-noise border-l border-white/10 z-10"
          />

          {/* BALANCED CENTERED PRELOADER CONTENT OVERLAY */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06, filter: 'blur(12px)', transition: { duration: 0.5 } }}
            className="absolute inset-0 z-30 flex flex-col justify-between p-6 sm:p-10 lg:p-14 pointer-events-none"
          >
            {/* Top Bar Metadata */}
            <div className="w-full flex items-center justify-between font-mono text-xs tracking-widest text-[#888890] uppercase border-b border-white/5 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-ping" />
                <span className="text-[#f4f4f5] font-bold">SHAILESH JAISWAL</span>
              </div>
              <span className="text-[#ccff00] font-semibold hidden md:inline">PORTFOLIO // 2026</span>
              <span className="text-[#888890]">BENGALURU, IN</span>
            </div>

            {/* Main Center Stage Content */}
            <div className="my-auto w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-6">
              
              {/* Dynamic Phase Tag Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={phaseTag}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/5 font-mono text-xs text-[#888890] uppercase tracking-widest backdrop-blur-md shadow-lg"
                >
                  <div style={{ color: iconAccent }}>
                    <Icon size={18} />
                  </div>
                  <span className="text-[#f4f4f5] font-bold">{phaseTag}</span>
                </motion.div>
              </AnimatePresence>

              {/* Dynamic Big Editorial Title */}
              <div className="min-h-[90px] sm:min-h-[120px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={phaseTitle}
                    initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -25, filter: 'blur(10px)' }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase text-[#f4f4f5] font-mono leading-none"
                  >
                    {phaseTitle}
                    <span style={{ color: iconAccent }}>.</span>
                  </motion.h1>
                </AnimatePresence>
              </div>

              {/* Active Tech Stack Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={phaseTech}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="w-full max-w-xl p-4 rounded-2xl glass-panel font-mono text-xs text-[#ccff00] leading-relaxed border border-white/10 shadow-xl"
                >
                  <span className="text-[#888890] block text-[10px] uppercase tracking-widest mb-1.5">// ACTIVE TECH STACK:</span>
                  {phaseTech}
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Bottom Centered Telemetry & Loader */}
            <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center text-center space-y-3 font-mono">
              
              {/* Giant Digital Percentage Counter */}
              <div className="relative flex items-baseline justify-center">
                <span className="font-extrabold tracking-tighter text-6xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f4f4f5] to-white/20 drop-shadow-[0_0_30px_rgba(204,255,0,0.25)]">
                  {progress < 10 ? `0${progress}` : progress}
                </span>
                <span className="text-3xl sm:text-4xl md:text-5xl text-[#ccff00] font-light ml-2">%</span>
              </div>

              {/* Progress Line */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative p-[1px] border border-white/10 backdrop-blur-md shadow-lg">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00f0ff] via-[#ccff00] to-[#a78bfa] rounded-full shadow-[0_0_16px_#ccff00]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Telemetry Status Line */}
              <div className="w-full flex items-center justify-between text-[11px] text-[#888890] tracking-widest uppercase px-1">
                <span>SYSTEM INITIALIZATION</span>
                <span className="text-[#ccff00] font-bold">{progress === 100 ? "READY" : "LOADING..."}</span>
              </div>

            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
