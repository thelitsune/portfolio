'use client';
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '@/data/projects';
import PreviewModal from './PreviewModal';

const categories: { key: string; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'web', label: 'Web' },
  { key: 'saas', label: 'SaaS' },
  { key: 'game', label: 'Game' },
  { key: 'tool', label: 'Tool' },
];

const statusColors: Record<string, string> = {
  live: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  'in-progress': 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  beta: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/25',
};

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [preview, setPreview] = useState<{ url: string; title: string } | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" ref={ref} className="relative z-10 py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }} className="text-center mb-12 sm:mb-16">
          <p className="text-accent font-mono text-xs sm:text-sm tracking-widest uppercase mb-4">// my creations</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">Things I&apos;ve <span className="gradient-text">Built</span></h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">Real products. Real impact. Each project is a story of problem-solving, craftsmanship, and relentless iteration.</p>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.2 }} className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {categories.map(c => (
            <button key={c.key} onClick={()=>setFilter(c.key)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium font-mono transition-all duration-300 border ${
                filter===c.key
                  ? 'bg-accent/15 border-accent text-accent shadow-lg shadow-accent/10'
                  : 'border-border text-muted hover:border-accent/40 hover:text-accent/70'
              }`}
            >{c.label}</button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }} transition={{ duration:0.35 }}
            className="grid sm:grid-cols-2 gap-5 sm:gap-6"
          >
            {filtered.length === 0 ? (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="sm:col-span-2 text-center py-20">
                <p className="text-muted font-mono text-sm">// no projects in this category yet \u2014 check back soon</p>
              </motion.div>
            ) : (
              filtered.map((project, i) => (
                <motion.div key={project.id} initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.08, duration:0.45 }}>
                  <ProjectCard project={project} onPreview={setPreview} />
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.6 }} className="text-center mt-12 sm:mt-16">
          <p className="text-muted/50 text-xs sm:text-sm font-mono">// more projects coming soon...</p>
        </motion.div>
      </div>

      <PreviewModal url={preview?.url ?? null} title={preview?.title ?? ''} onClose={() => setPreview(null)} />
    </section>
  );
}

function ProjectCard({ project, onPreview }: { project: Project; onPreview: (p: { url: string; title: string }) => void }) {
  const [hovered, setHovered] = useState(false);
  const clickable = Boolean(project.liveUrl);

  const handleClick = () => {
    if (project.liveUrl) onPreview({ url: project.liveUrl, title: project.title });
  };

  return (
    <div
      className={`project-card p-5 sm:p-6 h-full ${clickable ? 'cursor-pointer' : ''}`}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      onClick={clickable ? handleClick : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => { if (e.key === 'Enter') handleClick(); } : undefined}
    >
      <div className="absolute inset-0 rounded-[18px] transition-opacity duration-500 pointer-events-none"
        style={{ background:`radial-gradient(circle at 50% 0%, ${project.color}12, transparent 65%)`, opacity: hovered?1:0 }}
      />
      {clickable && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full transition-opacity duration-300"
          style={{ background:`${project.color}18`, border:`1px solid ${project.color}35`, color: project.color, opacity: hovered ? 1 : 0.7 }}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          Preview
        </div>
      )}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background:`${project.color}12`, border:`1px solid ${project.color}28` }}>{project.icon}</div>
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-text leading-tight">{project.title}</h3>
              <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2 py-0.5 rounded-full border mt-1 ${statusColors[project.status]}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />{project.status.replace('-',' ')}
              </span>
            </div>
          </div>
          {project.featured && <span className="text-xs font-mono text-accent/50 border border-accent/15 rounded px-2 py-0.5 flex-shrink-0">Featured</span>}
        </div>
        <p className="text-muted text-sm leading-relaxed mb-4 flex-1">{project.longDesc}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(t => (
            <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg border" style={{ background:`${project.color}0c`, borderColor:`${project.color}22`, color:`${project.color}bb` }}>{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-border/40" onClick={(e) => e.stopPropagation()}>
          {project.liveUrl ? (
            <button onClick={handleClick} className="btn-primary text-xs py-2 px-4">
              <span>View Live</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </button>
          ) : (
            <span className="text-xs font-mono text-muted/40">Coming soon...</span>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-muted hover:text-accent transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
