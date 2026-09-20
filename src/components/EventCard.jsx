import { useNavigate } from 'react-router-dom';

const EventCard = ({ title, tag, description, image, eventSlug, learnMoreTo, comingSoon = false }) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    if (learnMoreTo) {
      navigate(learnMoreTo);
    } else if (eventSlug) {
      navigate(`/genesis/events/${eventSlug}`);
    }
  };
  return (
    <div 
      className="
        group relative overflow-hidden rounded-xl
        bg-gradient-to-br from-[#1a0f1f]/80 via-[#0f0a15]/60 to-black/80
        backdrop-blur-sm
        border border-purple-900/20
        hover:border-[#bc0034]/50
        transition-all duration-500 ease-out
        hover:scale-[1.02]
        hover:shadow-2xl hover:shadow-[#7a001f]/20
      "
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#bc0034]/0 via-purple-600/0 to-[#bc0034]/0 group-hover:from-[#bc0034]/5 group-hover:via-purple-600/5 group-hover:to-[#bc0034]/5 transition-all duration-500"></div>
      
      <div className="relative flex flex-col md:flex-row md:items-center">
        {/* Image Section - Consistent 16:9 Aspect Ratio */}
        <div className="md:w-80 lg:w-96 flex-shrink-0 relative overflow-hidden md:self-center">
          {/* Image Container with Fixed 16:9 Aspect Ratio */}
          <div className="aspect-video w-full bg-gradient-to-br from-[#1a0f1f] to-black flex items-center justify-center">
            {comingSoon ? (
              <div className="text-center flex flex-col items-center justify-center h-full">
                <p className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-[#d0003d] to-purple-400 bg-clip-text">
                  Coming Soon
                </p>
              </div>
            ) : (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain md:object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
          </div>
          
          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/40"></div>
          


        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
          {/* Category Tag */}
          <div className="inline-flex items-center mb-4">
            <span className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#bc0034]/20 to-purple-500/20 text-transparent bg-clip-text border border-[#bc0034]/30 rounded-full">
              <span className="bg-gradient-to-r from-[#d0003d] to-purple-400 bg-clip-text">
                {tag}
              </span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight group-hover:text-[#d0003d] transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3 mb-4 sm:mb-6">
            {description}
          </p>

          {/* Learn More Link */}
          <button
            onClick={handleLearnMore}
            className="inline-flex items-center gap-2 text-[#d0003d] hover:text-[#e50040] font-medium text-sm uppercase tracking-wider transition-all duration-300 group/link cursor-pointer bg-none border-none p-0"
          >
            Learn More
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
