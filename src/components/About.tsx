"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const words = textRef.current?.innerText.split(' ') || [];
      if (textRef.current) {
        textRef.current.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block opacity-20 transition-opacity duration-300 mr-2 sm:mr-3">${word}</span>`
          )
          .join('');
      }

      const spans = textRef.current?.querySelectorAll('span');
      if (spans && spans.length > 0) {
        gsap.to(spans, {
          opacity: 1,
          stagger: 0.08,
          ease: 'power2.out',
          duration: 0.8,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-7xl mx-auto space-y-16 sm:space-y-20"
    >
      {/* Section Label */}
      <div className="flex items-center gap-3 font-mono text-xs text-[#ccff00] uppercase tracking-widest">
        <span>// 01. ABOUT PHILOSOPHY</span>
        <div className="h-[1px] w-24 bg-[#ccff00]/30"></div>
      </div>

      {/* Large Statement Reveal */}
      <div>
        <h2
          ref={textRef}
          className="text-display-sub font-extrabold tracking-tighter text-[#f4f4f5] leading-none max-w-5xl"
          data-cursor="ABOUT"
        >
          I build digital experiences that combine engineering, design and motion.
        </h2>
      </div>

      {/* Secondary Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-12 border-t border-white/10 items-start">
        <div className="md:col-span-4 font-mono text-xs text-[#888890] uppercase tracking-widest space-y-2">
          <div>EDUCATION & BACKGROUND</div>
          <div className="text-[#f4f4f5] font-bold text-sm">MASTER OF COMPUTER APPLICATION (CGPA 8.8)</div>
        </div>

        <div className="md:col-span-8 space-y-4 text-base sm:text-lg text-[#888890] font-light leading-relaxed">
          <p>
            I am a Full Stack Developer based in Bengaluru with hands-on internship experience at <span className="text-[#f4f4f5] font-medium">Indux Technology</span> and <span className="text-[#f4f4f5] font-medium">Hashedbit Innovation</span>. I specialize in building scalable web applications with Next.js, Node.js, Express, and MongoDB.
          </p>
          <p>
            Beyond traditional full-stack web engineering, I am deeply focused on <span className="text-[#ccff00] font-medium">Generative AI Integration</span>—architecting multi-agent workflows with LangChain & LangGraph, implementing vector retrieval (Pinecone RAG), and solving complex DSA challenges (250+ solved on LeetCode & 4-star HackerRank).
          </p>
        </div>
      </div>
    </div>
  );
}
