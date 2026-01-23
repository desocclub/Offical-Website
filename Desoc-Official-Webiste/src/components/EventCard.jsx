const EventCard = ({ title, tag, description, image, isLive = false }) => {
  return (
    <div className="group relative bg-gradient-to-r from-red-950/30 via-red-900/20 to-transparent border-l-2 border-red-600 hover:border-red-500 transition-all duration-300">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="sm:w-48 lg:w-56 flex-shrink-0 relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 sm:h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          {/* Title Row with Live Badge */}
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {title}
            </h3>
            {isLive && (
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                Live
              </span>
            )}
          </div>

          {/* Tag */}
          <p className="text-red-400 text-sm font-medium mb-3">
            {tag}
          </p>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;