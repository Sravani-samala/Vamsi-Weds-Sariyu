import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, MapPin, Sliders } from 'lucide-react';

interface NavigationProps {
  onOpenLocation?: () => void;
  onOpenSettings?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenLocation,
  onOpenSettings,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    if (isPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          oscillatorsRef.current.forEach((osc) => {
            try { osc.stop(); } catch {}
          });
          oscillatorsRef.current = [];
          setIsPlaying(false);
        }, 1000);
      } else {
        setIsPlaying(false);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Authentic Indian classical tanpura Sa-Pa (C#3 fundamental: ~138.59 Hz, Pa: ~207.65 Hz)
      const freqs = [138.59, 207.65, 277.18, 554.37];
      const newOscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.15, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.2, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.25 / (idx + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        newOscs.push(osc);
      });

      oscillatorsRef.current = newOscs;
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try { osc.stop(); } catch {}
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#C5A064]/30 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#cover"
          className="font-bodoni text-lg md:text-xl font-semibold tracking-wider text-[#58111A] uppercase whitespace-nowrap shrink-0 hover:text-[#C5A064] transition-colors"
        >
          Vamsi & Sariyu
        </a>

        {/* Zone 2: 4–5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-jost tracking-widest uppercase text-[#3E0B12]/80">
          <a href="#groom" className="hover:text-[#58111A] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#C5A064]">
            Groom
          </a>
          <a href="#bride" className="hover:text-[#58111A] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#C5A064]">
            Bride
          </a>
          <a href="#story" className="hover:text-[#58111A] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#C5A064]">
            How We Met
          </a>
          <a href="#haldi" className="hover:text-[#58111A] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#C5A064]">
            Haldi
          </a>
          <a href="#muhurtam" className="hover:text-[#58111A] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#C5A064]">
            Muhurtam
          </a>
          <a href="#venue" className="hover:text-[#58111A] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#C5A064]">
            Venue
          </a>
        </nav>

        {/* Zone 3: 1 primary action group */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-jost tracking-wider border transition-all ${
              isPlaying
                ? 'bg-[#58111A] text-[#ECC880] border-[#C5A064]'
                : 'bg-white text-[#58111A] border-[#C5A064]/50 hover:bg-[#FAF7F2]'
            }`}
            title={isPlaying ? 'Mute ceremony music' : 'Play ceremonial music'}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#ECC880]" />
                <span className="hidden sm:inline">Ceremony Music</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#58111A]/60" />
                <span className="hidden sm:inline">Play Music</span>
              </>
            )}
          </button>

          {onOpenLocation && (
            <button
              onClick={onOpenLocation}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#58111A] text-[#ECC880] text-xs font-jost font-medium tracking-wider rounded-full shadow-xs hover:bg-[#3E0B12] transition-all whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C5A064]" />
              <span>Directions</span>
            </button>
          )}

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="text-xs font-jost text-[#58111A]/70 hover:text-[#58111A] p-1.5 rounded-full hover:bg-[#FAF7F2] transition-colors"
              title="Edit Ceremony Details"
            >
              <Sliders className="w-4 h-4 text-[#C5A064]" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
