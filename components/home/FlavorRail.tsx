'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockData } from '@/lib/mockData';
import { useCart } from '@/lib/CartContext';
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion/gsap';
import SectionTitle from '@/components/ui/SectionTitle';
import { TILE_TONES } from '@/components/CookieCard';

export default function FlavorRail() {
  const ref = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const { setActiveModalCookie } = useCart();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.from(q('[data-tile]'), {
          x: 140,
          autoAlpha: 0,
          rotation: 4,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.07,
          scrollTrigger: { trigger: rail.current, start: 'top 82%', once: true },
        });
      });
    },
    { scope: ref }
  );

  const scrollBy = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const tile = el.querySelector<HTMLElement>('[data-tile]');
    const step = tile ? tile.offsetWidth + 20 : 320;
    el.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="overflow-hidden pb-24 sm:pb-32">
      <div className="mx-auto grid max-w-[1400px] items-end gap-6 px-4 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:px-8">
        <SectionTitle
          sticker="Explore"
          after="this week's flavors"
          align="left"
          rotate={-2}
          className="max-w-[40rem] text-[2.6rem] sm:text-6xl lg:text-7xl"
        />
        <div className="space-y-4">
          <p className="text-[15px] leading-relaxed text-cream-800">
            Nine cookies on the Drop #42 menu. Each one is stuffed, rested for 48 hours and baked the morning you pick it up.
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => scrollBy(-1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-card transition-transform hover:-translate-x-0.5" aria-label="Previous flavors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => scrollBy(1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-card transition-transform hover:translate-x-0.5" aria-label="Next flavors">
              <ChevronRight className="h-5 w-5" />
            </button>
            <Link href="/menu" className="btn btn-ghost btn-sm ml-2">
              <span className="roll">
                <span>Full menu</span>
                <span aria-hidden="true">Full menu</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={rail}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 sm:mt-14 sm:px-6 scroll-px-4 sm:scroll-px-6 lg:scroll-px-[max(2rem,calc((100vw_-_1400px)/2_+_2rem))] lg:px-[max(2rem,calc((100vw_-_1400px)/2_+_2rem))]"
      >
        {mockData.menuItems.map((c, i) => (
          <button
            key={c.id}
            data-tile
            onClick={() => setActiveModalCookie(c)}
            className="group w-[15.5rem] shrink-0 snap-start text-center sm:w-[19rem]"
          >
            <div className={`relative aspect-square overflow-hidden rounded-[2rem] p-3 ${TILE_TONES[i % TILE_TONES.length]}`}>
              <div className="relative h-full w-full overflow-hidden rounded-[1.4rem]">
                <Image src={c.image} alt={c.name} fill sizes="19rem" className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
              </div>
              <span className="absolute right-5 top-5 rounded-full bg-white px-2.5 py-1 font-type text-xs font-bold text-ink">${c.demoPrice.toFixed(2)}</span>
            </div>
            <p className="mt-4 font-display text-xl text-ink transition-colors group-hover:text-coral">{c.name}</p>
            <p className="mt-0.5 text-xs text-cream-800">{c.tagline}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
