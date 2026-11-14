import React from 'react';
import { WeddingData } from '../data/weddingData';
import { Heart } from 'lucide-react';
import { Tilt3D } from './Tilt3D';

interface BrideSectionProps {
  data: WeddingData;
}

export const BrideSection: React.FC<BrideSectionProps> = ({ data }) => {
  return (
    <section
      id="bride"
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 bg-[#FAF7F2] text-[#3E0B12]"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Editorial Typography */}
        <div className="lg:col-span-6 flex flex-col text-left space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#C5A064]" />
            <p className="font-jost text-xs uppercase tracking-[0.3em] text-[#C5A064] font-semibold">
              Meet The Bride
            </p>
          </div>

          <div>
            <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-[#58111A] font-medium tracking-tight">
              {data.brideFullName}
            </h2>
          </div>

          <p className="font-script text-2xl sm:text-3xl text-[#58111A]">
            "A beautiful soul and the beginning of our forever."
          </p>

          <div className="w-20 h-[2px] bg-[#C5A064]" />

          <p className="font-jost text-sm sm:text-base text-[#3E0B12]/85 leading-relaxed">
            Gracefully adorned in emerald green and gold Kanchipuram zari pattu, jasmine-woven braid (Poola Jada), and heirloom temple jewellery, Sariyu extends her warm Namaste and heartfelt joy to welcome all honored guests.
          </p>

          {/* Family Attributes / Welcome Box */}
          <div className="bg-white border border-[#C5A064]/50 rounded-2xl p-5 shadow-xs space-y-2 mt-4">
            <div className="flex items-center gap-2 text-xs font-jost uppercase tracking-wider text-[#58111A] font-semibold">
              <Heart className="w-4 h-4 text-[#C5A064] fill-[#C5A064]" />
              <span>Madas Family</span>
            </div>
            <p className="text-xs sm:text-sm font-jost text-[#3E0B12]/75 leading-relaxed">
              Joyfully welcoming family and friends to celebrate this sacred union and bestow their blessings upon the couple.
            </p>
          </div>
        </div>

        {/* Right Column: 3D Interactive Tilt Bride Portrait Photo */}
        <div className="lg:col-span-6 flex justify-center">
          <Tilt3D maxTilt={10} scale={1.02} className="max-w-sm sm:max-w-md w-full">
            <div className="relative group w-full">
              {/* Background Maroon & Gold Decorative Backplate */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#C5A064] to-[#58111A] rounded-3xl opacity-20 filter blur-lg transition-all duration-700 group-hover:opacity-40" />
              
              <div className="relative bg-white border-2 border-[#C5A064] rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center">
                {/* Inner Gold Border */}
                <div className="absolute inset-2 border border-[#C5A064]/40 rounded-2xl pointer-events-none" />

                {/* Bride Photo Provided by User */}
                <div className="w-full h-[460px] sm:h-[520px] rounded-2xl overflow-hidden flex items-end justify-center bg-[#FAF7F2] shadow-inner">
                  <img
                    src={data.assets.bride}
                    alt={data.brideFullName}
                    className="w-full h-full object-contain object-bottom filter drop-shadow-md transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Caption Label */}
                <div className="mt-4 text-center">
                  <span className="font-jost text-xs uppercase tracking-[0.25em] text-[#C5A064] font-semibold block">
                    The Bride
                  </span>
                  <span className="font-bodoni text-2xl text-[#58111A] font-semibold">
                    {data.brideFullName}
                  </span>
                </div>
              </div>
            </div>
          </Tilt3D>
        </div>
      </div>
    </section>
  );
};
