'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '@/data/projects';

const statusColors: Record<Project['status'], string> = {
  live: 'text-green-400 bg-green-400/10 border-green-400/20',
  'in progress': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  beta: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'coming soon': 'text-muted bg-surface border-border',
};

const statusDot: Record<Project['status'], string> = {
  live: 'bg-green-400',
  'in progress': 'bg-yellow-400 animate-pulse',
  beta: 'bg-blue-400',
  'coming soon': 'bg-muted',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-surface border border-border glow-border card-hover flex flex-col gap-4"
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 px-2 py-0.5 text-xs font-mono font-semibold text-accent-glow bg-accent/10 border border-accent/20 rounded-full">
          Featured
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl flex-shrink-0">
          {project.emoji}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg text-text">{project.title}</h3>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium border rounded-full ${statusColors[project.status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[project.status]}`} />
            {project.status}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted text-sm leading-relaxed flex-1">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs font-mono text-muted bg-bg border border-border rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3 pt-2 border-t border-border">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-accent-bright hover:text-accent-glow transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
        ) : (
          <span className="text-xs text-muted">Coming soon...</span>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-text transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-32 relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="font-mono text-accent text-sm">// my creations</span>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl">
            Real products. Real impact. Each project is a story of problem-solving, craftsmanship, and relentless iteration.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* More coming */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <span className="font-mono text-xs text-muted">// more projects coming soon...</span>
        </motion.div>
      </div>
    </section>
  );
}
