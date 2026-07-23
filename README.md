# Quinn's Portfolio

A high-performance, visually stunning portfolio website built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and a protected contact form powered by **Resend**.

## ✨ Features

- 🎨 Dark theme with purple accent, animated gradient orbs, and grid background
- 🚀 Smooth Framer Motion animations (fade-up, stagger, viewport triggers)
- ⌨️ Typewriter hero with role cycling
- 📦 Data-driven projects — add new ones in `src/data/projects.ts`
- 🔒 Protected contact form (Zod validation, honeypot bot trap, server-side rate limiting)
- 📧 Email via [Resend](https://resend.com) — set `RESEND_API_KEY` env var
- 📱 Fully responsive (mobile-first)
- ⚡ Perfect Lighthouse scores — no unused JS, lazy images, edge-ready

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Email**: Resend
- **Language**: TypeScript

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 📧 Contact Form Setup

1. Create a free account at [resend.com](https://resend.com)
2. Get your API key
3. Create a `.env.local` file:

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=your@email.com
```

> Without `RESEND_API_KEY`, the form still works in dev mode (logs to console).

## ➕ Adding a New Project

Edit `src/data/projects.ts` and add a new object:

```ts
{
  id: 'my-new-project',
  emoji: '🔥',
  title: 'My New Project',
  status: 'live',        // 'live' | 'in progress' | 'beta' | 'coming soon'
  featured: true,
  description: 'What it does...',
  tags: ['Next.js', 'Supabase'],
  liveUrl: 'https://myproject.com',
  githubUrl: 'https://github.com/thelitsune/myproject',
}
```

That's it — the card renders automatically!

## 🌐 Deploy to Vercel

1. Push this repo to GitHub (done!)
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add env vars: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`
4. Deploy!
