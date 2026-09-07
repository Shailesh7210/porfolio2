"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ArrowUpRight, Cpu, Layers, Sparkles } from 'lucide-react';

export default function FeaturedProject() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Scale background visual card
      pinTl.to(imageRef.current, {
        scale: 1.15,
        borderRadius: '24px',
        ease: 'none',
      })
      // 2. Reveal metadata overlay & update progress
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
        },
        '<'
      )
      .to(
        progressRef.current,
        {
          scaleX: 1,
          ease: 'none',
        },
        '<'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[#070708] overflow-hidden flex items-center justify-center border-t border-white/5"
    >
      <div
        ref={containerRef}
        className="w-full h-full p-6 sm:p-16 flex flex-col justify-between relative z-10"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between font-mono text-xs text-[#888890]">
          <div className="flex items-center gap-2 text-[#ccff00]">
            <Sparkles size={14} />
            <span className="font-bold uppercase tracking-widest">// FEATURED IMMERSIVE SHOWCASE</span>
          </div>
          <span className="hidden sm:inline uppercase">PINNED 100VH EXPERIENCE</span>
        </div>

        {/* Center Visual Pinned Image Card */}
        <div
          ref={imageRef}
          className="my-auto w-full h-[65vh] rounded-3xl bg-gradient-to-br from-violet-950 via-slate-900 to-black border border-white/10 p-8 sm:p-16 flex flex-col justify-between relative overflow-hidden shadow-2xl transition-all"
          data-cursor="PINNED"
        >
          {/* Ambient Motion Grid */}
          <div className="absolute inset-0 bg-noise opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#ccff00]/10 blur-[120px] pointer-events-none"></div>

          {/* Top Metadata */}
          <div className="flex items-center justify-between relative z-10">
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 font-mono text-xs text-white font-bold">
              AI ENGINE ARCHITECTURE
            </span>
            <span className="font-mono text-xs text-[#ccff00]">05 // IMMERSIVE</span>
          </div>

          {/* Bottom Title & Details */}
          <div ref={textRef} className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ccff00]">
              <Cpu size={14} />
              <span>LANGGRAPH MULTI-AGENT WORKFLOWS</span>
            </div>
            <h2 className="text-display-sub font-extrabold text-white tracking-tighter leading-none">
              Autonomous AI Agent Ecosystem<span className="text-[#ccff00]">.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl">
              Architected a stateful multi-agent system executing parallel reasoning, dynamic vector retrieval (Pinecone RAG), and automated tool execution.
            </p>
          </div>
        </div>

        {/* Bottom Pinned Scroll Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-[#ccff00] origin-left scale-x-0 transition-transform duration-100"
            ></div>
          </div>
          <div className="flex justify-between font-mono text-[10px] text-[#888890]">
            <span>SCROLL TO UNPIN</span>
            <span>100% EXPLORATION</span>
          </div>
        </div>
      </div>
    </section>
  );
}
