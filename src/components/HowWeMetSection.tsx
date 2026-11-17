import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, VolumeX, Sparkles, ChevronDown } from 'lucide-react';
import { WeddingData } from '../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

interface HowWeMetSectionProps {
  data: WeddingData;
  onExploreNext?: () => void;
}

export const HowWeMetSection: React.FC<HowWeMetSectionProps> = ({
  data,
  onExploreNext,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introTextRef = useRef<HTMLDivElement | null>(null);
  const pillContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const endCtaRef = useRef<HTMLDivElement | null>(null);
  const audioBtnRef = useRef<HTMLButtonElement | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !pillContainerRef.current || !introTextRef.current) return;

      // Function to get clean, jump-free responsive dimensions
      const getStartWidth = () => (window.innerWidth < 640 ? 270 : 320);
      const getStartHeight = () => (window.innerWidth < 640 ? 95 : 110);

      // Set initial states with explicit GSAP transforms (prevents CSS translate fighting on mobile)
      gsap.set(pillContainerRef.current, {
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        width: getStartWidth,
        height: getStartHeight,
        borderRadius: 9999,
        borderWidth: 1.5,
        borderColor: '#C5A064',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
      });

      gsap.set(introTextRef.current, {
        left: '50%',
        xPercent: -50,
        opacity: 1,
        y: 0,
      });

      if (endCtaRef.current) {
        gsap.set(endCtaRef.current, {
          left: '50%',
          xPercent: -50,
          opacity: 0,
          y: 40,
          pointerEvents: 'none',
        });
      }

      // Single coordinated scrub-based ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          pinSpacing: true,
          scrub: 0.6, // Smooth touch response on mobile
          anticipatePin: 1,
          invalidateOnRefresh: true, // Recalculates dynamically on mobile resize without jump
          onEnter: () => {
            if (videoRef.current && !videoError) {
              videoRef.current.play().catch(() => {});
            }
          },
          onEnterBack: () => {
            if (videoRef.current && !videoError) {
              videoRef.current.play().catch(() => {});
            }
          },
        },
      });

      // 1. Text fades out smoothly as video expands
      tl.to(
        introTextRef.current,
        {
          opacity: 0,
          y: -40,
          duration: 0.35,
          ease: 'power2.in',
        },
        0
      );

      // 2. Pill video smoothly expands into exact viewport dimensions without any unit jumps
      tl.to(
        pillContainerRef.current,
        {
          width: () => window.innerWidth,
          height: () => window.innerHeight,
          borderRadius: 0,
          borderWidth: 0,
          borderColor: 'transparent',
          boxShadow: 'none',
          duration: 1.0,
          ease: 'power2.inOut',
        },
        0.05
      );

      // 3. Once video reaches fullscreen, reveal the end transition prompt
      if (endCtaRef.current) {
        tl.to(
          endCtaRef.current,
          {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: 0.35,
            ease: 'power2.out',
          },
          0.85
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [videoError]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleScrollToHaldi = () => {
    if (onExploreNext) {
      onExploreNext();
      return;
    }
    const haldiEl = document.getElementById('haldi');
    if (haldiEl) {
      haldiEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative w-full bg-[#100306] text-white overflow-hidden flex flex-col items-center justify-center select-none"
      style={{
        height: '100svh',
        minHeight: '100svh',
      }}
    >
      {/* Background Cinematic Golden Ambient Glows */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#1A070B]/40 to-[#0A0103] pointer-events-none z-10" />

      {/* 01. INITIAL SECTION HEADER (3 Lines of Typography) */}
      <div
        ref={introTextRef}
        className="absolute top-[6%] sm:top-[8%] md:top-[9%] z-20 text-center max-w-3xl w-full mx-auto px-4 flex flex-col items-center space-y-2 will-change-transform"
      >
        {/* Line 1: Telugu Caption */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#58111A]/80 border border-[#C5A064]/50 shadow-md mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#ECC880]" />
          <span className="font-telugu text-sm sm:text-base tracking-normal text-[#ECC880] font-normal">
            {data.howWeMetTeluguCaption || 'తొలి అడుగు... తొలి పరిచయం...'}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#ECC880]" />
        </div>

        {/* Line 2: Heading */}
        <h2 className="font-bodoni text-3xl sm:text-5xl md:text-6xl text-[#ECC880] font-semibold tracking-wide drop-shadow-md">
          {data.howWeMetHeading || 'HOW WE MET'}
        </h2>

        {/* Line 3: Subtitle */}
        <p className="font-cormorant italic text-base sm:text-xl md:text-2xl text-white/85 font-light tracking-wide drop-shadow-sm">
          "{data.howWeMetSubtitle || 'Where our beautiful story began.'}"
        </p>

        {/* Subtle pill scroll cue */}
        <div className="pt-2 flex items-center justify-center gap-2 text-[11px] font-jost uppercase tracking-[0.2em] text-[#ECC880]/70">
          <span>Scroll down to expand story</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#C5A064] animate-bounce" />
        </div>
      </div>

      {/* 02. SCROLL-DRIVEN EXPANDING PILL-SHAPED VIDEO CONTAINER */}
      <div
        ref={pillContainerRef}
        className="absolute z-15 overflow-hidden border border-[#C5A064] bg-black will-change-transform flex items-center justify-center"
        style={{
          transformOrigin: 'center center',
        }}
      >
        {/* Real HTML5 Video Element */}
        {!videoError ? (
          <video
            ref={videoRef}
            src="/videos/how-we-met-1.mp4"
            poster={data.howWeMetPoster || '/src/assets/images/prewedding_portrait_1794328256971.jpg'}
            playsInline
            muted={isMuted}
            autoPlay
            loop
            preload="auto"
            className="w-full h-full object-cover"
            onError={() => {
              if (videoRef.current && videoRef.current.src.indexOf('how-we-met.mp4') === -1) {
                videoRef.current.src = '/videos/how-we-met.mp4';
                videoRef.current.load();
                videoRef.current.play().catch(() => {});
              } else {
                setVideoError(true);
              }
            }}
          >
            <source src="/videos/how-we-met-1.mp4" type="video/mp4" />
            <source src="/videos/how-we-met.mp4" type="video/mp4" />
          </video>
        ) : (
          /* High-res Poster Fallback if video file is not yet uploaded */
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={data.howWeMetPoster || '/src/assets/images/prewedding_portrait_1794328256971.jpg'}
              alt="How We Met - Prewedding portrait"
              className="w-full h-full object-cover filter brightness-[0.88]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex items-center justify-center">
              <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#ECC880]">
                Prewedding Story
              </span>
            </div>
          </div>
        )}

        {/* Floating Audio Mute / Unmute Control */}
        {!videoError && (
          <button
            ref={audioBtnRef}
            type="button"
            onClick={toggleMute}
            className="absolute top-4 right-4 z-40 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-[#ECC880] border border-[#C5A064]/50 backdrop-blur-md transition-all shadow-md cursor-pointer touch-manipulation"
            title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        )}
      </div>

      {/* 03. AFTER EXPANSION — END OF SECTION CALL TO ACTION */}
      <div
        ref={endCtaRef}
        className="absolute bottom-10 z-30 flex flex-col items-center gap-3 text-center px-4 will-change-transform"
      >
        {/* Story Continuation Text */}
        <p className="font-bodoni text-sm sm:text-base md:text-lg text-[#ECC880] tracking-[0.25em] uppercase font-semibold drop-shadow-lg">
          AND OUR BEAUTIFUL STORY CONTINUES...
        </p>

        {/* Scroll to Haldi Ceremony Button */}
        <button
          type="button"
          onClick={handleScrollToHaldi}
          className="group px-7 sm:px-9 py-3 bg-[#58111A]/90 hover:bg-[#58111A] text-[#ECC880] text-xs font-jost uppercase tracking-[0.25em] font-semibold rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-[#C5A064] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer touch-manipulation backdrop-blur-md"
        >
          <span>SCROLL TO ENGAGEMENT CEREMONY</span>
          <ChevronDown className="w-4 h-4 text-[#ECC880] group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
