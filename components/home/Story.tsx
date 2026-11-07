'use client';

import React, { useRef } from 'react';
import { img } from '@/lib/images';
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion/gsap';
import SectionTitle from '@/components/ui/SectionTitle';

type Seg = string | { pill: string; alt: string };

const story: Seg[] = [
  'Every Monday the menu drops on Instagram',
  { pill: img.pillBasket, alt: 'Basket of fresh cookies' },
  'and the dough rests for 48 hours.',
  { pill: img.pillFlour, alt: 'Flour falling through hands' },
  'On Saturday morning one baker',
  { pill: img.pillBreak, alt: 'A cookie broken in half' },
  'pulls 45 boxes out of a home oven in Austin',
  { pill: img.pillGooey, alt: 'Gooey cookie halves' },
  'and hands them over still warm.',
];

export default function Story() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.fromTo(
          q('.story-word'),
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: q('.story-p')[0], start: 'top 78%', end: 'bottom 50%', scrub: true },
          }
        );
        q('.story-pill').forEach((pill) => {
          gsap.from(pill, {
            scale: 0,
            rotation: -25,
            duration: 0.7,
            ease: 'back.out(2.2)',
            scrollTrigger: { trigger: pill, start: 'top 72%', toggleActions: 'play none none reverse' },
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="mx-auto max-w-[1100px] px-4 py-24 sm:px-6 sm:py-32">
      <SectionTitle before="Small batch," sticker="baked" after="by one" className="text-[2.6rem] sm:text-6xl lg:text-7xl" />
      <p className="story-p mx-auto mt-10 max-w-[56rem] text-center text-[1.35rem] font-medium leading-[1.55] text-ink sm:mt-14 sm:text-[2rem] sm:leading-[1.5]">
        {story.map((seg, i) =>
          typeof seg === 'string' ? (
            <React.Fragment key={i}>
              {seg.split(' ').map((w, j) => (
                <span key={j} className="story-word">
                  {w}{' '}
                </span>
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment key={i}>
              <span className="story-pill mr-1 inline-block h-[1.05em] w-[2.2em] overflow-hidden rounded-full align-[-0.18em] ring-2 ring-ink/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={seg.pill} alt={seg.alt} className="h-full w-full object-cover" loading="lazy" />
              </span>{' '}
            </React.Fragment>
          )
        )}
      </p>
    </section>
  );
}
