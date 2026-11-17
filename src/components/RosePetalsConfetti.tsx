import React, { useEffect, useRef } from 'react';

interface RosePetalsConfettiProps {
  active: boolean;
}

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  aspect: number;
  rotation: number;
  vr: number;
  tilt: number;
  vtilt: number;
  swayPhase: number;
  swaySpeed: number;
  gravity: number;
  drag: number;
  alpha: number;
  fadeStart: number;
  life: number;
  maxLife: number;
  colorLight: string;
  colorDark: string;
}

const PETAL_PALETTES = [
  { light: '#F43F6E', dark: '#A60E38' }, // Rich crimson rose
  { light: '#E11D48', dark: '#881337' }, // Deep ruby rose
  { light: '#FB7185', dark: '#BE123C' }, // Warm rose pink
  { light: '#D92654', dark: '#6E0D28' }, // Velvety maroon rose
  { light: '#F25278', dark: '#9F1239' }, // Soft velvet crimson
];

export const RosePetalsConfetti: React.FC<RosePetalsConfettiProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!active || hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const isMobile = width < 768;
    const petalsPerSide = isMobile ? 38 : 64;
    const petals: Petal[] = [];

    const spawnSidePetals = (side: 'left' | 'right', count: number, burstWave: number) => {
      for (let i = 0; i < count; i++) {
        const palette = PETAL_PALETTES[Math.floor(Math.random() * PETAL_PALETTES.length)];
        const fromEdgeX =
          side === 'left'
            ? -10 + Math.random() * (isMobile ? 28 : 48)
            : width + 10 - Math.random() * (isMobile ? 28 : 48);

        // Launch across upper-mid & mid-lower left/right borders
        const startY =
          burstWave === 0
            ? height * (0.25 + Math.random() * 0.45)
            : height * (0.05 + Math.random() * 0.4);

        const inwardBase = isMobile ? 4.5 + Math.random() * 6.5 : 7 + Math.random() * 9.5;
        const vx = side === 'left' ? inwardBase : -inwardBase;
        const vy = -(3.5 + Math.random() * 6.5);

        const maxLife = 230 + Math.random() * 140;
        petals.push({
          x: fromEdgeX,
          y: startY,
          vx,
          vy,
          size: (isMobile ? 10 : 13) + Math.random() * 9,
          aspect: 0.62 + Math.random() * 0.28,
          rotation: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.08,
          tilt: Math.random() * Math.PI * 2,
          vtilt: 0.04 + Math.random() * 0.07,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: 0.04 + Math.random() * 0.04,
          gravity: 0.095 + Math.random() * 0.06,
          drag: 0.972 + Math.random() * 0.012,
          alpha: 0.92 + Math.random() * 0.08,
          fadeStart: maxLife * 0.72,
          life: -burstWave * 14 - Math.random() * 18, // stagger waves naturally
          maxLife,
          colorLight: palette.light,
          colorDark: palette.dark,
        });
      }
    };

    // Two celebratory waves from both left and right sides of the screen
    spawnSidePetals('left', Math.ceil(petalsPerSide * 0.65), 0);
    spawnSidePetals('right', Math.ceil(petalsPerSide * 0.65), 0);
    spawnSidePetals('left', Math.floor(petalsPerSide * 0.35), 1);
    spawnSidePetals('right', Math.floor(petalsPerSide * 0.35), 1);

    const drawPetal = (p: Petal, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // Simulate 3D petal flutter
      const flutterScale = 0.38 + Math.abs(Math.cos(p.tilt)) * 0.62;
      ctx.scale(1, flutterScale);

      const s = p.size;
      const w = s * p.aspect;

      // Soft natural shadow under petal
      ctx.shadowColor = 'rgba(81, 16, 32, 0.22)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 2;

      const grad = ctx.createLinearGradient(-w, -s, w, s);
      grad.addColorStop(0, p.colorLight);
      grad.addColorStop(0.65, p.colorDark);
      grad.addColorStop(1, p.colorLight);

      // Curved rose petal silhouette
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.55);
      ctx.bezierCurveTo(w * 1.15, -s * 0.45, w * 1.05, s * 0.35, 0, s * 0.6);
      ctx.bezierCurveTo(-w * 0.95, s * 0.35, -w * 1.05, -s * 0.45, 0, -s * 0.55);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      let aliveCount = 0;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.life += 1;
        if (p.life < 0) {
          aliveCount += 1;
          continue;
        }
        if (p.life >= p.maxLife || p.y > height + 50) continue;

        aliveCount += 1;

        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.swayPhase += p.swaySpeed;

        p.x += p.vx + Math.sin(p.swayPhase) * 0.75;
        p.y += p.vy;
        p.rotation += p.vr;
        p.tilt += p.vtilt;

        let opacity = p.alpha;
        if (p.life > p.fadeStart) {
          opacity *= Math.max(0, 1 - (p.life - p.fadeStart) / (p.maxLife - p.fadeStart));
        }

        if (opacity > 0.01) {
          drawPetal(p, opacity);
        }
      }

      if (aliveCount > 0) {
        animId = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
};
