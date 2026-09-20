import { useEffect, useRef } from 'react';

export default function ParticleHeroBackground() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({
    x: -3000,
    y: -3000,
    targetX: -3000,
    targetY: -3000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const section = canvas.closest('section') || canvas.parentElement;
    if (!section) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => {
      isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    const resizeAndInit = () => {
      const rect = section.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Consistent, breathable grid spacing (tuned ~10-15% denser)
      let spacing = 19;
      if (width < 640) {
        spacing = 23; // Mobile (~12% denser)
      } else if (width < 1024) {
        spacing = 21; // Tablet (~13% denser)
      } else {
        spacing = 19; // Desktop (~14% denser)
      }

      const cols = Math.ceil(width / spacing) + 4;
      const rows = Math.ceil(height / spacing) + 4;

      particles = [];
      const startX = (width - (cols - 1) * spacing) / 2;
      const startY = (height - (rows - 1) * spacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = startX + c * spacing;
          const originY = startY + r * spacing;
          // Ambient opacity: clearly visible across the entire hero (0.24 - 0.28)
          const baseAlpha = 0.24 + ((r * 7 + c * 13) % 5) * 0.012;

          particles.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            baseAlpha,
            currentAlpha: baseAlpha,
            morph: 0, // 0 = 2x2 squares, 1 = PLUS sign
          });
        }
      }
    };

    const handlePointerMove = (e) => {
      const rect = section.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

      if (clientX === undefined || clientY === undefined) return;

      const px = clientX - rect.left;
      const py = clientY - rect.top;

      if (px >= -80 && px <= rect.width + 80 && py >= -80 && py <= rect.height + 80) {
        pointerRef.current.targetX = px;
        pointerRef.current.targetY = py;
        pointerRef.current.active = true;
      } else {
        pointerRef.current.active = false;
        pointerRef.current.targetX = -3000;
        pointerRef.current.targetY = -3000;
      }
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
      pointerRef.current.targetX = -3000;
      pointerRef.current.targetY = -3000;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerLeave);
    document.addEventListener('mouseleave', handlePointerLeave);

    const SPRING_K = 0.08;
    const DAMPING = 0.82;

    const render = () => {
      const pointer = pointerRef.current;
      const influenceRadius = width < 768 ? 160 : 230;
      const radiusSq = influenceRadius * influenceRadius;

      // Smooth pointer interpolation
      pointer.x += (pointer.targetX - pointer.x) * 0.35;
      pointer.y += (pointer.targetY - pointer.y) * 0.35;

      ctx.clearRect(0, 0, width, height);

      const pX = pointer.x;
      const pY = pointer.y;
      const isActive = pointer.active;
      const numParticles = particles.length;

      // Micro-square dimensions (scaled down for ultra-fine, crisp design pixels)
      const sq = 0.65; // square size in px (subtle & precise)
      const sqHalf = sq * 0.5;
      const gap = 0.35; // gap between 2x2 squares
      const offset0 = (sq + gap) * 0.5; // distance from center in 2x2 mode (~0.5px)
      const dist1 = 0.9; // distance of outer arms from center in PLUS mode

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        let targetAlpha = p.baseAlpha;
        let targetMorph = 0;

        if (isActive) {
          const dx = p.x - pX;
          const dy = p.y - pY;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const norm = dist / influenceRadius;
            // Smooth Wendland-style radial falloff (continuous 0 at boundary)
            const falloff = (1 - norm * norm) * (1 - norm * norm);
            targetMorph = falloff;

            // Opacity scales from ambient ~0.25 to bright ~0.94 near cursor
            targetAlpha = p.baseAlpha + falloff * (0.94 - p.baseAlpha);

            if (!isReducedMotion) {
              // Very subtle, restrained micro-displacement (max ~2.5 - 3.5px)
              const angle = Math.atan2(dy, dx);
              const push = falloff * 0.45;
              p.vx += Math.cos(angle) * push;
              p.vy += Math.sin(angle) * push;
            }
          }
        }

        // Spring return to rest position
        if (!isReducedMotion) {
          const springX = (p.originX - p.x) * SPRING_K;
          const springY = (p.originY - p.y) * SPRING_K;
          p.vx = (p.vx + springX) * DAMPING;
          p.vy = (p.vy + springY) * DAMPING;
          p.x += p.vx;
          p.y += p.vy;
        } else {
          p.x = p.originX;
          p.y = p.originY;
        }

        // Smooth continuous interpolation of morph and alpha
        p.morph += (targetMorph - p.morph) * 0.18;
        p.currentAlpha += (targetAlpha - p.currentAlpha) * 0.18;

        // Smoothstep curve for the shape morphing
        const m = p.morph;
        const ease = m * m * (3 - 2 * m);

        // Center square scales in from 0 to full size
        const centerSize = sq * ease;

        // 4 outer squares interpolate from diagonal 2x2 corners to cardinal PLUS arms
        // TL -> Top
        const tlX = -offset0 * (1 - ease);
        const tlY = -offset0 * (1 - ease) - dist1 * ease;

        // TR -> Right
        const trX = offset0 * (1 - ease) + dist1 * ease;
        const trY = -offset0 * (1 - ease);

        // BR -> Bottom
        const brX = offset0 * (1 - ease);
        const brY = offset0 * (1 - ease) + dist1 * ease;

        // BL -> Left
        const blX = -offset0 * (1 - ease) - dist1 * ease;
        const blY = offset0 * (1 - ease);

        const px = p.x;
        const py = p.y;

        ctx.fillStyle = `rgba(242, 245, 252, ${p.currentAlpha})`;

        // Draw 4 outer squares
        ctx.fillRect(px + tlX - sqHalf, py + tlY - sqHalf, sq, sq);
        ctx.fillRect(px + trX - sqHalf, py + trY - sqHalf, sq, sq);
        ctx.fillRect(px + brX - sqHalf, py + brY - sqHalf, sq, sq);
        ctx.fillRect(px + blX - sqHalf, py + blY - sqHalf, sq, sq);

        // Draw center square as it emerges during morph
        if (centerSize > 0.08) {
          const cHalf = centerSize * 0.5;
          ctx.fillRect(px - cHalf, py - cHalf, centerSize, centerSize);
        }
      }

      frameRef.current = requestAnimationFrame(render);
    };

    resizeAndInit();

    const resizeObserver = new ResizeObserver(() => {
      resizeAndInit();
    });
    resizeObserver.observe(section);

    frameRef.current = requestAnimationFrame(render);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerMove);
      window.removeEventListener('touchend', handlePointerLeave);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" aria-hidden="true" />
    </div>
  );
}