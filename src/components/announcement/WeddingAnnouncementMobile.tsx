import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const ANNOUNCEMENT_TEXT = 'WE ARE GETTING MARRIED!';

export const WeddingAnnouncementMobile: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinStageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
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
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        });
        return;
      }

      const getStartX = () => window.innerWidth * 0.92;
      const getEndX = () => {
        const trackW = trackEl.offsetWidth || trackEl.scrollWidth;
        const imgW = imgEl.offsetWidth || window.innerHeight * 0.54 * 0.75;
        return -(trackW - window.innerWidth / 2 - imgW / 2);
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
              `+=${Math.round(Math.max(window.innerHeight * 1.25, Math.abs(getStartX() - getEndX()) * 0.85))}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      if (typeof document !== 'undefined' && document.fonts?.ready) {
        document.fonts.ready.then(() => {
          if (isMounted) {
            ScrollTrigger.refresh();
          }
        });
      }
    }, section);

    return () => {
      isMounted = false;
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="announcement"
      ref={sectionRef}
      className="relative w-full bg-[#FAF7F2] text-[#58111A] select-none box-border"
    >
      <div
        ref={pinStageRef}
        className="relative w-full h-[100svh] min-h-[100svh] bg-[#FAF7F2] flex items-center overflow-hidden box-border"
      >
        <div
          ref={trackRef}
          className="flex items-center gap-[8vw] whitespace-nowrap shrink-0 will-change-transform"
        >
          <h2 className="font-bodoni font-bold uppercase whitespace-nowrap shrink-0 leading-none tracking-tight text-[#58111A] text-[13vw] sm:text-[12vw]">
            {ANNOUNCEMENT_TEXT}
          </h2>

          <img
            ref={imgRef}
            src="/assets/aistudio/image_0cbb344f.png"
            alt="Bride and Groom walking together"
            onLoad={() => ScrollTrigger.refresh()}
            className="h-[52svh] max-h-[420px] w-auto max-w-none object-contain shrink-0 pointer-events-none select-none drop-shadow-[0_16px_30px_rgba(88,17,26,0.12)]"
          />
        </div>
      </div>
    </section>
  );
};
