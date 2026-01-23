const GalleryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
      <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-1 bg-[#1a1a1a] p-2 rounded-full">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium uppercase tracking-wider
              rounded-full transition-all duration-300 ease-out
              ${activeCategory === category.id
                ? 'bg-red-700 text-white shadow-lg shadow-red-700/30'
                : 'bg-transparent text-white hover:bg-white/10'
              }
            `}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryTabs;
