import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, MapPin } from 'lucide-react';
import { WeddingData } from '../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

interface HaldiSectionProps {
  data: WeddingData;
}

// =========================================================================
// EASY-TO-EDIT PLACEHOLDERS FOR HALDI CEREMONY
// Replace the image path, timing, and location values below whenever ready.
// =========================================================================
const HALDI_IMAGE_FALLBACK = '/assets/aistudio/image_2d7d7453.png';
const HALDI_TIMINGS_PLACEHOLDER = 'Event timing to be announced';
const HALDI_LOCATION_PLACEHOLDER = 'Venue / location to be announced';

interface PowderParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  color: string;
  drag: number;
  wobblePhase: number;
  wobbleSpeed: number;
  isPuff: boolean;
}

const TURMERIC_RGB_PALETTE = [
  '242, 183, 5',   // Golden Turmeric
  '217, 145, 0',   // Deep Haldi Yellow
  '247, 201, 72',  // Marigold Yellow
  '230, 126, 34',  // Warm Saffron Orange
  '250, 218, 94',  // Soft Powder Yellow
];

export const HaldiSection: React.FC<HaldiSectionProps> = ({ data }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const contentWrapRef = useRef<HTMLDivElement | null>(null);

  const haldiImageSrc = data?.assets?.haldiRitual || HALDI_IMAGE_FALLBACK;

  // 1. Realistic Random Turmeric Powder Burst Canvas Animation
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId = 0;
    let isVisible = false;
    let particles: PowderParticle[] = [];
    let lastBurstTime = 0;
    let nextBurstDelay = 450;

    const resizeCanvas = () => {
      const rect = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnTurmericBurst = (width: number, height: number) => {
      const isMobile = width < 768;

      // Bias bursts subtly toward ambient outer zones & open pockets so text stays crisp
      const zoneRoll = Math.random();
      let cx: number;
      let cy: number;
      if (zoneRoll < 0.35) {
        // Left/top-left outer edge
        cx = width * (0.06 + Math.random() * 0.25);
        cy = height * (0.1 + Math.random() * 0.8);
      } else if (zoneRoll < 0.7) {
        // Right/outer edge
        cx = width * (0.72 + Math.random() * 0.22);
        cy = height * (0.1 + Math.random() * 0.8);
      } else {
        // Top or bottom ambient band
        cx = width * (0.15 + Math.random() * 0.7);
        cy = Math.random() < 0.5 ? height * (0.06 + Math.random() * 0.16) : height * (0.78 + Math.random() * 0.16);
      }

      const baseColor =
        TURMERIC_RGB_PALETTE[Math.floor(Math.random() * TURMERIC_RGB_PALETTE.length)];
      const secondaryColor =
        TURMERIC_RGB_PALETTE[Math.floor(Math.random() * TURMERIC_RGB_PALETTE.length)];

      // 1. Soft dispersing powder cloud puffs (2-3 overlapping clouds)
      const puffCount = isMobile ? 2 : 3;
      for (let p = 0; p < puffCount; p++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.25 + Math.random() * 0.65;
        particles.push({
          x: cx + (Math.random() - 0.5) * 14,
          y: cy + (Math.random() - 0.5) * 14,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.12,
          radius: (isMobile ? 20 : 28) + Math.random() * 24,
          maxAlpha: 0.12 + Math.random() * 0.1,
          life: 0,
          maxLife: 95 + Math.random() * 55,
          color: p % 2 === 0 ? baseColor : secondaryColor,
          drag: 0.965,
          wobblePhase: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.02 + Math.random() * 0.02,
          isPuff: true,
        });
      }

      // 2. Fine organic turmeric powder grains dispersing outward & floating
      const grainCount = isMobile ? 20 : 34;
      const burstScale = 0.7 + Math.random() * 0.75;
      for (let i = 0; i < grainCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.7 + Math.random() * 2.4) * burstScale;
        particles.push({
          x: cx + (Math.random() - 0.5) * 8,
          y: cy + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.15,
          radius: 1.4 + Math.random() * 3.2,
          maxAlpha: 0.25 + Math.random() * 0.32,
          life: 0,
          maxLife: 75 + Math.random() * 65,
          color: Math.random() < 0.7 ? baseColor : secondaryColor,
          drag: 0.92 + Math.random() * 0.03,
          wobblePhase: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.03 + Math.random() * 0.04,
          isPuff: false,
        });
      }
    };

    const drawStaticAmbientDust = () => {
      const rect = section.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (let i = 0; i < 4; i++) {
        spawnTurmericBurst(rect.width, rect.height);
      }
      particles.forEach((p) => {
        const alpha = p.maxAlpha * 0.65;
        if (p.isPuff) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, `rgba(${p.color}, ${alpha})`);
          grad.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (prefersReducedMotion) {
      drawStaticAmbientDust();
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }

    const renderLoop = (timestamp: number) => {
      if (!isVisible) return;

      const rect = section.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Spawn random bursts periodically (capped particle count for smooth performance)
      if (timestamp - lastBurstTime > nextBurstDelay && particles.length < 240) {
        spawnTurmericBurst(width, height);
        lastBurstTime = timestamp;
        const isMobile = width < 768;
        nextBurstDelay = (isMobile ? 950 : 650) + Math.random() * 900;
      }

      const nextParticles: PowderParticle[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life += 1;
        if (p.life >= p.maxLife) continue;

        const progress = p.life / p.maxLife;
        p.vx *= p.drag;
        p.vy *= p.drag;

        // Subtle air drift as powder settles
        p.wobblePhase += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobblePhase) * 0.16;
        p.y += p.vy + 0.05;

        // Smooth fade-in and gentle fade-out
        const fadeIn = Math.min(1, progress / 0.12);
        const fadeOut = Math.pow(1 - progress, 1.35);
        const alpha = p.maxAlpha * fadeIn * fadeOut;

        if (alpha <= 0.005) {
          nextParticles.push(p);
          continue;
        }

        if (p.isPuff) {
          const currentRadius = p.radius * (0.45 + progress * 0.95);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius);
          grad.addColorStop(0, `rgba(${p.color}, ${alpha})`);
          grad.addColorStop(0.55, `rgba(${p.color}, ${alpha * 0.45})`);
          grad.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Soft powder grain with feathered edge
          const currentRadius = p.radius * (0.85 + progress * 0.35);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius * 1.6);
          grad.addColorStop(0, `rgba(${p.color}, ${alpha})`);
          grad.addColorStop(0.65, `rgba(${p.color}, ${alpha * 0.5})`);
          grad.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }

        nextParticles.push(p);
      }

      particles = nextParticles;
      animationFrameId = window.requestAnimationFrame(renderLoop);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (particles.length === 0) {
            const rect = section.getBoundingClientRect();
            spawnTurmericBurst(rect.width, rect.height);
          }
          lastBurstTime = performance.now();
          animationFrameId = window.requestAnimationFrame(renderLoop);
        } else if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // 2. Subtle Editorial Entrance Animations
  useEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    const contentWrap = contentWrapRef.current;
    if (!section || !imageWrap || !contentWrap) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageWrap,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const revealItems = contentWrap.querySelectorAll('.haldi-reveal-item');
      gsap.fromTo(
        revealItems,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentWrap,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 bg-[#FAF7F2] text-[#3E0B12] overflow-hidden flex items-center select-none box-border"
    >
      {/* Background Layer: Organic Turmeric Powder Bursts */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Subtle warm turmeric radial glow behind the layout */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(242,183,5,0.08)_0%,transparent_55%)] pointer-events-none z-0"
      />

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* LEFT SIDE: Stacked / Layered Editorial Haldi Image */}
        <div
          ref={imageWrapRef}
          className="lg:col-span-5 flex justify-center items-center px-3 sm:px-6 lg:px-0 will-change-transform"
        >
          <div className="relative w-full max-w-[330px] sm:max-w-[400px] lg:max-w-[430px] aspect-[4/5]">
            {/* Stacked Background Card 1 (Warm Turmeric Tint) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -rotate-4 translate-x-[-8px] translate-y-[6px] rounded-[2rem] bg-[#FCEFC7] border border-[#C5A064]/50 shadow-md"
            />

            {/* Stacked Background Card 2 (Soft Ivory Gold Accent) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rotate-3 translate-x-[10px] translate-y-[-4px] rounded-[2rem] bg-[#FFF8E6] border border-[#E5B84B]/60 shadow-lg"
            />

            {/* Main Foreground Editorial Frame */}
            <div className="relative w-full h-full rounded-[2rem] bg-gradient-to-b from-[#FFFDF7] via-[#FFF9E8] to-[#FDF0C8] border-2 border-[#C5A064] p-5 sm:p-7 shadow-[0_24px_60px_rgba(166,112,18,0.18)] flex items-center justify-center overflow-hidden">
              {/* Subtle inner gold hairline border */}
              <div
                aria-hidden="true"
                className="absolute inset-3 rounded-[1.5rem] border border-[#C5A064]/35 pointer-events-none"
              />

              {/* Soft turmeric glow behind visual */}
              <div
                aria-hidden="true"
                className="absolute w-56 h-56 rounded-full bg-[#F7C948]/25 blur-2xl pointer-events-none"
              />

              <img
                src={haldiImageSrc}
                alt="Traditional South Indian Haldi Ceremony"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_14px_26px_rgba(140,90,10,0.22)]"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Haldi Event Information in Exact Order */}
        <div
          ref={contentWrapRef}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5"
        >
          {/* First: Telugu Caption */}
          <p className="haldi-reveal-item font-telugu text-xl sm:text-2xl md:text-[1.75rem] text-[#9A7534] font-normal tracking-normal">
            పసుపు పరిమళాలతో... శుభారంభానికి స్వాగతం
          </p>

          {/* Second: Main Heading */}
          <h2 className="haldi-reveal-item font-bodoni text-4xl sm:text-5xl md:text-6xl text-[#58111A] font-medium tracking-tight leading-none">
            HALDI CEREMONY
          </h2>

          {/* Third: Subheading */}
          <h3 className="haldi-reveal-item font-cormorant italic text-xl sm:text-2xl md:text-[1.7rem] text-[#721A25] font-medium leading-snug">
            A celebration of traditions, love and new beginnings.
          </h3>

          {/* Traditional Decorative Separator */}
          <div className="haldi-reveal-item flex items-center justify-center lg:justify-start gap-3 py-1">
            <span className="w-12 h-[1.5px] bg-[#C5A064]" />
            <span className="w-2 h-2 rotate-45 border border-[#C5A064] bg-[#F7C948]/60" />
            <span className="w-12 h-[1.5px] bg-[#C5A064]" />
          </div>

          {/* Fourth: Short Paragraph */}
          <p className="haldi-reveal-item font-jost text-sm sm:text-base md:text-[1.05rem] text-[#3E0B12]/85 leading-relaxed max-w-xl">
            &ldquo;Surrounded by the warmth of family, the beauty of traditions and the blessings of our loved ones, we begin this beautiful new chapter with a heart full of happiness.&rdquo;
          </p>

          {/* Event Details: Timings & Location */}
          <div className="haldi-reveal-item w-full max-w-xl pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* TIMINGS */}
            <div className="bg-white/90 border border-[#C5A064]/55 rounded-2xl p-4 sm:p-5 shadow-[0_10px_28px_rgba(197,160,100,0.12)] flex items-start gap-3.5 text-left">
              <div className="w-9 h-9 rounded-full bg-[#FDF3D7] border border-[#C5A064]/50 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-[#9A7534]" />
              </div>
              <div className="min-w-0">
                <span className="font-jost text-[11px] uppercase tracking-[0.22em] text-[#9A7534] font-semibold block mb-1">
                  TIMINGS
                </span>
                <span className="font-bodoni text-base sm:text-lg text-[#58111A] font-medium leading-snug block">
                  {HALDI_TIMINGS_PLACEHOLDER}
                </span>
              </div>
            </div>

            {/* LOCATION */}
            <div className="bg-white/90 border border-[#C5A064]/55 rounded-2xl p-4 sm:p-5 shadow-[0_10px_28px_rgba(197,160,100,0.12)] flex items-start gap-3.5 text-left">
              <div className="w-9 h-9 rounded-full bg-[#FDF3D7] border border-[#C5A064]/50 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#9A7534]" />
              </div>
              <div className="min-w-0">
                <span className="font-jost text-[11px] uppercase tracking-[0.22em] text-[#9A7534] font-semibold block mb-1">
                  LOCATION
                </span>
                <span className="font-bodoni text-base sm:text-lg text-[#58111A] font-medium leading-snug block">
                  {HALDI_LOCATION_PLACEHOLDER}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
