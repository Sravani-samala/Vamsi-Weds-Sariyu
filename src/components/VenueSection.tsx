import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, ExternalLink, MapPin } from 'lucide-react';
import { WeddingData } from '../data/weddingData';
import { WEDDING_SECTION_CONFIG } from '../config/weddingConfig';

gsap.registerPlugin(ScrollTrigger);

interface VenueSectionProps {
  data: WeddingData;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ data }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const [venueImageError, setVenueImageError] = useState(false);

  const venueName =
    data.venue?.trim() || WEDDING_SECTION_CONFIG.venueNamePlaceholder;
  const muhurtamTime =
    data.muhurtamTime?.trim() || WEDDING_SECTION_CONFIG.muhurtamTimePlaceholder;
  const venueAddress =
    data.address?.trim() || WEDDING_SECTION_CONFIG.venueAddressPlaceholder;
  const mapsUrl =
    data.googleMapsUrl?.trim() ||
    WEDDING_SECTION_CONFIG.googleMapsUrl.trim() ||
    'https://www.google.com/maps';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add('(min-width: 768px)', () => {
        if (mediaRef.current) {
          gsap.fromTo(
            mediaRef.current,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 76%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (detailsRef.current) {
          const items = detailsRef.current.querySelectorAll('.venue-reveal');
          gsap.fromTo(
            items,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 76%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      mm.add('(max-width: 767px)', () => {
        if (mediaRef.current) {
          gsap.fromTo(
            mediaRef.current,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: mediaRef.current,
                start: 'top 86%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (detailsRef.current) {
          const items = detailsRef.current.querySelectorAll('.venue-reveal');
          gsap.fromTo(
            items,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: detailsRef.current,
                start: 'top 86%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, section);

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#F8F0E5] text-[#38251D] border-t border-[#B99455]/30 overflow-x-clip select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Layout: Architectural Split on Desktop, Clean Stack on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left: Mandapam / Venue Photograph */}
          <div ref={mediaRef} className="lg:col-span-6 flex">
            <div className="relative w-full border border-[#B99455]/55 bg-[#EFE4D1] p-2.5 sm:p-3.5 shadow-[0_20px_50px_rgba(56,37,29,0.12)] flex">
              <div className="relative w-full min-h-[280px] sm:min-h-[380px] lg:min-h-full overflow-hidden bg-[#38251D]">
                {!venueImageError ? (
                  <img
                    src={WEDDING_SECTION_CONFIG.venueShowcaseImage}
                    alt="Traditional South Indian wedding venue"
                    referrerPolicy="no-referrer"
                    onLoad={() => {
                      ScrollTrigger.sort();
                      ScrollTrigger.refresh();
                    }}
                    onError={() => setVenueImageError(true)}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#511E2A] to-[#38251D] text-[#F8F0E5]">
                    <MapPin className="w-8 h-8 text-[#B99455] mb-3" />
                    <p className="font-bodoni text-2xl">{venueName}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Structured Wedding Venue Details */}
          <div
            ref={detailsRef}
            className="lg:col-span-6 flex flex-col justify-center text-left py-2"
          >
            <p className="venue-reveal font-telugu text-lg sm:text-xl text-[#B99455] tracking-normal mb-2">
              కళ్యాణ వేదిక
            </p>
            <h2 className="venue-reveal font-bodoni text-3xl sm:text-4xl md:text-5xl text-[#511E2A] tracking-[0.06em] uppercase font-normal leading-tight">
              WEDDING VENUE
            </h2>

            <div className="venue-reveal flex items-center gap-3 my-5">
              <span className="w-14 h-[1px] bg-[#B99455]" />
              <span className="w-1.5 h-1.5 rotate-45 bg-[#2F4F3A]" />
            </div>

            {/* Venue Name */}
            <div className="venue-reveal pb-6 border-b border-[#B99455]/30">
              <p className="font-bodoni text-2xl sm:text-3xl text-[#38251D] font-normal leading-snug">
                {venueName}
              </p>
            </div>

            {/* Date & Muhurtam */}
            <div className="venue-reveal grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-[#B99455]/30">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-[#B99455] shrink-0 mt-1" />
                <div>
                  <span className="font-jost text-[11px] uppercase tracking-[0.26em] text-[#B99455] font-semibold block mb-1">
                    DATE
                  </span>
                  <p className="font-bodoni text-lg sm:text-xl text-[#511E2A] font-normal tabular-nums">
                    {WEDDING_SECTION_CONFIG.fullDateDisplay}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#B99455] shrink-0 mt-1" />
                <div>
                  <span className="font-jost text-[11px] uppercase tracking-[0.26em] text-[#B99455] font-semibold block mb-1">
                    MUHURTAM
                  </span>
                  <p className="font-bodoni text-lg sm:text-xl text-[#511E2A] font-normal">
                    {muhurtamTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Location / Complete Address */}
            <div className="venue-reveal py-6 border-b border-[#B99455]/30 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#B99455] shrink-0 mt-1" />
              <div>
                <span className="font-jost text-[11px] uppercase tracking-[0.26em] text-[#B99455] font-semibold block mb-1.5">
                  LOCATION
                </span>
                <p className="font-jost text-sm sm:text-base text-[#38251D]/90 leading-relaxed">
                  {venueAddress}
                </p>
              </div>
            </div>

            {/* Primary Action: View on Google Maps */}
            <div className="venue-reveal pt-7">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#511E2A] hover:bg-[#38251D] text-[#F8F0E5] border border-[#B99455] text-xs sm:text-sm font-jost font-medium uppercase tracking-[0.24em] transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99455]"
              >
                <MapPin className="w-4 h-4 text-[#B99455] shrink-0" />
                <span>VIEW ON GOOGLE MAPS</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#B99455] shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
