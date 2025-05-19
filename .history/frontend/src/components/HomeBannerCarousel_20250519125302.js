import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Raghu/May2025/HERO_BAU/Lumio_vision_7_GW_PC_3000X1200_._CB794538284_.jpg",
    alt: "Slide 1",
  },
  {
    id: 2,
    image: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/OnePlus/Flagship/OnePlus13s_newLaunch/Teaser/18thMay/D237447960_WLD_OnePlus_13s_NewLaunch_DesktopHeroTemplate_3000x1200_set6._CB794467918_.jpg",
    alt: "Slide 2",
  },
  {
    id: 3,
    image: "https://images-eu.ssl-images-amazon.com/images/G/31/AmazonBusiness/img25/may/bvd/hero/Electronics_3000_1200_1605._CB794557411_.jpg",
    alt: "Slide 3",
  },
];

const HomeBannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden">
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === currentSlide ? (
            <motion.img
              key={slide.id}
              src={slide.image}
              alt={slide.alt}
              className="absolute w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          ) : null
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white z-10 hover:bg-black/70"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white z-10 hover:bg-black/70"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 w-full flex justify-center space-x-2 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            } cursor-pointer`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBannerCarousel;