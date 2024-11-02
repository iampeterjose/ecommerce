import React, { useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const images = [
    '/assets/h3.png',
    '/assets/shopping1.png',
    '/assets/h1.png',
    '/assets/h2.png',
    '/assets/h4.png',
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className='flex justify-center items-center my-4'>
            <div className="relative mx-auto">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-[600px] h-[320px] md:h-[500px]"
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                    <span onClick={prevSlide} className="bg-white border p-2 rounded-full shadow-md cursor-pointer">
                        <MdKeyboardArrowLeft size={25} />
                    </span>
                    <span onClick={nextSlide} className="bg-white border p-2 rounded-full shadow-md cursor-pointer">
                        <MdKeyboardArrowRight size={25} />
                    </span>
                </div>
                <div className="flex justify-center mt-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
