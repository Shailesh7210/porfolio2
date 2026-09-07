"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import FlightSection from './FlightSection';

const PROJECTS = [
  {
    number: '01',
    title: 'NGO Clothes Donation Platform (Threads of Hope)',
    category: 'FULL STACK / MERN STACK',
    description:
      'A full-stack donation orchestration platform connecting individual donors with verified NGOs. Reduced manual follow-ups by 50% and optimized RESTful APIs for 35% faster response times.',
    techStack: ['ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB', 'REST APIs'],
    github: 'https://github.com/shailjaiswal9135/threads-of-hope',
    live: 'https://threads-of-hope.example.com',
    gradient: 'from-violet-900/40 via-purple-900/20 to-gray-950',
    accent: '#a78bfa',
  },
  {
    number: '02',
    title: 'Real Time Multi-Room Chat System',
    category: 'REAL-TIME MERN / SOCKET.IO',
    description:
      'High-throughput real-time messaging application supporting 50+ concurrent users with active presence, JWT authentication, and 30% reduced socket payload latency.',
    techStack: ['ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB', 'Socket.IO', 'ChakraUI'],
    github: 'https://github.com/shailjaiswal9135/realtime-chat',
    live: 'https://chat-app.example.com',
    gradient: 'from-blue-900/40 via-cyan-900/20 to-gray-950',
    accent: '#00f0ff',
  },
  {
    number: '03',
    title: 'Text-to-Image AI Studio',
    category: 'GEN AI / CREATIVE ENGINE',
    description:
      'Full-stack generative AI image studio powered by ClipDrop API & Razorpay payments (100+ transactions), enhanced with GSAP and Framer Motion micro-interactions.',
    techStack: ['ReactJS', 'Vite', 'NodeJS', 'ClipDrop API', 'GSAP', 'Framer Motion', 'Razorpay'],
    github: 'https://github.com/shailjaiswal9135/text-to-image',
    live: 'https://text-image-gen.example.com',
    gradient: 'from-emerald-900/40 via-teal-900/20 to-gray-950',
    accent: '#ccff00',
  },
  {
    number: '04',
    title: 'Multi-Agent Pinecone RAG Platform',
    category: 'AI AGENTS / VECTOR DB',
    description:
      'Enterprise Retrieval-Augmented Generation platform utilizing LangGraph multi-agent orchestration, Pinecone vector embeddings, and OpenAI APIs for semantic document intelligence.',
    techStack: ['Next.js', 'LangGraph', 'LangChain', 'Pinecone', 'OpenAI', 'TypeScript'],
    github: 'https://github.com/shailjaiswal9135/rag-agent-platform',
    live: 'https://rag-platform.example.com',
    gradient: 'from-amber-900/40 via-orange-900/20 to-gray-950',
    accent: '#f59e0b',
  },
];

export default function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-32 px-6 sm:px-12 border-t border-white/5 bg-noise overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <FlightSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 font-mono text-xs text-[#ccff00] uppercase tracking-widest">
              <span>// 03. SELECTED WORKS</span>
              <div className="h-[1px] w-24 bg-[#ccff00]/30"></div>
            </div>
            <h2 className="text-display-sub font-extrabold tracking-tighter text-[#f4f4f5]">
              PROJECT SHOWCASE<span className="text-[#ccff00]">.</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-[#888890] max-w-xs">
            PRODUCTION WEB APPLICATIONS & ARTIFICIAL INTELLIGENCE ECOSYSTEMS.
          </p>
        </FlightSection>

        {/* Projects List with 3D Z-Axis Open Space Flight Reveal */}
        <div className="space-y-24">
          {PROJECTS.map((project) => (
            <FlightSection key={project.number} depth={-650}>
              <div
                className="glass-panel rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group relative overflow-hidden transition-all duration-500 hover:border-white/25"
                data-cursor="PROJECT"
              >
                {/* Card Left: Project Visual Graphic Canvas Preview */}
                <div
                  className={`lg:col-span-6 h-72 sm:h-96 rounded-2xl bg-gradient-to-br ${project.gradient} border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500`}
                >
                  {/* Background Grid Accent */}
                  <div className="absolute inset-0 bg-noise opacity-40"></div>
                  <div className="absolute -right-8 -bottom-8 font-mono font-black text-9xl text-white/[0.04] select-none">
                    {project.number}
                  </div>

                  <div className="flex items-center justify-between relative z-10">
                    <span className="font-mono text-xs font-bold tracking-widest text-white/60">
                      [{project.number}]
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-black"
                      style={{ backgroundColor: project.accent }}
                    >
                      {project.category.split('/')[0]}
                    </span>
                  </div>

                  <div className="relative z-10 space-y-2">
                    <h4 className="font-mono text-xs text-white/50 uppercase tracking-widest">
                      FEATURED CASE STUDY
                    </h4>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Right: Metadata & Details */}
                <div className="lg:col-span-6 space-y-6 lg:pl-6">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#888890] uppercase tracking-wider">
                    <span className="text-[#ccff00]">●</span>
                    <span>{project.category}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f4f4f5] group-hover:text-[#ccff00] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-[#888890] text-sm sm:text-base leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md border border-white/10 bg-white/5 font-mono text-xs text-[#888890]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-6 pt-4 border-t border-white/5 font-mono text-xs">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#888890] hover:text-white transition-colors"
                        data-cursor="GITHUB"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        <span>SOURCE CODE</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#ccff00] hover:underline transition-all ml-auto font-bold"
                        data-cursor="LIVE"
                      >
                        <span>LIVE DEMO</span>
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FlightSection>
          ))}
        </div>
      </div>
    </section>
  );
}
