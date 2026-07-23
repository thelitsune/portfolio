'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '10+', label: 'Projects Shipped' },
  { value: '5+', label: 'Years Building' },
  { value: '20+', label: 'Technologies' },
  { value: '∞', label: 'Happy Clients' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutSection() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-accent text-sm">// about me</span>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-black mb-6 leading-tight"
            >
              Turning vision{' '}
              <span className="gradient-text">into reality</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-muted leading-relaxed mb-6 text-lg">
              I'm Quinn — a full-stack developer and entrepreneur based in Griffin, GA. I build everything from collaborative pixel art platforms and inventory SaaS tools to Unity RPG games, always with a focus on clean architecture, performance, and delightful UX.
            </motion.p>
            <motion.p variants={itemVariants} className="text-muted leading-relaxed mb-8 text-lg">
              Great software isn't just functional — it tells a story. Whether you need a high-converting landing page, a complex SaaS backend, or an interactive game, I bring both technical depth and creative vision to every build.
            </motion.p>

            {/* Tech pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {['Next.js', 'TypeScript', 'Supabase', 'Vercel', 'Unity', 'C#', 'PostgreSQL', 'Stripe'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono font-medium bg-surface border border-border rounded-full text-accent-glow hover:border-accent/50 hover:bg-accent/5 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-surface border border-border glow-border card-hover text-center"
              >
                <div className="text-4xl font-black gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
