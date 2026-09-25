"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Send, Mail, Phone, MapPin, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setFeedback('Please fill out all required fields.');
      return;
    }

    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFeedback(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setFeedback(data.error || 'Failed to send message.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setFeedback('A network error occurred. Please try again.');
    }
  };

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
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const titleWords = "LET'S BUILD SOMETHING".split(' ');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="w-full max-w-7xl mx-auto space-y-12 sm:space-y-16"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center gap-3 font-mono text-xs text-[#ccff00] uppercase tracking-widest">
        <span>// 06. CONTACT</span>
        <div className="h-[1px] w-24 bg-[#ccff00]/30"></div>
      </motion.div>

      {/* Huge Title Word-by-Word Reveal */}
      <motion.div variants={itemVariants}>
        <h2
          className="text-display-sub font-extrabold tracking-tighter text-[#f4f4f5] leading-none max-w-4xl flex flex-wrap gap-x-3 gap-y-1"
          data-cursor="CONTACT"
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              {word}
            </motion.span>
          ))}
          <span className="text-[#ccff00]">.</span>
        </h2>
      </motion.div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-white/10">
        {/* Direct Details */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-4 font-mono text-xs">
          <p className="text-sm sm:text-base text-[#888890] font-light max-w-md font-sans">
            Available for full-stack engineering roles, freelance agency partnerships, and AI agent workflow implementations.
          </p>

          <a
            href="mailto:shailjaiswal9135@gmail.com"
            className="glass-panel glass-panel-hover p-4 rounded-xl flex items-center justify-between group"
            data-cursor="EMAIL"
          >
            <div className="flex items-center gap-3">
              <Mail className="text-[#ccff00]" size={18} />
              <span className="text-[#f4f4f5]">shailjaiswal9135@gmail.com</span>
            </div>
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          <a
            href="tel:+916206948554"
            className="glass-panel glass-panel-hover p-4 rounded-xl flex items-center justify-between group"
            data-cursor="CALL"
          >
            <div className="flex items-center gap-3">
              <Phone className="text-[#00f0ff]" size={18} />
              <span className="text-[#f4f4f5]">+91 6206948554</span>
            </div>
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          <div className="glass-panel p-4 rounded-xl flex items-center gap-3 text-[#888890]">
            <MapPin className="text-[#a78bfa]" size={18} />
            <span>Bengaluru, Karnataka, India</span>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants} className="lg:col-span-7">
          <div className="glass-panel tech-card-corner p-6 sm:p-8 rounded-2xl space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 font-mono text-[11px]">
                  <label className="text-[#888890] uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#ccff00] text-[#f4f4f5] placeholder-[#888890] outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1 font-mono text-[11px]">
                  <label className="text-[#888890] uppercase">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#ccff00] text-[#f4f4f5] placeholder-[#888890] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1 font-mono text-[11px]">
                <label className="text-[#888890] uppercase">Message *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your vision..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#ccff00] text-[#f4f4f5] placeholder-[#888890] outline-none transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle size={14} />
                  <span>{feedback}</span>
                </div>
              )}

              {status === 'success' && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 size={14} />
                  <span>{feedback}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl bg-[#ccff00] text-black font-mono text-xs font-extrabold uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#ccff00]/10 flex items-center justify-center gap-2 cursor-pointer"
                data-cursor="SEND"
              >
                {status === 'loading' ? (
                  <span>SENDING MESSAGE...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>DISPATCH MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
