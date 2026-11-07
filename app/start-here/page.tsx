'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { mockData } from '@/lib/mockData';
import PageHeader from '@/components/ui/PageHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion/gsap';
import { Plus, ArrowRight, AlertTriangle } from 'lucide-react';

const jump = [
  { href: '#drop-model', label: 'Weekly drop' },
  { href: '#pickup', label: 'Pickup' },
  { href: '#delivery', label: 'Delivery' },
  { href: '#shipping', label: 'Shipping' },
  { href: '#reheating', label: 'Cookie care' },
  { href: '#allergens', label: 'Allergens' },
  { href: '#faq', label: 'FAQ' },
];

type Card = {
  id: string;
  tone: string;
  dark?: boolean;
  word: string;
  title: string;
  lead: string;
  rows: [string, React.ReactNode][];
};

const cards: Card[] = [
  {
    id: 'drop-model',
    tone: 'bg-cocoa',
    dark: true,
    word: 'Weekly',
    title: 'How the drop works',
    lead: 'Nothing sits in a display case. Every cookie is baked to order, once a week, by one baker.',
    rows: [
      ['Monday, 12 PM CST', 'The drop opens and the menu goes up here and on Instagram.'],
      ['Friday, 12 PM CST', 'Orders close. The butter is browned and the dough rests 24–48 hours for the gooey center.'],
      ['Saturday, 11 AM – 2 PM', 'Boxes are baked, sealed and picked up in Central Austin or sent out for delivery.'],
      ['Monday morning', 'Texas mail orders ship by USPS Priority with freshness seals.'],
    ],
  },
  {
    id: 'pickup',
    tone: 'bg-coral',
    word: 'Pickup',
    title: 'Austin porch pickup',
    lead: 'Free, every Saturday, from a porch in Travis Heights near South Congress.',
    rows: [
      ['When', 'Saturday 11:00 AM – 2:00 PM CST.'],
      ['Where', 'Drive up to the front curb; no parking hunt. The exact address comes in your confirmation email and SMS.'],
      ['Bring', 'Your order name or confirmation number. Your box waits on the insulated pickup table.'],
      [
        'Running late?',
        <>
          Email{' '}
          <a href="mailto:hello@tatticookies.com" className="font-semibold underline">
            hello@tatticookies.com
          </a>{' '}
          or DM @tatticookies and we’ll hold it on the porch.
        </>,
      ],
    ],
  },
  {
    id: 'delivery',
    tone: 'bg-peach',
    word: 'Delivery',
    title: 'Austin local delivery',
    lead: '$5 demo fee. Saturday 1:00 – 4:30 PM, within 15 miles of Central Austin.',
    rows: [
      ['Zip codes', '78701, 78702, 78703, 78704, 78705, 78741, 78745, 78746, 78751, 78756, 78757, 78758, 78759.'],
      ['Drop-off', 'Contactless. The driver texts you the moment the box is on your doorstep.'],
    ],
  },
  {
    id: 'shipping',
    tone: 'bg-sky',
    word: 'Shipping',
    title: 'Texas postal shipping',
    lead: 'Ships Monday by USPS Priority, 1–2 days anywhere in Texas.',
    rows: [
      ['Why Texas only', 'The Texas Cottage Food Law prohibits selling cottage food across state lines, so every order needs a Texas address.'],
      ['Packing', 'Each cookie is sealed on its own so it arrives soft and chewy.'],
    ],
  },
];

const care = [
  { label: 'Room temperature', big: '3 days', body: 'Keep them sealed in the box, out of the sun. They stay chewy for 72 hours, or up to 2 months frozen.' },
  { label: 'Microwave', big: '10–12 sec', body: 'On a plate. The center goes molten again and the edges stay soft.' },
  { label: 'Oven or air fryer', big: '350°F, 3 min', body: 'For a crisp outside and gooey inside, like it just came off the tray.' },
];

