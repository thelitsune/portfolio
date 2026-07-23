'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { label: 'Projects Shipped', value: '10+' },
  { label: 'Years Building', value: '5+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Happy Clients', value: '∞' },
];

const techBadges = ['Next.js','TypeScript','Supabase','Vercel','Unity','C#','PostgreSQL','Stripe'];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="relative z-10 py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity:0, x:-40 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}>
            <p className="text-accent font-mono text-xs sm:text-sm tracking-widest uppercase mb-4">// about me</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
              Turning vision into <span className="gradient-text">reality</span>
            </h2>
            <p className="text-muted text-base sm:text-lg leading-relaxed mb-5">
              I&apos;m Quinn — a full-stack developer and entrepreneur based in Griffin, GA. I build everything from collaborative pixel art platforms and inventory SaaS tools to Unity RPG games, always with a focus on clean architecture, performance, and delightful UX.
            </p>
            <p className="text-muted text-base sm:text-lg leading-relaxed mb-8">
              Great software isn&apos;t just functional — it tells a story. Whether you need a high-converting landing page, a complex SaaS backend, or an interactive game, I bring both technical depth and creative vision to every build.
            </p>
            <div className="flex flex-wrap gap-2">
              {techBadges.map((t,i) => (
                <motion.span key={t} className="tech-badge" initial={{ opacity:0, scale:0.8 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ delay:0.05*i, duration:0.3 }}>{t}</motion.span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s,i) => (
              <motion.div key={s.label} initial={{ opacity:0, y:30, scale:0.95 }} animate={inView?{opacity:1,y:0,scale:1}:{}} transition={{ delay:0.1+i*0.1, duration:0.5 }}
                className="glass rounded-2xl p-6 sm:p-8 text-center hover:border-accent/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="font-display font-bold text-4xl sm:text-5xl gradient-text mb-2">{s.value}</div>
                <div className="text-muted text-xs sm:text-sm font-medium tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
