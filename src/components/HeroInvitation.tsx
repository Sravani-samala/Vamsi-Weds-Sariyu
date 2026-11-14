import React from 'react';
import { WeddingData } from '../data/weddingData';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';

interface HeroInvitationProps {
  data: WeddingData;
  onExplore: () => void;
}

export const HeroInvitation: React.FC<HeroInvitationProps> = ({ data, onExplore }) => {
  return (
    <section
      id="invitation"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#FAF7F2]"
    >
      {/* Attached Hero Desktop Artwork */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.assets.heroDesktop}
          alt="Traditional South Indian Wedding Temple & Couple"
          className="w-full h-full object-cover object-center filter brightness-[0.98]"
        />
        {/* Soft warm gradient overlay to guarantee text legibility while showing the artwork */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#58111A]/20 via-transparent to-[#3E0B12]/40" />
      </div>

      {/* Center Invitation Card */}
      <div className="relative z-10 w-full max-w-2xl mx-4 my-12 p-6 sm:p-10 md:p-12 bg-white/95 backdrop-blur-md rounded-3xl border-2 border-[#C5A064] shadow-[0_20px_60px_rgba(88,17,26,0.25)] text-center">
        {/* Inner Gold Hairline Border */}
        <div className="absolute inset-2.5 sm:inset-3 border border-[#C5A064]/50 rounded-2xl pointer-events-none" />

        {/* Auspicious Shloka */}
        <p className="font-serif text-xs md:text-sm text-[#C5A064] font-semibold tracking-widest uppercase mb-1">
          || श्री गणेशाय नमः ||
        </p>
        <p className="font-serif italic text-[11px] md:text-xs text-[#58111A]/80 tracking-wider mb-4">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ · निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा
        </p>

        {/* Invitation Kicker */}
        <p className="font-jost text-xs uppercase tracking-[0.3em] text-[#C5A064] font-semibold mb-2">
          Wedding Invitation
        </p>
        <p className="font-cormorant text-xs sm:text-sm uppercase tracking-widest text-[#3E0B12]/80 mb-6">
          Together with their beloved families, we invite you to honor and celebrate the union of
        </p>

        {/* Couple Names */}
        <div className="my-3 flex flex-col items-center justify-center">
          <h1 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-[#58111A] font-medium tracking-wide">
            {data.groomFullName}
          </h1>

          <div className="my-2 flex items-center gap-3">
            <span className="w-8 sm:w-12 h-[1px] bg-[#C5A064]" />
            <span className="font-script text-2xl sm:text-3xl text-[#C5A064]">
              weds
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#C5A064]" />
          </div>

          <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-[#58111A] font-medium tracking-wide">
            {data.brideFullName}
          </h2>
        </div>

        {/* Decorative Quote */}
        <p className="font-script text-xl sm:text-2xl text-[#C5A064] my-4">
          "Two souls bound by love, tradition and sacred vows."
        </p>

        {/* Date & Location Pill Summary */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 py-2 px-5 bg-[#FAF7F2] border border-[#C5A064]/40 rounded-full my-4 text-xs font-jost text-[#58111A]">
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#C5A064]" />
            <span>{data.weddingDate || 'Date to be announced'}</span>
          </span>
          <span className="text-[#C5A064]">·</span>
          <span className="flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#C5A064]" />
            <span>{data.venue || 'South Indian Wedding Convention'}</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-7 py-3 bg-[#58111A] hover:bg-[#3E0B12] text-[#ECC880] text-xs font-jost uppercase tracking-[0.2em] font-semibold rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Invitation Details</span>
            <ChevronDown className="w-4 h-4 text-[#ECC880] animate-bounce" />
          </button>

          <a
            href="#ceremonies"
            className="w-full sm:w-auto px-6 py-3 border border-[#C5A064] text-[#58111A] hover:bg-[#FAF7F2] text-xs font-jost uppercase tracking-wider font-semibold rounded-full transition-all"
          >
            Ceremonies & Muhurtam
          </a>
        </div>
      </div>
    </section>
  );
};
