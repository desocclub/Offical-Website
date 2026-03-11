const GalleryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="px-4 overflow-x-auto scrollbar-hide text-center">
      <div className="inline-flex flex-nowrap sm:flex-wrap sm:justify-center gap-1.5 sm:gap-2 bg-[#1a1a1a] p-2 rounded-2xl sm:rounded-full min-w-max sm:min-w-0">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              px-3 sm:px-6 py-2 text-[11px] sm:text-sm font-medium uppercase tracking-wider
              rounded-full transition-all duration-300 ease-out whitespace-nowrap
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
