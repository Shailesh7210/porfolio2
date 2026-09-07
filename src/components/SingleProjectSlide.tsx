"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface ProjectData {
  number: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  github?: string;
  live?: string;
  gradient: string;
  accent: string;
}

export default function SingleProjectSlide({ project }: { project: ProjectData }) {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 sm:space-y-12">
      {/* Slide Sub-Header */}
      <div className="flex items-center justify-between font-mono text-xs text-[#ccff00] uppercase tracking-widest">
        <span>// SELECTED PROJECT [{project.number} / 04]</span>
        <span>{project.category}</span>
      </div>

      {/* Main Project Card */}
      <div
        className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center group relative overflow-hidden"
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
    </div>
  );
}
