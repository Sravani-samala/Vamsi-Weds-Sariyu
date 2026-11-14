import React, { useState } from 'react';
import { TempleBell, GarlandToran, KuthuvilakkuLamp } from './TempleArchitecture';
import { ChevronDown, Sparkles } from 'lucide-react';

interface TempleEntranceProps {
  onOpenInvitation: () => void;
  isOpen: boolean;
}

export const TempleEntrance: React.FC<TempleEntranceProps> = ({
  onOpenInvitation,
  isOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    onOpenInvitation();
  };

  return (
    <section
      id="entrance"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#24130E] text-[#F8F0E3] select-none"
      style={{ perspective: '1600px' }}
    >
      {/* Background Dravidian Temple Sanctum Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C5A064]/20 via-[#481C25]/40 to-[#1A0B08] z-0" />

      {/* Decorative Hanging Torans and Garlands */}
      <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
        <GarlandToran />
      </div>

      {/* Hanging Brass Temple Bells */}
      <div className="absolute top-0 left-12 md:left-24 z-30 hidden sm:block">
        <TempleBell chainLength={90} delay={0.2} />
      </div>
      <div className="absolute top-0 right-12 md:right-24 z-30 hidden sm:block">
        <TempleBell chainLength={110} delay={0.7} />
      </div>

      {/* Left and Right Brass Kuthuvilakku Lamps */}
      <div className="absolute bottom-6 left-4 md:left-12 z-30 hidden md:block">
        <KuthuvilakkuLamp height={260} glow={true} />
      </div>
      <div className="absolute bottom-6 right-4 md:right-12 z-30 hidden md:block">
        <KuthuvilakkuLamp height={260} glow={true} />
      </div>

      {/* Temple Arch Outer Carved Stone Frame */}
      <div className="relative z-10 w-full max-w-5xl px-4 py-8 flex flex-col items-center">
        {/* Massive 3D Double Doors Container */}
        <div
          className="relative w-full max-w-2xl h-[520px] md:h-[620px] rounded-t-[140px] md:rounded-t-[200px] border-4 md:border-8 border-[#C5A064]/40 shadow-2xl overflow-hidden bg-[#150907] flex"
          style={{ perspective: '1200px' }}
        >
          {/* Inner Temple Sanctuary (Revealed when doors swing open) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#481C25] via-[#2F1219] to-[#150907]">
            <div className="w-16 h-16 rounded-full border border-[#C5A064] flex items-center justify-center mb-4 bg-[#C5A064]/10 shadow-[0_0_30px_rgba(197,160,100,0.5)]">
              <span className="font-serif text-3xl text-[#FFE8A3]">ॐ</span>
            </div>
            <p className="font-jost text-xs uppercase tracking-[0.3em] text-[#C5A064] mb-2">
              The Sacred Auspicious Beginning
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#FFE8A3] tracking-wide mb-3">
              Sariyu Weds Vamshi
            </h2>
            <p className="font-script text-2xl text-[#C5A064] max-w-md">
              Two souls, one sacred path blessed by traditions and love.
            </p>

            <a
              href="#welcome"
              className="mt-8 inline-flex items-center gap-2 text-xs font-jost uppercase tracking-widest text-[#FFE8A3] bg-[#C5A064]/20 hover:bg-[#C5A064]/30 px-5 py-2.5 rounded-full border border-[#C5A064]/50 transition-all"
            >
              <span>Step Inside</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>

          {/* Left Door Wing (CSS 3D transform) */}
          <div
            className="relative w-1/2 h-full z-20 origin-left transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-2xl"
            style={{
              transform: isOpen || isOpening ? 'rotateY(-110deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="w-full h-full relative overflow-hidden bg-[#2D1610] border-r-2 border-[#1E0D08]">
              {/* Generated Realistic Antique Temple Door Texture */}
              <img
                src="/src/assets/images/temple_door_texture_1794328256957.jpg"
                alt="Antique South Indian Temple Door Left"
                referrerPolicy="no-referrer"
                className="w-[200%] max-w-none h-full object-cover object-left filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 pointer-events-none" />
              {/* Brass Door Studs & Ring Handle */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-[#ECC880] bg-[#C5A064] shadow-lg flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-[#38241C]" />
              </div>
            </div>
          </div>

          {/* Right Door Wing (CSS 3D transform) */}
          <div
            className="relative w-1/2 h-full z-20 origin-right transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-2xl"
            style={{
              transform: isOpen || isOpening ? 'rotateY(110deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="w-full h-full relative overflow-hidden bg-[#2D1610] border-l-2 border-[#1E0D08]">
              {/* Generated Realistic Antique Temple Door Texture */}
              <img
                src="/src/assets/images/temple_door_texture_1794328256957.jpg"
                alt="Antique South Indian Temple Door Right"
                referrerPolicy="no-referrer"
                className="w-[200%] max-w-none -ml-[100%] h-full object-cover object-right filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-black/30 pointer-events-none" />
              {/* Brass Door Studs & Ring Handle */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-[#ECC880] bg-[#C5A064] shadow-lg flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-[#38241C]" />
              </div>
            </div>
          </div>
        </div>

        {/* Center Prompt & Interactive Door Opener */}
        <div className={`mt-8 flex flex-col items-center text-center transition-opacity duration-700 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <p className="font-jost text-xs uppercase tracking-[0.25em] text-[#C5A064] mb-1">
            A Beautiful Celebration Awaits
          </p>
          <h1 className="font-cormorant text-2xl md:text-3xl tracking-widest text-[#F8F0E3] uppercase mb-5">
            You Are Cordially Invited
          </h1>

          <button
            onClick={handleOpen}
            disabled={isOpening}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-[#C5A064] via-[#ECC880] to-[#C5A064] text-[#38241C] font-jost text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-[0_4px_25px_rgba(197,160,100,0.4)] hover:shadow-[0_6px_35px_rgba(197,160,100,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#481C25]" />
            <span>Open Your Invitation</span>
          </button>
        </div>
      </div>
    </section>
  );
};
