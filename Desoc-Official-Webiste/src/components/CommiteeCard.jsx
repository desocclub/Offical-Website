const CommitteeCard = ({ name, role, image, isActive = false }) => {
  return (
    <div className={`group relative flex-shrink-0 w-44 sm:w-48 h-80 sm:h-96 overflow-hidden rounded-lg transition-all duration-500 ${isActive ? '' : 'grayscale'}`}>
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
        <h3 className="text-white font-bold text-lg uppercase tracking-wide leading-tight">
          {name.split(' ')[0]}
        </h3>
        <h3 className="text-white font-bold text-lg uppercase tracking-wide leading-tight">
          {name.split(' ')[1] || ''}
        </h3>
        <p className="text-red-500 text-sm font-medium mt-1 uppercase">
          {role}
        </p>
      </div>
    </div>
  );
};

export default CommitteeCard;