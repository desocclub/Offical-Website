'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import CommitteeCard from './CommitteeCard';
import type { StaticImageData } from 'next/image';

import { committee2025_26 } from '@/lib/data/committee/2025-26';

interface MemberItem {
  id: string | number;
  name: string;
  role: string;
  image: string | StaticImageData;
}

const Committee = () => {
  const committeeMembers: MemberItem[] = [
    ...(committee2025_26.teams?.find((t) => t.id === 'faculty')?.members || []),
    ...(committee2025_26.teams?.find((t) => t.id === 'core')?.members.slice(0, 6) || []),
  ].map((m, idx) => ({
    id: idx,
    name: m.name,
    role: m.role,
    image: m.image!,
  }));


  const totalSlides = committeeMembers.length;
  
  // Clone ALL slides at both ends for seamless infinite loop
  const extendedMembers: MemberItem[] = [
    ...committeeMembers.map((m, i) => ({ ...m, id: `clone-start-${i}` })),
    ...committeeMembers,
    ...committeeMembers.map((m, i) => ({ ...m, id: `clone-end-${i}` }))
  ];

  // Real slides start at index totalSlides (after the leading clones)
  const realStartIndex = totalSlides;
  const realEndIndex = totalSlides * 2 - 1;
  
  const [currentIndex, setCurrentIndex] = useState(realStartIndex);
  const [enableTransition, setEnableTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [cardStep, setCardStep] = useState(240);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isResettingRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const hasHandledSwipeRef = useRef(false);
  
  // Touch swipe state
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  const measureCardStep = useCallback(() => {
    if (!trackRef.current) return;

    const firstCard = trackRef.current.querySelector<HTMLElement>('[data-carousel-card="true"]');
    if (!firstCard) return;

    const styles = window.getComputedStyle(trackRef.current);
    const gap = parseFloat(styles.gap || '16') || 16;
    const width = firstCard.getBoundingClientRect().width;

    setCardStep(width + gap);
  }, []);

  // Calculate active real index for dot indicators (0 to totalSlides-1)
  const getActiveRealIndex = useCallback((index: number) => {
    return ((index - realStartIndex) % totalSlides + totalSlides) % totalSlides;
  }, [totalSlides, realStartIndex]);

  // Handle seamless reset when reaching clone zones
  const handleTransitionEnd = useCallback(() => {
    if (isResettingRef.current) return;

    isAnimatingRef.current = false;
    
    // Went past the last real slide → now on a clone at the END
    // Need to jump back to the equivalent REAL slide at the START
    if (currentIndex > realEndIndex) {
      isResettingRef.current = true;
      setEnableTransition(false);
      
      const overshoot = currentIndex - realEndIndex - 1;
      const newIndex = realStartIndex + overshoot;
      setCurrentIndex(newIndex);
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
          isResettingRef.current = false;
        });
      });
    }
    
    // Went before the first real slide → now on a clone at the START
    // Need to jump to the equivalent REAL slide at the END
    if (currentIndex < realStartIndex) {
      isResettingRef.current = true;
      setEnableTransition(false);
      
      const undershoot = realStartIndex - currentIndex - 1;
      const newIndex = realEndIndex - undershoot;
      setCurrentIndex(newIndex);
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
          isResettingRef.current = false;
        });
      });
    }
  }, [currentIndex, realStartIndex, realEndIndex]);

  // Auto-slide effect - always moves forward (left direction)
  useEffect(() => {
    if (isPaused || isResettingRef.current) return;
    
    const interval = setInterval(() => {
      if (isAnimatingRef.current || isResettingRef.current) return;
      isAnimatingRef.current = true;
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    measureCardStep();

    const handleResize = () => {
      measureCardStep();
    };

    window.addEventListener('resize', handleResize);

    let observer: ResizeObserver | undefined;
    if (trackRef.current && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        measureCardStep();
      });
      observer.observe(trackRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
    };
  }, [measureCardStep]);

  const handlePrev = () => {
    if (isResettingRef.current || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isResettingRef.current || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDotClick = (realIndex: number) => {
    if (isResettingRef.current || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setCurrentIndex(realIndex + realStartIndex);
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = touchStartX.current;
    isSwiping.current = true;
    hasHandledSwipeRef.current = false;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.touches[0].clientX;

    if (hasHandledSwipeRef.current || isAnimatingRef.current) return;

    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      hasHandledSwipeRef.current = true;

      if (swipeDistance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    isSwiping.current = false;

    if (!hasHandledSwipeRef.current) {
      const swipeDistance = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 45;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }

    setIsPaused(false);
    hasHandledSwipeRef.current = false;
  };

  const translateX = -currentIndex * cardStep;
  const activeRealIndex = getActiveRealIndex(currentIndex);

  return (
    <section id="committee" className="relative py-16 bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a1a1a] overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="heading-title-6 uppercase drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]">
          Committee <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bc0034] to-orange-500">2025-26</span>
        </h2>
        {/* Decorative underline */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#bc0034]"></div>
          <div className="h-1 w-16 bg-gradient-to-r from-[#bc0034] to-orange-500 rounded-full"></div>
          <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-orange-500"></div>
        </div>
      </div>

      {/* Cards Container */}
      <div 
        className="relative bg-[#1a1a1a]/50 backdrop-blur-sm py-10 sm:py-12 overflow-hidden touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous committee slide"
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-[#bc0034] transition-colors duration-300"
        >
          <svg className="w-7 h-7 sm:w-10 sm:h-10" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        {/* Carousel Track */}
        <div className="flex justify-center items-center">
          <div 
            ref={trackRef}
            className="flex gap-4 lg:gap-5 items-center will-change-transform"
            style={{ 
              transform: `translateX(calc(50% + ${translateX}px - ${cardStep / 2}px))`,
              transition: enableTransition ? 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedMembers.map((member, index) => {
              const memberIndex = index % totalSlides;
              const isActive = memberIndex === activeRealIndex;
              
              return (
                <div
                  key={member.id}
                  data-carousel-card="true"
                  className="shrink-0 w-[min(84vw,22rem)] sm:w-[min(44vw,19rem)] md:w-[min(42vw,18.5rem)] lg:w-[min(23vw,16rem)] xl:w-[min(21vw,15rem)] 2xl:w-[min(18vw,14rem)]"
                >
                  <CommitteeCard
                    name={member.name}
                    role={member.role}
                    image={member.image}
                    isActive={isActive}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next committee slide"
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-[#bc0034] transition-colors duration-300"
        >
          <svg className="w-7 h-7 sm:w-10 sm:h-10" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {committeeMembers.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index === activeRealIndex 
                  ? 'bg-[#bc0034] w-6' 
                  : 'bg-white/40 hover:bg-white/60'
                }
              `}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 flex justify-center sm:justify-end sm:pr-16">
          <Link href="/committee" style={{ fontWeight: 'var(--font-weight-medium)' }} className="group inline-flex items-center justify-center px-6 py-2 text-primary bg-[#bc0034] hover:bg-[#a00030] rounded transition-all duration-300">
            View All
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Committee;
