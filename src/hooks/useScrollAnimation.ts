import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(
  setupCallback: () => (() => void) | void,
  deps: unknown[] = []
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      setupCallback();
    });

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
