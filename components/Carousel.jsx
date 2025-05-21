import React, { useState, useEffect, useRef } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const images = [
  '/assets/h3.png',
  '/assets/shopping1.png',
  '/assets/h1.png',
  '/assets/h2.png',
  '/assets/h4.png',
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
      <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden">
        <div
          ref={carouselRef}
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * 100}vw)`,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
          }}
        >
          {extendedImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Slide ${idx}`}
              className="w-screen h-[220px] md:h-[400px] object-cover select-none pointer-events-none rounded-xl shadow-sm"
              draggable="false"
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <span onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white border p-2 rounded-full shadow-md cursor-pointer z-10">
          <MdKeyboardArrowLeft size={25} />
        </span>
        <span onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border p-2 rounded-full shadow-md cursor-pointer z-10">
          <MdKeyboardArrowRight size={25} />
        </span>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${currentIndex === index + 1 ? 'bg-emerald-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
