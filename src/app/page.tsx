"use client";

import React, { useState } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import WebGLBackground from '@/components/WebGLBackground';
import Navbar from '@/components/Navbar';
import SpatialDeck from '@/components/SpatialDeck';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import SingleProjectSlide, { ProjectData } from '@/components/SingleProjectSlide';
import Experience from '@/components/Experience';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import AIChatbot from '@/components/AIChatbot';

const PROJECTS: ProjectData[] = [
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

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const deckSections = [
    { id: 'hero', label: 'Hero', component: <Hero ready={preloaderDone} /> },
    { id: 'about', label: 'About', component: <About /> },
    { id: 'skills', label: 'Skills', component: <Skills /> },
    {
      id: 'project-1',
      label: 'NGO Threads of Hope',
      component: <SingleProjectSlide project={PROJECTS[0]} />,
    },
    {
      id: 'project-2',
      label: 'Realtime Chat System',
      component: <SingleProjectSlide project={PROJECTS[1]} />,
    },
    {
      id: 'project-3',
      label: 'Text-to-Image AI',
      component: <SingleProjectSlide project={PROJECTS[2]} />,
    },
    {
      id: 'project-4',
      label: 'Pinecone RAG Platform',
      component: <SingleProjectSlide project={PROJECTS[3]} />,
    },
    { id: 'experience', label: 'Experience', component: <Experience /> },
    { id: 'services', label: 'Services', component: <Services /> },
    { id: 'contact', label: 'Contact', component: <Contact /> },
  ];

  return (
    <SmoothScroll>
      {/* 1. Cinematic Sequential Preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* 2. Three.js 3D Open Space Cosmic Sky & Orbiting Tech Stack Planets */}
      <WebGLBackground />

      {/* 3. Context Cursor */}
      <CustomCursor />

      {/* 4. Navbar */}
      <Navbar />

      {/* 5. Single Viewport 3D Z-Axis Section Flight Deck */}
      <main className="relative z-10 min-h-screen bg-transparent text-[#f4f4f5]">
        <SpatialDeck sections={deckSections} />
      </main>

      {/* 6. AI Assistant Chatbot Overlay */}
      <AIChatbot />
    </SmoothScroll>
  );
}
