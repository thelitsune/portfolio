'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const roles = ['Full-Stack Developer','Game Creator','SaaS Builder','UI/UX Engineer','Entrepreneur'];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let t: NodeJS.Timeout;
    const current = roles[roleIdx];
    if (typing) {
      if (displayed.length < current.length) t = setTimeout(()=>setDisplayed(current.slice(0,displayed.length+1)),65);
      else t = setTimeout(()=>setTyping(false),1800);
    } else {
      if (displayed.length > 0) t = setTimeout(()=>setDisplayed(displayed.slice(0,-1)),38);
      else { setRoleIdx(i=>(i+1)%roles.length); setTyping(true); }
    }
    return () => clearTimeout(t);
  },[displayed,typing,roleIdx]);

  return (
    <section className="relative min-h-screen flex items-center justify-center z-10 px-4 sm:px-6">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-25" style={{maskImage:'radial-gradient(ellipse at center, black 20%, transparent 80%)'}} />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-accent2/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 mt-24 sm:mt-28 border-glow-anim"
        >
          <span className="w-2 h-2 rounded-full bg-accent3 animate-pulse" />
          <span className="text-xs font-mono text-muted tracking-widest uppercase">Available for projects</span>
        </motion.div>

        <motion.h1
          initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.35, ease:[0.22,1,0.36,1] }}
          className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 leading-none tracking-tight"
        >
          Building
          <br />
          <span className="gradient-text glow-text">Digital Experiences</span>
          <br />
          That Matter
        </motion.h1>

        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
          className="flex items-center justify-center gap-3 mb-8 h-10"
        >
          <span className="text-muted text-base sm:text-lg font-light">I am a</span>
          <span className="text-accent text-base sm:text-lg font-mono font-medium">{displayed}<span className="animate-pulse">|</span></span>
        </motion.div>

        <motion.p
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.75 }}
          className="text-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed px-2"
        >
          Crafting high-performance web apps, SaaS platforms, and games from Griffin, Georgia.
          I turn bold ideas into production-ready digital products.
        </motion.p>

        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#projects" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto justify-center">
            <span>View My Work</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </a>
          <a href="#contact" className="text-sm font-medium text-muted hover:text-accent transition-colors border border-border hover:border-accent/40 rounded-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto text-center">
            Start a Project →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:0.35 }} transition={{ delay:1.2 }}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono text-muted tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
