import type { Metadata, Viewport } from 'next';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';

export const metadata: Metadata = {
  title: 'DESOC — Design Society | KKWIEER',
  description:
    'DESOC (Design Society) is the official design and innovation club of the Computer Science and Design Department at K. K. Wagh Institute of Engineering Education and Research. We bring together students passionate about design, technology, and innovation through workshops, competitions, events, and collaborative projects.',
  icons: {
    icon: '/desoc-logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-[#d0d6e0] min-h-screen selection:bg-[#ff3366]/30 selection:text-white">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
