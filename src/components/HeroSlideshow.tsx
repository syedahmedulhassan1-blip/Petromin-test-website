import { useState, useEffect } from 'react';

const slides = [
  {
    image: '/1.webp',
    alt: 'Happy New Year 2026 - Year after year, Petromin Express cares'
  },
  {
    image: '/2.webp',
    alt: 'New Year\'s Eve Special - 10% Discount on All Services'
  },
  {
    image: '/3.webp',
    alt: 'Christmas Special - 10% Discount and Free Oil Filter'
  },
  {
    image: '/5.webp',
    alt: 'Trained Technicians for German & American Cars - We fix it right the first time'
  },
  {
    image: '/6.webp',
    alt: 'Special Festive Offers - Your Trusted Vehicle Care Partner'
  },
  {
    image: '/7.webp',
    alt: 'Buy 4 Tyres & Get AED 200 Voucher Plus Free Car Wash'
  },
  {
    image: '/8.webp',
    alt: 'Minor Service Package - Starting from 99 AED'
  },
  {
    image: '/9.webp',
    alt: 'Ceramic Coating & PPF Service - Let\'s Drive Scratch Free'
  }
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white/20 backdrop-blur-sm bg-white/5">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
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
