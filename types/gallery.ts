import type { StaticImageData } from 'next/image';

export interface GalleryCategory {
  id: string;
  name: string;
}

export interface GalleryItem {
  id: number | string;
  category: string;
  src?: string | StaticImageData;
  alt: string;
  title?: string;
}