export default function StartHerePage() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const els = gsap.utils.toArray<HTMLElement>('[data-stack]', ref.current);
        els.forEach((card, i) => {
          const next = els[i + 1];
          if (!next) return;
          const st = { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true };
          gsap.to(card, { scale: 0.92, ease: 'none', scrollTrigger: st });
          gsap.to(card.querySelector('[data-shade]'), { opacity: 0.45, ease: 'none', scrollTrigger: st });
        });
        gsap.from('[data-care]', {
          y: 60,
          rotation: (i: number) => [-3, 2, -2][i] ?? 0,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '#reheating', start: 'top 70%', once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="pb-24">
      <PageHeader
        kicker="The answers hub"
        title="Start"
        accent="here"
        lead="Everything people DM us about: how the weekly drop works, pickup, delivery, Texas shipping, reheating and allergens."
        asideTone="bg-mustard"
        aside={
          <div>
            <p className="font-display text-2xl leading-tight">Still stuck?</p>
            <p className="mt-2 text-sm leading-snug">Email hello@tatticookies.com or DM @tatticookies. A real person answers.</p>
          </div>
        }
      />

      {/* Jump links */}
      <nav aria-label="On this page" className="no-scrollbar mx-auto mt-8 flex max-w-[1400px] gap-2 overflow-x-auto px-4 sm:flex-wrap sm:px-6 lg:px-8">
        {jump.map((j) => (
          <a key={j.href} href={j.href} className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-[inset_0_0_0_2px_var(--line)] transition-colors hover:bg-peach">
            {j.label}
          </a>
        ))}
      </nav>

      {/* Stacking cards */}
      <div className="mx-auto mt-10 max-w-[1200px] space-y-6 px-4 sm:px-6 lg:px-8">
        {cards.map((c, i) => (
          <section
            key={c.id}
            id={c.id}
            data-stack
            className={`bento sticky scroll-mt-28 ${c.tone} ${c.dark ? 'doodles-dark text-white' : 'doodles text-ink'}`}
            style={{ top: `calc(5.25rem + ${i * 1.1}rem)`, transformOrigin: '50% 0%' }}
          >
            <div className="relative z-10 grid gap-8 p-6 sm:p-10 md:min-h-[24rem] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
              <div className="min-w-0">
                <p className={`font-type text-sm ${c.dark ? 'text-white/60' : 'text-ink/60'}`}>{c.title}</p>
                <h2 className={`display-giant mt-2 text-[15vw] sm:text-7xl lg:text-8xl ${c.dark ? 'text-mustard' : 'text-ink'}`}>{c.word}</h2>
                <p className={`mt-5 max-w-sm text-base leading-relaxed ${c.dark ? 'text-white/80' : 'text-ink/80'}`}>{c.lead}</p>
              </div>
              <dl className={`divide-y self-center ${c.dark ? 'divide-white/15' : 'divide-ink/15'}`}>
                {c.rows.map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-3.5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
                    <dt className="font-semibold">{k}</dt>
                    <dd className={`text-sm leading-relaxed ${c.dark ? 'text-white/75' : 'text-ink/75'}`}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div data-shade className="pointer-events-none absolute inset-0 z-20 bg-ink opacity-0" />
          </section>
        ))}
      </div>

      {/* Cookie care */}
      <section id="reheating" className="mx-auto mt-24 max-w-[1200px] scroll-mt-24 px-4 sm:mt-32 sm:px-6 lg:px-8">
        <SectionTitle before="Keep it" sticker="gooey" after="at home" className="text-[2.4rem] sm:text-6xl" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {care.map((c, i) => (
            <div key={c.label} data-care className={`rounded-[2rem] p-6 shadow-card ${['bg-mustard', 'bg-coral', 'bg-sky'][i]}`}>
              <p className="font-type text-xs text-ink/70">{c.label}</p>
              <p className="mt-2 font-display text-5xl leading-none">{c.big}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/80">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Allergens */}
      <section id="allergens" className="mx-auto mt-20 max-w-[1200px] scroll-mt-24 px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border-[3px] border-ink bg-white p-6 shadow-sticker sm:p-10">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mustard">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div className="space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl">Allergens and the cottage food law</h2>
              <div className="grid gap-5 text-sm leading-relaxed text-ink/80 md:grid-cols-3">
                <p>
                  <strong className="text-ink">Every cookie contains wheat, milk, egg and soy.</strong> Several also contain tree nuts: pistachio, pecan, walnut or hazelnut.
                  Each flavor’s full ingredients are in its details.
                </p>
                <p>
                  <strong className="text-ink">Cross-contact:</strong> cookies are made in a private home kitchen under the Texas Cottage Food Law. The same kitchen handles nuts
                  and other common allergens, so we can’t guarantee any cookie is free of traces.
                </p>
                <p>
                  <strong className="text-ink">Severe allergies:</strong> please weigh that risk before ordering, and email{' '}
                  <a href="mailto:hello@tatticookies.com" className="font-semibold text-ink underline">
                    hello@tatticookies.com
                  </a>{' '}
                  with any ingredient question.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto mt-24 max-w-[900px] scroll-mt-24 px-4 sm:px-6">
        <SectionTitle before="Questions we get in" sticker="DMs" rotate={3} className="text-[2.2rem] sm:text-5xl" />
        <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {mockData.faqs.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <div key={idx}>
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-xl sm:text-2xl">{faq.question}</span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 bg-coral' : 'bg-peach'}`}>
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-ink/75">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="/order" className="btn btn-dark btn-lg">
            <span className="roll">
              <span>Ready? Build your box</span>
              <span aria-hidden="true">Ready? Build your box</span>
            </span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
