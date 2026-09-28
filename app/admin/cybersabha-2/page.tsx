import type { Metadata } from 'next';
import CyberSabhaAdmin from '@/components/cybersabha/CyberSabhaAdmin';

export const metadata: Metadata = { title: 'CyberSabha 2.0 Admin — DESOC' };

export default function CyberSabhaAdminPage() {
  return <CyberSabhaAdmin />;
}