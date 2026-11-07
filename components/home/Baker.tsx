'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { img } from '@/lib/images';
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion/gsap';
import { Stamp } from '@/components/ui/Doodles';

export default function Baker() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.fromTo(
          q('[data-frame]'),
          { clipPath: 'inset(14% 10% 14% 10% round 28px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'center 55%', scrub: true } }
        );
        gsap.fromTo(q('[data-frame] img'), { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'bottom 40%', scrub: true } });
        gsap.from(q('[data-copy] > *'), {
          y: 30, autoAlpha: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
        });
        gsap.to(q('[data-stamp]'), { rotation: -280, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="mx-auto max-w-[1160px] px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="relative">
        <div data-stamp className="absolute -right-2 -top-10 z-20 w-24 sm:-right-6 sm:w-32">
          <Stamp text="ONE BAKER * ONE HOME OVEN * 45 BOXES * " className="h-auto w-full" />
        </div>
        <div className="bento doodles-dark grid items-center gap-8 bg-cocoa p-5 text-white sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12 lg:p-10">
          <div data-frame className="relative z-10 aspect-[4/3] overflow-hidden" style={{ clipPath: 'inset(0% round 28px)' }}>
            <Image src={img.baker} alt="Baker sifting flour at a home kitchen counter" fill sizes="(min-width: 768px) 520px, 90vw" className="object-cover" />
          </div>
          <div data-copy className="relative z-10 space-y-5 pb-2 md:pr-6">
            <h2 className="font-display text-4xl leading-[1.02] sm:text-5xl">Baked by one, from a home oven</h2>
            <p className="text-[15px] leading-relaxed text-white/75">
              Tatti is a one-woman cottage bakery. Nothing is frozen, nothing sits on a shelf: dough is mixed after the Friday cutoff, rests for
              up to 48 hours and goes in the oven Saturday at dawn. That is why the drop closes when the oven is full.
            </p>
            <ul className="grid grid-cols-3 gap-3 border-t border-white/15 pt-5 text-center">
              {[
                ['48h', 'dough rest'],
                ['45', 'boxes a week'],
                ['9', 'flavors now'],
              ].map(([n, l]) => (
                <li key={l}>
                  <p className="font-display text-3xl text-mustard sm:text-4xl">{n}</p>
                  <p className="font-type text-[11px] text-white/60">{l}</p>
                </li>
              ))}
            </ul>
            <Link href="/start-here" className="btn btn-mustard btn-sm">
              <span className="roll">
                <span>Read how it works</span>
                <span aria-hidden="true">Read how it works</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
