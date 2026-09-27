import type { StaticImageData } from 'next/image';

/**
 * Safely resolves an image source to a URL string.
 * Handles Next.js StaticImageData objects, plain string URLs, and undefined gracefully.
 */
export function resolveSrc(img: string | StaticImageData | unknown): string {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && img !== null && 'src' in img) {
    return (img as StaticImageData).src;
  }
  return '';
}

export default resolveSrc;
