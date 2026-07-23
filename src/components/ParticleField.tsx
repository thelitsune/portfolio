'use client';
import { useEffect, useRef } from 'react';

interface Particle { x:number; y:number; vx:number; vy:number; size:number; alpha:number; color:string; }

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let particles: Particle[] = [];
    const colors = ['#00d4ff','#7c3aed','#10b981'];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    const init = () => {
      resize();
      particles = Array.from({ length: 70 }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random()-0.5)*0.35, vy: (Math.random()-0.5)*0.35,
        size: Math.random()*1.8+0.4, alpha: Math.random()*0.45+0.1,
        color: colors[Math.floor(Math.random()*colors.length)],
      }));
    };
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>canvas.width) p.vx*=-1;
        if(p.y<0||p.y>canvas.height) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle=p.color+Math.floor(p.alpha*255).toString(16).padStart(2,'0');
        ctx.fill();
      });
      for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++) {
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<110) { const a=(1-dist/110)*0.12; ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(0,212,255,${a})`; ctx.lineWidth=0.5; ctx.stroke(); }
      }
      animId=requestAnimationFrame(draw);
    };
    init(); draw();
    window.addEventListener('resize',resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize',resize); };
  },[]);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{opacity:0.55}} />;
}
