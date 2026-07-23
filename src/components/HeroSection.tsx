'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const roles = [
  'Full-Stack Developer',
  'SaaS Builder',
  'Game Creator',
  'UI/UX Craftsman',
  'Entrepreneur',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentRole = roles[roleIndex];

    if (typing) {
      if (displayed.length < currentRole.length) {
        timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Animated orbs */}
      <div className="orb w-96 h-96 bg-accent top-1/4 left-1/4" style={{ animationDelay: '0s' }} />
      <div className="orb w-80 h-80 bg-purple-400 bottom-1/4 right-1/4" style={{ animationDelay: '3s' }} />
      <div className="orb w-60 h-60 bg-cyan-500 top-1/2 right-1/3" style={{ animationDelay: '6s' }} />

      {/* Radial fade overlay */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, #0a0a0f 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent-glow text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for projects
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6"
        >
          <span className="text-text">Building</span>
          <br />
          <span className="gradient-text glow-text">Digital Experiences</span>
          <br />
          <span className="text-text">That Matter</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl font-mono text-muted mb-8 h-8"
        >
          <span className="text-accent-bright">{'> '}</span>
          <span className="text-text typing-cursor">{displayed}</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Crafting high-performance web apps, SaaS platforms, and games from{' '}
          <span className="text-accent-glow font-medium">Griffin, Georgia</span>. I turn bold ideas into production-ready digital products.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="group px-8 py-4 bg-accent hover:bg-accent-bright text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-1 flex items-center gap-2"
          >
            View My Work
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-border hover:border-accent/50 text-text hover:text-accent-glow font-semibold rounded-xl transition-all duration-200 hover:bg-accent/5 hover:-translate-y-1"
          >
            Start a Project
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-xs font-mono"
        >
          <span className="tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
