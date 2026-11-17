import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Sparkles } from 'lucide-react';
import { WeddingData } from '../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

interface MeetCoupleSectionProps {
  data: WeddingData;
}

export const MeetCoupleSection: React.FC<MeetCoupleSectionProps> = ({ data }) => {
  const groomSectionRef = useRef<HTMLElement | null>(null);
  const groomPhotoWrapRef = useRef<HTMLDivElement | null>(null);
  const groomPhotoImgRef = useRef<HTMLImageElement | null>(null);
  const groomTextWrapRef = useRef<HTMLDivElement | null>(null);

  const brideSectionRef = useRef<HTMLElement | null>(null);
  const bridePhotoWrapRef = useRef<HTMLDivElement | null>(null);
  const bridePhotoImgRef = useRef<HTMLImageElement | null>(null);
  const brideTextWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ----------------------------------------------------
      // PART A: GROOM (Kandagatla Vamsi) ScrollTrigger
      // ----------------------------------------------------
      if (groomSectionRef.current && groomPhotoWrapRef.current && groomTextWrapRef.current) {
        // Set initial states
        gsap.set(groomPhotoWrapRef.current, {
          clipPath: 'inset(100% 0% 0% 0%)',
          y: 80,
          opacity: 0,
        });
        if (groomPhotoImgRef.current) {
          gsap.set(groomPhotoImgRef.current, { scale: 1.15 });
        }

        const groomTl = gsap.timeline({
          scrollTrigger: {
            trigger: groomSectionRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse',
          },
        });

        // 1. Groom Photo clip-path reveal and slide-in from bottom/right
        groomTl.to(groomPhotoWrapRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
        });

        if (groomPhotoImgRef.current) {
          groomTl.to(
            groomPhotoImgRef.current,
            {
              scale: 1,
              duration: 1.6,
              ease: 'power2.out',
            },
            '-=1.2'
          );
        }

        // 2. Groom Staggered / Letter-by-letter text reveals
        const groomLetters = groomTextWrapRef.current.querySelectorAll('.groom-char');
        const groomStaggers = groomTextWrapRef.current.querySelectorAll('.groom-stagger');

        if (groomLetters.length > 0) {
          groomTl.fromTo(
            groomLetters,
            { opacity: 0, y: 20, rotateX: -30 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.03,
              duration: 0.7,
              ease: 'back.out(1.4)',
            },
            '-=1.1'
          );
        }

        if (groomStaggers.length > 0) {
          groomTl.fromTo(
            groomStaggers,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.8,
              ease: 'power2.out',
            },
            '-=0.6'
          );
        }

        // Parallax on groom photo when scrolling past
        if (groomPhotoWrapRef.current) {
          gsap.to(groomPhotoWrapRef.current, {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: groomSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      }

      // ----------------------------------------------------
      // PART B: BRIDE (Madas Sariyu) ScrollTrigger
      // ----------------------------------------------------
      if (brideSectionRef.current && bridePhotoWrapRef.current && brideTextWrapRef.current) {
        // Set initial states
        gsap.set(bridePhotoWrapRef.current, {
          clipPath: 'inset(100% 0% 0% 0%)',
          y: 80,
          opacity: 0,
        });
        if (bridePhotoImgRef.current) {
          gsap.set(bridePhotoImgRef.current, { scale: 1.15 });
        }

        const brideTl = gsap.timeline({
          scrollTrigger: {
            trigger: brideSectionRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse',
          },
        });

        // 1. Bride Photo clip-path reveal and slide-in from left
        brideTl.to(bridePhotoWrapRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
        });

        if (bridePhotoImgRef.current) {
          brideTl.to(
            bridePhotoImgRef.current,
            {
              scale: 1,
              duration: 1.6,
              ease: 'power2.out',
            },
            '-=1.2'
          );
        }

        // 2. Bride Staggered / Letter-by-letter text reveals
        const brideLetters = brideTextWrapRef.current.querySelectorAll('.bride-char');
        const brideStaggers = brideTextWrapRef.current.querySelectorAll('.bride-stagger');

        if (brideLetters.length > 0) {
          brideTl.fromTo(
            brideLetters,
            { opacity: 0, y: 20, rotateX: -30 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.03,
              duration: 0.7,
              ease: 'back.out(1.4)',
            },
            '-=1.1'
          );
        }

        if (brideStaggers.length > 0) {
          brideTl.fromTo(
            brideStaggers,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.8,
              ease: 'power2.out',
            },
            '-=0.6'
          );
        }

        // Parallax on bride photo when scrolling past
        if (bridePhotoWrapRef.current) {
          gsap.to(bridePhotoWrapRef.current, {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: brideSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      }
    });

    return () => ctx.revert();
  }, [data]);

  const splitLetters = (text: string, className: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={`inline-block ${className}`}
        style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div id="couple" className="relative w-full bg-[#FAF7F2] text-[#3E0B12] overflow-hidden">
      {/* Background Subtle Traditional Kolam & Paisley Watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(197,160,100,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(88,17,26,0.05)_0%,transparent_50%)] pointer-events-none" />

      {/* Decorative Traditional Border Top */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#C5A064] to-transparent opacity-40" />

      {/* ========================================================== */}
      {/* PART A: THE GROOM — Kandagatla Vamsi                       */}
      {/* ========================================================== */}
      <section
        id="groom"
        ref={groomSectionRef}
        className="relative min-h-screen flex items-center justify-center py-20 lg:py-28 px-4 sm:px-6 md:px-12 border-b border-[#C5A064]/20 overflow-hidden"
      >
        <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left / Editorial Typography */}
          <div
            ref={groomTextWrapRef}
            className="lg:col-span-6 flex flex-col justify-center space-y-6 order-2 lg:order-1"
          >
            {/* Tagline */}
            <div className="groom-stagger inline-flex items-center gap-2.5">
              <span className="w-8 h-[1.5px] bg-[#C5A064]" />
              <p className="font-jost text-xs uppercase tracking-[0.35em] text-[#C5A064] font-semibold">
                THE GROOM
              </p>
              <Sparkles className="w-3.5 h-3.5 text-[#C5A064]" />
            </div>

            {/* Groom Name with Letter-by-letter reveal */}
            <div className="overflow-hidden">
              <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#58111A] font-normal tracking-tight leading-none">
                {splitLetters(data.groomFullName || 'Kandagatla Vamsi', 'groom-char')}
              </h2>
            </div>

            {/* Telugu Name */}
            <div className="groom-stagger">
              <p className="font-telugu text-xl sm:text-2xl text-[#C5A064] font-normal tracking-normal">
                {data.groomTeluguName || 'కందగట్ల వంశీ'}
              </p>
            </div>

            {/* Decorative Gold Separator */}
            <div className="groom-stagger flex items-center gap-3 py-1">
              <div className="w-16 h-[1.5px] bg-[#C5A064]" />
              <div className="w-2 h-2 rotate-45 border border-[#C5A064] bg-[#C5A064]/20" />
              <div className="w-8 h-[1.5px] bg-[#C5A064]/60" />
            </div>

            {/* Parentage & Family Heritage */}
            <div className="groom-stagger space-y-2 bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-[#C5A064]/40 shadow-[0_10px_30px_rgba(88,17,26,0.06)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#58111A]" />
              <p className="font-jost text-xs uppercase tracking-[0.25em] text-[#C5A064] font-semibold">
                Son of
              </p>
              <h3 className="font-bodoni text-xl sm:text-2xl text-[#58111A] font-medium">
                {data.groomFatherName} &amp; {data.groomMotherName}
              </h3>
              <p className="font-jost text-xs text-[#3E0B12]/60 uppercase tracking-widest pt-1">
                Kandagatla Family Heritage
              </p>
            </div>

            {/* Blessing & Journey Quote */}
            <div className="groom-stagger pt-1">
              <p className="font-cormorant italic text-xl sm:text-2xl text-[#58111A] leading-relaxed">
                "{data.groomBlessingText}"
              </p>
            </div>
          </div>

          {/* Right / Groom Photograph Slide-in from Right/Bottom with Clip-path and Gold Frame */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end order-1 lg:order-2">
            <div
              ref={groomPhotoWrapRef}
              className="relative w-full max-w-md sm:max-w-lg aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(88,17,26,0.2)] border-2 border-[#C5A064] bg-white will-change-transform"
            >
              {/* Inner Double Gold Hairline Border */}
              <div className="absolute inset-3 border border-[#C5A064]/60 rounded-2xl pointer-events-none z-20" />

              {/* Groom Image */}
              <img
                ref={groomPhotoImgRef}
                src={data.assets.groomPhoto || '/images/groom.jpg'}
                alt={data.groomFullName}
                className="w-full h-full object-cover object-top will-change-transform"
              />

              {/* Bottom Subtle Gradient for Name Badge */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#3E0B12]/80 via-[#3E0B12]/30 to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-6 inset-x-6 z-20 text-center">
                <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#ECC880] font-semibold block mb-0.5">
                  THE GROOM
                </span>
                <span className="font-bodoni text-2xl sm:text-3xl text-white font-medium">
                  {data.groomFullName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* PART B: THE BRIDE — Madas Sariyu                           */}
      {/* ========================================================== */}
      <section
        id="bride"
        ref={brideSectionRef}
        className="relative min-h-screen flex items-center justify-center py-20 lg:py-28 px-4 sm:px-6 md:px-12 bg-[#F6EFE7] overflow-hidden"
      >
        <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left / Bride Photograph Slide-in from Left with Clip-path and Gold Frame */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start order-1">
            <div
              ref={bridePhotoWrapRef}
              className="relative w-full max-w-md sm:max-w-lg aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(88,17,26,0.2)] border-2 border-[#C5A064] bg-white will-change-transform"
            >
              {/* Inner Double Gold Hairline Border */}
              <div className="absolute inset-3 border border-[#C5A064]/60 rounded-2xl pointer-events-none z-20" />

              {/* Bride Image */}
              <img
                ref={bridePhotoImgRef}
                src={data.assets.bridePhoto || '/images/bride.jpg'}
                alt={data.brideFullName}
                className="w-full h-full object-cover object-top will-change-transform"
              />

              {/* Bottom Subtle Gradient for Name Badge */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#3E0B12]/80 via-[#3E0B12]/30 to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-6 inset-x-6 z-20 text-center">
                <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#ECC880] font-semibold block mb-0.5">
                  THE BRIDE
                </span>
                <span className="font-bodoni text-2xl sm:text-3xl text-white font-medium">
                  {data.brideFullName}
                </span>
              </div>
            </div>
          </div>

          {/* Right / Editorial Typography */}
          <div
            ref={brideTextWrapRef}
            className="lg:col-span-6 flex flex-col justify-center space-y-6 order-2"
          >
            {/* Tagline */}
            <div className="bride-stagger inline-flex items-center gap-2.5">
              <span className="w-8 h-[1.5px] bg-[#C5A064]" />
              <p className="font-jost text-xs uppercase tracking-[0.35em] text-[#C5A064] font-semibold">
                THE BRIDE
              </p>
              <Heart className="w-3.5 h-3.5 text-[#C5A064] fill-[#C5A064]" />
            </div>

            {/* Bride Name with Letter-by-letter reveal */}
            <div className="overflow-hidden">
              <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#58111A] font-normal tracking-tight leading-none">
                {splitLetters(data.brideFullName || 'Madas Sariyu', 'bride-char')}
              </h2>
            </div>

            {/* Telugu Name */}
            <div className="bride-stagger">
              <p className="font-telugu text-xl sm:text-2xl text-[#C5A064] font-normal tracking-normal">
                {data.brideTeluguName || 'మాడస్ సరియు'}
              </p>
            </div>

            {/* Decorative Gold Separator */}
            <div className="bride-stagger flex items-center gap-3 py-1">
              <div className="w-16 h-[1.5px] bg-[#C5A064]" />
              <div className="w-2 h-2 rotate-45 border border-[#C5A064] bg-[#C5A064]/20" />
              <div className="w-8 h-[1.5px] bg-[#C5A064]/60" />
            </div>

            {/* Parentage & Family Heritage */}
            <div className="bride-stagger space-y-2 bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-[#C5A064]/40 shadow-[0_10px_30px_rgba(88,17,26,0.06)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C5A064]" />
              <p className="font-jost text-xs uppercase tracking-[0.25em] text-[#C5A064] font-semibold">
                Daughter of
              </p>
              <h3 className="font-bodoni text-xl sm:text-2xl text-[#58111A] font-medium">
                {data.brideFatherName} &amp; {data.brideMotherName}
              </h3>
              <p className="font-jost text-xs text-[#3E0B12]/60 uppercase tracking-widest pt-1">
                Madas Family Heritage
              </p>
            </div>

            {/* Blessing & Journey Quote */}
            <div className="bride-stagger pt-1">
              <p className="font-cormorant italic text-xl sm:text-2xl text-[#58111A] leading-relaxed">
                "{data.brideBlessingText}"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
