import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronDown, Sparkles } from 'lucide-react';
import { WeddingData } from '../data/weddingData';

interface TempleHeroSectionProps {
  data: WeddingData;
  onEnter: () => void;
}

export const TempleHeroSection: React.FC<TempleHeroSectionProps> = ({
  data,
  onEnter,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const textGroupRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  const [isEntering, setIsEntering] = useState(false);

  const handleTapToEnter = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isEntering) return;
    setIsEntering(true);

    // Synchronously notify audio player inside the user gesture so music plays immediately upon Tap to Enter
    window.dispatchEvent(new CustomEvent('wedding:enter'));

    // 1. Text & button smoothly fade out
    if (buttonRef.current && textGroupRef.current) {
      gsap.to([buttonRef.current, textGroupRef.current], {
        opacity: 0,
        y: -15,
        duration: 0.35,
        ease: 'power2.out',
      });
    }

    // 2. Pure smooth camera push-in zoom into temple gateway
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        scale: 2.4,
        transformOrigin: '50% 58%',
        duration: 1.4,
        ease: 'power2.inOut',
      });
    }

    // 3. Trigger entrance scroll smoothly after initial push-in starts (450ms delay)
    // This gives an immediate, cinematic sensation of flying forward through the temple gateway
    setTimeout(() => {
      onEnter();
    }, 450);

    // Reset button/text visibility after scroll transition so it's ready if user scrolls back up
    setTimeout(() => {
      if (bgImageRef.current && textGroupRef.current && buttonRef.current) {
        gsap.to(bgImageRef.current, { scale: 1, duration: 0.8, ease: 'power2.out' });
        gsap.to([textGroupRef.current, buttonRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
        setIsEntering(false);
      }
    }, 2000);
  };

  return (
    <section
      id="cover"
      ref={containerRef}
      className="relative min-h-screen min-h-[100dvh] w-full overflow-hidden select-none flex flex-col items-center justify-end pb-6 sm:pb-[30px] bg-[#FAF7F2]"
    >
      {/* 1. Full-screen Cinematic Temple Background (Pure image, no dark maroon overlay) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          ref={bgImageRef}
          src={data.assets.heroDesktop}
          alt="South Indian Temple Gopuram with Golden Pillars and Lotus Pond"
          className="w-full h-full object-cover object-center will-change-transform"
        />
      </div>

      {/* 2. Bottom Content: Positioned at bottom with exactly 30px space */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl mx-auto w-full sm:bottom-0 bottom-[60px]">
        <div ref={textGroupRef} className="space-y-2.5 mb-3.5">
          {/* Subtle sacred invocation pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A064]/50 shadow-xs mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A064]" />
            <span className="font-telugu text-sm md:text-base text-[#58111A] font-normal tracking-normal">
              || శ్రీ గణేశాయ నమః ||
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#C5A064]" />
          </div>

          {/* Line 2 */}
          <h1 className="font-bodoni text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#58111A] font-medium tracking-tight drop-shadow-sm">
            Welcome to the Wedding of <span className="text-[#58111A] font-semibold">Sariyu &amp; Vamshi</span>
          </h1>
        </div>

        {/* 3. Elegant Animated "TAP TO ENTER" Button (Optimized for both Desktop & Mobile Tap) */}
        <div className="flex flex-col items-center gap-2.5">
          <button
            ref={buttonRef}
            type="button"
            onClick={handleTapToEnter}
            onTouchEnd={handleTapToEnter}
            disabled={isEntering}
            aria-label="Tap to enter wedding ceremony"
            className="group relative px-9 sm:px-12 py-3.5 sm:py-4 bg-[#58111A] active:bg-[#3E0B12] hover:bg-[#3E0B12] text-[#ECC880] text-xs sm:text-sm font-jost uppercase tracking-[0.3em] font-semibold rounded-full shadow-[0_12px_35px_rgba(88,17,26,0.35)] hover:shadow-[0_16px_45px_rgba(88,17,26,0.5)] border border-[#C5A064] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer select-none touch-manipulation z-30"
          >
            {/* Animated gold shimmer aura */}
            <span className="absolute -inset-1 rounded-full bg-[#C5A064]/25 blur-sm opacity-75 group-hover:opacity-100 animate-pulse pointer-events-none" />
            <Sparkles className="w-4 h-4 text-[#C5A064] group-hover:rotate-45 transition-transform duration-500" />
            <span className="relative z-10 pointer-events-none">TAP TO ENTER</span>
            <Sparkles className="w-4 h-4 text-[#C5A064] group-hover:-rotate-45 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
};
