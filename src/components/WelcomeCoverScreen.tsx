import React, { useState, useEffect } from 'react';
import { WeddingData } from '../data/weddingData';
import { Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeCoverScreenProps {
  data: WeddingData;
  onOpenInvitation: () => void;
}

export const WelcomeCoverScreen: React.FC<WelcomeCoverScreenProps> = ({
  data,
  onOpenInvitation,
}) => {
  const [isZooming, setIsZooming] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Subtle 3D mouse parallax on hero elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleTapToOpen = () => {
    setIsZooming(true);
    setTimeout(() => {
      onOpenInvitation();
    }, 750);
  };

  return (
    <section
      id="cover"
      className="relative h-screen w-full overflow-hidden select-none flex items-center justify-center bg-[#FAF7F2]"
      style={{ perspective: '1200px' }}
    >
      {/* Background Image: Temple Gopuram, Lotus Pond, Garlands with subtle 3D parallax */}
      <div
        className={`absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isZooming ? 'scale-125 filter blur-xs opacity-30' : 'scale-105 opacity-100'
        }`}
        style={{
          transform: isZooming
            ? 'scale(1.25)'
            : `translate3d(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px, 0px) scale(1.05)`,
        }}
      >
        <img
          src={data.assets.heroBackgroundOnly}
          alt="South Indian Temple Wedding Backdrop"
          className="w-full h-full object-cover object-center filter brightness-[0.98]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3E0B12]/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 3D Parallax Groom & Bride Cutout on the right */}
      <div
        className={`absolute right-2 sm:right-8 md:right-16 lg:right-28 bottom-0 z-10 w-[270px] sm:w-[380px] md:w-[480px] lg:w-[560px] pointer-events-none transition-all duration-1000 ease-out ${
          isZooming
            ? 'scale-115 translate-x-16 opacity-0'
            : 'scale-100 translate-x-0 opacity-100'
        }`}
        style={{
          transform: isZooming
            ? 'scale(1.15) translateX(60px)'
            : `translate3d(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px, 40px)`,
        }}
      >
        <img
          src={data.assets.groomBrideCutout}
          alt={`${data.groomFullName} and ${data.brideFullName}`}
          className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(62,11,18,0.35)] animate-romantic-float"
        />
      </div>

      {/* Welcome & Invitation Opener Card (Left / Center-Left) */}
      <div
        className={`relative z-20 max-w-xl mx-4 sm:ml-8 md:ml-16 lg:ml-24 p-6 sm:p-8 md:p-10 bg-white/95 backdrop-blur-md border-2 border-[#C5A064] rounded-3xl shadow-[0_25px_60px_rgba(62,11,18,0.25)] text-center sm:text-left transition-all duration-700 ease-out ${
          isZooming
            ? 'scale-90 opacity-0 -translate-y-8'
            : 'scale-100 opacity-100 translate-y-0'
        }`}
        style={{
          transform: isZooming
            ? 'scale(0.9) translateY(-30px)'
            : `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 20px)`,
        }}
      >
        {/* Inner Gold Foil Border */}
        <div className="absolute inset-2 sm:inset-2.5 border border-[#C5A064]/50 rounded-2xl pointer-events-none" />

        {/* Auspicious Invocation in Telugu */}
        <p className="font-telugu text-sm md:text-base text-[#C5A064] font-normal tracking-normal mb-1.5">
          || శ్రీ గణేశాయ నమః ||
        </p>

        {/* Editorial Subtitle */}
        <p className="font-jost text-xs uppercase tracking-[0.3em] text-[#58111A] font-semibold mb-2">
          Wedding Celebration
        </p>

        {/* Couple Names */}
        <div className="my-3 space-y-1">
          <h1 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-[#58111A] font-medium tracking-tight">
            {data.groomFullName}
          </h1>

          <div className="py-1 flex items-center justify-center sm:justify-start gap-3">
            <span className="w-8 sm:w-12 h-[1px] bg-[#C5A064]" />
            <span className="font-script text-2xl sm:text-3xl text-[#C5A064]">
              weds
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#C5A064]" />
          </div>

          <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-[#58111A] font-medium tracking-tight">
            {data.brideFullName}
          </h2>
        </div>

        <p className="font-script text-xl sm:text-2xl text-[#C5A064] my-3">
          "Two souls united by destiny, blessed by tradition and eternal love."
        </p>

        <p className="font-jost text-xs sm:text-sm text-[#3E0B12]/80 leading-relaxed mb-6">
          We cordially invite you and your family to join us in celebrating the auspicious beginning of our new chapter.
        </p>

        {/* Tap to Open Button */}
        <div className="pt-2 flex justify-center sm:justify-start">
          <button
            onClick={handleTapToOpen}
            disabled={isZooming}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-[#58111A] to-[#3E0B12] text-[#ECC880] text-xs font-jost uppercase tracking-[0.2em] font-semibold rounded-full shadow-lg hover:shadow-2xl border border-[#C5A064] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C5A064] group-hover:rotate-12 transition-transform" />
            <span>Open Wedding Invitation</span>
            <ArrowRight className="w-4 h-4 text-[#ECC880] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
