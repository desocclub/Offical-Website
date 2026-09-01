import { useEffect, useRef, useState } from 'react';

export default function ParticleHeroBackground() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({
    x: -3000,
    y: -3000,
    targetX: -3000,
    targetY: -3000,
    prevX: -3000,
    prevY: -3000,
    vx: 0,
    vy: 0,
    active: false,
    lastActiveTime: 0,
  });
  const [coords, setCoords] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Get the parent hero section container
    const section = canvas.closest('section') || canvas.parentElement;
    if (!section) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let startTime = performance.now();
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

      // Adaptive grid spacing
      let spacing = 13;
      if (width < 640) {
        spacing = 22; // Mobile (lightweight & fluid)
      } else if (width < 1024) {
        spacing = 16; // Tablet
      } else {
        spacing = 13; // Desktop
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
          const baseAlpha = 0.06 + ((r * 11 + c * 17) % 5) * 0.012;

          particles.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            baseAlpha,
            currentAlpha: baseAlpha,
            seed: (r * 31 + c * 37) % 1000,
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

      // Active when pointer is inside or hovering near the hero section
      if (px >= -80 && px <= rect.width + 80 && py >= -80 && py <= rect.height + 80) {
        pointerRef.current.targetX = px;
        pointerRef.current.targetY = py;
        pointerRef.current.active = true;
        pointerRef.current.lastActiveTime = performance.now();

        setCoords({
          x: Math.round(px * 10) / 10,
          y: Math.round(py * 10) / 10,
          visible: px >= 0 && px <= rect.width && py >= 0 && py <= rect.height,
        });
      } else {
        pointerRef.current.active = false;
        pointerRef.current.targetX = -3000;
        pointerRef.current.targetY = -3000;
        setCoords((prev) => ({ ...prev, visible: false }));
      }
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
      pointerRef.current.targetX = -3000;
      pointerRef.current.targetY = -3000;
      setCoords((prev) => ({ ...prev, visible: false }));
    };

    // Attach listeners globally to window so interactions anywhere over the hero are caught reliably
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerLeave);
    document.addEventListener('mouseleave', handlePointerLeave);

    const SPRING_K = 0.08;
    const DAMPING = 0.84;

    const render = (now) => {
      const elapsed = (now - startTime) * 0.001;
      const pointer = pointerRef.current;

      const influenceRadius = width < 768 ? 160 : 280;
      const radiusSq = influenceRadius * influenceRadius;

      // Pointer velocity & lerp follow
      const pPrevX = pointer.x;
      const pPrevY = pointer.y;
      pointer.x += (pointer.targetX - pointer.x) * 0.32;
      pointer.y += (pointer.targetY - pointer.y) * 0.32;
      pointer.vx = pointer.x - pPrevX;
      pointer.vy = pointer.y - pPrevY;
      const pointerSpeed = Math.sqrt(pointer.vx * pointer.vx + pointer.vy * pointer.vy);

      ctx.clearRect(0, 0, width, height);

      const pX = pointer.x;
      const pY = pointer.y;
      const isActive = pointer.active;
      const numParticles = particles.length;

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        let targetAlpha = p.baseAlpha;
        let intensity = 0;

        if (isActive) {
          const dx = p.x - pX;
          const dy = p.y - pY;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const norm = dist / influenceRadius;
            // Smooth cubic falloff
            const falloff = 1 - norm;
            intensity = falloff * falloff * (1 + falloff * 0.2);

            // Opacity scales from faint baseline to vibrant ~0.95 at cursor
            targetAlpha = Math.min(1.0, p.baseAlpha + intensity * (0.92 - p.baseAlpha));

            if (!isReducedMotion) {
              // Physical repulsion: particles push away from cursor
              const repelMag = (1 - norm) * 16 * (1 + Math.min(pointerSpeed * 0.1, 1.8));
              const angle = Math.atan2(dy, dx);
              p.vx += Math.cos(angle) * repelMag * 0.16;
              p.vy += Math.sin(angle) * repelMag * 0.16;

              // Gentle vortex swirl when cursor is moving
              if (pointerSpeed > 0.4) {
                const swirl = (1 - norm) * 5.0;
                p.vx += -Math.sin(angle) * swirl * 0.08;
                p.vy += Math.cos(angle) * swirl * 0.08;
              }
            }
          }
        }

        // Spring physics: return gently to anchor point
        if (!isReducedMotion) {
          const springX = (p.originX - p.x) * SPRING_K;
          const springY = (p.originY - p.y) * SPRING_K;

          p.vx = (p.vx + springX) * DAMPING;
          p.vy = (p.vy + springY) * DAMPING;

          p.x += p.vx;
          p.y += p.vy;

          // Subtle idle wave motion when not disturbed
          const idleWave = Math.sin(elapsed * 0.7 + p.seed * 0.05) * 0.4 * (1 - intensity);
          p.y += idleWave * 0.1;
        } else {
          p.x = p.originX;
          p.y = p.originY;
        }

        // Smooth alpha interpolation (creates vibrant responsive trails)
        p.currentAlpha += (targetAlpha - p.currentAlpha) * 0.2;

        // Dynamic size based on spotlight intensity
        const radius = 1.0 + intensity * 1.5;

        // Render dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

        if (intensity > 0.5) {
          // Epicenter spotlight: warm red-white high-intensity dot
          const red = 255;
          const green = Math.round(255 - (intensity - 0.5) * 130);
          const blue = Math.round(255 - (intensity - 0.5) * 100);
          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${p.currentAlpha})`;
        } else if (intensity > 0.08) {
          // Mid-range spotlight: crisp white dot
          ctx.fillStyle = `rgba(245, 248, 255, ${p.currentAlpha})`;
        } else {
          // Ambient dot: subtle gray dot
          ctx.fillStyle = `rgba(210, 215, 225, ${p.currentAlpha})`;
        }
        ctx.fill();
      }

      // Draw faint center reticle & contour wave lines around cursor when active
      if (isActive && pX >= -20 && pX <= width + 20 && pY >= -20 && pY <= height + 20 && !isReducedMotion) {
        ctx.save();
        // Center glowing reticle
        ctx.beginPath();
        ctx.arc(pX, pY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 51, 102, 0.95)';
        ctx.shadowColor = '#ff3366';
        ctx.shadowBlur = 10;
        ctx.fill();

        // 2 Distorted concentric contour rings
        for (let r = 1; r <= 2; r++) {
          const baseRadius = r * 38;
          ctx.beginPath();
          for (let a = 0; a < Math.PI * 2; a += 0.25) {
            const wobble = Math.sin(a * 4 + elapsed * 2.8 + r) * 3;
            const rx = pX + Math.cos(a) * (baseRadius + wobble);
            const ry = pY + Math.sin(a) * (baseRadius + wobble);
            if (a === 0) ctx.moveTo(rx, ry);
            else ctx.lineTo(rx, ry);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(255, 51, 102, ${0.1 / r})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.restore();
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

      {/* Floating HUD Coordinates Tooltip near Cursor (Desktop only) */}
      {coords.visible && (
        <div
          className="hidden md:flex items-center gap-1.5 absolute pointer-events-none z-10 transition-transform duration-75 text-[10px] font-mono text-white/75 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 select-none shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          style={{
            left: `${coords.x + 18}px`,
            top: `${coords.y - 10}px`,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span className="text-[#ff3366]">x:</span>
          <span>{coords.x.toFixed(1)}</span>
          <span className="text-[#ff3366] ml-1">y:</span>
          <span>{coords.y.toFixed(1)}</span>
        </div>
      )}
    </div>
  );
}