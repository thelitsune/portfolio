import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://quinn-portfolio-pixlify.vercel.app'),
  title: {
    default: 'Quinn | Full-Stack Developer & Game Creator',
    template: '%s | Quinn',
  },
  description: 'Quinn is a full-stack developer and entrepreneur building web apps, SaaS platforms, and games from Griffin, Georgia. Available for hire.',
  keywords: ['Quinn', 'full-stack developer', 'web development', 'game development', 'SaaS', 'React', 'Next.js', 'TypeScript', 'Unity', 'Griffin Georgia', 'hire developer'],
  authors: [{ name: 'Quinn' }],
  creator: 'Quinn',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quinn-portfolio-pixlify.vercel.app',
    title: 'Quinn | Full-Stack Developer & Game Creator',
    description: 'Building high-performance web apps, SaaS platforms, and games. Based in Griffin, GA. Available for projects.',
    siteName: 'Quinn Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quinn | Full-Stack Developer & Game Creator',
    description: 'Building high-performance web apps, SaaS platforms, and games. Available for projects.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Quinn',
          jobTitle: 'Full-Stack Developer & Entrepreneur',
          url: 'https://quinn-portfolio-pixlify.vercel.app',
          address: { '@type': 'PostalAddress', addressLocality: 'Griffin', addressRegion: 'Georgia', addressCountry: 'US' },
          knowsAbout: ['Web Development', 'Game Development', 'SaaS', 'Next.js', 'TypeScript', 'Unity'],
        }) }} />
      </head>
      <body className="bg-bg text-text antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
