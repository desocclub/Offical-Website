'use client';

import { useState, useEffect, useRef, memo, Component, type ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Safe WebGL2 capability detection
function checkWebGL2Support(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

// Dynamic import with SSR disabled to ensure WebGL context initializes strictly in browser
const Dithering = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.Dithering),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-black" />,
  }
);

// Error boundary to gracefully catch any device-level WebGL initialization crashes
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ShaderErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL shader fallback triggered:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 2D Canvas Bayer Fallback for low-spec mobile devices lacking WebGL2
function Canvas2DFallback({ isMobile, isReducedMotion }: { isMobile: boolean; isReducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const bayer4x4 = [
      0, 8, 2, 10,
      12, 4, 14, 6,
      3, 11, 1, 9,
      15, 7, 13, 5
    ];

    const resize = () => {
      canvas.width = Math.min(window.innerWidth, 600);
      canvas.height = Math.min(window.innerHeight, 900);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;
      const scale = isMobile ? 0.65 : 1.15;
      const offsetY = isMobile ? -0.18 : -0.22;
      const t = time * 0.5;

      const step = isMobile ? 3 : 2;
      for (let y = 0; y < h; y += step) {
        const normY = (h - y - 0.5 * h) / h;
        for (let x = 0; x < w; x += step) {
          const normX = (x - 0.5 * w) / w;
          const uvX = normX / scale;
          const uvY = (normY + offsetY) / scale;

          const l = Math.sqrt(uvX * uvX + uvY * uvY);
          const angle = 6 * Math.atan2(uvY, uvX) + 4 * t;
          const twist = 1.2;
          const offset = 1.0 / Math.pow(Math.max(l, 1e-6), twist) + angle / (2 * Math.PI);
          const mid = Math.min(1, Math.max(0, Math.pow(l, twist)));
          const shape = mid * (offset - Math.floor(offset));

          const bayerIdx = ((Math.floor(y / step) % 4) * 4) + (Math.floor(x / step) % 4);
          const dither = (bayer4x4[bayerIdx] / 16.0) - 0.5;

          if (shape + dither >= 0.5) {
            for (let dy = 0; dy < step && y + dy < h; dy++) {
              for (let dx = 0; dx < step && x + dx < w; dx++) {
                const idx = ((y + dy) * w + (x + dx)) * 4;
                data[idx] = 139;     // R (#8b5cf6)
                data[idx + 1] = 92;  // G
                data[idx + 2] = 246; // B
                data[idx + 3] = 255; // A
              }
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      if (!isReducedMotion) {
        time += 0.02;
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [isMobile, isReducedMotion]);

  return <canvas ref={canvasRef} className="w-full h-full object-cover block" />;
}

/**
 * DitheringBackground Component
 *
 * Refined Dithering Shader:
 * - Tiny, dense pixel/dither pattern for fine-grained retro-modern texture
 * - Organic, flowing curved swirl forms radiating from the lower/outer hero foundation
 * - Upward gradual fade/dissolve into pure black empty space around the navbar & DESOC logo
 * - Responsive: Distinct mobile parameters tuned for mobile portrait aspect ratio & high DPR
 * - Robust cross-browser WebGL rendering with zero canvas stacking collapse
 * - Uses pure CSS overlay fade instead of CSS mask-image to avoid mobile WebKit/Blink canvas compositing bugs
 */
function DitheringBackgroundImpl() {
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasWebGL2, setHasWebGL2] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    setHasWebGL2(checkWebGL2Support());

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsReducedMotion('matches' in e ? e.matches : (e as MediaQueryList).matches);
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
    } else if ('addListener' in motionQuery) {
      // Compatibility fallback for older iOS Safari
      (motionQuery as unknown as { addListener: (cb: (e: MediaQueryList) => void) => void }).addListener(handleMotionChange);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange);
      } else if ('removeListener' in motionQuery) {
        (motionQuery as unknown as { removeListener: (cb: (e: MediaQueryList) => void) => void }).removeListener(handleMotionChange);
      }
    };
  }, []);

  if (!isMounted) {
    return <div className="absolute inset-0 bg-black pointer-events-none select-none z-[1]" aria-hidden="true" />;
  }

  // Device-specific tuning:
  // Speed: slow, organic continuous flow
  const speed = isReducedMotion ? 0 : isMobile ? 0.22 : 0.26;
  // Scale: mobile portrait needs ~0.65 to expand the organic swirl arms across the narrow screen; desktop uses 1.15
  const scale = isMobile ? 0.65 : 1.15;
  // Size: mobile screens have high DPR (2x - 3.5x), so size ~2.4px ensures pixels are crisp, tactile, and clearly visible
  // Desktop has lower DPR (1x - 2x), so 1.6px produces fine, delicate stippling
  const ditherSize = isMobile ? 2.4 : 1.6;
  // Offset: negative offsetY places the swirl foundation in the lower hero on both mobile & desktop
  const offsetY = isMobile ? -0.18 : -0.22;
  const offsetX = isMobile ? 0 : -0.06;

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-[1]"
      aria-hidden="true"
    >
      {/* Primary WebGL Bayer Dithering Canvas with Error Boundary and 2D Canvas Fallback */}
      {hasWebGL2 ? (
        <ShaderErrorBoundary
          fallback={<Canvas2DFallback isMobile={isMobile} isReducedMotion={isReducedMotion} />}
        >
          <Dithering
            className="w-full h-full block"
            style={{ width: '100%', height: '100%' }}
            shape="swirl"
            type="4x4"
            colorBack="#000000"
            colorFront="#8b5cf6"
            size={ditherSize}
            scale={scale}
            speed={speed}
            offsetY={offsetY}
            offsetX={offsetX}
            fit="cover"
            minPixelRatio={isMobile ? 1.5 : 2}
          />
        </ShaderErrorBoundary>
      ) : (
        <Canvas2DFallback isMobile={isMobile} isReducedMotion={isReducedMotion} />
      )}

      {/* Pure CSS Gradient Dissolve Overlay:
          Eliminates mobile WebKit bugs associated with CSS mask-image on WebGL canvases.
          Dissolves the upper area into pure black around the navbar and DESOC logo while keeping
          the lower foundation vibrant and flowing.
      */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: isMobile
            ? 'linear-gradient(to bottom, #000000 0%, #000000 14%, rgba(0,0,0,0.85) 28%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 75%, transparent 100%)'
            : 'linear-gradient(to bottom, #000000 0%, #000000 18%, rgba(0,0,0,0.85) 32%, rgba(0,0,0,0.45) 52%, rgba(0,0,0,0.1) 75%, transparent 100%)',
        }}
      />
    </div>
  );
}

export default memo(DitheringBackgroundImpl);
