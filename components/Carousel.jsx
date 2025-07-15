import React, { useState, useEffect, useRef } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const images = [
  '/assets/h1.png',
  '/assets/h2.png',
  '/assets/h3.png',
  '/assets/h4.png',
  '/assets/shopping1.png',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 (first real slide)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const carouselRef = useRef(null);

  const extendedImages = [images[images.length - 1], ...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
    setIsTransitioning(true);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
    setIsTransitioning(true);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index + 1); // shift to account for cloned first
    setIsTransitioning(true);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === extendedImages.length - 1) {
      // Reached cloned first -> jump to actual first
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      // Reached cloned last -> jump to actual last
      setIsTransitioning(false);
      setCurrentIndex(extendedImages.length - 2);
    }
  };

  useEffect(() => {
    const container = carouselRef.current;
    container.addEventListener('transitionend', handleTransitionEnd);
    return () => {
      container.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center my-10 w-full">
      <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-lg border border-[#E0E0E0] bg-white">
        <div
          ref={carouselRef}
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
        >
          {extendedImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Slide ${idx}`}
              className="w-full h-[220px] md:h-[400px] object-cover select-none pointer-events-none rounded-2xl shadow-sm bg-[#F5F5F5]"
              draggable="false"
              style={{ minWidth: '100%' }}
            />
          ))}
        </div>
        {/* Navigation arrows */}
        <span onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white border border-[#E0E0E0] p-2 rounded-full shadow-md cursor-pointer z-10 hover:bg-[#F5F5F5]">
          <MdKeyboardArrowLeft size={28} className="text-[#1976D2]" />
        </span>
        <span onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-[#E0E0E0] p-2 rounded-full shadow-md cursor-pointer z-10 hover:bg-[#F5F5F5]">
          <MdKeyboardArrowRight size={28} className="text-[#1976D2]" />
        </span>
      </div>
      {/* Dots */}
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 w-2.5 rounded-full mx-1 cursor-pointer border border-[#E0E0E0] ${currentIndex === index + 1 ? 'bg-[#1976D2]' : 'bg-[#F5F5F5]'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
