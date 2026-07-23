'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent-bright flex items-center justify-center text-white font-bold text-xs">
              Q
            </div>
            <span className="font-mono text-sm font-semibold text-text">quinn.dev</span>
          </div>

          {/* Copyright */}
          <p className="text-muted text-sm font-mono">
            © {year} Quinn. Crafted with{' '}
            <span className="text-accent-glow">♥</span>{' '}in Griffin, GA
          </p>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            {['#about', '#projects', '#stack', '#contact'].map((href) => (
              <a
                key={href}
                href={href}
                className="text-xs text-muted hover:text-text transition-colors font-mono capitalize"
              >
                {href.replace('#', '')}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
