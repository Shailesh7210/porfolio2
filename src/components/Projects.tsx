"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, FolderGit2 } from 'lucide-react';

import ParallaxSection from './ParallaxSection';

interface Project {
  title: string;
  description: string;
  details: string[];
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  category: string;
}

const CATEGORIES = ['All', 'MERN', 'AI'];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="relative py-28 overflow-hidden bg-white/[0.005]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-600/5 blur-[120px] pointer-events-none" />

      <div className="w-[90%] max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4"
          >
            <Sparkles size={12} />
            My Portfolio
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-blue-500 mx-auto mt-4 rounded-full origin-center"
          />
        </div>

        {/* Filters */}
        <div className="flex justify-center items-center gap-3 mb-16">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-emerald-600 to-blue-600 border-transparent text-white shadow-lg shadow-emerald-500/10'
                  : 'bg-white/2 border-white/5 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 animate-spin"></div>
            </div>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ParallaxSection 
                  key={project.title}
                  speed={index % 2 === 0 ? 0.03 : -0.03}
                  className="flex flex-col"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="glassmorphism rounded-3xl border border-white/5 hover:border-white/10 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-600/5 group flex-1"
                  >
                    
                    {/* Card Header Illustration */}
                    <div className="h-40 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-6 flex flex-col justify-between border-b border-white/5 relative overflow-hidden">
                      {/* Abstract shapes */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex justify-between items-center z-10">
                        <div className="p-3 rounded-2xl bg-white/5 text-gray-400 group-hover:text-emerald-400 transition-colors">
                          <FolderGit2 size={24} />
                        </div>
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/5 text-emerald-400">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white leading-tight z-10 group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Description */}
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Bullet details */}
                        <ul className="space-y-2 mb-6">
                          {project.details.slice(0, 2).map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        {/* Tech Stack Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.techStack.map((tech) => (
                            <span 
                              key={tech}
                              className="text-[10px] font-semibold text-gray-400 bg-white/3 border border-white/5 px-2 py-0.5 rounded-md hover:text-white transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                              </svg>
                              Code
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors ml-auto"
                            >
                              Live Demo
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                  </motion.div>
                </ParallaxSection>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
