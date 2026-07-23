'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['About','Projects','Skills','Contact'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      links.forEach(l => {
        const s = document.getElementById(l.toLowerCase());
        if (s) { const r = s.getBoundingClientRect(); if (r.top <= 120 && r.bottom >= 120) setActive(l.toLowerCase()); }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-border/50 shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-lg sm:text-xl tracking-tight">
          <span className="gradient-text">&lt;Quinn /&gt;</span>
        </a>
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l, i) => (
            <motion.li key={l} initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.1+i*0.07 }}>
              <a href={`#${l.toLowerCase()}`} className={`text-sm font-medium tracking-wide transition-all duration-200 hover:text-accent relative group ${active===l.toLowerCase()?'text-accent':'text-muted'}`}>
                {l}
                <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${active===l.toLowerCase()?'w-full':'w-0 group-hover:w-full'}`} />
              </a>
            </motion.li>
          ))}
        </ul>
        <motion.a href="#contact" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }} className="hidden md:inline-flex btn-primary text-sm">
          <span>Let&apos;s Work Together</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </motion.a>
        <button onClick={()=>setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
          <span className={`block w-6 h-0.5 bg-accent transition-all duration-300 ${menuOpen?'rotate-45 translate-y-2':''}`} />
          <span className={`block w-6 h-0.5 bg-accent transition-all duration-300 ${menuOpen?'opacity-0':''}`} />
          <span className={`block w-6 h-0.5 bg-accent transition-all duration-300 ${menuOpen?'-rotate-45 -translate-y-2':''}`} />
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.3 }} className="md:hidden glass border-t border-border/30 overflow-hidden">
            <ul className="px-6 py-4 flex flex-col gap-4">
              {links.map(l => (
                <li key={l}><a href={`#${l.toLowerCase()}`} onClick={()=>setMenuOpen(false)} className="text-sm font-medium text-muted hover:text-accent transition-colors">{l}</a></li>
              ))}
              <li><a href="#contact" onClick={()=>setMenuOpen(false)} className="btn-primary text-sm w-full justify-center"><span>Let&apos;s Work Together</span></a></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
