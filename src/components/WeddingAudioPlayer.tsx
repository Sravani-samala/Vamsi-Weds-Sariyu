import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Preferred main track path: drop the licensed MP3 at public/audio/pelli-pandhiri.mp3
const PRIMARY_WEDDING_SONG_SRC = '/audio/pelli-pandhiri.mp3';
// Built-in South Indian instrumental fallback if the custom MP3 is not yet placed in public/audio/
const FALLBACK_WEDDING_SONG_SRC = '/audio/south-indian-wedding.mp3';
const TARGET_VOLUME = 0.58;

export const WeddingAudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasEnteredRef = useRef(false);
  const userPausedRef = useRef(false);

  const [audioSrc, setAudioSrc] = useState<string>(FALLBACK_WEDDING_SONG_SRC);
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Check if /audio/pelli-pandhiri.mp3 exists as real audio (not Vite HTML fallback)
  useEffect(() => {
    let isMounted = true;

    const resolveTrack = async () => {
      try {
        const res = await fetch(PRIMARY_WEDDING_SONG_SRC, { method: 'HEAD' });
        const contentType = res.headers.get('content-type') || '';
        if (isMounted && res.ok && contentType.toLowerCase().startsWith('audio/')) {
          setAudioSrc(PRIMARY_WEDDING_SONG_SRC);
        }
      } catch {
        // Keep fallback track if custom MP3 is absent
      }
    };

    void resolveTrack();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasEnteredRef.current || userPausedRef.current) return;
    audio.volume = TARGET_VOLUME;
    audio.play().catch(() => {});
  }, [audioSrc]);

  // Start playback ONLY once "TAP TO ENTER" is clicked ('wedding:enter')
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let isMounted = true;
    audio.volume = TARGET_VOLUME;

    const handleEnter = () => {
      if (hasEnteredRef.current) return;
      hasEnteredRef.current = true;
      userPausedRef.current = false;

      if (isMounted) {
        setHasEntered(true);
      }

      audio.volume = TARGET_VOLUME;
      audio
        .play()
        .then(() => {
          if (isMounted) setIsPlaying(true);
        })
        .catch(() => {
          if (isMounted) setIsPlaying(false);
        });
    };

    const onPlay = () => {
      if (isMounted) setIsPlaying(true);
    };

    const onPause = () => {
      if (isMounted) setIsPlaying(false);
    };

    window.addEventListener('wedding:enter', handleEnter);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      isMounted = false;
      window.removeEventListener('wedding:enter', handleEnter);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      userPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      userPausedRef.current = false;
      audio.volume = TARGET_VOLUME;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        playsInline
        onError={() => {
          if (audioSrc !== FALLBACK_WEDDING_SONG_SRC) {
            setAudioSrc(FALLBACK_WEDDING_SONG_SRC);
          }
        }}
      />

      {hasEntered && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Mute wedding song' : 'Play wedding song'}
          title={isPlaying ? 'Mute wedding song' : 'Play wedding song'}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 h-11 px-4 rounded-full bg-[#58111A]/95 hover:bg-[#3E0B12] text-[#ECC880] border border-[#C5A064]/80 shadow-[0_10px_30px_rgba(62,11,18,0.35)] backdrop-blur-md flex items-center gap-2 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A064]"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-[#ECC880] shrink-0" />
              <span className="font-jost text-[11px] uppercase tracking-[0.2em] font-medium">
                Music On
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-[#ECC880]/75 shrink-0" />
              <span className="font-jost text-[11px] uppercase tracking-[0.2em] font-medium">
                Play Song
              </span>
            </>
          )}
        </button>
      )}
    </>
  );
};
