import { useState, useEffect, useRef, useCallback } from 'react';
import CommitteeCard from './CommiteeCard';
import adityaImg from '../assets/members/aditya.svg';
import ayushiImg from '../assets/members/ayushi.svg';
import vedantImg from '../assets/members/vedant.svg';
import jeetImg from '../assets/members/jeet.svg';
import monishImg from '../assets/members/monish.svg';
import ishaniImg from '../assets/members/ishani.svg';

const Committee = () => {
  const committeeMembers = [
    { id: 1, name: "Aditya Ahirrao", role: "President", image: adityaImg },
    { id: 2, name: "Ayushi Deore", role: "Vice President", image: ayushiImg },
    { id: 3, name: "Vedant Sonawane", role: "Event Operation Head", image: vedantImg },
    { id: 4, name: "Jeet Patil", role: "Tech Head", image: jeetImg },
    { id: 5, name: "Monish Patil", role: "Design Team Head", image: monishImg },
    { id: 6, name: "Ishani Mukewar", role: "Secretary", image: ishaniImg }
  ];

  const totalSlides = committeeMembers.length;
  
  // Clone ALL slides at both ends for seamless infinite loop
  // Structure: [all clones at start] [REAL: 0,1,2,3,4,5] [all clones at end]
  // This ensures we can slide through clones and reset invisibly
  const extendedMembers = [
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
  const trackRef = useRef(null);
  const isResettingRef = useRef(false);
  
  // Touch swipe state
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  // Card dimensions
  const cardWidth = 208; // w-48 (192px) + 16px gap

  // Calculate active real index for dot indicators (0 to totalSlides-1)
  const getActiveRealIndex = useCallback((index) => {
    return ((index - realStartIndex) % totalSlides + totalSlides) % totalSlides;
  }, [totalSlides, realStartIndex]);

  // Handle seamless reset when reaching clone zones
  const handleTransitionEnd = useCallback(() => {
    if (isResettingRef.current) return;
    
    // Went past the last real slide → now on a clone at the END
    // Need to jump back to the equivalent REAL slide at the START
    if (currentIndex > realEndIndex) {
      isResettingRef.current = true;
      setEnableTransition(false);
      
      // Calculate equivalent position in real slides
      const overshoot = currentIndex - realEndIndex - 1;
      const newIndex = realStartIndex + overshoot;
      setCurrentIndex(newIndex);
      
      // Re-enable transition after DOM updates
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
      
      // Calculate equivalent position in real slides
      const undershoot = realStartIndex - currentIndex - 1;
      const newIndex = realEndIndex - undershoot;
      setCurrentIndex(newIndex);
      
      // Re-enable transition after DOM updates
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
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    if (isResettingRef.current) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isResettingRef.current) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDotClick = (realIndex) => {
    if (isResettingRef.current) return;
    setCurrentIndex(realIndex + realStartIndex);
  };

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current = true;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Minimum distance to trigger swipe
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped left → go to next
        handleNext();
      } else {
        // Swiped right → go to prev
        handlePrev();
      }
    }
    
    setIsPaused(false);
  };

  // Calculate translation
  const translateX = -currentIndex * cardWidth;
  const activeRealIndex = getActiveRealIndex(currentIndex);

  return (
    <section id="committee" className="relative py-16 bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a1a1a] overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 
          className="
            text-3xl sm:text-4xl md:text-5xl font-bold text-white 
            uppercase tracking-[0.25em] 
            drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]
          "
        >
          Committee <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">2025-26</span>
        </h2>
        {/* Decorative underline */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-red-500"></div>
          <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
          <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-orange-500"></div>
        </div>
      </div>

      {/* Cards Container */}
      <div 
        className="relative bg-[#1a1a1a]/50 backdrop-blur-sm py-12 overflow-hidden touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-red-500 transition-colors duration-300"
        >
          <svg className="w-7 h-7 sm:w-10 sm:h-10" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        {/* Carousel Track */}
        <div className="flex justify-center items-center">
          <div 
            ref={trackRef}
            className="flex gap-4 items-center"
            style={{ 
              transform: `translateX(calc(50% + ${translateX}px - ${cardWidth / 2}px))`,
              transition: enableTransition ? 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedMembers.map((member, index) => {
              // Calculate which real member this card represents (0 to totalSlides-1)
              const memberIndex = index % totalSlides;
              // Check if this member is the currently active one
              const isActive = memberIndex === activeRealIndex;
              
              return (
                <CommitteeCard
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  isActive={isActive}
                />
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-red-500 transition-colors duration-300"
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
              onClick={() => handleDotClick(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index === activeRealIndex 
                  ? 'bg-red-500 w-6' 
                  : 'bg-white/40 hover:bg-white/60'
                }
              `}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 flex justify-center sm:justify-end sm:pr-16">
          <button className="group inline-flex items-center justify-center px-6 py-2 text-white font-medium bg-red-700 hover:bg-red-600 rounded transition-all duration-300">
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
          </button>
        </div>
      </div>
    </section>
  );
};

export default Committee;