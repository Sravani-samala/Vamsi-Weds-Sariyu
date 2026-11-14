import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';
import { WeddingData } from '../data/weddingData';
import { WEDDING_SECTION_CONFIG } from '../config/weddingConfig';

gsap.registerPlugin(ScrollTrigger);

interface ThankYouSectionProps {
  data: WeddingData;
  onBackToTop: () => void;
}

export const ThankYouSection: React.FC<ThankYouSectionProps> = ({
  onBackToTop,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [finaleImageError, setFinaleImageError] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = content.querySelectorAll('.thankyou-reveal');
      gsap.fromTo(
        items,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  const handleBackToTop = () => {
    if (onBackToTop) {
      onBackToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="thankyou"
      ref={sectionRef}
      className="relative min-h-[82svh] w-full py-24 sm:py-32 px-6 bg-[#38251D] text-[#F8F0E5] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Traditional South Indian Wedding Mandapam Twilight Backdrop */}
      {!finaleImageError ? (
        <img
          src={WEDDING_SECTION_CONFIG.mandapamFinaleImage}
          alt="Traditional South Indian wedding mandapam illuminated with brass lamps"
          referrerPolicy="no-referrer"
          onLoad={() => {
            ScrollTrigger.sort();
            ScrollTrigger.refresh();
          }}
          onError={() => setFinaleImageError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#511E2A] via-[#38251D] to-[#261712]"
        />
      )}

      {/* Measured Warm Dark Scrim & Soft Antique Gold Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#38251D]/82 via-[#511E2A]/74 to-[#261712]/90"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(185,148,85,0.22)_0%,transparent_65%)] pointer-events-none"
      />

      {/* Top Antique Gold Hairline */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#B99455]/75 to-transparent"
      />

      {/* Final Editorial Composition */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-3xl w-full mx-auto flex flex-col items-center text-center"
      >
        <p className="thankyou-reveal font-telugu text-lg sm:text-xl text-[#E5C993] tracking-normal mb-4">
          ధన్యవాదములు
        </p>

        <h2 className="thankyou-reveal font-bodoni text-4xl sm:text-6xl md:text-7xl text-[#F8F0E5] font-normal tracking-[0.1em] uppercase leading-none">
          THANK YOU!
        </h2>

        <div className="thankyou-reveal flex items-center justify-center gap-3 my-6">
          <span className="w-12 h-[1px] bg-[#B99455]/80" />
          <span className="w-2 h-2 rotate-45 border border-[#B99455] bg-[#2F4F3A]" />
          <span className="w-12 h-[1px] bg-[#B99455]/80" />
        </div>

        <p className="thankyou-reveal font-cormorant italic text-2xl sm:text-3xl text-[#F8F0E5]/95 max-w-xl leading-relaxed">
          We can&apos;t wait to celebrate with you.
        </p>

        <p className="thankyou-reveal font-bodoni text-xl sm:text-2xl md:text-3xl text-[#E5C993] mt-3 tracking-wide">
          See you at our wedding!
        </p>

        <p className="thankyou-reveal font-jost text-xs sm:text-sm uppercase tracking-[0.38em] text-[#F8F0E5]/85 tabular-nums mt-7 mb-10">
          {WEDDING_SECTION_CONFIG.fullDateDisplay}
        </p>

        {/* BACK TO TOP Button */}
        <div className="thankyou-reveal">
          <button
            type="button"
            onClick={handleBackToTop}
            className="group inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#B99455] hover:bg-[#CCA869] text-[#38251D] text-xs sm:text-sm font-jost font-semibold uppercase tracking-[0.26em] transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8F0E5]"
          >
            <ArrowUp className="w-4 h-4 text-[#38251D] group-hover:-translate-y-0.5 transition-transform duration-200" />
            <span>BACK TO TOP</span>
          </button>
        </div>

        <p className="thankyou-reveal font-telugu text-sm sm:text-base text-[#E5C993]/80 tracking-normal mt-12">
          || శుభమస్తు · అవిఘ్నమస్తు · కళ్యాణమస్తు ||
        </p>
      </div>
    </section>
  );
};
