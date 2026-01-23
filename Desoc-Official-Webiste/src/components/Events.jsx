import EventCard from './EventCard';

const Events = () => {
  const eventsData = [
    {
      id: 1,
      title: "Game Pitch 2026",
      tag: "Gaming",
      description: "Join us for an exciting game pitch event where innovative gaming ideas come to life. Showcase your creativity, compete with talented developers, and get a chance to win amazing prizes. Whether you're a beginner or a pro, this event is for everyone passionate about game development.",
      image: "/images/game-pitch.jpg", // Replace with actual image path
      isLive: true
    },
    {
      id: 2,
      title: "Cyber Sabha",
      tag: "Debate",
      description: "Engage in thought-provoking discussions on the latest cybersecurity trends, ethical hacking, and digital privacy. Cyber Sabha brings together experts and enthusiasts to debate critical issues shaping our digital future. Sharpen your communication skills and expand your knowledge.",
      image: "/images/cyber-sabha.jpg", // Replace with actual image path
      isLive: false
    },
    {
      id: 3,
      title: "UCL – Ultimate Coding League",
      tag: "Programming Contest",
      description: "Battle it out in the ultimate coding competition! Test your programming skills, solve challenging problems, and compete against the best coders. UCL is the perfect platform to showcase your technical prowess and learn from fellow competitors in a high-energy environment.",
      image: "/images/ucl.jpg", // Replace with actual image path
      isLive: true
    }
  ];

  return (
    <section id="events" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-black">
      {/* Background Red Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/20 to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-wide">
            EVENTS
          </h2>
        </div>

        {/* Events List */}
        <div className="space-y-8">
          {eventsData.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              tag={event.tag}
              description={event.description}
              image={event.image}
              isLive={event.isLive}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;