"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Cpu, User, ArrowUpRight } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

const PRESET_QUESTIONS = [
  "What is his experience in GenAI?",
  "Tell me about his MERN projects.",
  "What is his education background?",
  "How can I contact Shailesh?",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Hi! I am Shailesh's AI resume assistant. Ask me anything about his skills, projects, work experience, or education!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: ChatMessage = { sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      const botMessage: ChatMessage = { 
        sender: 'bot', 
        text: data.response || "Sorry, I couldn't process that right now. Please try again."
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { sender: 'bot', text: "I ran into a connection issue. Feel free to contact Shailesh directly at shailjaiswal9135@gmail.com!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, rotate: isOpen ? -90 : 10 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white shadow-2xl flex items-center justify-center cursor-pointer border border-white/10 group focus:outline-none"
        >
          {/* Pulsing indicator */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500"></span>
          </span>

          {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[380px] h-[500px] rounded-3xl border border-white/10 bg-gray-950/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col justify-between"
          >
            
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center shadow-inner">
                  <Cpu size={18} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">Shailesh&apos;s AI Assistant</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="text-[10px] text-gray-400 font-medium font-mono">Agent Active</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => {
                const isBot = msg.sender === 'bot';

                return (
                  <div key={index} className={`flex items-start gap-2.5 ${!isBot ? 'flex-row-reverse' : ''}`}>
                    {/* Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold border ${
                      isBot 
                        ? 'bg-violet-600/10 border-violet-500/10 text-violet-400' 
                        : 'bg-blue-600/10 border-blue-500/10 text-blue-400'
                    }`}>
                      {isBot ? <Cpu size={14} /> : <User size={14} />}
                    </div>

                    {/* Balloon */}
                    <div className={`max-w-[75%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isBot
                        ? 'bg-white/5 text-gray-200 rounded-tl-sm border border-white/5'
                        : 'bg-gradient-to-tr from-violet-600 to-blue-600 text-white rounded-tr-sm shadow-md'
                    }`}>
                      {msg.text.split('\n').map((line, lIdx) => (
                        <p key={lIdx} className={lIdx > 0 ? 'mt-1.5' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Typing bubble */}
              {loading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-violet-600/10 border border-violet-500/10 text-violet-400 text-xs">
                    <Cpu size={14} />
                  </div>
                  <div className="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions & Input Container */}
            <div className="p-4 bg-white/[0.02] border-t border-white/5 space-y-3">
              
              {/* Presets suggestions */}
              {messages.length === 1 && (
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Suggested Queries</p>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] text-gray-300 font-medium flex items-center gap-1 transition-all cursor-pointer"
                      >
                        {q}
                        <ArrowUpRight size={10} className="text-gray-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Shailesh's resume..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 focus:border-violet-500/50 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || loading}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-gray-800 disabled:text-gray-600 text-white shadow shadow-violet-500/10 cursor-pointer transition-all flex items-center justify-center focus:outline-none"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
