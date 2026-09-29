'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollText from '@/components/ui/scroll-text';
import { PerspectiveCarousel, type PerspectiveCarouselItem } from '@/components/ui/perspective-carousel';
import { committee2026_27 } from '@/lib/data/committee/2026-27';
import { resolveSrc } from '@/lib/imageUtils';

export default function CoreCommitteeSection() {
  const coreMembers = committee2026_27.teams?.find((t) => t.id === 'core')?.members || [];

  // Construct carousel items starting with President Ishani Mukewar at index 0, ending with "Meet All" card
  const carouselItems: PerspectiveCarouselItem[] = [
    ...coreMembers.map((m) => ({
      src: resolveSrc(m.image),
      title: m.name,
      role: m.role,
      alt: `${m.name} - ${m.role}`,
    })),
    {
      src: '',
      title: 'Meet All',
      role: 'Explore Full 2026–27 Committee',
      isMeetAll: true,
      href: '/committee',
    },
  ];

  return (
    <section
      id="core-committee"
      className="relative py-20 sm:py-28 bg-black text-white overflow-hidden border-t border-b border-white/10 select-none"
    >
      {/* Background ambient radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_30%,rgba(188,0,52,0.14),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef3b67] shadow-[0_0_8px_#ef3b67]" />
            <ScrollText
              as="span"
              text="2026–27"
              direction="down"
              className="text-xs font-mono text-[#ef3b67] uppercase tracking-[0.25em] font-semibold"
            />
          </div>

          {/* Heading */}
          <h2 className="heading-title-6 uppercase block text-primary">
            <ScrollText
              as="span"
              text="Meet the Core Committee"
              direction="down"
              className="text-[#F5F5F5] leading-tight"
            />
          </h2>

          {/* Supporting Text */}
          <p className="text-tertiary text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
            <ScrollText
              as="span"
              text="The people shaping the ideas, experiences, and community behind DESOC."
              direction="down"
              className="text-tertiary"
            />
          </p>
        </div>

        {/* Perspective Carousel Wrapper (Reveals smoothly with blur -> sharp transition) */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="relative w-full my-4"
        >
          <PerspectiveCarousel
            items={carouselItems}
            defaultActiveIndex={0}
            loop={true}
            slideWidth={210}
            rotationStep={60}
            inactiveScale={0.85}
            showControls={true}
            showDots={false}
            autoAdvance={true}
            autoAdvanceInterval={2800}
            className="w-full"
          />
        </motion.div>

        {/* Prominent CTA below carousel */}
        <div className="mt-10 sm:mt-14 flex justify-center">
          <Link
            href="/committee"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full border border-[#bc0034]/50 bg-[#bc0034]/15 hover:bg-[#bc0034] text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(188,0,52,0.45)] active:scale-95"
          >
            <span>Meet the Full Committee</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
