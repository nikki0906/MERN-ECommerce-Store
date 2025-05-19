// src/components/HomeBannerCarousel.js
import { useState } from "react";
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === currentSlide ? (
            <motion.div
              key={slide.id}
              className="absolute w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white z-10"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white z-10"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-5 w-full flex justify-center space-x-2 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            } cursor-pointer`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBannerCarousel;