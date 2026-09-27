'use client';

import { useEffect, useRef } from 'react';

/**
 * Dense Inertial Visual Field (ParticleField.tsx)
 *
 * CORE ARCHITECTURAL PRINCIPLES:
 * 1. FIXED DOT MATRIX: Dot coordinates (x, y) are strictly stationary. Dots NEVER physically move.
 * 2. DENSE GRID: Fine-grained, closely spaced dots (~14-16px spacing).
 * 3. DUAL MODULATION: Influence field modulates BOTH opacity AND dot radius simultaneously.
 *    - Resting: tiny micro-dots (radius ~0.85px, alpha ~0.10)
 *    - Excited: large luminous dots (radius up to ~2.8-3.0px, alpha up to ~0.95)
 * 4. DIRECTIONAL MOMENTUM & INERTIA (Desktop):
 *    - Elongated influence field stretched along the cursor's velocity vector.
 *    - Continues coasting forward after cursor stops and smoothly dissipates (inertia).
 *    - Smooth angular transitions when changing direction.
 * 5. AUTONOMOUS AMBIENT MOTION (Mobile & Idle):
 *    - Multi-harmonic low-frequency wave field continuously breathes through the matrix.
 *    - Zero cursor dependency on mobile devices.
 * 6. HIGH PERFORMANCE:
 *    - Batch-bucketed Canvas 2D rendering for sustained 60fps with ~8,000-10,000 dots.
 *    - Zero React re-renders in the animation loop.
 */

interface FixedDot {
  readonly x: number;
  readonly y: number;
  readonly baseAlpha: number;
  highlight: number; // 0 to 1
}

