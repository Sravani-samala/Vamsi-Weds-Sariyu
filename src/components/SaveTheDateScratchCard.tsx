import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';

interface SaveTheDateScratchCardProps {
  day: string;
  month: string;
  year: string;
  isRevealed: boolean;
  onReveal: () => void;
}

const REVEAL_THRESHOLD = 0.35; // 35% cleared triggers full reveal

export const SaveTheDateScratchCard: React.FC<SaveTheDateScratchCardProps> = ({
  day,
  month,
  year,
  isRevealed,
  onReveal,
}) => {
  const cardSurfaceRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dateContentRef = useRef<HTMLDivElement | null>(null);

  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastSampleTimeRef = useRef(0);
  const revealedRef = useRef(isRevealed);

  const [isCanvasReady, setIsCanvasReady] = useState(false);

  useEffect(() => {
    revealedRef.current = isRevealed;
  }, [isRevealed]);

  // Paint glossy metallic gold foil bar matching the sleek rounded scratch strip aesthetic
  const paintFoilLayer = useCallback(() => {
    const surface = cardSurfaceRef.current;
    const canvas = canvasRef.current;
    if (!surface || !canvas || revealedRef.current) return;

    const rect = surface.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';

    // Glossy diagonal champagne-gold foil gradient
    const goldGrad = ctx.createLinearGradient(0, 0, width, height * 0.75);
    goldGrad.addColorStop(0, '#C59E49');
    goldGrad.addColorStop(0.18, '#F2DE9C');
    goldGrad.addColorStop(0.36, '#BE913B');
    goldGrad.addColorStop(0.5, '#A77A26');
    goldGrad.addColorStop(0.68, '#F4E3A7');
    goldGrad.addColorStop(0.84, '#BE9038');
    goldGrad.addColorStop(1, '#986C1E');
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, width, height);

    // Soft specular sheen across center
    const sheenGrad = ctx.createLinearGradient(0, 0, 0, height);
    sheenGrad.addColorStop(0, 'rgba(255, 250, 232, 0.22)');
    sheenGrad.addColorStop(0.5, 'rgba(255, 250, 232, 0)');
    sheenGrad.addColorStop(1, 'rgba(70, 42, 8, 0.14)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle inner rim highlight
    ctx.strokeStyle = 'rgba(255, 245, 214, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(2, 2, width - 4, height - 4);

    // Centered prompt typography: ✦ SCRATCH TO REVEAL ✦
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const isCompact = width < 400;
    ctx.fillStyle = '#432707';
    ctx.font = `700 ${isCompact ? 16 : 21}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillText('✦   SCRATCH TO REVEAL   ✦', width / 2, height / 2);

    setIsCanvasReady(true);
  }, []);

  useEffect(() => {
    if (isRevealed) return;

    const rafId = requestAnimationFrame(() => {
      paintFoilLayer();
    });

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!revealedRef.current) {
          paintFoilLayer();
        }
      });
    }

    const handleResize = () => {
      if (!revealedRef.current) {
        paintFoilLayer();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isRevealed, paintFoilLayer]);

  const completeReveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    isDrawingRef.current = false;

    if (dateContentRef.current) {
      gsap.fromTo(
        dateContentRef.current,
        { scale: 0.94, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.65, ease: 'power3.out' }
      );
    }

    onReveal();
  }, [onReveal]);

  const checkScratchProgress = useCallback(() => {
    if (revealedRef.current) return;
    const now = performance.now();
    if (now - lastSampleTimeRef.current < 110) return;
    lastSampleTimeRef.current = now;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    // Sample central 78% region
    const sx = Math.floor(w * 0.11);
    const sy = Math.floor(h * 0.12);
    const sw = Math.max(1, Math.floor(w * 0.78));
    const sh = Math.max(1, Math.floor(h * 0.76));

    const imageData = ctx.getImageData(sx, sy, sw, sh).data;
    let cleared = 0;
    let total = 0;

    for (let i = 3; i < imageData.length; i += 32) {
      total += 1;
      if (imageData[i] < 128) {
        cleared += 1;
      }
    }

    if (total > 0 && cleared / total >= REVEAL_THRESHOLD) {
      completeReveal();
    }
  }, [completeReveal]);

  const getLocalCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const erasePoint = (x: number, y: number, prev?: { x: number; y: number } | null) => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const brushRadius = canvas.clientWidth < 400 ? 22 : 26;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushRadius * 2;

    if (prev) {
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealedRef.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    const pt = getLocalCoords(e);
    lastPointRef.current = pt;
    erasePoint(pt.x, pt.y, null);
    checkScratchProgress();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || revealedRef.current) return;
    const pt = getLocalCoords(e);
    erasePoint(pt.x, pt.y, lastPointRef.current);
    lastPointRef.current = pt;
    checkScratchProgress();
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      lastPointRef.current = null;
      lastSampleTimeRef.current = 0;
      checkScratchProgress();
    }
  };

  return (
    <div className="w-full max-w-[600px] mx-auto flex flex-col items-center">
      {/* Top Delicate Floral & Gold Hairline Divider (matching reference visual) */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="w-16 sm:w-20 h-[1px] bg-[#C5A064]/75" />
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="text-[#B99455] shrink-0"
        >
          <path
            d="M12 4.2C13.3 4.2 14.3 5.7 13.7 7.4C15.4 6.8 17.1 7.6 17.5 8.9C17.9 10.2 16.8 11.7 15.1 11.9C16.6 12.8 17.1 14.6 16.2 15.7C15.3 16.8 13.5 16.7 12.4 15.3C12.3 17.1 11.2 18.4 10 18.4C8.8 18.4 7.7 17.1 7.6 15.3C6.5 16.7 4.7 16.8 3.8 15.7C2.9 14.6 3.4 12.8 4.9 11.9C3.2 11.7 2.1 10.2 2.5 8.9C2.9 7.6 4.6 6.8 6.3 7.4C5.7 5.7 6.7 4.2 8 4.2C9.1 4.2 10 5.3 10 6.8C10 5.3 10.9 4.2 12 4.2Z"
            transform="translate(2 1)"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        </svg>
        <span className="w-16 sm:w-20 h-[1px] bg-[#C5A064]/75" />
      </div>

      {/* Rounded Sleek Gold Scratch Card */}
      <div
        ref={cardSurfaceRef}
        className="relative w-full min-h-[148px] sm:min-h-[168px] rounded-[18px] border-[1.5px] border-[#DEC186] bg-[#FCF7EE] shadow-[0_18px_46px_rgba(165,122,48,0.16)] overflow-hidden flex items-center justify-center px-5 py-6 sm:px-8 sm:py-7"
      >
        {/* Subtle Warm Radiance Behind Revealed Date */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(185,148,85,0.12)_0%,transparent_72%)] pointer-events-none"
        />

        {/* Revealed Save the Date Content */}
        <div
          ref={dateContentRef}
          aria-live="polite"
          className={`relative z-10 flex flex-col items-center text-center transition-opacity duration-500 ${
            isCanvasReady || isRevealed ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="font-jost text-[10px] sm:text-xs uppercase tracking-[0.38em] text-[#511E2A] font-semibold mb-2">
            SAVE THE DATE
          </p>

          <div className="flex flex-wrap items-baseline justify-center gap-3 sm:gap-5 leading-none">
            <span className="font-bodoni text-5xl sm:text-6xl md:text-[4.25rem] text-[#511E2A] font-normal tabular-nums tracking-tight">
              {day}
            </span>
            <span className="font-bodoni text-3xl sm:text-4xl md:text-[2.9rem] text-[#B99455] font-normal tracking-[0.14em] uppercase">
              {month}
            </span>
            <span className="font-bodoni text-3xl sm:text-4xl md:text-[2.9rem] text-[#38251D] font-normal tabular-nums tracking-[0.18em]">
              {year}
            </span>
          </div>
        </div>

        {/* Rounded Glossy Metallic Gold Scratch Foil Canvas */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrCancel}
          onPointerCancel={handlePointerUpOrCancel}
          aria-label="Scratch to reveal our Save the Date"
          className={`absolute inset-0 w-full h-full z-20 rounded-[16px] touch-none transition-opacity duration-700 ${
            isRevealed
              ? 'opacity-0 pointer-events-none'
              : 'opacity-100 cursor-grab active:cursor-grabbing'
          }`}
        />
      </div>

      {/* Helper & Accessibility Trigger */}
      <div className="mt-4 min-h-[26px] flex items-center justify-center">
        {!isRevealed ? (
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-jost tracking-[0.16em] uppercase text-[#38251D]/70">
            <Sparkles className="w-3.5 h-3.5 text-[#B99455]" />
            <span>Scratch to unlock date &amp; countdown</span>
            <span aria-hidden="true" className="text-[#B99455]">
              ·
            </span>
            <button
              type="button"
              onClick={completeReveal}
              className="underline underline-offset-4 text-[#511E2A] hover:text-[#B99455] transition-colors cursor-pointer font-medium"
            >
              Tap to Reveal
            </button>
          </div>
        ) : (
          <p className="font-cormorant italic text-lg text-[#511E2A] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B99455]" />
            <span>Save the Date Unlocked — Countdown is Live</span>
          </p>
        )}
      </div>
    </div>
  );
};
