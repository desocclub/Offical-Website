import { useState } from 'react';
import GalleryTabs from './GalleryTabs';
import GalleryGrid from './GalleryGrid';

// Import Aura E Sport images
import aura1 from '../assets/img/aura1.jpeg';
import aura2 from '../assets/img/aura2.jpeg';
import aura3 from '../assets/img/aura3.jpeg';
import aura4 from '../assets/img/aura4.jpeg';

// Import Click and Craft images
import click1 from '../assets/img/click1.jpeg';
import click2 from '../assets/img/click2.jpeg';
import click3 from '../assets/img/click3.jpeg';
import click4 from '../assets/img/click4.jpeg';
import click5 from '../assets/img/click5.jpeg';
import click6 from '../assets/img/click6.jpeg';
import click7 from '../assets/img/click7.jpeg';
import click8 from '../assets/img/click8.jpeg';
import click9 from '../assets/img/click9.jpeg';

// Import GDA (Game Pitch) images
import game1 from '../assets/img/game1.jpeg';
import game2 from '../assets/img/game2.jpeg';
import game3 from '../assets/img/game3.jpeg';
import game4 from '../assets/img/game4.jpeg';
import game5 from '../assets/img/game5.jpeg';
import game6 from '../assets/img/game6.jpeg';

// Import Installation images
import install1 from '../assets/install1.png';
import install2 from '../assets/install2.png';
import install3 from '../assets/install3.png';
import install4 from '../assets/install4.png';
import install5 from '../assets/install5.png';
import install6 from '../assets/install6.png';

// Import Innovera images
import inno1 from '../assets/img/inno1.jpeg';
import inno2 from '../assets/img/inno2.jpeg';
import inno3 from '../assets/img/inno3.jpeg';
import inno4 from '../assets/img/inno4.jpeg';
import inno5 from '../assets/img/inno5.jpeg';
import inno6 from '../assets/img/inno6.jpeg';
import inno7 from '../assets/img/inno7.jpeg';
import inno8 from '../assets/img/inno8.jpeg';
import inno9 from '../assets/img/inno9.jpeg';

// Import Shark Verse images
import shark1 from '../assets/img/shark1.jpeg';
import shark2 from '../assets/img/shark2.jpeg';
import shark3 from '../assets/img/shark3.jpeg';
import shark4 from '../assets/img/shark4.jpeg';
import shark5 from '../assets/img/shark5.jpeg';
import shark6 from '../assets/img/shark6.jpeg';

// Import UCL images
import ucl1 from '../assets/img/ucl1.jpeg';
import ucl2 from '../assets/img/ucl2.jpeg';
import ucl3 from '../assets/img/ucl3.jpeg';
import ucl4 from '../assets/img/ucl4.jpeg';
import ucl5 from '../assets/img/ucl5.jpeg';

// Import Unleash images
import unleash1 from '../assets/img/unleash1.jpeg';
import unleash2 from '../assets/img/unleash2.jpeg';
import unleash3 from '../assets/img/unleash3.jpeg';
import unleash4 from '../assets/img/unleash4.jpeg';
import unleash5 from '../assets/img/unleash5.jpeg';
import unleash6 from '../assets/img/unleash6.jpeg';

