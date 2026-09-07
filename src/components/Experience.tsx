"use client";

import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const EXPERIENCES = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Indux Technology',
    period: 'Feb 2026 – Present',
    location: 'Bengaluru, Karnataka',
    details: [
      'Architecting dynamic web applications utilizing Next.js, Node.js, Express, and MongoDB.',
      'Building robust RESTful APIs with Node.js to power real-time data flows and client interfaces.',
      'Integrating external APIs and optimizing Next.js frontend rendering performance and UI responsiveness.',
    ],
    badge: 'PRESENT ROLE',
  },
  {
    role: 'Software Developer Intern',
    company: 'Hashedbit Innovation',
    period: 'Apr 2024 – Jun 2024',
    location: 'Gurgaon, Haryana',
    details: [
      'Developed and maintained full-stack web applications using MongoDB, Express.js, React.js, and Node.js.',
      'Collaborated with senior engineers to design RESTful API architecture and third-party integrations.',
      'Participated in Agile development sprints, daily stand-ups, and peer code reviews.',
    ],
    badge: 'INTERNSHIP',
  },
];

export default function Experience() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-14 sm:space-y-16">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3 font-mono text-xs text-[#ccff00] uppercase tracking-widest">
          <span>// 04. CAREER TIMELINE</span>
          <div className="h-[1px] w-24 bg-[#ccff00]/30"></div>
        </div>
        <h2 className="text-display-sub font-extrabold tracking-tighter text-[#f4f4f5]">
          WORK EXPERIENCE<span className="text-[#ccff00]">.</span>
        </h2>
      </div>

      {/* Timeline Grid */}
      <div className="space-y-8 sm:space-y-10 relative pl-6 border-l border-white/10">
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.company}
            className="glass-panel glass-panel-hover tech-card-corner p-6 sm:p-8 rounded-2xl relative"
            data-cursor="WORK"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-8 w-3 h-3 rounded-full bg-[#ccff00] border-4 border-[#070708]"></div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#f4f4f5]">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#ccff00] font-semibold mt-0.5">
                    <Briefcase size={14} />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-1 font-mono text-xs text-[#888890]">
                  <div className="flex items-center gap-1.5 text-white">
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 font-light text-xs sm:text-sm text-[#888890]">
                {exp.details.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] mt-1.5 shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
