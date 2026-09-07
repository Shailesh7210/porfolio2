"use client";

import React from 'react';
import { Code2, Bot, Gauge } from 'lucide-react';

const SERVICES = [
  {
    icon: <Code2 className="text-[#ccff00]" size={26} />,
    title: 'Full Stack Web Engineering',
    tag: '01 // WEB',
    description:
      'Designing & building scalable end-to-end web applications with Next.js, React, Node.js, Express, and MongoDB. Optimized RESTful APIs and modern cloud integrations.',
  },
  {
    icon: <Bot className="text-[#00f0ff]" size={26} />,
    title: 'Generative AI & LLM Agents',
    tag: '02 // AI',
    description:
      'Architecting intelligent multi-agent workflows using LangGraph, vector search retrieval (Pinecone RAG), OpenAI API integrations, and tailored prompt engineering.',
  },
  {
    icon: <Gauge className="text-[#a78bfa]" size={26} />,
    title: 'UI Motion & Performance',
    tag: '03 // MOTION',
    description:
      'Creating award-winning digital interactions with GSAP, ScrollTrigger, Lenis smooth scrolling, Three.js WebGL elements, and clamp typography.',
  },
];

export default function Services() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-14 sm:space-y-16">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3 font-mono text-xs text-[#ccff00] uppercase tracking-widest">
          <span>// 05. CAPABILITIES</span>
          <div className="h-[1px] w-24 bg-[#ccff00]/30"></div>
        </div>
        <h2 className="text-display-sub font-extrabold tracking-tighter text-[#f4f4f5]">
          SERVICES & EXPERTISE<span className="text-[#ccff00]">.</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        {SERVICES.map((srv) => (
          <div
            key={srv.title}
            className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6 group h-full"
            data-cursor="SERVICE"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  {srv.icon}
                </div>
                <span className="font-mono text-xs text-[#888890]">
                  {srv.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#f4f4f5] group-hover:text-[#ccff00] transition-colors">
                {srv.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#888890] font-light leading-relaxed">
                {srv.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 font-mono text-xs text-[#888890] group-hover:text-white transition-colors">
              PRODUCTION READY →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
