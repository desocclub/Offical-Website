import { useState } from 'react';
import GalleryTabs from './GalleryTabs';
import GalleryGrid from './GalleryGrid';

// Import Cyber Sabha images
import cyber1 from '../assets/cyber1.png';
import cyber2 from '../assets/cyber2.png';
import cyber3 from '../assets/cyber3.png';
import cyber4 from '../assets/cyber4.png';
import cyber5 from '../assets/cyber5.png';
import cyber6 from '../assets/cyber6.png';

// Import Click and Craft images
import click1 from '../assets/click1.png';
import click2 from '../assets/click2.png';
import click3 from '../assets/click3.png';
import click4 from '../assets/click4.png';
import click5 from '../assets/click5.png';
import click6 from '../assets/click6.png';

// Import Installation images
import install1 from '../assets/install1.png';
import install2 from '../assets/install2.png';
import install3 from '../assets/install3.png';
import install4 from '../assets/install4.png';
import install5 from '../assets/install5.png';
import install6 from '../assets/install6.png';

// Import Unleash images
import unleash from '../assets/unleash.png';
import unleash1 from '../assets/unleash1.png';
import unleash2 from '../assets/unleash2.png';
import unleash3 from '../assets/unleash3.png';
import unleash4 from '../assets/unleash4.png';
import unleash5 from '../assets/unleash5.png';

const Gallery = () => {
  // Categories for filtering
  const categories = [
    { id: 'cyber-sabha', name: 'Cyber Sabha' },
    { id: 'click-craft', name: 'Click & Craft' },
    { id: 'installation', name: 'Installation' },
    { id: 'unleash', name: 'Unleash' },
    { id: 'ucl', name: 'UCL' },
    { id: 'genesis', name: 'Genesis' },
    { id: 'game-pitch', name: 'Game Pitch' },
    { id: 'shark-verse', name: 'Shark Verse' }
  ];

  // Default active tab is Cyber Sabha (since we have images for it)
  const [activeCategory, setActiveCategory] = useState('cyber-sabha');

  // Sample images data - replace with actual images
  // Each image has: id, category, src (optional), alt, title (optional)
  const images = [
    // Cyber Sabha images
    { id: 1, category: 'cyber-sabha', src: cyber1, alt: 'Cyber Sabha 1' },
    { id: 2, category: 'cyber-sabha', src: cyber2, alt: 'Cyber Sabha 2' },
    { id: 3, category: 'cyber-sabha', src: cyber3, alt: 'Cyber Sabha 3' },
    { id: 4, category: 'cyber-sabha', src: cyber4, alt: 'Cyber Sabha 4' },
    { id: 5, category: 'cyber-sabha', src: cyber5, alt: 'Cyber Sabha 5' },
    { id: 6, category: 'cyber-sabha', src: cyber6, alt: 'Cyber Sabha 6' },
    
    // Click and Craft images
    { id: 22, category: 'click-craft', src: click1, alt: 'Click and Craft 1' },
    { id: 23, category: 'click-craft', src: click2, alt: 'Click and Craft 2' },
    { id: 24, category: 'click-craft', src: click3, alt: 'Click and Craft 3' },
    { id: 25, category: 'click-craft', src: click4, alt: 'Click and Craft 4' },
    { id: 26, category: 'click-craft', src: click5, alt: 'Click and Craft 5' },
    { id: 27, category: 'click-craft', src: click6, alt: 'Click and Craft 6' },
    
    // UCL images
    { id: 7, category: 'ucl', src: '', alt: 'UCL Event 1' },
    { id: 8, category: 'ucl', src: '', alt: 'UCL Event 2' },
    { id: 9, category: 'ucl', src: '', alt: 'UCL Event 3' },
    
    // Installation images
    { id: 10, category: 'installation', src: install1, alt: 'Installation 1' },
    { id: 11, category: 'installation', src: install2, alt: 'Installation 2' },
    { id: 12, category: 'installation', src: install3, alt: 'Installation 3' },
    { id: 28, category: 'installation', src: install4, alt: 'Installation 4' },
    { id: 29, category: 'installation', src: install5, alt: 'Installation 5' },
    { id: 30, category: 'installation', src: install6, alt: 'Installation 6' },
    
    // Unleash images
    { id: 31, category: 'unleash', src: unleash, alt: 'Unleash' },
    { id: 32, category: 'unleash', src: unleash1, alt: 'Unleash 1' },
    { id: 33, category: 'unleash', src: unleash2, alt: 'Unleash 2' },
    { id: 34, category: 'unleash', src: unleash3, alt: 'Unleash 3' },
    { id: 35, category: 'unleash', src: unleash4, alt: 'Unleash 4' },
    { id: 36, category: 'unleash', src: unleash5, alt: 'Unleash 5' },
    
    // Genesis images
    { id: 13, category: 'genesis', src: '', alt: 'Genesis 1' },
    { id: 14, category: 'genesis', src: '', alt: 'Genesis 2' },
    { id: 15, category: 'genesis', src: '', alt: 'Genesis 3' },
    
    // Game Pitch images
    { id: 16, category: 'game-pitch', src: '', alt: 'Game Pitch 1' },
    { id: 17, category: 'game-pitch', src: '', alt: 'Game Pitch 2' },
    { id: 18, category: 'game-pitch', src: '', alt: 'Game Pitch 3' },
    
    // Shark Verse images
    { id: 19, category: 'shark-verse', src: '', alt: 'Shark Verse 1' },
    { id: 20, category: 'shark-verse', src: '', alt: 'Shark Verse 2' },
    { id: 21, category: 'shark-verse', src: '', alt: 'Shark Verse 3' }
  ];

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <section id="gallery" className="relative py-16 bg-black overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 
          className="
            text-3xl sm:text-4xl md:text-5xl font-bold text-white 
            uppercase tracking-[0.25em]
          "
        >
          Gallery
        </h2>
        {/* Decorative underline */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-red-500"></div>
          <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
          <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-orange-500"></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-10">
        <GalleryTabs 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Gallery Grid */}
      <GalleryGrid 
        images={images}
        activeCategory={activeCategory}
      />
    </section>
  );
};

export default Gallery;
