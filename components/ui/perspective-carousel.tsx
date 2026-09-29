"use client";

import * as React from "react";
import { motion, type Transition } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export interface PerspectiveCarouselItem {
  src: string;
  title: string;
  role?: string;
  alt?: string;
  href?: string;
  isMeetAll?: boolean;
}

export interface PerspectiveCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: PerspectiveCarouselItem[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  loop?: boolean;
  slideWidth?: number;
  rotationStep?: number;
  inactiveScale?: number;
  transition?: Transition;
  showControls?: boolean;
  showDots?: boolean;
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
  viewportClassName?: string;
  slideClassName?: string;
  imageClassName?: string;
  labelClassName?: string;
  controlsClassName?: string;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  bounce: 0.12,
  duration: 0.7,
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function PerspectiveCarousel({
  items,
  activeIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  loop = true,
  slideWidth = 210,
  rotationStep = 60,
  inactiveScale = 0.85,
  transition = DEFAULT_TRANSITION,
  showControls = true,
  showDots = false,
  autoAdvance = true,
  autoAdvanceInterval = 1800,
  viewportClassName,
  slideClassName,
  imageClassName,
  labelClassName,
  controlsClassName,
  className,
  onKeyDown,
  tabIndex,
  ...props
}: PerspectiveCarouselProps) {
  const router = useRouter();
  const N = items.length;

  // Clone 3 full sets of items to guarantee surrounding slides on BOTH left & right
  const extendedItems = React.useMemo(() => {
    if (!N) return [];
    return [
      ...items.map((item, i) => ({ ...item, _extId: `prev-${i}` })),
      ...items.map((item, i) => ({ ...item, _extId: `real-${i}` })),
      ...items.map((item, i) => ({ ...item, _extId: `next-${i}` })),
    ];
  }, [items, N]);

  // Initial index points to Ishani Mukewar (defaultActiveIndex 0 in middle set = N)
  const initialIndex = React.useMemo(() => {
    return N > 0 ? clamp(defaultActiveIndex, 0, N - 1) + N : 0;
  }, [N, defaultActiveIndex]);

  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const [enableTransition, setEnableTransition] = React.useState(true);

  const isResettingRef = React.useRef(false);
  const safeSlideWidth = Math.max(96, slideWidth);
  const safeInactiveScale = clamp(inactiveScale, 0.5, 1);

  // Interaction & Hover pause state
  const [isHovered, setIsHovered] = React.useState(false);
  const touchStartX = React.useRef(0);
  const touchStartY = React.useRef(0);
  const isDragging = React.useRef(false);
  const hasSwiped = React.useRef(false);

  // Normalize active base index for dots & external callbacks
  const activeBaseIndex = N > 0 ? ((currentIndex % N) + N) % N : 0;

  const selectSlide = React.useCallback(
    (targetIndex: number) => {
      if (!N) return;
      setCurrentIndex(targetIndex);
      const normalized = ((targetIndex % N) + N) % N;
      onActiveIndexChange?.(normalized);
    },
    [N, onActiveIndexChange]
  );

  // Seamless reset when moving out of center set bounds [N, 2N - 1]
  const handleTransitionEnd = React.useCallback(() => {
    if (!N || isResettingRef.current) return;

    if (currentIndex >= 2 * N) {
      isResettingRef.current = true;
      setEnableTransition(false);
      const newIdx = currentIndex - N;
      setCurrentIndex(newIdx);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
          isResettingRef.current = false;
        });
      });
    } else if (currentIndex < N) {
      isResettingRef.current = true;
      setEnableTransition(false);
      const newIdx = currentIndex + N;
      setCurrentIndex(newIdx);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
          isResettingRef.current = false;
        });
      });
    }
  }, [currentIndex, N]);

  // Auto-advance step every ~1.8 seconds, pausing on hover/drag
  React.useEffect(() => {
    if (!autoAdvance || isHovered || isDragging.current || N <= 1) return;

    const timer = setInterval(() => {
      if (!isDragging.current && !hasSwiped.current) {
        selectSlide(currentIndex + 1);
      }
    }, autoAdvanceInterval);

    return () => clearInterval(timer);
  }, [autoAdvance, autoAdvanceInterval, currentIndex, isHovered, N, selectSlide]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    hasSwiped.current = false;
    touchStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || hasSwiped.current) return;
    const deltaX = e.clientX - touchStartX.current;
    if (Math.abs(deltaX) > 35) {
      hasSwiped.current = true;
      if (deltaX < 0) {
        selectSlide(currentIndex + 1);
      } else {
        selectSlide(currentIndex - 1);
      }
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    hasSwiped.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    isDragging.current = true;
    hasSwiped.current = false;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || hasSwiped.current) return;
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = touchX - touchStartX.current;
    const deltaY = touchY - touchStartY.current;

    // Allow vertical page scroll if gesture is predominantly vertical
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    if (Math.abs(deltaX) > 30) {
      hasSwiped.current = true;
      if (deltaX < 0) {
        selectSlide(currentIndex + 1);
      } else {
        selectSlide(currentIndex - 1);
      }
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    hasSwiped.current = false;
  };

  const handleSlideClick = (extIndex: number, item: PerspectiveCarouselItem) => {
    const isActive = currentIndex === extIndex;
    if (isActive) {
      if (item.href) {
        router.push(item.href);
      }
    } else {
      selectSlide(extIndex);
    }
  };

  if (!N) {
    return null;
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectSlide(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectSlide(currentIndex + 1);
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Perspective committee carousel"
      tabIndex={tabIndex ?? 0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseUp();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "relative isolate flex flex-col items-center w-full select-none cursor-grab active:cursor-grabbing touch-pan-y",
        className
      )}
      {...props}
    >
      {/* Viewport Container with Side Fading Masks */}
      <div className="relative w-full h-[360px] sm:h-[400px] md:h-[440px] overflow-hidden">
        {/* Subtle Side Fade Overlays (Left & Right Edges) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

        <div
          className={cn(
            "absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]",
            viewportClassName
          )}
          style={{ perspective: "1200px" }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 flex w-fit -translate-y-1/2 items-center"
            animate={{ x: -(currentIndex * safeSlideWidth + safeSlideWidth / 2) }}
            transition={enableTransition ? transition : { duration: 0 }}
            onAnimationComplete={handleTransitionEnd}
          >
            {extendedItems.map((item, extIndex) => {
              const isActive = currentIndex === extIndex;

              return (
                <div
                  key={`${item._extId}-${item.title}-${extIndex}`}
                  className="shrink-0"
                  style={{ width: safeSlideWidth, perspective: "1200px" }}
                >
                  <motion.div
                    className={cn(
                      "flex w-full flex-col items-center gap-2.5 will-change-transform px-1",
                      slideClassName
                    )}
                    animate={{
                      rotateY: (currentIndex - extIndex) * rotationStep,
                      scale: isActive ? 1 : safeInactiveScale,
                    }}
                    transition={enableTransition ? transition : { duration: 0 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Member Card Photo / Meet All Card */}
                    <button
                      type="button"
                      aria-label={`Show ${item.title}`}
                      aria-current={isActive ? "true" : undefined}
                      className="aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-2xl transition-all duration-300"
                      onClick={() => handleSlideClick(extIndex, item)}
                    >
                      {item.isMeetAll ? (
                        <div className="flex h-full w-full flex-col justify-between p-4 sm:p-5 rounded-xl border border-[#bc0034]/60 bg-gradient-to-br from-[#bc0034]/40 via-[#1a0008] to-black text-left shadow-2xl transition-all duration-300 hover:border-[#ef3b67]">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#ef3b67]">
                              DESOC 2026–27
                            </span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-transform duration-300 group-hover:scale-110">
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white leading-none font-geist">
                              Meet All
                            </h3>
                            <p className="mt-1.5 text-[11px] sm:text-xs text-tertiary leading-relaxed">
                              Full 2026–27 Committee roster
                            </p>
                            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#ef3b67]">
                              <span>Explore Roster</span>
                              <span>→</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={item.src}
                          alt={item.alt ?? item.title}
                          draggable={false}
                          className={cn(
                            "h-full w-full select-none rounded-xl object-cover object-top",
                            imageClassName
                          )}
                        />
                      )}
                    </button>

                    {/* Member Name and Position Label */}
                    <motion.div
                      className={cn(
                        "flex flex-col items-center text-center gap-0.5 mt-0.5",
                        labelClassName
                      )}
                      animate={{
                        filter: isActive ? "blur(0px)" : "blur(2px)",
                        opacity: isActive ? 1 : 0.35,
                      }}
                      transition={enableTransition ? transition : { duration: 0 }}
                    >
                      <p className="whitespace-nowrap text-xs sm:text-sm font-bold text-white uppercase tracking-tight font-geist">
                        {item.title}
                      </p>
                      {item.role && (
                        <p className="whitespace-nowrap text-[10.5px] sm:text-xs font-semibold uppercase tracking-wider text-[#ef3b67]">
                          {item.role}
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls: Positioned BELOW member name & position with dedicated spacing */}
      {showControls && (
        <div
          className={cn(
            "relative z-20 mt-4 sm:mt-5 flex items-center justify-center gap-3 rounded-full border border-white/15 bg-black/80 px-3.5 py-1.5 text-white shadow-xl backdrop-blur-md",
            controlsClassName
          )}
        >
          <button
            type="button"
            aria-label="Show previous slide"
            className="inline-flex size-8 sm:size-9 items-center justify-center rounded-full transition-colors hover:bg-white/15 cursor-pointer"
            onClick={() => selectSlide(currentIndex - 1)}
          >
            <ChevronLeft className="size-4 sm:size-5" />
          </button>

          {showDots && (
            <div className="flex items-center justify-center gap-2 px-1">
              {items.map((item, baseIndex) => (
                <button
                  key={`${item.title}-${baseIndex}`}
                  type="button"
                  aria-label={`Show slide ${baseIndex + 1}: ${item.title}`}
                  aria-current={activeBaseIndex === baseIndex ? "true" : undefined}
                  className={cn(
                    "h-2 rounded-full bg-white transition-[width,opacity] duration-300 cursor-pointer",
                    activeBaseIndex === baseIndex ? "w-6 opacity-100 bg-[#ef3b67]" : "w-2 opacity-35"
                  )}
                  onClick={() => selectSlide(N + baseIndex)}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            aria-label="Show next slide"
            className="inline-flex size-8 sm:size-9 items-center justify-center rounded-full transition-colors hover:bg-white/15 cursor-pointer"
            onClick={() => selectSlide(currentIndex + 1)}
          >
            <ChevronRight className="size-4 sm:size-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default PerspectiveCarousel;
