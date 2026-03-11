import backgroundImage from '../assets/bg.png';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">

      {/* Logo Text - Top Left */}
      <div className="absolute top-6 left-6 lg:left-12 z-50 max-w-[60%] sm:max-w-none">
        <h1 className="text-white font-bold text-base sm:text-lg">Design Society</h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">Department of Computer Science & Design, KKWIEER</p>
      </div>

      {/* CSS Grid Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] min-h-screen">
        
        {/* Left Column - Background Image Only */}
        <div className="relative min-h-[40vh] lg:min-h-0">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={backgroundImage} 
              alt="DESOC Background" 
              className="w-full h-full object-cover"
            />
            {/* Dark Red Overlay Gradient - blends into right side */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-[#7a0000]/30 to-black"></div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="flex items-center justify-start px-6 sm:px-8 lg:px-16 py-12 lg:py-0">
          <div className="w-full">
            {/* Main Heading */}
            <h1 className="font-extrabold text-white mb-6 sm:mb-10 tracking-wider text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              DESOC
            </h1>
            
            {/* Mission Statement Quote */}
            <p className="text-gray-300 text-lg lg:text-xl mb-8 leading-relaxed">
              "Inspiring a future where technology and design harmoniously advance society through innovation and creativity."
            </p>
            

            {/* CTA Button */}
            <button className="group inline-flex items-center justify-center px-6 py-3 text-white font-medium bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-900/30">
              About Us
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;