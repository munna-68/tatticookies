'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP, SplitText, MOTION_OK, MOTION_REDUCE } from '@/lib/motion/gsap';
import { CookieSticker } from '@/components/ui/Doodles';

interface PageHeaderProps {
  /** small typewriter line above the word */
  kicker: string;
  /** white line of the giant word */
  title: string;
  /** mustard line of the giant word */
  accent?: string;
  lead: string;
  /** fact card on the right */
  aside?: React.ReactNode;
  asideTone?: 'bg-sky' | 'bg-coral' | 'bg-peach' | 'bg-mustard' | 'bg-salmon';
  className?: string;
}

/** Shared opening for inner pages — the same chocolate card + giant word as the home hero. */
export default function PageHeader({ kicker, title, accent, lead, aside, asideTone = 'bg-sky', className = '' }: PageHeaderProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const split = SplitText.create(q('.ph-line'), { type: 'chars', mask: 'chars' });
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.set(q('[data-reveal]'), { visibility: 'visible' })
          .from(q('[data-ph-card]'), { y: 40, autoAlpha: 0, duration: 0.9 }, 0)
          .from(split.chars, { yPercent: 105, duration: 1.05, stagger: 0.04 }, 0.1)
          .from(q('[data-ph-fade]'), { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.35)
          .from(q('[data-ph-aside]'), { y: 50, rotation: 6, autoAlpha: 0, duration: 1, ease: 'back.out(1.4)' }, 0.3)
          .from(q('[data-ph-sticker]'), { scale: 0, rotation: -140, duration: 0.9, ease: 'back.out(1.8)' }, 0.25);
        return () => split.revert();
      });
      mm.add(MOTION_REDUCE, () => {
        gsap.set(ref.current!.querySelectorAll('[data-reveal]'), { visibility: 'visible' });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={`mx-auto max-w-[1400px] px-4 pt-2 sm:px-6 lg:px-8 ${className}`}>
      <div className="relative">
        <div data-ph-sticker data-reveal="hide" className="pointer-events-none absolute -left-2 -top-3 z-20 w-16 sm:-left-5 sm:-top-5 sm:w-24">
          <CookieSticker className="h-auto w-full drop-shadow-[0_8px_14px_rgba(59,30,20,0.25)]" />
        </div>
        <div
          data-ph-card
          data-reveal="hide"
          className="bento doodles-dark grid items-end gap-8 bg-cocoa px-5 pb-6 pt-14 text-white sm:px-10 sm:pb-10 sm:pt-14 md:grid-cols-[minmax(0,1fr)_auto]"
        >
          <div className="relative z-10 min-w-0">
            <p data-ph-fade className="font-type text-xs text-white/65 sm:text-sm">
              {kicker}
            </p>
            <h1 className="display-giant mt-3 text-[15vw] sm:text-[10vw] lg:text-[min(7.4vw,7rem)]">
              <span className="ph-line block text-white">{title}</span>
              {accent && <span className="ph-line block text-mustard">{accent}</span>}
            </h1>
            <p data-ph-fade className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-base">
              {lead}
            </p>
          </div>
          {aside && (
            <div data-ph-aside className={`relative z-10 w-full rounded-[1.75rem] p-5 text-ink md:w-[17rem] ${asideTone}`}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
