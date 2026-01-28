const GalleryGrid = ({ images, activeCategory }) => {
  // Filter images based on active category
  const filteredImages = images.filter(
    (img) => img.category === activeCategory
  );

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 max-w-6xl mx-auto">
      {/* Instagram-style square grid */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="
              group relative overflow-hidden 
              aspect-[4/5] bg-[#2a2a2a]
              cursor-pointer
            "
          >
            {/* Image */}
            {image.src ? (
              <img
                src={image.src}
                alt={image.alt || 'Gallery image'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]"></div>
            )}
            
            {/* Hover overlay */}
            <div className="
              absolute inset-0 bg-black/50
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-300
              flex items-center justify-center
            ">
              {/* Instagram-like heart icon on hover */}
              <svg 
                className="w-8 h-8 sm:w-12 sm:h-12 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredImages.length === 0 && (
        <div className="text-center py-16">
          <p className="text-white/50 text-lg">No images in this category yet.</p>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;
