import EventCard from './EventCard';
import sharkverseImg from '../assets/genesis/sharkverse.jpeg';
import escapeMatrixImg from '../assets/genesis/escape.jpeg';
import bidnBuild from '../assets/genesis/bidnbuild.jpeg';
import cybersabha from '../assets/cybersabha.jpeg';

const Events = () => {
  const eventsData = [
    // {
    //   id: 1,
    //   slug: "sharkverse",
    //   title: "Sharkverse",
    //   tag: "Startup Pitch Arena",
    //   description: "Pitch. Persuade. Prosper. Enter Sharkverse and pitch your startup vision to a panel of evaluators. Present your idea, defend your business model, and compete to prove why your concept deserves the spotlight.",
    //   image: sharkverseImg,
    //   isLive: true,
    //   comingSoon: false
    // },
    // {
    //   id: 2,
    //   slug: "escape-the-matrix",
    //   title: "Escape The Matrix",
    //   tag: "Treasure Hunt + Escape Room",
    //   description: "Crack the code. Break free. Enter a Matrix-themed challenge where teams solve connected riddles across multiple rooms, unlock locations one by one, and race to complete all four stages.",
    //   image: escapeMatrixImg,
    //   isLive: true,
    //   comingSoon: false
    // },
    // {
    //   id: 3,
    //   slug: "bid-and-build",
    //   title: "Bid & Build",
    //   tag: "Strategy + Design + Auction",
    //   description: "Bid Smart. Design Bold. A strategy-based creative showdown where teams bid for design assets with virtual coins, trade in a black market, and build a final solution under time pressure.",
    //   image: bidnBuild,
    //   isLive: true,
    //   comingSoon: false
    // },

    {
      id: 4,
      slug: "cyber-sabha",
      title: "Cyber Sabha 2.0",
      tag: "Digital Governance + Debate + Policy Making",
      description: "A dynamic MUN-style cybersecurity debate exploring digital governance, cyber policy, and international tech diplomacy.",
      image: cybersabha,
      isLive: true,
      comingSoon: false
    }
  ];

  return (
    <section id="events" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[#0a0005] to-[#0f0010] overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-900/10 to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#bc0034]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            className="
              text-4xl sm:text-5xl md:text-6xl font-bold text-white 
              uppercase tracking-[0.2em]
              drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]
              mb-4
            "
          >
            Events
          </h2>
          {/* Decorative underline */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#bc0034]"></div>
            <div className="h-1 w-20 bg-gradient-to-r from-[#bc0034] via-purple-500 to-[#bc0034] rounded-full"></div>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#bc0034]"></div>
          </div>
          <p className="text-gray-400 mt-6 text-lg uppercase tracking-widest">Upcoming & Live</p>
        </div>

        {/* Events List */}
        <div className="space-y-10">
          {eventsData.map((event, index) => (
            <div
              key={event.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <EventCard
                title={event.title}
                tag={event.tag}
                description={event.description}
                image={event.image}
                isLive={event.isLive}
                eventSlug={event.slug}
                comingSoon={event.comingSoon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;