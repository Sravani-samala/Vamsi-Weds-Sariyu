import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export interface EngagementViewProps {
  onExploreNext?: () => void;
}

const RING_IMAGE_SRC = '/assets/aistudio/image_9f824452.png';

const ENGAGEMENT_PHOTOS = [
  {
    src: '/engagement/photos/engagement-1.jpg',
    title: 'The Sacred Promise',
    caption: 'With elders blessing and hearts uniting in eternal love',
  },
  {
    src: '/engagement/photos/engagement-2.jpg',
    title: 'Golden Moments',
    caption: 'Two souls choosing forever with joyful smiles',
  },
  {
    src: '/engagement/photos/engagement-3.jpg',
    title: 'Family Blessings',
    caption: 'Traditions honored, smiles shared, and memories cherished',
  },
  {
    src: '/engagement/photos/engagement-4.jpg',
    title: 'His Promise',
    caption: 'Kandagatla Vamsi celebrating the beginning of forever',
  },
  {
    src: '/engagement/photos/engagement-5.jpg',
    title: 'Her Grace',
    caption: 'Madas Sariyu adorned in festive silk and radiant happiness',
  },
  {
    src: '/engagement/photos/engagement-6.jpg',
    title: 'Bound in Destiny',
    caption: 'Step by step towards our auspicious wedding day',
  },
];

export const EngagementDesktop: React.FC<EngagementViewProps> = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const ringWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const ringEl = ringWrapRef.current;
    if (!stage || !ringEl) return;

    let isMounted = true;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const desktopCards = gsap.utils.toArray<HTMLElement>('.desktop-overlay-photo');

      if (prefersReducedMotion) {
        gsap.set(ringEl, {
          left: '26%',
          top: '50%',
          xPercent: -50,
          yPercent: -50,
          scale: 1,
        });
        gsap.set(desktopCards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=380%',
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Stage 1: Ring grows from small center into full original size & moves to left side
      masterTl.fromTo(
        ringEl,
        {
          left: '50%',
          top: '15%',
          xPercent: -50,
          yPercent: -50,
          scale: 0.3,
          transformOrigin: 'center center',
        },
        {
          left: '26%',
          top: '50%',
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          duration: 1.3,
          ease: 'power2.inOut',
        },
        0
      );

      // Stage 2: Ring stays sticky on the left while photos arrive sequentially on the right
      desktopCards.forEach((card, idx) => {
        const rotations = [-2, 2.2, -1.5, 2, -1.8, 1.5];
        const rot = rotations[idx % rotations.length];

        masterTl.fromTo(
          card,
          {
            opacity: 0,
            y: 120,
            scale: 0.92,
            rotate: rot * 2,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: rot,
            duration: 0.6,
            ease: 'power2.out',
          },
          idx === 0 ? '+=0.1' : '+=0.15'
        );
      });
    }, sectionRef);

    // Ensure all ScrollTriggers (including earlier pinned sections) are sorted by DOM order and refreshed
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
      id="engagement"
      ref={sectionRef}
      className="relative w-full bg-white text-[#3E0B12] overflow-x-clip select-none box-border"
    >
      {/* Section Heading & Telugu Caption */}
      <div className="pt-20 pb-6 px-4 text-center max-w-3xl mx-auto flex flex-col items-center space-y-2.5 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#C5A064]/40 shadow-xs mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A064]" />
          <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#58111A] font-semibold">
            Sacred Union
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#C5A064]" />
        </div>

        <h2 className="font-bodoni text-5xl md:text-6xl text-[#58111A] font-medium tracking-tight">
          OUR ENGAGEMENT
        </h2>

        <p className="font-telugu text-xl md:text-2xl text-[#C5A064] font-normal tracking-normal">
          ఒక చిన్న పరిచయం... జీవితాంతం నిలిచే అనుబంధంగా మారింది.
        </p>

        {/* Subtle gold separator */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="w-12 h-[1px] bg-[#C5A064]/50" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#C5A064]" />
          <span className="w-12 h-[1px] bg-[#C5A064]/50" />
        </div>
      </div>

      {/* Desktop Pinned Stage Wrapper: isolates GSAP pin-spacer from React siblings */}
      <div className="relative w-full">
        <div
          ref={stageRef}
          className="relative w-full max-w-full box-border bg-white overflow-hidden h-screen min-h-[100svh]"
        >
        {/* Engagement Rings Image */}
        <div
          ref={ringWrapRef}
          className="absolute z-10 w-[320px] lg:w-[430px] xl:w-[490px] flex items-center justify-center will-change-transform pointer-events-none"
        >
          <img
            src={RING_IMAGE_SRC}
            alt="Engagement Rings"
            onLoad={() => {
              ScrollTrigger.sort();
              ScrollTrigger.refresh();
            }}
            className="w-full h-auto object-contain block drop-shadow-[0_24px_45px_rgba(197,160,100,0.28)]"
          />
        </div>

        {/* Right Side Foreground: Layered Photo Stack */}
        <div className="flex absolute inset-0 z-20 pointer-events-none items-center justify-end pr-6 lg:pr-20 xl:pr-28">
          <div className="relative w-[350px] lg:w-[430px] h-[490px] lg:h-[520px] pointer-events-auto">
            {ENGAGEMENT_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                className="desktop-overlay-photo absolute inset-0 bg-white border-2 border-[#C5A064] rounded-3xl p-3.5 shadow-[0_20px_50px_rgba(88,17,26,0.12)] flex flex-col will-change-transform"
                style={{
                  zIndex: 10 + idx,
                  top: `${idx * 4}px`,
                }}
              >
                <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-jost text-[11px] uppercase tracking-[0.2em] text-[#ECC880] mb-0.5">
                      {photo.title}
                    </p>
                    <p className="font-cormorant italic text-sm text-white/95">
                      {photo.caption}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 pb-0.5 px-1 flex items-center justify-between text-xs font-jost text-[#58111A]">
                  <span className="font-medium tracking-wider">
                    Sariyu &amp; Vamsi
                  </span>
                  <span className="text-[#C5A064] flex items-center gap-1 font-semibold">
                    <Heart className="w-3 h-3 fill-[#C5A064]" />
                    <span>0{idx + 1} / 06</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
