import type { Metadata } from 'next';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export const metadata: Metadata = {
  title: 'Register for CyberSabha 2.0 — DESOC',
  description: 'Register your team for CyberSabha 2.0: The Grand Tech Assembly.',
};

export default function CyberSabhaRegistrationPage() {
  return (
    <div className="min-h-screen bg-[#e9e5dc] text-[#17120f]">
      <Navbar />
      <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl border border-stone-300 bg-[#f5f1e9] p-6 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-800">CyberSabha 2.0 · Team registration</p>
          <h1 className="mt-4 font-serif text-4xl font-black uppercase leading-tight sm:text-5xl">Registration closed</h1>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">Online registration for CyberSabha 2.0 is now closed.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}