import EventCard from './EventCard';

const Events = () => {
  const eventsData = [
    {
      id: 1,
      title: "ECLIPSE - The Game Pitch Arena",
      tag: "Gaming Competition",
      description: "Step into the spotlight at ECLIPSE, where aspiring game developers pitch their innovative game concepts to a panel of industry experts. This thrilling event offers a platform to showcase your creativity, receive valuable feedback, and potentially secure support to bring your game idea to life. Whether you're a solo developer or part of a team, ECLIPSE is your chance to shine in the gaming world.",
      image: "/src/assets/eclipse.jpeg",
      isLive: true
    },
    {
      id: 2,
      title: "Cyber Sabha",
      tag: "Tech Debate",
      description: "Cyber Sabha is a Yuva Parliament–style discussion forum where teams represent leading organizations like Google, Meta, RBI, and Government bodies (MeitY). Participants debate and deliberate on critical issues related to technology, cybersecurity, digital governance, and policy-making, simulating real-world decision-making at the highest level.",
      image: "/src/assets/cybersabha.jpeg",
      isLive: false
    },
    {
      id: 3,
      title: "UCL – Ultimate Coding League",
      tag: "Coding Championship",
      description: "Battle it out in the ultimate coding competition! Test your programming skills, solve challenging problems, and compete against the best coders. UCL is the perfect platform to showcase your technical prowess and learn from fellow competitors in a high-energy environment.",
      image: "/src/assets/ucl.jpeg",
      isLive: true
    }
  ];

  return (
    <section id="events" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[#0a0005] to-[#0f0010] overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-900/10 to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse"></div>
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
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-red-500"></div>
            <div className="h-1 w-20 bg-gradient-to-r from-red-500 via-purple-500 to-red-500 rounded-full"></div>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-red-500"></div>
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
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;