const Gallery = () => {
  // Categories for filtering
  const categories = [
    { id: 'aura-esport', name: 'Aura E Sport' },
    { id: 'click-craft', name: 'Click & Craft' },
    { id: 'game-pitch', name: 'GDA' },
    { id: 'installation', name: 'Installation' },
    { id: 'innovera', name: 'Innovera' },
    { id: 'shark-verse', name: 'Shark Verse' },
    { id: 'ucl', name: 'UCL' },
    { id: 'unleash', name: 'Unleash' }
  ];

  // Default active tab is Aura E Sport
  const [activeCategory, setActiveCategory] = useState('aura-esport');

  // Sample images data - replace with actual images
  // Each image has: id, category, src (optional), alt, title (optional)
  const images = [
    // Aura E Sport images
    { id: 1, category: 'aura-esport', src: aura1, alt: 'Aura E Sport 1' },
    { id: 2, category: 'aura-esport', src: aura2, alt: 'Aura E Sport 2' },
    { id: 3, category: 'aura-esport', src: aura3, alt: 'Aura E Sport 3' },
    { id: 4, category: 'aura-esport', src: aura4, alt: 'Aura E Sport 4' },
    
    // Click and Craft images
    { id: 5, category: 'click-craft', src: click1, alt: 'Click and Craft 1' },
    { id: 6, category: 'click-craft', src: click2, alt: 'Click and Craft 2' },
    { id: 7, category: 'click-craft', src: click3, alt: 'Click and Craft 3' },
    { id: 8, category: 'click-craft', src: click4, alt: 'Click and Craft 4' },
    { id: 9, category: 'click-craft', src: click5, alt: 'Click and Craft 5' },
    { id: 10, category: 'click-craft', src: click6, alt: 'Click and Craft 6' },
    { id: 11, category: 'click-craft', src: click7, alt: 'Click and Craft 7' },
    { id: 12, category: 'click-craft', src: click8, alt: 'Click and Craft 8' },
    { id: 13, category: 'click-craft', src: click9, alt: 'Click and Craft 9' },
    
    // GDA (Game Pitch) images
    { id: 14, category: 'game-pitch', src: game1, alt: 'GDA 1' },
    { id: 15, category: 'game-pitch', src: game2, alt: 'GDA 2' },
    { id: 16, category: 'game-pitch', src: game3, alt: 'GDA 3' },
    { id: 17, category: 'game-pitch', src: game4, alt: 'GDA 4' },
    { id: 18, category: 'game-pitch', src: game5, alt: 'GDA 5' },
    { id: 19, category: 'game-pitch', src: game6, alt: 'GDA 6' },
    
    // Installation images
    { id: 46, category: 'installation', src: install1, alt: 'Installation 1' },
    { id: 47, category: 'installation', src: install2, alt: 'Installation 2' },
    { id: 48, category: 'installation', src: install3, alt: 'Installation 3' },
    { id: 49, category: 'installation', src: install4, alt: 'Installation 4' },
    { id: 50, category: 'installation', src: install5, alt: 'Installation 5' },
    { id: 51, category: 'installation', src: install6, alt: 'Installation 6' },
    
    // Innovera images
    { id: 20, category: 'innovera', src: inno1, alt: 'Innovera 1' },
    { id: 21, category: 'innovera', src: inno2, alt: 'Innovera 2' },
    { id: 22, category: 'innovera', src: inno3, alt: 'Innovera 3' },
    { id: 23, category: 'innovera', src: inno4, alt: 'Innovera 4' },
    { id: 24, category: 'innovera', src: inno5, alt: 'Innovera 5' },
    { id: 25, category: 'innovera', src: inno6, alt: 'Innovera 6' },
    { id: 26, category: 'innovera', src: inno7, alt: 'Innovera 7' },
    { id: 27, category: 'innovera', src: inno8, alt: 'Innovera 8' },
    { id: 28, category: 'innovera', src: inno9, alt: 'Innovera 9' },
    
    // Shark Verse images
    { id: 29, category: 'shark-verse', src: shark1, alt: 'Shark Verse 1' },
    { id: 30, category: 'shark-verse', src: shark2, alt: 'Shark Verse 2' },
    { id: 31, category: 'shark-verse', src: shark3, alt: 'Shark Verse 3' },
    { id: 32, category: 'shark-verse', src: shark4, alt: 'Shark Verse 4' },
    { id: 33, category: 'shark-verse', src: shark5, alt: 'Shark Verse 5' },
    { id: 34, category: 'shark-verse', src: shark6, alt: 'Shark Verse 6' },
    
    // UCL images
    { id: 35, category: 'ucl', src: ucl1, alt: 'UCL 1' },
    { id: 36, category: 'ucl', src: ucl2, alt: 'UCL 2' },
    { id: 37, category: 'ucl', src: ucl3, alt: 'UCL 3' },
    { id: 38, category: 'ucl', src: ucl4, alt: 'UCL 4' },
    { id: 39, category: 'ucl', src: ucl5, alt: 'UCL 5' },
    
    // Unleash images
    { id: 40, category: 'unleash', src: unleash1, alt: 'Unleash 1' },
    { id: 41, category: 'unleash', src: unleash2, alt: 'Unleash 2' },
    { id: 42, category: 'unleash', src: unleash3, alt: 'Unleash 3' },
    { id: 43, category: 'unleash', src: unleash4, alt: 'Unleash 4' },
    { id: 44, category: 'unleash', src: unleash5, alt: 'Unleash 5' },
    { id: 45, category: 'unleash', src: unleash6, alt: 'Unleash 6' }
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
