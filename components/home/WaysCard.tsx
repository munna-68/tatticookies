'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { img } from '@/lib/images';
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion/gsap';
import SectionTitle from '@/components/ui/SectionTitle';
import { CookieSticker, Stamp } from '@/components/ui/Doodles';

const ways = [
  { title: 'Austin pickup', body: 'Free. Saturday 11 AM – 2 PM from the South Congress porch. Give your name, take your box.', href: '/order?fulfillment=pickup' },
  { title: 'Austin delivery', body: '$5 demo fee. Saturday afternoon, within 15 miles of downtown (78701–78759). We text at the door.', href: '/order?fulfillment=delivery' },
  { title: 'Texas shipping', body: 'Ships Monday by USPS Priority in insulated packs. Texas addresses only, by cottage food law.', href: '/order?fulfillment=shipping' },
];

const week = [
  { title: 'Monday, 12 PM', body: 'The drop opens. Pick a box of 4, 6 or 10 and fill it with any flavors.' },
  { title: 'Friday, 12 PM', body: 'Orders close so the dough can rest 24–48 hours. At 45 boxes the drop sells out early.' },
  { title: 'Saturday morning', body: 'Everything is baked fresh, boxed and handed over or packed to ship Monday.' },
];

function Item({ title, body, href }: { title: string; body: string; href?: string }) {
  return (
    <li data-way className="flex gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
      <div>
        <p className="font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink/70">{body}</p>
        {href && (
          <Link href={href} className="mt-1.5 inline-block text-sm font-semibold text-ink underline decoration-coral decoration-2 underline-offset-4 hover:text-coral">
            Choose {title}
          </Link>
        )}
      </div>
    </li>
  );
}

export default function WaysCard() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        // Photo window opens as it scrolls through
        gsap.fromTo(
          q('[data-window]'),
          { clipPath: 'inset(16% 14% 16% 14% round 999px 999px 40px 40px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 999px 999px 40px 40px)',
            ease: 'none',
            scrollTrigger: { trigger: q('[data-window]')[0], start: 'top 90%', end: 'center 50%', scrub: true },
          }
        );
        gsap.fromTo(q('[data-window] img'), { scale: 1.3 }, {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: q('[data-window]')[0], start: 'top 90%', end: 'bottom 30%', scrub: true },
        });
        gsap.to(q('[data-stamp]'), {
          rotation: 300,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        });
        gsap.from(q('[data-col="l"] [data-way]'), {
          x: -40, autoAlpha: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1,
          scrollTrigger: { trigger: q('[data-col="l"]')[0], start: 'top 80%', once: true },
        });
        gsap.from(q('[data-col="r"] [data-way]'), {
          x: 40, autoAlpha: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1,
          scrollTrigger: { trigger: q('[data-col="r"]')[0], start: 'top 80%', once: true },
        });
        gsap.from(q('[data-corner]'), {
          scale: 0, rotation: -120, duration: 0.9, ease: 'back.out(1.8)',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
      <div className="relative">
        <div data-corner className="pointer-events-none absolute -left-2 -top-6 z-20 w-20 sm:-left-5 sm:-top-8 sm:w-32">
          <CookieSticker className="h-auto w-full drop-shadow-[0_8px_14px_rgba(59,30,20,0.25)]" />
        </div>
        <div className="bento doodles bg-peach px-5 pb-10 pt-16 sm:px-10 sm:pt-14 lg:px-14">
          <div className="relative z-10">
            <SectionTitle before="Three ways to get" sticker="your box" dark rotate={2} className="text-[2.2rem] sm:text-5xl lg:text-6xl" />
            <p className="mx-auto mt-4 max-w-md text-center text-sm text-ink/70">
              Everything is baked to order under the Texas Cottage Food Law, so here is exactly how it reaches you.
            </p>

            <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)_minmax(0,1fr)] lg:gap-12">
              <ul data-col="l" className="space-y-7">
                {ways.map((w) => (
                  <Item key={w.title} {...w} />
                ))}
              </ul>

              <div className="relative mx-auto w-full max-w-[20rem]">
                <div data-window className="relative aspect-[3/4] overflow-hidden" style={{ clipPath: 'inset(0% round 999px 999px 40px 40px)' }}>
                  <Image src={img.gooeyPull} alt="A stuffed cookie pulled apart, filling stretching" fill sizes="20rem" className="object-cover" />
                </div>
                <div data-stamp className="absolute -right-4 -top-2 w-24 sm:-right-8 sm:w-28">
                  <Stamp text="BAKED FRESH * SATURDAY MORNING * AUSTIN TX * " className="h-auto w-full" />
                </div>
              </div>

              <ul data-col="r" className="space-y-7">
                {week.map((w) => (
                  <Item key={w.title} {...w} />
                ))}
              </ul>
            </div>

            <div className="mt-12 flex justify-center">
              <Link href="/order" className="btn btn-dark btn-lg">
                <span className="roll">
                  <span>Build your box</span>
                  <span aria-hidden="true">Build your box</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
