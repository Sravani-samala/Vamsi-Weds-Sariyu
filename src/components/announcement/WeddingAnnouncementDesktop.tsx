import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const ANNOUNCEMENT_TEXT = 'WE ARE GETTING MARRIED!';

export const WeddingAnnouncementDesktop: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinStageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinStage = pinStageRef.current;
    const trackEl = trackRef.current;
    const imgEl = imgRef.current;
    if (!section || !pinStage || !trackEl || !imgEl) return;

    let isMounted = true;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(trackEl, {
          x: 0,
          flexDirection: 'column',
          width: '100%',
          whiteSpace: 'normal',
          textAlign: 'center',
          paddingLeft: '2rem',
          paddingRight: '2rem',
        });
        return;
      }

      const getStartX = () => window.innerWidth * 0.92;
      const getEndX = () => {
        const imgW = imgEl.offsetWidth || window.innerHeight * 0.76 * 0.72;
        const imgCenterInTrack = imgEl.offsetLeft + imgW / 2;
        return window.innerWidth / 2 - imgCenterInTrack;
      };

      gsap.fromTo(
        trackEl,
        {
          x: getStartX,
        },
        {
          x: getEndX,
          ease: 'none',
          scrollTrigger: {
            trigger: pinStage,
            start: 'top top',
            end: () =>
              `+=${Math.round(Math.max(window.innerHeight * 1.4, Math.abs(getStartX() - getEndX()) * 0.85))}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    }, section);

    const rafId = requestAnimationFrame(() => {
      if (!isMounted) return;
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (isMounted) {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        }
      });
    }

    return () => {
      isMounted = false;
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="announcement"
      ref={sectionRef}
      className="relative w-full bg-[#FAF7F2] text-[#58111A] select-none overflow-x-clip"
    >
      <div
        ref={pinStageRef}
        className="relative w-full h-screen min-h-[100svh] bg-[#FAF7F2] flex items-center overflow-hidden"
      >
        <div
          ref={trackRef}
          className="relative flex items-center gap-[6vw] whitespace-nowrap shrink-0 will-change-transform"
        >
          <h2 className="font-bodoni font-bold uppercase whitespace-nowrap shrink-0 leading-none tracking-tight text-[#58111A] text-[10.5vw] lg:text-[9.5vw]">
            {ANNOUNCEMENT_TEXT}
          </h2>

          <img
            ref={imgRef}
            src="/assets/aistudio/image_0cbb344f.png"
            alt="Bride and Groom walking together"
            onLoad={() => {
              ScrollTrigger.sort();
              ScrollTrigger.refresh();
            }}
            className="h-[72svh] lg:h-[78svh] w-auto max-w-none object-contain shrink-0 pointer-events-none select-none drop-shadow-[0_18px_35px_rgba(88,17,26,0.12)]"
          />
        </div>
      </div>
    </section>
  );
};
