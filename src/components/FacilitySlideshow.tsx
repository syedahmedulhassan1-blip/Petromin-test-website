import { useState, useEffect } from 'react';

const slides = [
  {
    image: '/10 copy.webp',
    alt: 'Tire Service and Wheel Alignment - Professional technicians at work'
  },
  {
    image: '/11 copy.webp',
    alt: 'State-of-the-art service bay with diagnostic equipment'
  },
  {
    image: '/12 copy.webp',
    alt: 'Modern oil change service center exterior'
  },
  {
    image: '/13 copy.webp',
    alt: 'Vehicle maintenance service in progress with scissor lift'
  },
  {
    image: '/14 copy.webp',
    alt: 'Professional service team working on vehicle diagnostics'
  }
];

export default function FacilitySlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100 z-10'
              : 'opacity-0 scale-105 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide
                ? 'w-8 h-2 bg-red-600 shadow-lg shadow-red-600/50'
                : 'w-2 h-2 bg-white/60 hover:bg-white/90'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
