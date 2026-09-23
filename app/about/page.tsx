import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export const metadata = {
  title: 'About DESOC — Design & Software Development Club',
  description: 'DESOC is the official design and innovation club of the Computer Science and Design (CSD) Department at KKWIEER.',
};

const activities = [
  {
    title: 'Design Workshops',
    description:
      'Hands-on sessions that introduce students to modern design tools, UI/UX principles, and creative workflows.',
  },
  {
    title: 'Creative Competitions',
    description:
      'Design challenges and competitions that push students to think innovatively and express their ideas visually.',
  },
  {
    title: 'Collaborative Projects',
    description:
      'Opportunities for students to work together on design-focused projects and real-world concepts.',
  },
  {
    title: 'Events & Community',
    description:
      'DESOC organizes design events and activities that encourage collaboration, creativity, and community building.',
  },
];

const sectionCardClass =
  'relative overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl border border-white/10 p-5 sm:p-7 md:p-10';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => (
  <div className="flex items-center mb-7 sm:mb-9">
    <div
      className="w-1 h-10 rounded-full mr-4 shrink-0"
      style={{
        background: 'linear-gradient(to bottom, #ef4444, #b91c1c)',
        boxShadow: '0 0 12px rgba(220,38,38,0.5)',
      }}
    />
    <div>
      <h2 className="heading-h2 text-primary">{title}</h2>
      {subtitle ? (
        <p className="text-red-400 text-xs sm:text-sm mt-1 uppercase tracking-wider" style={{ fontWeight: 'var(--font-weight-medium)' }}>{subtitle}</p>
      ) : null}
    </div>
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="relative">
        <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(135deg, black, rgba(127,29,29,0.3) 50%, black)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at top right, rgba(127,29,29,0.15), transparent 50%)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(153,27,27,0.1), transparent 50%)' }} />
        <div
          className="fixed inset-0 opacity-5 -z-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <main className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-16 max-w-7xl mx-auto">
          <header className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="relative inline-block max-w-4xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full" style={{ background: 'linear-gradient(to right, transparent, #ef4444, transparent)', boxShadow: '0 0 20px rgba(220,38,38,0.45)' }} />

              <h1 className="heading-title-6 text-primary mb-4">
                About DESOC
              </h1>

              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #ef4444)' }} />
                <span className="text-red-400 text-lg sm:text-xl md:text-2xl font-light tracking-widest">
                  Designing the Future
                </span>
                <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #ef4444)' }} />
              </div>

              <p className="text-secondary text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Designing ideas, creating experiences, and shaping innovation.
              </p>

              <div className="mt-8 flex items-center justify-center gap-4 opacity-70">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-24 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              </div>
            </div>
          </header>

          <div className="space-y-10 sm:space-y-14">
            <section className={sectionCardClass} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
              <SectionTitle title="About DESOC" subtitle="Design Society" />
              <div className="max-w-4xl space-y-4 text-secondary text-sm sm:text-base leading-relaxed">
                <p>
                  DESOC (Design Society) is the official design and innovation club of the Computer Science and Design (CSD) Department at K. K. Wagh Institute of Engineering Education and Research (KKWIEER).
                </p>
                <p>
                  The club aims to bring together creative minds who are passionate about design, technology, and innovation. DESOC provides a collaborative platform where students can explore fields such as UI/UX design, graphic design, product design, and digital creativity.
                </p>
                <p>
                  Through various events, workshops, competitions, and collaborative projects, DESOC encourages students to develop creative thinking, problem-solving skills, and practical design expertise.
                </p>
              </div>
            </section>

            <section className={sectionCardClass} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
              <SectionTitle title="Our Mission" subtitle="Purpose" />
              <p className="max-w-4xl text-secondary text-sm sm:text-base leading-relaxed">
                To inspire students to think creatively and use design as a powerful tool to solve problems, communicate ideas, and create meaningful digital experiences.
              </p>
            </section>

            <section className={sectionCardClass} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
              <SectionTitle title="What We Do" subtitle="Activities" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {activities.map((activity) => (
                  <article
                    key={activity.title}
                    className="group p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-red-500/35 transition-all duration-300"
                  >
                    <h3 className="text-primary text-lg mb-2 group-hover:text-red-200 transition-colors duration-300" style={{ fontWeight: 'var(--font-weight-medium)', letterSpacing: '-0.015em' }}>
                      {activity.title}
                    </h3>
                    <p className="text-tertiary text-sm leading-relaxed">{activity.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={sectionCardClass} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
              <SectionTitle title="Vision" subtitle="Long-Term Goal" />
              <p className="max-w-4xl text-secondary text-sm sm:text-base leading-relaxed">
                To build a strong student design community that nurtures creativity, encourages innovation, and prepares students to become future designers and creative problem-solvers.
              </p>
            </section>

            <section
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-red-500/30 p-6 sm:p-8 md:p-10 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(220,38,38,0.12) 0%, rgba(127,29,29,0.08) 50%, rgba(0,0,0,0.2) 100%)',
                boxShadow: '0 22px 50px -12px rgba(220,38,38,0.22)',
              }}
            >
              <h2 className="heading-h2 text-primary mb-3">Join DESOC</h2>
              <p className="text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6">
                Become part of a community that celebrates creativity, design thinking, and innovation.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 bg-linear-to-r from-red-700 to-red-600 text-primary uppercase tracking-wider rounded-full hover:from-red-600 hover:to-red-500 transition-all duration-300 hover:scale-105"
                style={{ boxShadow: '0 0 30px rgba(220,38,38,0.35)', fontWeight: 'var(--font-weight-medium)' }}
              >
                Join DESOC
              </Link>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
