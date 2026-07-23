'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillGroups = [
  { label:'Frontend', icon:'⚡', color:'#00d4ff', skills:['Next.js','React','TypeScript','Tailwind CSS','Framer Motion','HTML/CSS'] },
  { label:'Backend', icon:'', color:'#10b981', skills:['Node.js','PostgreSQL','Supabase','REST APIs','WebSockets','Edge Functions'] },
  { label:'Game Dev', icon:'', color:'#7c3aed', skills:['Unity','C#','Game Design','Pixel Art','Sprite Animation','RPG Systems'] },
  { label:'DevOps & Tools', icon:'', color:'#f59e0b', skills:['Vercel','GitHub','Railway','Render','Netlify','CI/CD'] },
  { label:'Business & SaaS', icon:'', color:'#ec4899', skills:['Stripe','Multi-tenant Architecture','OAuth','Analytics','QR Systems'] },
  { label:'AI & Integrations', icon:'', color:'#06b6d4', skills:['Claude','OpenAI API','LLM Integration','Automation','Webhooks','Perplexity'] },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  return (
    <section id="skills" ref={ref} className="relative z-10 py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }} className="text-center mb-12 sm:mb-16">
          <p className="text-accent font-mono text-xs sm:text-sm tracking-widest uppercase mb-4">// tech stack</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">My <span className="gradient-text">Arsenal</span></h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">A battle-tested toolkit built over years of shipping real products across web, SaaS, and game development.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillGroups.map((g,i) => (
            <motion.div key={g.label} initial={{ opacity:0, y:30, scale:0.97 }} animate={inView?{opacity:1,y:0,scale:1}:{}} transition={{ delay:i*0.1, duration:0.5 }}
              className="glass rounded-2xl p-5 sm:p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg sm:text-xl" style={{ background:`${g.color}12`, border:`1px solid ${g.color}22` }}>{g.icon}</div>
                <h3 className="font-display font-semibold text-base sm:text-lg" style={{ color:g.color }}>{g.label}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {g.skills.map((s,j) => (
                  <motion.span key={s} initial={{ opacity:0, scale:0.8 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ delay:0.1+i*0.05+j*0.03 }}
                    className="text-xs font-mono px-2.5 py-1.5 rounded-lg border cursor-default hover:scale-105 transition-transform duration-200"
                    style={{ background:`${g.color}0c`, borderColor:`${g.color}22`, color:`${g.color}cc` }}>{s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
