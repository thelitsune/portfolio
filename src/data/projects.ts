export interface Project {
  id: string;
  title: string;
  description: string;
  longDesc: string;
  tech: string[];
  category: 'web' | 'saas' | 'game' | 'tool';
  status: 'live' | 'in-progress' | 'beta';
  color: string;
  icon: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'pixlify',
    title: 'Pixlify',
    description: 'Real-time collaborative pixel canvas for artists worldwide.',
    longDesc: 'A Place-inspired collaborative pixel art platform where thousands can paint together in real time. Features layer management, color palettes, and live multiplayer sessions.',
    tech: ['Next.js', 'Supabase', 'TypeScript', 'WebSockets', 'Tailwind'],
    category: 'web',
    status: 'live',
    color: '#00d4ff',
    icon: '',
    featured: true,
  },
  {
    id: 'dynamicqr',
    title: 'DynamicQR',
    description: 'QR code inventory management system built for scale.',
    longDesc: 'A SaaS QR code platform that powers dynamic, trackable QR codes for inventory management. Supports bulk generation, scan analytics, and multi-tenant architecture.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Vercel'],
    category: 'saas',
    status: 'live',
    color: '#10b981',
    icon: '',
    featured: true,
  },
  {
    id: 'dice-and-destiny',
    title: 'Dice & Destiny',
    description: 'A Unity-based RPG inspired by Knights of Pen and Paper.',
    longDesc: 'A tabletop-inspired RPG where players manage a party of adventurers, taking on quests, leveling characters, and battling monsters in a hand-crafted pixel world.',
    tech: ['Unity', 'C#', 'Pixel Art', 'Game Design'],
    category: 'game',
    status: 'in-progress',
    color: '#7c3aed',
    icon: '',
    featured: true,
  },
  {
    id: 'sales-coaching',
    title: 'Sales Coaching Suite',
    description: 'Business operations and sales training platform.',
    longDesc: 'A comprehensive suite for team coaching, sales performance tracking, and training program management.',
    tech: ['TypeScript', 'Supabase', 'Next.js'],
    category: 'saas',
    status: 'beta',
    color: '#f59e0b',
    icon: '',
    featured: false,
  },
];
