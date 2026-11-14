import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart } from 'lucide-react';
import { EngagementViewProps } from './EngagementDesktop';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

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

export const EngagementMobile: React.FC<EngagementViewProps> = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ringStageRef = useRef<HTMLDivElement | null>(null);
  const ringWrapRef = useRef<HTMLDivElement | null>(null);
  const stackStageRef = useRef<HTMLDivElement | null>(null);
  const stackContainerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const ringStage = ringStageRef.current;
    const ringEl = ringWrapRef.current;
    const stackStage = stackStageRef.current;
    const stackContainer = stackContainerRef.current;

    if (!section || !ringStage || !ringEl || !stackStage || !stackContainer) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const mobileCards = gsap.utils.toArray<HTMLElement>('.mobile-engagement-card');
      const rotations = [-2.5, 2.2, -1.8, 2.4, -1.5, 1.8];
      const xOffsets = [-4, 5, -3, 4, -2, 3];

      if (prefersReducedMotion) {
        gsap.set(ringEl, { scale: 1, opacity: 1 });
        gsap.set(stackContainer, { opacity: 1, y: 0 });
        gsap.set(mobileCards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // 1. Ring grows smoothly within mobile viewport width directly below caption
      gsap.fromTo(
        ringEl,
        {
          scale: 0.28,
        },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ringStage,
            start: 'top 78%',
            end: 'center 45%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );

      // 2. Stack container starts hidden and reveals ONLY after ring growth completes
      gsap.set(stackContainer, {
        opacity: 0,
        y: 36,
      });

      mobileCards.forEach((card, idx) => {
        const rot = rotations[idx % rotations.length];
        const xOff = xOffsets[idx % xOffsets.length];
        if (idx === 0) {
          gsap.set(card, {
            opacity: 1,
            y: 0,
            x: xOff,
            scale: 1,
            rotate: rot,
          });
        } else {
          gsap.set(card, {
            opacity: 0,
            y: 80,
            x: xOff,
            scale: 0.92,
            rotate: rot * 2,
          });
        }
      });

      // Reveal photo stack right as it enters viewport strictly after ring growth has completed
      gsap.to(stackContainer, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stackStage,
          start: 'top 65%',
          end: 'top 28%',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // 3. Dedicated 100svh pinned photo stack directly BELOW the ring (never overlapping ring)
      const stackTl = gsap.timeline({
        scrollTrigger: {
          trigger: stackStage,
          start: 'top top',
          end: '+=200%',
          pin: true,
          pinSpacing: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      mobileCards.forEach((card, idx) => {
        if (idx === 0) return;
        const rot = rotations[idx % rotations.length];
        const xOff = xOffsets[idx % xOffsets.length];

        stackTl.to(
          card,
          {
            opacity: 1,
            y: 0,
            x: xOff,
            scale: 1,
            rotate: rot,
            duration: 0.6,
            ease: 'power2.out',
          },
          '+=0.15'
        );
      });

      stackTl.to({}, { duration: 0.2 });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="engagement"
      ref={sectionRef}
      className="relative w-full bg-white text-[#3E0B12] overflow-x-clip select-none box-border"
    >
      {/* 1. Section Heading & Telugu Caption */}
      <div className="pt-16 pb-4 px-4 text-center max-w-xl mx-auto flex flex-col items-center space-y-2 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#C5A064]/40 shadow-xs mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A064]" />
          <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#58111A] font-semibold">
            Sacred Union
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#C5A064]" />
        </div>

        <h2 className="font-bodoni text-3xl sm:text-4xl text-[#58111A] font-medium tracking-tight">
          OUR ENGAGEMENT
        </h2>

        <p className="font-telugu text-lg sm:text-xl text-[#C5A064] font-normal tracking-normal">
          ఒక చిన్న పరిచయం... జీవితాంతం నిలిచే అనుబంధంగా మారింది.
        </p>

        {/* Subtle gold separator */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="w-12 h-[1px] bg-[#C5A064]/50" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#C5A064]" />
          <span className="w-12 h-[1px] bg-[#C5A064]/50" />
        </div>
      </div>

      {/* 2. Ring Grow Stage directly below caption (never overlaid by stack photos) */}
      <div
        ref={ringStageRef}
        className="relative w-full min-h-[64svh] py-10 px-4 flex items-center justify-center bg-white box-border"
      >
        <div
          ref={ringWrapRef}
          className="w-[min(76vw,320px)] flex items-center justify-center will-change-transform pointer-events-none"
        >
          <img
            src={RING_IMAGE_SRC}
            alt="Engagement Rings"
            className="w-full h-auto object-contain block drop-shadow-[0_20px_40px_rgba(197,160,100,0.28)]"
          />
        </div>
      </div>

      {/* 3. Layered Engagement Photo Stack Wrapper: isolates GSAP pin-spacer from React siblings */}
      <div className="relative w-full">
        <div
          ref={stackStageRef}
          className="relative w-full h-[100svh] min-h-[100svh] bg-white px-4 py-6 flex flex-col items-center justify-center box-border overflow-hidden"
        >
        <div
          ref={stackContainerRef}
          className="w-full flex flex-col items-center justify-center will-change-transform"
        >
          <div className="relative w-[min(82vw,320px)] h-[min(54svh,400px)] min-h-[300px] mx-auto mb-6">
            {ENGAGEMENT_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                className="mobile-engagement-card absolute inset-0 bg-white border-2 border-[#C5A064] rounded-3xl p-3 shadow-[0_18px_45px_rgba(88,17,26,0.16)] flex flex-col will-change-transform box-border"
                style={{
                  zIndex: 10 + idx,
                  top: `${idx * 5}px`,
                }}
              >
                <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-jost text-[10px] uppercase tracking-[0.2em] text-[#ECC880] mb-0.5">
                      {photo.title}
                    </p>
                    <p className="font-cormorant italic text-xs text-white/95 leading-snug">
                      {photo.caption}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 pb-0.5 px-1 flex items-center justify-between text-[11px] font-jost text-[#58111A]">
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
