'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP, SplitText, MOTION_OK } from '@/lib/motion/gsap';

interface SectionTitleProps {
  /** text before the sticker word */
  before?: string;
  /** the boxed sticker word */
  sticker: string;
  /** text after the sticker word */
  after?: string;
  dark?: boolean;
  rotate?: number;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2';
  className?: string;
  /** break the line after the sticker */
  breakAfterSticker?: boolean;
}

/**
 * Heading with a boxed "sticker" word — the reference's signature move.
 * Words rise out of a mask, then the sticker slaps on with a little overshoot.
 */
export default function SectionTitle({
  before,
  sticker,
  after,
  dark = false,
  rotate = -3,
  align = 'center',
  as = 'h2',
  className = '',
  breakAfterSticker = false,
}: SectionTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag = as;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = ref.current!;
        const parts = el.querySelectorAll<HTMLElement>('[data-words]');
        const split = SplitText.create(parts, { type: 'words', mask: 'words' });
        const stickerEl = el.querySelector('[data-sticker]');
        gsap.set(el, { visibility: 'visible' });
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
        tl.from(split.words, { yPercent: 110, duration: 0.9, ease: 'expo.out', stagger: 0.05 }).fromTo(
          stickerEl,
          { scale: 0.3, rotation: rotate - 24, autoAlpha: 0 },
          { scale: 1, rotation: rotate, autoAlpha: 1, duration: 0.7, ease: 'back.out(2.2)' },
          0.15
        );
        return () => split.revert();
      });
    },
    { scope: ref }
  );

  return (
    <Tag
      ref={ref}
      data-reveal="hide"
      className={`font-display leading-[1.02] text-ink ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      {before && <span data-words>{before} </span>}
      <span
        data-sticker
        className={`sticker ${dark ? 'sticker-dark' : ''}`}
        style={{ ['--r' as string]: `${rotate}deg` }}
      >
        {sticker}
      </span>
      {breakAfterSticker && <br />}
      {after && <span data-words> {after}</span>}
    </Tag>
  );
}
