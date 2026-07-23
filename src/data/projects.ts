export interface Project {
  id: string;
  emoji: string;
  title: string;
  status: 'live' | 'in progress' | 'beta' | 'coming soon';
  featured: boolean;
  description: string;
  longDescription?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'pixlify',
    emoji: '🎨',
    title: 'Pixlify',
    status: 'live',
    featured: true,
    description:
      'A Place-inspired collaborative pixel art platform where thousands can paint together in real time. Features layer management, color palettes, and live multiplayer sessions.',
    tags: ['Next.js', 'Supabase', 'TypeScript', 'WebSockets', 'Tailwind'],
    liveUrl: 'https://coming-soon.example.com',
  },
  {
    id: 'dynamicqr',
    emoji: '📦',
    title: 'DynamicQR',
    status: 'live',
    featured: true,
    description:
      'A SaaS QR code platform that powers dynamic, trackable QR codes for inventory management. Supports bulk generation, scan analytics, and multi-tenant architecture.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Vercel'],
    liveUrl: 'https://coming-soon.example.com',
  },
  {
    id: 'dice-destiny',
    emoji: '🎲',
    title: 'Dice & Destiny',
    status: 'in progress',
    featured: true,
    description:
      'A tabletop-inspired RPG where players manage a party of adventurers, taking on quests, leveling characters, and battling monsters in a hand-crafted pixel world.',
    tags: ['Unity', 'C#', 'Pixel Art', 'Game Design'],
  },
  {
    id: 'sales-coaching',
    emoji: '📊',
    title: 'Sales Coaching Suite',
    status: 'beta',
    featured: false,
    description:
      'A comprehensive suite for team coaching, sales performance tracking, and training program management. Integrates with QuickBooks Online for financial insights.',
    tags: ['TypeScript', 'Supabase', 'QuickBooks API', 'Next.js'],
  },
];
