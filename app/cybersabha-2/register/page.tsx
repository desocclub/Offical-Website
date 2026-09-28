import type { Metadata } from 'next';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import CyberSabhaRegistrationForm from '@/components/cybersabha/CyberSabhaRegistrationForm';

export const metadata: Metadata = {
  title: 'Register for CyberSabha 2.0 — DESOC',
  description: 'Register your team for CyberSabha 2.0: The Grand Tech Assembly.',
};

export default function CyberSabhaRegistrationPage() {
  return (
    <div className="min-h-screen bg-[#e9e5dc] text-[#17120f]">
      <Navbar />
      <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <CyberSabhaRegistrationForm />
      </main>
      <Footer />
    </div>
  );
}