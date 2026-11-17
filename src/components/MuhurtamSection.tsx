import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WeddingData } from '../data/weddingData';
import { WEDDING_SECTION_CONFIG } from '../config/weddingConfig';
import { SaveTheDateScratchCard } from './SaveTheDateScratchCard';
import { RosePetalsConfetti } from './RosePetalsConfetti';

gsap.registerPlugin(ScrollTrigger);

interface MuhurtamSectionProps {
  data: WeddingData;
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isArrived: boolean;
}

function getISTCountdown(dateISO: string, time24h: string): CountdownTime {
  // Explicitly evaluate target instant in Asia/Kolkata (+05:30)
  const targetTimestamp = Date.parse(`${dateISO}T${time24h}+05:30`);
  const nowTimestamp = Date.now();
  const diffMs = targetTimestamp - nowTimestamp;

  if (Number.isNaN(targetTimestamp) || diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isArrived: true,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isArrived: false,
  };
}

function padTwo(value: number): string {
  return String(value).padStart(2, '0');
}

export const MuhurtamSection: React.FC<MuhurtamSectionProps> = () => {
  const rootRef = useRef<HTMLElement | null>(null);
  const openingBlockRef = useRef<HTMLDivElement | null>(null);
  const openingImageRef = useRef<HTMLImageElement | null>(null);
  const saveDateBlockRef = useRef<HTMLDivElement | null>(null);
  const countdownBlockRef = useRef<HTMLDivElement | null>(null);
  const jilakaraFrameRef = useRef<HTMLDivElement | null>(null);
  const inviteBlockRef = useRef<HTMLDivElement | null>(null);

  const [openingImageError, setOpeningImageError] = useState(false);
  const [jilakaraImageError, setJilakaraImageError] = useState(false);
  const [isDateRevealed, setIsDateRevealed] = useState(false);

  const [countdown, setCountdown] = useState<CountdownTime>(() =>
    getISTCountdown(
      WEDDING_SECTION_CONFIG.targetDateISO,
      WEDDING_SECTION_CONFIG.targetTimeIST24h
    )
  );

  // Live 1-second Asia/Kolkata countdown updater
  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(
        getISTCountdown(
          WEDDING_SECTION_CONFIG.targetDateISO,
          WEDDING_SECTION_CONFIG.targetTimeIST24h
        )
      );
    };

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  // Animate countdown numbers in smoothly once Save the Date scratch card is revealed
  useEffect(() => {
    if (!isDateRevealed || !countdownBlockRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const units = countdownBlockRef.current.querySelectorAll('.countdown-unit');
    if (units.length > 0) {
      gsap.fromTo(
        units,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    }
  }, [isDateRevealed]);

  // Scroll-driven editorial reveal animations (Desktop & Mobile isolated via matchMedia)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    const setupAnimations = (isDesktop: boolean) => {
      const yOffset = isDesktop ? 36 : 22;

      // 1. Opening — Sacred Auspicious Muhurtam
      if (openingBlockRef.current) {
        const items = openingBlockRef.current.querySelectorAll('.muhurtam-open-reveal');
        gsap.fromTo(
          items,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: openingBlockRef.current,
              start: isDesktop ? 'top 74%' : 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        if (openingImageRef.current) {
          gsap.fromTo(
            openingImageRef.current,
            { scale: isDesktop ? 1.08 : 1.04 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: openingBlockRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        }
      }

      // 2. Save The Date Scratch Card Block Entrance
      if (saveDateBlockRef.current) {
        gsap.fromTo(
          saveDateBlockRef.current,
          { opacity: 0, y: isDesktop ? 30 : 20, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: saveDateBlockRef.current,
              start: isDesktop ? 'top 78%' : 'top 86%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Countdown Container Entrance
      if (countdownBlockRef.current) {
        gsap.fromTo(
          countdownBlockRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: countdownBlockRef.current,
              start: isDesktop ? 'top 82%' : 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 4. Jilakara Bellam Image — Subtle Grow / Reveal directly below countdown
      if (jilakaraFrameRef.current) {
        gsap.fromTo(
          jilakaraFrameRef.current,
          { opacity: 0, scale: isDesktop ? 0.93 : 0.95, y: 26 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: jilakaraFrameRef.current,
              start: isDesktop ? 'top 80%' : 'top 86%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 5. You Are Warmly Invited — Text Reveal
      if (inviteBlockRef.current) {
        const inviteItems = inviteBlockRef.current.querySelectorAll('.invite-reveal');
        gsap.fromTo(
          inviteItems,
          { opacity: 0, y: yOffset * 0.75 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: inviteBlockRef.current,
              start: isDesktop ? 'top 80%' : 'top 86%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    };

    const ctx = gsap.context(() => {
      mm.add('(min-width: 768px)', () => {
        setupAnimations(true);
      });
      mm.add('(max-width: 767px)', () => {
        setupAnimations(false);
      });
    }, root);

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      mm.revert();
      ctx.revert();
    };
  }, []);

  const hasJilakaraImage =
    Boolean(WEDDING_SECTION_CONFIG.jilakaraBellamImage) && !jilakaraImageError;

  const countdownUnits = useMemo(
    () => [
      { label: 'DAYS', value: String(countdown.days).padStart(2, '0') },
      { label: 'HOURS', value: padTwo(countdown.hours) },
      { label: 'MINUTES', value: padTwo(countdown.minutes) },
      { label: 'SECONDS', value: padTwo(countdown.seconds) },
    ],
    [countdown.days, countdown.hours, countdown.minutes, countdown.seconds]
  );

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-[#F8F0E5] text-[#38251D] overflow-x-clip select-none"
    >
      {/* Celebratory Left & Right Screen Rose Petals Confetti upon Scratch Reveal */}
      <RosePetalsConfetti active={isDateRevealed} />
      {/* =================================================================== */}
      {/* 1. SECTION OPENING — THE SACRED AUSPICIOUS MUHURTAM                 */}
      {/* =================================================================== */}
      <div
        ref={openingBlockRef}
        className="relative w-full min-h-[88svh] sm:min-h-[92svh] flex items-center justify-center bg-[#511E2A] text-[#F8F0E5] overflow-hidden"
      >
        {/* Mandapam & Sacred Agni Atmospheric Backdrop */}
        {!openingImageError ? (
          <img
            ref={openingImageRef}
            src={WEDDING_SECTION_CONFIG.mandapamOpeningImage}
            alt="Traditional South Indian wedding mandapam with sacred Agni and brass lamps"
            referrerPolicy="no-referrer"
            onLoad={() => {
              ScrollTrigger.sort();
              ScrollTrigger.refresh();
            }}
            onError={() => setOpeningImageError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#38251D] via-[#511E2A] to-[#38251D]"
          />
        )}

        {/* Measured Deep Maroon & Dark Brown Contrast Scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#38251D]/78 via-[#511E2A]/68 to-[#38251D]/88"
        />

        {/* Subtle Sacred Agni Golden Radiance */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(185,148,85,0.28)_0%,rgba(185,148,85,0.08)_38%,transparent_72%)] pointer-events-none animate-pulse"
          style={{ animationDuration: '5.5s' }}
        />

        {/* Subtle Top & Bottom Antique Gold Hairlines */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#B99455]/70 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#B99455]/70 to-transparent"
        />

        {/* Editorial Opening Content */}
        <div className="relative z-10 max-w-4xl w-full mx-auto px-6 py-24 sm:py-32 text-center flex flex-col items-center">
          <p className="muhurtam-open-reveal font-telugu text-lg sm:text-xl md:text-2xl text-[#E5C993] tracking-normal mb-5">
            శుభ ముహూర్త వేళ · శుభమస్తు
          </p>

          <h2 className="muhurtam-open-reveal font-bodoni text-3xl sm:text-5xl md:text-6xl lg:text-[4.1rem] text-[#F8F0E5] font-normal tracking-[0.06em] leading-[1.12] uppercase max-w-3xl [text-wrap:balance] drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
            THE SACRED AUSPICIOUS MUHURTAM
          </h2>

          {/* Minimal Antique Gold & Traditional Green Accent Divider */}
          <div className="muhurtam-open-reveal flex items-center justify-center gap-3 my-7">
            <span className="w-14 sm:w-20 h-[1px] bg-[#B99455]/75" />
            <span className="w-2 h-2 rotate-45 border border-[#B99455] bg-[#2F4F3A]" />
            <span className="w-14 sm:w-20 h-[1px] bg-[#B99455]/75" />
          </div>

          <p className="muhurtam-open-reveal font-cormorant italic text-xl sm:text-2xl md:text-[1.75rem] text-[#F8F0E5]/95 max-w-2xl leading-relaxed drop-shadow-sm">
            &ldquo;Two souls united in holy matrimony, blessed by the sacred Agni and our elders.&rdquo;
          </p>

          <p className="muhurtam-open-reveal font-telugu text-sm sm:text-base text-[#E5C993]/85 mt-6 tracking-normal">
            || యదేతద్ధృదయం తవ తదస్తు హృదయం మమ ||
          </p>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. SAVE THE DATE — SCRATCH CARD & 3. LIVE COUNTDOWN                 */}
      {/* =================================================================== */}
      <div className="relative w-full py-20 sm:py-28 lg:py-32 px-6 bg-[#F8F0E5] overflow-hidden">
        {/* Subtle Kanchipuram Silk Warm Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(185,148,85,0.1)_0%,transparent_62%)] pointer-events-none"
        />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Save The Date Interactive Scratch Card */}
          <div ref={saveDateBlockRef} className="w-full flex flex-col items-center">
            <SaveTheDateScratchCard
              day={WEDDING_SECTION_CONFIG.saveTheDateDisplay.day}
              month={WEDDING_SECTION_CONFIG.saveTheDateDisplay.month}
              year={WEDDING_SECTION_CONFIG.saveTheDateDisplay.year}
              isRevealed={isDateRevealed}
              onReveal={() => setIsDateRevealed(true)}
            />
          </div>

          {/* 3. Live Real-Time Wedding Countdown (Asia/Kolkata) — Revealed after Scratching */}
          <div
            ref={countdownBlockRef}
            className="w-full max-w-3xl mt-12 sm:mt-14 pt-10 border-t border-[#B99455]/35 relative"
          >
            {!isDateRevealed ? (
              <div className="relative py-2">
                <div
                  aria-hidden="true"
                  className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 sm:gap-x-0 opacity-25 blur-[2px] select-none pointer-events-none"
                >
                  {['DAYS', 'HOURS', 'MINUTES', 'SECONDS'].map((label, idx) => (
                    <div
                      key={label}
                      className={`flex flex-col items-center justify-center px-3 ${
                        idx < 3 ? 'sm:border-r sm:border-[#B99455]/30' : ''
                      }`}
                    >
                      <span className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-[#511E2A] tabular-nums leading-none font-normal">
                        ••
                      </span>
                      <span className="font-jost text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#B99455] font-semibold mt-3">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center px-4">
                  <p className="font-cormorant italic text-lg sm:text-xl text-[#511E2A] bg-[#F8F0E5]/90 border border-[#B99455]/45 px-5 py-2.5 shadow-xs">
                    Scratch the Save the Date card above to reveal the countdown
                  </p>
                </div>
              </div>
            ) : countdown.isArrived ? (
              <div className="countdown-unit py-4 animate-[fadeIn_0.6s_ease-out]">
                <p className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-[#511E2A] tracking-[0.16em] uppercase">
                  THE DAY HAS ARRIVED
                </p>
                <p className="font-cormorant italic text-lg sm:text-xl text-[#38251D]/80 mt-2">
                  With joy and gratitude, our auspicious wedding day is here.
                </p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 sm:gap-x-0">
                  {countdownUnits.map((unit, idx) => (
                    <div
                      key={unit.label}
                      className={`countdown-unit flex flex-col items-center justify-center px-3 ${
                        idx < countdownUnits.length - 1
                          ? 'sm:border-r sm:border-[#B99455]/30'
                          : ''
                      }`}
                    >
                      <span className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-[#511E2A] tabular-nums leading-none font-normal">
                        {unit.value}
                      </span>
                      <span className="font-jost text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#B99455] font-semibold mt-3">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* 4. Jilakara Bellam Ritual Image directly below Countdown */}
          {hasJilakaraImage && (
            <div
              ref={jilakaraFrameRef}
              className="relative w-full max-w-2xl lg:max-w-3xl mx-auto mt-14 sm:mt-18 flex items-center justify-center will-change-transform"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-12 inset-y-8 rounded-full bg-[radial-gradient(circle,rgba(185,148,85,0.2)_0%,transparent_72%)] blur-2xl pointer-events-none"
              />
              <img
                src={WEDDING_SECTION_CONFIG.jilakaraBellamImage}
                alt="Traditional Telugu wedding ritual Jilakara Bellam"
                referrerPolicy="no-referrer"
                onLoad={() => {
                  ScrollTrigger.sort();
                  ScrollTrigger.refresh();
                }}
                onError={() => setJilakaraImageError(true)}
                className="relative z-10 w-full h-auto max-h-[76svh] object-contain mx-auto block drop-shadow-[0_18px_36px_rgba(56,37,29,0.14)]"
              />
            </div>
          )}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 5. WEDDING INVITATION MESSAGE — YOU ARE WARMLY INVITED              */}
      {/* =================================================================== */}
      <div
        ref={inviteBlockRef}
        className="relative w-full pb-20 sm:pb-28 pt-4 px-6 bg-[#F8F0E5]"
      >
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <p className="invite-reveal font-telugu text-lg sm:text-xl text-[#B99455] tracking-normal mb-3">
            మీ రాక మాకు ఆనందదాయకం
          </p>

          <h3 className="invite-reveal font-bodoni text-3xl sm:text-5xl md:text-[3.25rem] text-[#511E2A] tracking-[0.08em] uppercase font-normal leading-tight [text-wrap:balance]">
            YOU ARE WARMLY INVITED
          </h3>

          <div className="invite-reveal flex items-center justify-center gap-3 my-6">
            <span className="w-12 h-[1px] bg-[#B99455]/70" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#2F4F3A]" />
            <span className="w-12 h-[1px] bg-[#B99455]/70" />
          </div>

          <p className="invite-reveal font-cormorant text-xl sm:text-2xl md:text-[1.65rem] text-[#38251D]/90 leading-relaxed max-w-2xl">
            &ldquo;Your presence and blessings will make our special day even more memorable. We would be delighted to celebrate this beautiful beginning with you.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};
