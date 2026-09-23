import type { Metadata, Viewport } from 'next';
import CustomCursor from '@/components/CustomCursor';
import './globals.css';

export const metadata: Metadata = {
  title: 'DESOC — Design & Software Development Club',
  description:
    'Official website of Design and Software Development Club (DESOC) — Engineering excellence at the intersection of design, technology, and student-driven innovation.',
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
        {children}
      </body>
    </html>
  );
}
