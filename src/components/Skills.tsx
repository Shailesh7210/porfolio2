"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    number: '01',
    category: 'FRONTEND & UI ENGINEERING',
    skills: ['React.js', 'Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'HTML5/SCSS'],
    accent: '#ccff00',
  },
  {
    number: '02',
    category: 'BACKEND & DATABASE',
    skills: ['Node.js', 'Express.js', 'MongoDB (Mongoose)', 'PostgreSQL', 'RESTful APIs', 'JWT Auth', 'Socket.IO'],
    accent: '#00f0ff',
  },
  {
    number: '03',
    category: 'GEN AI & LLM AGENTS',
    skills: ['OpenAI API', 'LangChain', 'LangGraph (Agents)', 'Pinecone Vector DB', 'RAG Architecture', 'Prompt Engineering'],
    accent: '#a78bfa',
  },
  {
    number: '04',
    category: 'TOOLS & INFRASTRUCTURE',
    skills: ['Git & GitHub', 'Docker', 'AWS Basics', 'Postman', 'VS Code', 'Linux/Bash', 'Vite'],
    accent: '#34d399',
  },
];

export default function Skills() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35, scale: 0.96, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="w-full max-w-7xl mx-auto space-y-14 sm:space-y-16"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="flex items-center gap-3 font-mono text-xs text-[#ccff00] uppercase tracking-widest">
            <span>// 02. TECHNOLOGY STACK</span>
            <div className="h-[1px] w-24 bg-[#ccff00]/30"></div>
          </div>
          <h2 className="text-display-sub font-extrabold tracking-tighter text-[#f4f4f5]">
            {"CORE CAPABILITIES".split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                viewport={{ once: true }}
              >
                {char}
              </motion.span>
            ))}
            <span className="text-[#ccff00]">.</span>
          </h2>
        </motion.div>
        <motion.p variants={itemVariants} className="font-mono text-xs text-[#888890] max-w-xs leading-relaxed">
          PROFICIENT ACROSS FULL STACK SOFTWARE DEVELOPMENT & ARTIFICIAL INTELLIGENCE ECOSYSTEMS.
        </motion.p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {SKILL_CATEGORIES.map((cat) => (
          <motion.div
            key={cat.category}
            variants={itemVariants}
            className="glass-panel glass-panel-hover tech-card-corner p-6 sm:p-8 rounded-2xl relative overflow-hidden group"
            data-cursor="STACK"
          >
            {/* Background Oversized Category Number */}
            <span className="absolute -right-4 -bottom-6 font-mono font-extrabold text-[8rem] leading-none text-white/[0.03] select-none group-hover:text-white/[0.06] transition-colors">
              {cat.number}
            </span>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold tracking-widest text-[#888890]">
                  [{cat.number}]
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                  style={{ backgroundColor: cat.accent, color: cat.accent }}
                ></span>
              </div>

              <h3 className="font-mono text-xs sm:text-sm font-extrabold tracking-wider text-[#f4f4f5] uppercase">
                {cat.category}
              </h3>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {cat.skills.map((skill, sIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: sIdx * 0.04 }}
                    viewport={{ once: true }}
                    className="px-3 py-1.5 rounded-md border border-white/10 bg-white/5 hover:border-[#ccff00] hover:bg-[#ccff00]/10 hover:text-[#ccff00] font-mono text-xs font-medium text-[#f4f4f5] transition-all duration-300 cursor-pointer"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
