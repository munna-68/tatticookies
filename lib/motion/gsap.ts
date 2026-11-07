'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const MOTION_REDUCE = '(prefers-reduced-motion: reduce)';

export const PRELOADER_DONE = 'tatti:preloader-done';

/** Resolves when the preloader has handed over (or immediately if it isn't running). */
export function whenPreloaderDone(cb: () => void) {
  if (typeof window === 'undefined') return () => {};
  const html = document.documentElement;
  const w = window as unknown as { __tattiPreloaderDone?: boolean };
  if (w.__tattiPreloaderDone || html.classList.contains('preloaded') || !html.classList.contains('js-motion')) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(PRELOADER_DONE, handler, { once: true });
  return () => window.removeEventListener(PRELOADER_DONE, handler);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