interface InertialNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radiusX: number; // elongated along velocity
  radiusY: number; // perpendicular width
  angle: number;
  intensity: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  // Inertial pointer state
  const pointerRef = useRef({
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    vx: 0,
    vy: 0,
    speed: 0,
    angle: 0,
    targetAngle: 0,
    lastX: -9999,
    lastY: -9999,
    lastTime: 0,
    active: false,
    nodes: [] as InertialNode[],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Accessibility: reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let dots: FixedDot[] = [];
    let isVisible = true;

    // Dense grid configuration
    const getSpacing = (w: number) => (w < 640 ? 16 : w < 1024 ? 15 : 14.5);

    // Initialize fixed stationary dot matrix
    const initGrid = () => {
      dots = [];
      const spacing = getSpacing(width);
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      const totalGridW = (cols - 1) * spacing;
      const totalGridH = (rows - 1) * spacing;
      const startX = Math.round((width - totalGridW) / 2);
      const startY = Math.round((height - totalGridH) / 2);

      for (let r = 0; r < rows; r++) {
        const y = startY + r * spacing;
        for (let c = 0; c < cols; c++) {
          const x = startX + c * spacing;

          // Subtle variation in base resting opacity for natural depth (0.08 to 0.12)
          const baseAlpha = 0.08 + ((r * 13 + c * 19) % 5) * 0.008;

          dots.push({
            x,
            y,
            baseAlpha,
            highlight: 0,
          });
        }
      }
    };

    const resizeAndInit = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initGrid();
    };

    // Desktop pointer & velocity tracking with directional inertia
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      const now = performance.now();

      const pointer = pointerRef.current;

      if (clientX >= -80 && clientX <= width + 80 && clientY >= -80 && clientY <= height + 80) {
        pointer.targetX = clientX;
        pointer.targetY = clientY;
        pointer.active = true;

        if (pointer.lastTime > 0) {
          const dt = Math.max(1, now - pointer.lastTime);
          const rawVx = ((clientX - pointer.lastX) / dt) * 16.6;
          const rawVy = ((clientY - pointer.lastY) / dt) * 16.6;

          pointer.vx = pointer.vx * 0.45 + rawVx * 0.55;
          pointer.vy = pointer.vy * 0.45 + rawVy * 0.55;
          pointer.speed = Math.sqrt(pointer.vx * pointer.vx + pointer.vy * pointer.vy);

          // Update directional heading
          if (pointer.speed > 0.6) {
            pointer.targetAngle = Math.atan2(pointer.vy, pointer.vx);
          }

          // Spawn directional inertial trail node
          if (pointer.speed > 0.9 && pointer.nodes.length < 20) {
            // Elongated along movement direction (ratio ~2.2 : 1)
            const rx = Math.min(250, 140 + pointer.speed * 4.5);
            const ry = Math.max(75, 115 - pointer.speed * 1.2);

            pointer.nodes.push({
              x: clientX,
              y: clientY,
              vx: pointer.vx * 0.55, // carried momentum
              vy: pointer.vy * 0.55,
              radiusX: rx,
              radiusY: ry,
              angle: pointer.angle,
              intensity: Math.min(1.0, 0.55 + pointer.speed * 0.04),
            });
          }
        }

        pointer.lastX = clientX;
        pointer.lastY = clientY;
        pointer.lastTime = now;
      } else {
        pointer.active = false;
      }
    };

    const handlePointerLeave = () => {
      const pointer = pointerRef.current;
      pointer.active = false;
      pointer.targetX = -9999;
      pointer.targetY = -9999;
      pointer.vx = 0;
      pointer.vy = 0;
      pointer.speed = 0;
    };

    // Mobile touch interaction
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.touches[0].clientX - rect.left;
      const clientY = e.touches[0].clientY - rect.top;
      const pointer = pointerRef.current;

      pointer.targetX = clientX;
      pointer.targetY = clientY;
      pointer.active = true;
    };

    const handleTouchEnd = () => {
      const pointer = pointerRef.current;
      pointer.active = false;
      pointer.targetX = -9999;
      pointer.targetY = -9999;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !frameRef.current) {
        lastFrameTime = performance.now();
        frameRef.current = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resizeAndInit();
    const resizeObserver = new ResizeObserver(() => {
      resizeAndInit();
    });
    resizeObserver.observe(container);

    let lastFrameTime = performance.now();

    // Main animation loop: Modulates opacity & radius of stationary dots
    const render = (now: number) => {
      if (!isVisible) {
        frameRef.current = null;
        return;
      }

      const elapsed = Math.min(now - lastFrameTime, 64);
      lastFrameTime = now;
      const timeScale = elapsed / 16.6;

      const pointer = pointerRef.current;

      // Pointer interpolation & directional momentum smoothing
      if (pointer.active) {
        pointer.x += (pointer.targetX - pointer.x) * 0.35 * timeScale;
        pointer.y += (pointer.targetY - pointer.y) * 0.35 * timeScale;
        pointer.vx *= Math.pow(0.86, timeScale);
        pointer.vy *= Math.pow(0.86, timeScale);
        pointer.speed = Math.sqrt(pointer.vx * pointer.vx + pointer.vy * pointer.vy);

        // Smooth angle interpolation (avoids instant snapping when changing direction)
        let angleDiff = pointer.targetAngle - pointer.angle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        pointer.angle += angleDiff * 0.22 * timeScale;
      } else {
        pointer.x = -9999;
        pointer.y = -9999;
        pointer.vx = 0;
        pointer.vy = 0;
        pointer.speed = 0;
      }

      // Update & decay inertial nodes (inertia continues after cursor stops)
      for (let n = pointer.nodes.length - 1; n >= 0; n--) {
        const node = pointer.nodes[n];
        // Coast forward with remaining momentum
        node.x += node.vx * 0.45 * timeScale;
        node.y += node.vy * 0.45 * timeScale;
        node.vx *= Math.pow(0.88, timeScale);
        node.vy *= Math.pow(0.88, timeScale);
        node.intensity *= Math.pow(0.87, timeScale);

        if (node.intensity < 0.02) {
          pointer.nodes.splice(n, 1);
        }
      }

      ctx.clearRect(0, 0, width, height);

      const pX = pointer.x;
      const pY = pointer.y;
      const hasPointer = pointer.active && pX > -500;
      const cursorRadius = width < 768 ? 140 : 190;
      const cursorRadiusSq = cursorRadius * cursorRadius;

      // Multi-harmonic procedural ambient wave field (slow, breathing light flow)
      const waveScale1 = 0.0032;
      const waveScale2 = 0.0062;
      const waveScale3 = 0.0019;
      const t1 = now * 0.00055;
      const t2 = now * 0.00038;
      const t3 = now * 0.00022;

      // Batch rendering buckets: 3 tiers for optimal GPU performance
      // Tier 1: Faint resting dots
      // Tier 2: Ambient wave crests
      // Tier 3: Bright excited dots (cursor / inertial trail)
      const tier1Dots: { x: number; y: number; r: number }[] = [];
      const tier2Dots: { x: number; y: number; r: number }[] = [];
      const tier3Dots: { x: number; y: number; r: number; a: number }[] = [];

      const numDots = dots.length;
      const numNodes = pointer.nodes.length;

      for (let i = 0; i < numDots; i++) {
        const dot = dots[i];
        // dot.x and dot.y are 100% FIXED coordinates!

        // 1. Autonomous Ambient Wave Influence (Active on mobile & desktop idle)
        let ambientIntensity = 0;
        if (!isReducedMotion) {
          const w1 = Math.sin(dot.x * waveScale1 + dot.y * (waveScale1 * 0.7) - t1);
          const w2 = Math.cos(dot.x * (waveScale2 * 0.8) - dot.y * waveScale2 + t2);
          const w3 = Math.sin((dot.x + dot.y) * waveScale3 + t3);
          const waveNorm = Math.max(0, w1 * 0.45 + w2 * 0.35 + w3 * 0.2 + 0.35);
          ambientIntensity = waveNorm * waveNorm * 0.35; // 0 to ~0.35
        }

        // 2. Cursor Direct Influence
        if (hasPointer && !isReducedMotion) {
          const dx = dot.x - pX;
          const dy = dot.y - pY;
          const distSq = dx * dx + dy * dy;

          if (distSq < cursorRadiusSq) {
            const dist = Math.sqrt(distSq);
            const norm = dist / cursorRadius;
            const falloff = (1 - norm) * (1 - norm);
            const boost = falloff * 0.75 * Math.min(1.4, 0.8 + pointer.speed * 0.05);
            if (boost > dot.highlight) {
              dot.highlight = boost;
            }
          }
        }

        // 3. Directional Inertial Nodes Influence (Carries momentum forward)
        if (numNodes > 0 && !isReducedMotion) {
          for (let n = 0; n < numNodes; n++) {
            const node = pointer.nodes[n];
            const dx = dot.x - node.x;
            const dy = dot.y - node.y;

            // Rotate into node's elongated coordinate frame
            const cos = Math.cos(-node.angle);
            const sin = Math.sin(-node.angle);
            const ldx = dx * cos - dy * sin;
            const ldy = dx * sin + dy * cos;

            // Elliptical falloff elongated along direction of motion
            const normSq = (ldx * ldx) / (node.radiusX * node.radiusX) + (ldy * ldy) / (node.radiusY * node.radiusY);
            if (normSq < 1.0) {
              const falloff = 1.0 - normSq;
              const nodeInfluence = falloff * falloff * node.intensity;
              if (nodeInfluence > dot.highlight) {
                dot.highlight = nodeInfluence;
              }
            }
          }
        }

        // Decay highlight back to baseline
        dot.highlight *= Math.pow(0.90, timeScale);

        // Compute total combined influence
        const totalInfluence = Math.min(1.0, dot.highlight + ambientIntensity * 0.55);

        // DUAL MODULATION: Both Radius AND Opacity modulate simultaneously
        // Resting: radius 0.85px, alpha ~0.10
        // Peak influence: radius up to 2.85px, alpha up to 0.95
        const radius = 0.85 + totalInfluence * 2.0;
        const alpha = Math.min(0.95, dot.baseAlpha + ambientIntensity * 0.35 + dot.highlight * 0.85);

        // Sort into rendering tiers for batched canvas drawing
        if (dot.highlight > 0.12) {
          tier3Dots.push({ x: dot.x, y: dot.y, r: radius, a: alpha });
        } else if (ambientIntensity > 0.16) {
          tier2Dots.push({ x: dot.x, y: dot.y, r: radius });
        } else {
          tier1Dots.push({ x: dot.x, y: dot.y, r: radius });
        }
      }

      // Batch Render Tier 1: Faint resting dots (single path fill)
      if (tier1Dots.length > 0) {
        ctx.fillStyle = 'rgba(168, 85, 247, 0.11)';
        ctx.beginPath();
        for (let i = 0; i < tier1Dots.length; i++) {
          const d = tier1Dots[i];
          ctx.moveTo(d.x + d.r, d.y);
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // Batch Render Tier 2: Ambient wave crests (single path fill)
      if (tier2Dots.length > 0) {
        ctx.fillStyle = 'rgba(192, 132, 252, 0.34)';
        ctx.beginPath();
        for (let i = 0; i < tier2Dots.length; i++) {
          const d = tier2Dots[i];
          ctx.moveTo(d.x + d.r, d.y);
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // Render Tier 3: Bright excited dots (luminous lavender with dynamic alpha)
      for (let i = 0; i < tier3Dots.length; i++) {
        const d = tier3Dots[i];
        ctx.fillStyle = `rgba(228, 205, 255, ${d.a.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none z-[2] overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />
    </div>
  );
}
