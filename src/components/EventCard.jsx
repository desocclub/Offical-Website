const EventCard = ({ title, tag, description, image, isLive = false }) => {
  return (
    <div 
      className="
        group relative overflow-hidden rounded-xl
        bg-gradient-to-br from-[#1a0f1f]/80 via-[#0f0a15]/60 to-black/80
        backdrop-blur-sm
        border border-purple-900/20
        hover:border-red-500/50
        transition-all duration-500 ease-out
        hover:scale-[1.02]
        hover:shadow-2xl hover:shadow-red-900/20
      "
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-purple-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:via-purple-600/5 group-hover:to-red-600/5 transition-all duration-500"></div>
      
      <div className="relative flex flex-col md:flex-row md:items-center">
        {/* Image Section - Consistent 16:9 Aspect Ratio */}
        <div className="md:w-80 lg:w-96 flex-shrink-0 relative overflow-hidden md:self-center">
          {/* Image Container with Fixed 16:9 Aspect Ratio */}
          <div className="aspect-video w-full">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain md:object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          
          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/40"></div>
          
          {/* Live Badge - positioned on image */}
          {isLive && (
            <div className="absolute top-4 left-4">
              <span className="relative inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-red-600/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                LIVE NOW
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
          {/* Category Tag */}
          <div className="inline-flex items-center mb-4">
            <span className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-red-500/20 to-purple-500/20 text-transparent bg-clip-text border border-red-500/30 rounded-full">
              <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text">
                {tag}
              </span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight group-hover:text-red-400 transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3 mb-4 sm:mb-6">
            {description}
          </p>

          {/* Learn More Link */}
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-medium text-sm uppercase tracking-wider transition-all duration-300 group/link"
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
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;