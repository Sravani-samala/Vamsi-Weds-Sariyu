import React, { useState } from 'react';
import { Character3D } from './Character3D';
import { WeddingData } from '../data/weddingData';
import { Music, Calendar, Clock, MapPin, Play, Pause } from 'lucide-react';

interface DJNightSectionProps {
  data: WeddingData;
}

export const DJNightSection: React.FC<DJNightSectionProps> = ({ data }) => {
  const [isDancing, setIsDancing] = useState(true);

  return (
    <section
      id="dj"
      className="relative min-h-screen w-full py-24 px-6 bg-gradient-to-b from-[#1F0A1D] via-[#2B0E27] to-[#180516] text-[#F8F0E3] overflow-hidden"
    >
      {/* Deep Royal Purple & Fairy Lights Canopy */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(197,160,100,0.18)_0%,rgba(114,9,72,0.25)_40%,transparent_75%)] pointer-events-none" />

      {/* Hanging Golden Fairy Light Bulbs Canopy */}
      <div className="absolute top-0 inset-x-0 h-32 flex justify-around pointer-events-none select-none opacity-80">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-[1px] bg-gradient-to-b from-white/30 to-[#ECC880]"
              style={{ height: `${30 + (i % 4) * 25}px` }}
            />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFE8A3] shadow-[0_0_12px_#ECC880] animate-pulse" />
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-xl mb-10">
          <p className="font-jost text-xs uppercase tracking-[0.3em] text-[#ECC880] font-semibold mb-2 flex items-center justify-center gap-2">
            <Music className="w-3.5 h-3.5" />
            <span>Let's Dance the Night Away</span>
          </p>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-[#FFE8A3] uppercase tracking-wide mb-3">
            Sangeet & DJ Night
          </h2>
          <div className="w-24 h-[1px] bg-[#C5A064] mx-auto mb-3" />
          <p className="font-script text-2xl text-[#ECC880]">
            An enchanting evening of music, celebration, and joyous beats.
          </p>
        </div>

        {/* 3D Festive Dance Stage */}
        <div className="w-full bg-[#1A0617]/70 backdrop-blur-md border border-[#C5A064]/30 rounded-3xl p-6 md:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.5)] relative overflow-hidden mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Bride in Festive Magenta/Plum Evening Attire */}
            <div className="relative flex flex-col items-center h-[380px] md:h-[440px]">
              <span className="font-bodoni text-lg text-[#FFE8A3] mb-1">
                {data.brideName}
              </span>
              <span className="text-[11px] font-jost uppercase tracking-widest text-[#C5A064] mb-2">
                In Evening Silk Lehenga
              </span>
              <Character3D
                type="bride"
                attire="dj"
                animation={isDancing ? 'dance' : 'idle'}
                cameraPosition={[0, 1.1, 2.7]}
                height="100%"
                interactive={true}
              />
            </div>

            {/* Groom in Midnight Navy Bandhgala */}
            <div className="relative flex flex-col items-center h-[380px] md:h-[440px]">
              <span className="font-bodoni text-lg text-[#FFE8A3] mb-1">
                {data.groomName}
              </span>
              <span className="text-[11px] font-jost uppercase tracking-widest text-[#C5A064] mb-2">
                In Royal Bandhgala
              </span>
              <Character3D
                type="groom"
                attire="dj"
                animation={isDancing ? 'dance' : 'idle'}
                cameraPosition={[0, 1.1, 2.7]}
                height="100%"
                interactive={true}
              />
            </div>
          </div>

          {/* Interactive Play/Pause Dance Groove */}
          <div className="mt-4 flex flex-col items-center text-center">
            <button
              onClick={() => setIsDancing(!isDancing)}
              className="px-6 py-2.5 bg-gradient-to-r from-[#C5A064] to-[#9B7637] text-white text-xs font-jost font-semibold uppercase tracking-[0.2em] rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              {isDancing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isDancing ? 'Synchronized Dance Active' : 'Start Dancing'}</span>
            </button>
          </div>
        </div>

        {/* Event Schedule Info */}
        <div className="w-full max-w-2xl bg-[#250920]/80 border border-[#C5A064]/25 rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-[#C5A064]/20 flex items-center justify-center text-[#FFE8A3] mb-2">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-jost uppercase tracking-wider text-[#C5A064]">
              Date
            </span>
            <span className="font-bodoni text-base font-semibold text-[#FFE8A3] mt-0.5">
              {data.djDate || 'Date to be announced'}
            </span>
          </div>

          <div className="h-8 w-[1px] bg-[#C5A064]/25 hidden sm:block" />

          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-[#C5A064]/20 flex items-center justify-center text-[#FFE8A3] mb-2">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-jost uppercase tracking-wider text-[#C5A064]">
              Time
            </span>
            <span className="font-bodoni text-base font-semibold text-[#FFE8A3] mt-0.5">
              {data.djTime || '7:00 PM Onwards'}
            </span>
          </div>

          <div className="h-8 w-[1px] bg-[#C5A064]/25 hidden sm:block" />

          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-[#C5A064]/20 flex items-center justify-center text-[#FFE8A3] mb-2">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-jost uppercase tracking-wider text-[#C5A064]">
              Venue
            </span>
            <span className="font-bodoni text-base font-semibold text-[#FFE8A3] mt-0.5">
              {data.djVenue || data.venue || 'Celebration Hall'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
