export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-border/30 py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="font-display font-bold text-base sm:text-lg gradient-text">&lt;Quinn /&gt;</div>
        <p className="text-muted text-xs sm:text-sm font-mono text-center">© {year} Quinn — Built with Next.js &amp; Vercel. Deployed at the edge.</p>
        <div className="flex items-center gap-2 text-xs font-mono text-muted/50">
          <span className="w-2 h-2 rounded-full bg-accent3 animate-pulse" />
          All systems operational
        </div>
      </div>
    </footer>
  );
}
