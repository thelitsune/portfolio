'use client';

import { motion } from 'framer-motion';

const techCategories = [
  {
    icon: '⚡',
    title: 'Frontend',
    techs: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'],
  },
  {
    icon: '🔧',
    title: 'Backend',
    techs: ['Node.js', 'PostgreSQL', 'Supabase', 'REST APIs', 'WebSockets', 'Edge Functions'],
  },
  {
    icon: '🎮',
    title: 'Game Dev',
    techs: ['Unity', 'C#', 'Game Design', 'Pixel Art', 'Sprite Animation', 'RPG Systems'],
  },
  {
    icon: '🚀',
    title: 'DevOps & Tools',
    techs: ['Vercel', 'GitHub', 'Railway', 'Render', 'Netlify', 'CI/CD'],
  },
  {
    icon: '💼',
    title: 'Business & SaaS',
    techs: ['Stripe', 'QuickBooks API', 'Multi-tenant Arch', 'OAuth', 'Analytics', 'QR Systems'],
  },
  {
    icon: '🤖',
    title: 'AI & Integrations',
    techs: ['Claude', 'OpenAI API', 'LLM Integration', 'Automation', 'Webhooks', 'Perplexity'],
  },
];

export default function TechSection() {
  return (
    <section id="stack" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="font-mono text-accent text-sm">// tech stack</span>
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
            My <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl">
            A battle-tested toolkit built over years of shipping real products across web, SaaS, and game development.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-5 rounded-2xl bg-surface border border-border glow-border card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-bold text-text">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-mono text-muted bg-bg border border-border rounded hover:text-accent-glow hover:border-accent/30 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
