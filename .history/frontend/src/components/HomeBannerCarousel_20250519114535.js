import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "",
    alt: "Slide 1",
  },
  {
    id: 2,
    image: "",
    alt: "Slide 2",
  },
  {
    id: 3,
    image: "",
    alt: "Slide 3",
  },
];

const HeroBannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
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
            />
          ) : null
        )}
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-5 w-full flex justify-center space-x-2">
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

export default HeroBannerCarousel;