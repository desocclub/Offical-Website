'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Only enable on devices with hover and fine pointer (mouse/trackpad)
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const cursor = cursorRef.current;
    const path = pathRef.current;
    if (!cursor || !path) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isVisible = false;
    let isHoveringInteractive = false;
    let animId: number | null = null;

    // Hotspot offset: Tip of arrow is at (5, 3) in 28x28 viewBox
    const tipX = 5;
    const tipY = 3;

    // Fluid trailing lerp factor (fast, precise, smooth)
    const LERP = 0.25;

    const checkInteractive = (target: Element | null): boolean => {
      if (!target || !target.closest) return false;
      return Boolean(
        target.closest(
          'a, button, [role="button"], input, select, textarea, label, [tabindex]:not([tabindex="-1"]), .cursor-pointer, [onclick]'
        )
      );
    };

    const updateHoverState = (target: Element | null) => {
      const interactive = checkInteractive(target);
      if (interactive !== isHoveringInteractive) {
        isHoveringInteractive = interactive;
        if (isHoveringInteractive) {
          // Hovering on link/button -> vibrant blue
          path.setAttribute('fill', '#0066ff');
          path.setAttribute('stroke', '#0048cc');
        } else {
          // Normal state -> crisp white
          path.setAttribute('fill', '#ffffff');
          path.setAttribute('stroke', 'rgba(0, 0, 0, 0.25)');
        }
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        currentX = targetX;
        currentY = targetY;
        cursor.style.opacity = '1';
        document.documentElement.classList.add('custom-cursor-active');
      }

      updateHoverState(e.target as Element | null);
    };

    const handlePointerLeave = () => {
      isVisible = false;
      cursor.style.opacity = '0';
      document.documentElement.classList.remove('custom-cursor-active');
    };

    const handleScroll = () => {
      if (targetX >= 0 && targetY >= 0) {
        const el = document.elementFromPoint(targetX, targetY);
        updateHoverState(el);
      }
    };

    const animate = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Snap when close to prevent micro-jitter
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        currentX = targetX;
        currentY = targetY;
      } else {
        currentX += dx * LERP;
        currentY += dy * LERP;
      }

      cursor.style.transform = `translate3d(${currentX - tipX}px, ${currentY - tipY}px, 0)`;
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      document.documentElement.classList.remove('custom-cursor-active');
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 hidden md:block opacity-0 transition-opacity duration-150 will-change-transform"
      style={{
        zIndex: 99999,
        transform: 'translate3d(-100px, -100px, 0)',
      }}
      aria-hidden="true"
      role="presentation"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] select-none pointer-events-none block overflow-visible"
      >
        <path
          ref={pathRef}
          d="M5 3 L23 14 L14 16 L11 24 Z"
          fill="#ffffff"
          stroke="rgba(0, 0, 0, 0.25)"
          strokeWidth="0.8"
          strokeLinejoin="round"
          style={{ transition: 'fill 0.15s ease, stroke 0.15s ease' }}
        />
      </svg>
    </div>
  );
}
