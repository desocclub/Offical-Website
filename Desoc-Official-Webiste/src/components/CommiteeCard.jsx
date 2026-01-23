const CommitteeCard = ({ name, role, image, isActive = false }) => {
  return (
    <div 
      className={`
        group relative flex-shrink-0 w-44 sm:w-48 h-80 sm:h-96 
        overflow-hidden rounded-lg 
        transition-all duration-400 ease-in-out
        ${isActive 
          ? 'scale-105 grayscale-0 opacity-100 z-10' 
          : 'scale-90 grayscale opacity-60'
        }
      `}
    >
      {/* Full Height Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover object-top"
      />
      
      {/* Dark Gradient Overlay at Bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

      {/* Name and Role at Bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <h3 
          className={`
            font-bold text-lg uppercase tracking-wide leading-tight
            transition-colors duration-400
            ${isActive ? 'text-white' : 'text-white/70'}
          `}
        >
          {name.split(' ')[0]}
        </h3>
        <h3 
          className={`
            font-bold text-lg uppercase tracking-wide leading-tight
            transition-colors duration-400
            ${isActive ? 'text-white' : 'text-white/70'}
          `}
        >
          {name.split(' ')[1] || ''}
        </h3>
        <p 
          className={`
            text-sm font-medium mt-1 uppercase
            transition-colors duration-400
            ${isActive ? 'text-red-500' : 'text-red-500/50'}
          `}
        >
          {role}
        </p>
      </div>
    </div>
  );
};

export default CommitteeCard;