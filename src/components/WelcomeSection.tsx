import React from 'react';
import { GaneshaEmblem, DravidianPillar, GarlandToran } from './TempleArchitecture';
import { WeddingData } from '../data/weddingData';
import { ChevronDown } from 'lucide-react';

interface WelcomeSectionProps {
  data: WeddingData;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ data }) => {
  return (
    <section
      id="welcome"
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-4 parchment-bg overflow-hidden text-[#38241C]"
    >
      {/* Top Auspicious Floral Toran */}
      <div className="absolute top-0 inset-x-0 z-10 pointer-events-none opacity-90">
        <GarlandToran />
      </div>

      {/* Left and Right Dravidian Temple Flank Pillars */}
      <div className="absolute left-0 inset-y-0 z-10 hidden lg:flex items-center">
        <DravidianPillar side="left" className="h-full" />
      </div>
      <div className="absolute right-0 inset-y-0 z-10 hidden lg:flex items-center">
        <DravidianPillar side="right" className="h-full" />
      </div>

      {/* Main Parchment Invitation Card Frame */}
      <div className="relative z-20 w-full max-w-4xl mx-auto bg-[#FBF6EE]/90 backdrop-blur-xs border-2 border-[#C5A064]/60 rounded-3xl p-8 md:p-14 shadow-[0_15px_50px_rgba(72,28,37,0.08)] flex flex-col items-center text-center">
        {/* Inner Gold Foil Hairline Border */}
        <div className="absolute inset-3 border border-[#C5A064]/30 rounded-2xl pointer-events-none" />

        {/* Auspicious Ganesha Emblem */}
        <div className="mb-4">
          <GaneshaEmblem size={72} />
        </div>

        {/* Sacred Invocation Shloka */}
        <p className="font-serif italic text-xs md:text-sm text-[#805D26] tracking-widest mb-3">
          || श्री गणेशाय नमः || वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ||
        </p>

        {/* Blessings Kicker */}
        <p className="font-jost text-xs uppercase tracking-[0.25em] text-[#481C25]/80 font-medium mb-2">
          With the blessings of God and our beloved families
        </p>

        <p className="font-cormorant text-base md:text-lg tracking-wider text-[#38241C] uppercase mb-8">
          We invite you to celebrate
        </p>

        {/* Couple Names Editorial Serif Lockup */}
        <div className="my-2 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
          <div className="flex flex-col items-center">
            {data.groomSurname && (
              <span className="font-jost text-[11px] uppercase tracking-[0.3em] text-[#805D26] mb-0.5">
                {data.groomSurname}
              </span>
            )}
            <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-[#481C25] tracking-wide font-normal">
              {data.groomName}
            </h2>
          </div>

          <span className="font-script text-3xl md:text-4xl text-[#C5A064] my-1 md:my-0">
            weds
          </span>

          <div className="flex flex-col items-center">
            {data.brideSurname && (
              <span className="font-jost text-[11px] uppercase tracking-[0.3em] text-[#805D26] mb-0.5">
                {data.brideSurname}
              </span>
            )}
            <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-[#481C25] tracking-wide font-normal">
              {data.brideName}
            </h2>
          </div>
        </div>

        {/* Romantic Phrase */}
        <p className="font-script text-2xl md:text-3xl text-[#805D26] mt-4 mb-8">
          "Two hearts. One beautiful journey."
        </p>

        {/* Golden Ornamental Line Separator */}
        <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#C5A064] to-transparent my-2" />

        {/* Subtitle */}
        <p className="font-jost text-xs uppercase tracking-[0.3em] text-[#481C25] font-semibold mt-4">
          Our Wedding Celebration
        </p>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center gap-2 text-xs font-jost tracking-widest text-[#805D26]/70 uppercase">
          <span>Scroll to Meet the Couple</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#C5A064]" />
        </div>
      </div>
    </section>
  );
};
