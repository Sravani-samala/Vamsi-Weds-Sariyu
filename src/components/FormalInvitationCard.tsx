import React from 'react';
import { WeddingData } from '../data/weddingData';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { Tilt3D } from './Tilt3D';

interface FormalInvitationCardProps {
  data: WeddingData;
  onExplore: (sectionId: string) => void;
}

export const FormalInvitationCard: React.FC<FormalInvitationCardProps> = ({
  data,
  onExplore,
}) => {
  return (
    <section
      id="invitation-details"
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 bg-[#FAF7F2] text-[#3E0B12] overflow-hidden"
    >
      {/* Background Soft Gold Ambient Radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,160,100,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* 3D Interactive Tilt Card Frame */}
      <div className="w-full max-w-3xl mx-auto">
        <Tilt3D maxTilt={6} scale={1.01} className="w-full">
          <div className="relative z-10 w-full bg-white border-2 border-[#C5A064] rounded-3xl p-6 sm:p-10 md:p-14 shadow-[0_20px_60px_rgba(88,17,26,0.15)] text-center">
            {/* Inner Gold Foil Hairline Border */}
            <div className="absolute inset-3 border border-[#C5A064]/40 rounded-2xl pointer-events-none" />

            {/* Sacred Auspicious Shlokas in Telugu */}
            <div className="space-y-1 mb-5">
              <p className="font-telugu text-base sm:text-lg text-[#C5A064] font-normal tracking-normal">
                {data.blessingShlokaTelugu}
              </p>
              <p className="font-telugu text-sm text-[#58111A] tracking-normal font-normal">
                {data.mangalaShlokaTelugu}
              </p>
            </div>

            {/* Invitation Badge */}
            <div className="inline-block px-5 py-1.5 bg-[#58111A] text-[#ECC880] rounded-full mb-3 shadow-xs">
              <span className="font-jost text-xs uppercase tracking-[0.25em] font-semibold">
                Wedding Invitation
              </span>
            </div>

            <p className="font-cormorant text-base sm:text-lg text-[#3E0B12]/80 leading-relaxed max-w-xl mx-auto mb-6">
              With the divine grace of Almighty God and the loving blessings of our families, we cordially invite you to join us in honoring and celebrating the holy wedding union of
            </p>

            {/* Couple Editorial Lockup */}
            <div className="my-6 p-6 bg-[#FAF7F2] border border-[#C5A064]/40 rounded-2xl shadow-xs">
              <div className="flex flex-col items-center">
                <span className="font-jost text-xs text-[#C5A064] uppercase tracking-[0.25em] font-semibold mb-1">
                  The Groom
                </span>
                <h2 className="font-bodoni text-3xl sm:text-4xl text-[#58111A] font-medium tracking-tight">
                  {data.groomFullName}
                </h2>
              </div>

              <div className="my-3 flex items-center justify-center gap-4">
                <span className="w-16 h-[1.5px] bg-[#C5A064]" />
                <span className="font-script text-2xl sm:text-3xl text-[#C5A064]">
                  weds
                </span>
                <span className="w-16 h-[1.5px] bg-[#C5A064]" />
              </div>

              <div className="flex flex-col items-center">
                <span className="font-jost text-xs text-[#C5A064] uppercase tracking-[0.25em] font-semibold mb-1">
                  The Bride
                </span>
                <h2 className="font-bodoni text-3xl sm:text-4xl text-[#58111A] font-medium tracking-tight">
                  {data.brideFullName}
                </h2>
              </div>
            </div>

            {/* Sacred Vow in Telugu */}
            <p className="font-telugu text-base sm:text-lg text-[#C5A064] font-normal my-4">
              {data.sacredVowTelugu}
            </p>

            {/* Date and Venue Strip */}
            <div className="flex flex-wrap items-center justify-center gap-4 py-2.5 px-6 bg-[#FAF7F2] border border-[#C5A064]/40 rounded-full my-6 text-xs font-jost text-[#58111A]">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#C5A064]" />
                <span>{data.weddingDate || 'Date to be announced'}</span>
              </span>
              <span className="text-[#C5A064]">·</span>
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#C5A064]" />
                <span>{data.venue || 'South Indian Wedding Mandapam'}</span>
              </span>
            </div>

            {/* Action Buttons to Explore Sections */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onExplore('groom')}
                className="px-6 py-2.5 bg-[#58111A] hover:bg-[#3E0B12] text-[#ECC880] text-xs font-jost uppercase tracking-wider font-semibold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Meet Groom & Bride
              </button>

              <button
                onClick={() => onExplore('haldi')}
                className="px-6 py-2.5 border border-[#C5A064] text-[#58111A] hover:bg-[#FAF7F2] text-xs font-jost uppercase tracking-wider font-semibold rounded-full transition-all cursor-pointer"
              >
                Haldi Ceremony
              </button>

              <button
                onClick={() => onExplore('muhurtam')}
                className="px-6 py-2.5 bg-[#C5A064] hover:bg-[#B38D4F] text-white text-xs font-jost uppercase tracking-wider font-semibold rounded-full shadow-sm transition-all cursor-pointer"
              >
                The Muhurtam
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-10 flex flex-col items-center gap-1 text-xs font-jost uppercase tracking-widest text-[#C5A064]">
              <span>Scroll to Celebrate</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </div>
          </div>
        </Tilt3D>
      </div>
    </section>
  );
};
