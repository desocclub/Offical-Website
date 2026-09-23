import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DESOC — Design & Software Development Club',
  description: 'Official website of the Design and Software Development Club',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
