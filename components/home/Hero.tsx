'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { mockData } from '@/lib/mockData';
import { useCart } from '@/lib/CartContext';
import { img } from '@/lib/images';
import { gsap, useGSAP, SplitText, MOTION_OK, MOTION_REDUCE, whenPreloaderDone } from '@/lib/motion/gsap';
import { CookieSticker, Sparks } from '@/components/ui/Doodles';
import DropCountdown from '@/components/DropCountdown';

const tierThumbs = [img.pillBasket, mockData.menuItems[0].image, img.boxSpread];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const router = useRouter();
  const { setCurrentBoxSize } = useCart();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const root = ref.current!;
        const q = gsap.utils.selector(root);
        const split = SplitText.create(q('.hero-line'), { type: 'chars', mask: 'chars' });

        const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
        tl.set(q('[data-reveal]'), { visibility: 'visible' })
          .from(split.chars, { yPercent: 105, duration: 1.15, stagger: 0.045 }, 0)
          .from(q('[data-hero-cookie]'), { scale: 0.35, rotation: -70, y: -90, autoAlpha: 0, duration: 1.1, ease: 'back.out(1.5)' }, 0.18)
          .from(q('[data-hero-side]'), { y: 70, autoAlpha: 0, duration: 1.1, stagger: 0.1 }, 0.05)
          .from(q('[data-hero-sticker]'), { scale: 0, rotation: -140, duration: 0.9, ease: 'back.out(1.8)' }, 0.35)
          .from(q('[data-hero-foot] > *'), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.45)
          .from(q('[data-hero-spark]'), { scale: 0, transformOrigin: '0% 100%', duration: 0.5, ease: 'back.out(3)' }, 0.9);

        const off = whenPreloaderDone(() => tl.play());

        // Scroll: the cookie keeps turning, the title drifts up a little.
        gsap.to(q('.hero-cookie-spin'), {
          rotation: 55,
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to(q('[data-hero-sticker] svg'), {
          rotation: 200,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        });

        return () => {
          off();
          split.revert();
        };
      });

      mm.add(MOTION_REDUCE, () => {
        gsap.set(ref.current!.querySelectorAll('[data-reveal]'), { visibility: 'visible' });
      });
    },
    { scope: ref }
  );

  const chooseBox = (size: number) => {
    setCurrentBoxSize(size);
    router.push(`/order?size=${size}`);
  };

  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-4 pt-2 sm:px-6 lg:px-8" aria-label="Tatti cookies">
      <div className="relative grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-[minmax(0,1.72fr)_minmax(0,1fr)] lg:grid-rows-[minmax(18.5rem,auto)_minmax(14rem,auto)_auto] lg:gap-5">
        {/* Cookie sticker hanging off the corner */}
        <div
          data-hero-sticker
          data-reveal="hide"
          className="pointer-events-none absolute -left-2 -top-3 z-30 w-[4.6rem] sm:-left-5 sm:-top-5 sm:w-28 lg:w-[8.5rem]"
        >
          <CookieSticker className="h-auto w-full drop-shadow-[0_8px_14px_rgba(59,30,20,0.25)]" />
        </div>

        {/* ---------- Main chocolate card ---------- */}
        <div
          data-hero-card
          className="bento doodles-dark col-span-2 flex min-h-[31rem] flex-col justify-between bg-cocoa p-5 text-white sm:min-h-[36rem] sm:p-9 lg:col-span-1 lg:col-start-1 lg:row-span-2 lg:row-start-1"
        >
          <div className="relative z-10 flex flex-1 items-center justify-center pt-10 sm:pt-6">
            <h1 data-reveal="hide" className="display-giant relative text-center text-[17.5vw] sm:text-[13.2vw] lg:text-[min(8.5vw,8.3rem)]">
              <span className="sr-only">Tatti: </span>
              <span className="hero-line block text-white">Stuffed</span>
              <span className="hero-line block text-mustard">&amp; gooey!</span>
              <span data-hero-spark aria-hidden="true" className="absolute -left-[0.32em] -top-[0.28em] block w-[0.42em]">
                <Sparks className="h-auto w-full" />
              </span>
            </h1>

            {/* Cookie cut-out breaking through the letters */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[34%] max-w-[15rem] -translate-x-1/2 -translate-y-[44%] sm:w-[27%]">
              <div data-hero-cookie data-reveal="hide">
                <div className="hero-cookie-spin">
                  <Image
                    src={img.cookieTop}
                    alt=""
                    width={679}
                    height={719}
                    priority
                    className="h-auto w-full drop-shadow-[0_26px_30px_rgba(0,0,0,0.55)]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div data-hero-foot className="relative z-30 mt-6 grid grid-cols-1 items-end gap-5 sm:grid-cols-[1fr_auto_1fr]">
            <p className="max-w-[17rem] text-sm leading-relaxed text-white/80">
              Brown-butter dough, molten centers and Belgian chocolate, baked Saturday morning in Austin.
            </p>
            <div className="flex items-center gap-1.5 sm:justify-self-center" aria-label="45 boxes per weekly drop">
              <span className="font-display text-6xl font-light leading-none text-white/90">(</span>
              <span className="flex flex-col items-center px-1">
                <span className="font-display text-4xl leading-none">45</span>
                <span className="mt-1 font-type text-[11px] text-white/70">boxes a drop</span>
              </span>
              <span className="font-display text-6xl leading-none text-white/90">)</span>
            </div>
            <Link href="/order" className="btn btn-mustard sm:justify-self-end">
              <span className="roll">
                <span>Order now</span>
                <span aria-hidden="true">Order now</span>
              </span>
            </Link>
          </div>
        </div>

        {/* ---------- Sky card ---------- */}
        <div
          data-hero-side
          data-reveal="hide"
          className="bento flex min-h-[17rem] flex-col items-center bg-sky pt-6 text-center text-ink sm:min-h-[19rem] lg:col-start-2 lg:row-start-1"
        >
          <p className="font-display text-[2.4rem] uppercase leading-none sm:text-6xl">Austin</p>
          <p className="mt-2 px-3 font-type text-[11px] leading-snug sm:text-sm">Pickup Sat 11–2, South Congress</p>
          <div className="relative mt-4 w-[78%] flex-1 overflow-hidden rounded-t-[999px] sm:w-[58%]">
            <Image src={img.cookieFace} alt="Smiling customer holding a cookie over one eye" fill sizes="(min-width:1024px) 20vw, 40vw" className="object-cover object-[50%_25%]" />
          </div>
        </div>

        {/* ---------- Coral card ---------- */}
        <div
          data-hero-side
          data-reveal="hide"
          className="bento flex min-h-[17rem] flex-col items-center bg-coral px-3 pb-5 pt-6 text-center text-ink sm:px-5 lg:col-start-2 lg:row-span-2 lg:row-start-2"
        >
          <p className="font-display text-[2.1rem] leading-none sm:text-6xl">Saturday</p>
          <p className="mt-2 font-type text-[11px] leading-snug sm:text-sm">Order by Friday, 12 PM CST</p>
          <div className="relative my-3 w-full flex-1 min-h-[8rem] sm:min-h-[12rem]">
            <Image src={img.cookieStack} alt="A tall stack of chocolate cookies" fill sizes="(min-width:1024px) 25vw, 45vw" className="object-contain drop-shadow-[0_18px_18px_rgba(59,30,20,0.35)]" />
            <span className="absolute bottom-[8%] right-[6%] w-9 sm:w-12" aria-hidden="true">
              <Sparks color="#3B1E14" className="h-auto w-full rotate-90" />
            </span>
          </div>
          <p className="font-type text-[11px] leading-snug sm:text-sm">
            Drop #42 closes in
            <br />
            <DropCountdown compact className="font-bold" />
          </p>
        </div>

        {/* ---------- Peach "pick a box" card ---------- */}
        <div
          data-hero-side
          data-reveal="hide"
          className="bento doodles col-span-2 grid items-center gap-5 bg-peach p-5 sm:p-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10 lg:col-span-1 lg:col-start-1 lg:row-start-3"
        >
          <h2 className="display-giant relative z-10 text-[3.6rem] text-ink sm:text-7xl">
            Pick
            <br className="hidden md:block" /> a box
          </h2>
          <ul className="relative z-10 divide-y divide-ink/15">
            {mockData.boxTiers.map((t, i) => (
              <li key={t.id} className="flex items-center gap-3 py-3 sm:gap-4">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-coral p-1 sm:h-14 sm:w-14">
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <Image src={tierThumbs[i]} alt="" fill sizes="56px" className="object-cover" />
                  </div>
                </div>
                <div className="min-w-0 flex-1 sm:w-32 sm:flex-none">
                  <p className="font-display text-lg leading-tight">{t.name.replace(/\s*\(.*\)/, '')}</p>
                  <p className="font-type text-xs text-ink/70">box of {t.size}</p>
                </div>
                <p className="hidden flex-1 text-xs leading-relaxed text-ink/70 lg:block xl:text-[13px]">{t.description}</p>
                <p className="shrink-0 text-right font-type text-sm font-bold leading-tight">
                  ${t.demoPrice.toFixed(2)}
                  <span className="block text-[11px] font-normal">demo</span>
                </p>
                <button className="plus-btn shrink-0" onClick={() => chooseBox(t.size)} aria-label={`Build a box of ${t.size}`}>
                  <Plus className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
