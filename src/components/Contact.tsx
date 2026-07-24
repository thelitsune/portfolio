'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'', website:'' });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setForm(f=>({...f,[e.target.name]:e.target.value}));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading'); setErrorMsg('');
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('success');
      setForm({ name:'', email:'', message:'', website:'' });
    } catch(err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <section id="contact" ref={ref} className="relative z-10 py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6 }} className="text-center mb-12 sm:mb-16">
          <p className="text-accent font-mono text-xs sm:text-sm tracking-widest uppercase mb-4">// let&apos;s connect</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-6">Start a <span className="gradient-text">Conversation</span></h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">Have a project in mind? Want to collaborate or just say hi? I&apos;d love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 sm:gap-10">
          <motion.div initial={{ opacity:0, x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.6, delay:0.1 }} className="md:col-span-2 space-y-5 sm:space-y-6">
            {[
              { icon:'\u{1F4CD}', label:'Location', value:'Griffin, Georgia, US' },
              { icon:'\u{26A1}', label:'Availability', value:'Open for projects' },
              { icon:'\u{1F550}', label:'Response', value:'Within 24 hours' },
            ].map(item => (
              <div key={item.label} className="flex gap-3 sm:gap-4 items-start">
                <div className="w-9 h-9 sm:w-10 sm:h-10 glass rounded-xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs font-mono text-muted uppercase tracking-widest">{item.label}</p>
                  <p className="text-text font-medium mt-0.5 text-sm sm:text-base">{item.value}</p>
                </div>
              </div>
            ))}
            <div className="hidden" aria-hidden="true">
              <a href="https://github.com" rel="noopener noreferrer" tabIndex={-1}>GitHub</a>
              <a href="https://linkedin.com" rel="noopener noreferrer" tabIndex={-1}>LinkedIn</a>
            </div>
          </motion.div>

          <motion.form onSubmit={handleSubmit} initial={{ opacity:0, x:30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.6, delay:0.2 }}
            className="md:col-span-3 glass rounded-2xl p-6 sm:p-8" noValidate
          >
            <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="absolute opacity-0 h-0 w-0 pointer-events-none" aria-hidden="true" />

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
              <div>
                <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text text-sm placeholder-muted/35 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/15 transition-all duration-200" />
              </div>
              <div>
                <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text text-sm placeholder-muted/35 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/15 transition-all duration-200" />
              </div>
            </div>
            <div className="mb-5 sm:mb-6">
              <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell me about your project..."
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text text-sm placeholder-muted/35 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/15 transition-all duration-200 resize-none" />
            </div>

            {status==='success' && (
              <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="mb-5 p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-400 text-sm font-mono">
                {'\u2705'} Message sent! Quinn will get back to you within 24 hours.
              </motion.div>
            )}
            {status==='error' && (
              <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="mb-5 p-4 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-sm font-mono">
                {'\u274C'} {errorMsg}
              </motion.div>
            )}

            <button type="submit" disabled={status==='loading'}
              className="btn-primary w-full justify-center text-sm sm:text-base py-3.5 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status==='loading' ? (
                <><span className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" /><span>Sending...</span></>
              ) : (
                <><span>Send Message</span><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></>
              )}
            </button>
            <p className="text-center text-xs text-muted/40 mt-3 font-mono">Protected by rate limiting &amp; honeypot spam detection</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
