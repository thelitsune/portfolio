'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactSection() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, honeypot: data.honeypot ?? '' }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong');
      setStatus('success');
      reset();
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="font-mono text-accent text-sm">// let's connect</span>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Start a <span className="gradient-text">Conversation</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl">
            Have a project in mind? Want to collaborate or just say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {[
              { icon: '📍', label: 'Location', value: 'Griffin, Georgia, US' },
              { icon: '⚡', label: 'Availability', value: 'Open for projects' },
              { icon: '🕐', label: 'Response', value: 'Within 24 hours' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 p-5 rounded-xl bg-surface border border-border glow-border">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs text-muted font-mono mb-0.5">{item.label}</p>
                  <p className="font-semibold text-text">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Decorative code block */}
            <div className="mt-4 p-5 rounded-xl bg-surface border border-border font-mono text-sm">
              <div className="text-muted text-xs mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/50" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <span className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="ml-1">contact.ts</span>
              </div>
              <div className="space-y-1">
                <div><span className="text-accent-bright">const</span> <span className="text-text">me</span> <span className="text-muted">= {'{'}</span></div>
                <div className="pl-4"><span className="text-accent-glow">name</span><span className="text-muted">: </span><span className="text-green-400">'Quinn'</span><span className="text-muted">,</span></div>
                <div className="pl-4"><span className="text-accent-glow">role</span><span className="text-muted">: </span><span className="text-green-400">'Full-Stack Dev'</span><span className="text-muted">,</span></div>
                <div className="pl-4"><span className="text-accent-glow">available</span><span className="text-muted">: </span><span className="text-blue-400">true</span><span className="text-muted">,</span></div>
                <div className="pl-4"><span className="text-accent-glow">location</span><span className="text-muted">: </span><span className="text-green-400">'Griffin, GA'</span></div>
                <div><span className="text-muted">{'}'}</span></div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
              {/* Honeypot — hidden from humans */}
              <input
                type="text"
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                className="hidden"
                {...register('honeypot')}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-muted mb-1.5">Name *</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className={`w-full px-4 py-3 bg-surface border rounded-xl text-text placeholder:text-muted/50 text-sm outline-none transition-all focus:border-accent/50 focus:ring-2 focus:ring-accent/10 ${
                      errors.name ? 'border-red-500/50' : 'border-border'
                    }`}
                    {...register('name')}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted mb-1.5">Email *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 bg-surface border rounded-xl text-text placeholder:text-muted/50 text-sm outline-none transition-all focus:border-accent/50 focus:ring-2 focus:ring-accent/10 ${
                      errors.email ? 'border-red-500/50' : 'border-border'
                    }`}
                    {...register('email')}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1.5">Subject *</label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  className={`w-full px-4 py-3 bg-surface border rounded-xl text-text placeholder:text-muted/50 text-sm outline-none transition-all focus:border-accent/50 focus:ring-2 focus:ring-accent/10 ${
                    errors.subject ? 'border-red-500/50' : 'border-border'
                  }`}
                  {...register('subject')}
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1.5">Message *</label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={`w-full px-4 py-3 bg-surface border rounded-xl text-text placeholder:text-muted/50 text-sm outline-none transition-all focus:border-accent/50 focus:ring-2 focus:ring-accent/10 resize-none ${
                    errors.message ? 'border-red-500/50' : 'border-border'
                  }`}
                  {...register('message')}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>

              {status === 'error' && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {errorMsg}
                </div>
              )}

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Message sent! I'll get back to you within 24 hours.
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full py-4 bg-accent hover:bg-accent-bright disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : status === 'success' ? (
                  'Message Sent ✓'
                ) : (
                  <>
                    Send Message
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
