'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import YearSelector from './YearSelector';
import CommitteeRevealedView from './CommitteeRevealedView';
import { ALL_COMMITTEE_YEARS } from '@/lib/data/committee';

export default function CommitteePageContent() {
  const [selectedYear, setSelectedYear] = useState<string>(ALL_COMMITTEE_YEARS[0].year);

  const activeYearData = ALL_COMMITTEE_YEARS.find((y) => y.year === selectedYear) || ALL_COMMITTEE_YEARS[0];

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white flex flex-col justify-between">
      <Navbar />

      <main className="relative isolate flex-1 px-4 pb-16 pt-24 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_20%,rgba(146,0,41,0.34),transparent_38%),linear-gradient(135deg,#000_10%,#120006_55%,#000_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

        {/* Year Selector Tabs */}
        <YearSelector
          years={ALL_COMMITTEE_YEARS}
          selectedYear={selectedYear}
          onSelectYear={setSelectedYear}
        />

        {/* Teaser View */}
        {activeYearData.status === 'teaser' && (
          <section className="relative w-full max-w-5xl mx-auto text-center py-12 transition-all duration-700">
            <div className="mx-auto mb-7 inline-flex items-center gap-3 rounded-full border border-[#ef3b67]/35 bg-[#bc0034]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff6b8f] shadow-[0_0_28px_rgba(188,0,52,0.2)] sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#ef3b67] shadow-[0_0_12px_#ef3b67]" />
              {activeYearData.teaserDetails?.badgeText || 'The next chapter is loading'}
            </div>

            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-tertiary sm:text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Design Society · KKWIEER
            </p>
            <h1
              className="text-5xl uppercase leading-[0.9] sm:text-7xl md:text-8xl lg:text-9xl"
              style={{ letterSpacing: 'var(--title-6-letter-spacing)' }}
            >
              <span className="block text-primary" style={{ fontWeight: 'var(--font-weight-semibold)' }}>Committee</span>
              <span className="mt-2 block bg-gradient-to-r from-[#ff4d77] via-[#bc0034] to-[#ff7b3d] bg-clip-text text-transparent font-bold">
                {activeYearData.label}
              </span>
            </h1>

            <div className="mx-auto mt-7 flex max-w-xl items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#bc0034]" />
              <span className="text-sm font-light uppercase tracking-[0.28em] text-[#f26183] sm:text-base">
                {activeYearData.teaserDetails?.subtitle || 'Revealing soon'}
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#bc0034]" />
            </div>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
              {activeYearData.teaserDetails?.description ||
                'A new group of creators, builders, and leaders is preparing to take the stage. Meet the team that will shape the next year of DESOC—very soon.'}
            </p>

            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
              {[
                ['Vision', 'Fresh ideas. Clear purpose.'],
                ['Energy', 'Built to create and collaborate.'],
                ['Impact', 'One team. A bigger tomorrow.'],
              ].map(([title, description], index) => (
                <div
                  key={title}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:border-[#bc0034]/50"
                >
                  <span className="absolute right-4 top-3 text-4xl font-black text-[#bc0034]/20">0{index + 1}</span>
                  <h2 className="relative text-lg text-primary" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    {title}
                  </h2>
                  <p className="relative mt-2 text-sm leading-relaxed text-tertiary">{description}</p>
                </div>
              ))}
            </div>

            <a
              href="https://www.instagram.com/desoc.kkwieer/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 'var(--font-weight-medium)' }}
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-[#bc0034]/50 bg-[#bc0034]/15 px-6 py-3 text-sm text-primary transition-all duration-300 hover:border-[#ef3b67] hover:bg-[#bc0034]/30 hover:shadow-[0_0_28px_rgba(188,0,52,0.35)]"
            >
              Follow the reveal
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </section>
        )}

        {/* Revealed Full Grid View */}
        {activeYearData.status === 'revealed' && (
          <section className="py-8 space-y-8 animate-fadeIn">
            <header className="text-center space-y-3">
              <h1 className="heading-title-6 text-primary">
                Committee <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bc0034] to-orange-500">{activeYearData.label}</span>
              </h1>
              <p className="text-secondary max-w-xl mx-auto text-sm sm:text-base">
                Meet the minds, creators, and builders who shaped DESOC during {activeYearData.label}.
              </p>
            </header>

            <CommitteeRevealedView yearData={activeYearData} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
