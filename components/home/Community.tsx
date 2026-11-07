'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { img } from '@/lib/images';
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion/gsap';
import SectionTitle from '@/components/ui/SectionTitle';

// Demo placeholders — swap in real DMs / reviews from @tatticookies.
const quotes = [
  { q: 'The Dubai Pistachio actually crunches. I ordered a second box before the first was gone.', n: 'Marisol V.', w: 'Travis Heights pickup', tone: 'bg-mustard', tilt: -4 },
  { q: 'Ten seconds in the microwave, like the card says, and the Nutella center goes molten again.', n: 'Hana K.', w: 'Shipped to Round Rock', tone: 'bg-coral', tilt: 3 },
  { q: 'Brought the Party Baker’s Box to the office. It lasted eleven minutes.', n: 'Dre W.', w: 'Austin delivery', tone: 'bg-salmon', tilt: -2 },
  { q: 'Saturday porch pickup is the easiest errand of my week. Warm box, two minutes, done.', n: 'Jess T.', w: 'South Congress pickup', tone: 'bg-sky', tilt: 4 },
];

export default function Community() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-quote]', ref.current);
        gsap.fromTo(
          cards,
          { y: 120, rotation: 0, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            rotation: (i) => quotes[i].tilt,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-4 pb-28 sm:px-6 sm:pb-36 lg:px-8">
      <SectionTitle before="Sweet words from our" sticker="community" rotate={-3} className="text-[2.2rem] sm:text-5xl lg:text-6xl" />
      <p className="mx-auto mt-4 max-w-md text-center text-sm text-ink/60">Sample quotes for this demo, written in the voice of the DMs Tatti gets every Saturday.</p>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {quotes.map((c, i) => (
          <figure key={c.n} data-quote className="group" style={{ transform: `rotate(${c.tilt}deg)` }}>
            <div className={`rounded-[1.75rem] p-2.5 shadow-card transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2 ${c.tone}`}>
              <div className="relative aspect-[4/4.4] overflow-hidden rounded-[1.3rem]">
                <Image src={img.people[i]} alt="" fill sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 90vw" className="object-cover object-top" />
              </div>
              <blockquote className="px-2 pb-2 pt-4 text-[15px] font-medium leading-snug text-ink">“{c.q}”</blockquote>
              <figcaption className="px-2 pb-1.5 font-type text-xs text-ink/75">
                {c.n} — {c.w}
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
