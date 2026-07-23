import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quinn | Full-Stack Developer & Game Creator',
  description: 'Full-stack developer and entrepreneur based in Griffin, GA. I build high-performance web apps, SaaS platforms, and games. Available for projects.',
  keywords: ['full-stack developer', 'web developer', 'SaaS', 'game developer', 'Griffin Georgia', 'Next.js', 'TypeScript'],
  openGraph: {
    title: 'Quinn | Full-Stack Developer & Game Creator',
    description: 'Crafting high-performance web apps, SaaS platforms, and games from Griffin, Georgia.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="noise">{children}</body>
    </html>
  );
}
