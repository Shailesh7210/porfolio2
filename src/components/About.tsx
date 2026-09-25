"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const statementText = "I build digital experiences that combine engineering, design and motion.";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="w-full max-w-7xl mx-auto space-y-16 sm:space-y-20"
    >
      {/* Section Label */}
      <motion.div variants={itemVariants} className="flex items-center gap-3 font-mono text-xs text-[#ccff00] uppercase tracking-widest">
        <span>// 01. ABOUT PHILOSOPHY</span>
        <div className="h-[1px] w-24 bg-[#ccff00]/30"></div>
      </motion.div>

      {/* Large Statement Word-by-Word Reveal */}
      <motion.div variants={itemVariants}>
        <h2
          className="text-display-sub font-extrabold tracking-tighter text-[#f4f4f5] leading-none max-w-5xl flex flex-wrap gap-x-3 gap-y-2"
          data-cursor="ABOUT"
        >
          {statementText.split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              viewport={{ once: true }}
              className={word === 'engineering,' || word === 'design' || word === 'motion.' ? 'text-[#ccff00]' : ''}
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </motion.div>

      {/* Secondary Profile Details Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-12 border-t border-white/10 items-start"
      >
        <div className="md:col-span-4 font-mono text-xs text-[#888890] uppercase tracking-widest space-y-2">
          <motion.div variants={itemVariants}>EDUCATION & BACKGROUND</motion.div>
          <motion.div variants={itemVariants} className="text-[#f4f4f5] font-bold text-sm">MASTER OF COMPUTER APPLICATION (CGPA 8.8)</motion.div>
        </div>

        <div className="md:col-span-8 space-y-4 text-base sm:text-lg text-[#888890] font-light leading-relaxed">
          <motion.p variants={itemVariants}>
            I am a Full Stack Developer based in Bengaluru with hands-on internship experience at <span className="text-[#f4f4f5] font-medium">Indux Technology</span> and <span className="text-[#f4f4f5] font-medium">Hashedbit Innovation</span>. I specialize in building scalable web applications with Next.js, Node.js, Express, and MongoDB.
          </motion.p>
          <motion.p variants={itemVariants}>
            Beyond traditional full-stack web engineering, I am deeply focused on <span className="text-[#ccff00] font-medium">Generative AI Integration</span>—architecting multi-agent workflows with LangChain & LangGraph, implementing vector retrieval (Pinecone RAG), and solving complex DSA challenges (250+ solved on LeetCode & 4-star HackerRank).
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
