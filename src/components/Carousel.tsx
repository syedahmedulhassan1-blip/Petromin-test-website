import { useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CarouselProps {
  children: ReactNode[];
  itemsPerView?: { base: number; md?: number; lg?: number };
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  gap?: number;
  className?: string;
}

/**
 * Reusable, RTL-aware Carousel.
 * - Touch/swipe enabled
 * - Responsive itemsPerView
 * - Optional autoplay (pauses on hover)
 * - Accessible navigation
 */
export default function Carousel({
  children,
  itemsPerView = { base: 1, md: 2, lg: 3 },
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  gap = 24,
  className = '',
}: CarouselProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const items = Array.isArray(children) ? children : [children];
  const total = items.length;

  const [perView, setPerView] = useState(itemsPerView.base);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive perView using window width
  useEffect(() => {
    const computePerView = () => {
      const w = window.innerWidth;
      if (w >= 1024 && itemsPerView.lg) return itemsPerView.lg;
      if (w >= 768 && itemsPerView.md) return itemsPerView.md;
      return itemsPerView.base;
    };
    const update = () => setPerView(computePerView());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [itemsPerView.base, itemsPerView.md, itemsPerView.lg]);

  const maxIndex = Math.max(0, total - perView);

  // Clamp index when perView changes
  useEffect(() => {
    setCurrentIndex((idx) => Math.min(idx, maxIndex));
  }, [maxIndex]);

  const next = useCallback(() => {
    setCurrentIndex((idx) => (idx >= maxIndex ? 0 : idx + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((idx) => (idx <= 0 ? maxIndex : idx - 1));
  }, [maxIndex]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || isPaused || total <= perView) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isPaused, next, total, perView]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(distance) > threshold) {
      // In RTL, swipe direction is mirrored visually
      if (isRTL) {
        if (distance > 0) prev();
        else next();
      } else {
        if (distance > 0) next();
        else prev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Slide width as percentage of container
  const slideWidthPct = 100 / perView;
  // Translate offset: in LTR move negative, in RTL we use translateX positive (flex direction handles flip via CSS)
  const translatePct = currentIndex * slideWidthPct;

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden" ref={containerRef}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: isRTL
              ? `translateX(${translatePct}%)`
              : `translateX(-${translatePct}%)`,
            gap: `${gap}px`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((child, idx) => (
            <div
              key={idx}
              className="flex-shrink-0"
              style={{
                width: `calc(${slideWidthPct}% - ${(gap * (perView - 1)) / perView}px)`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && total > perView && (
        <>
          <button
            onClick={isRTL ? next : prev}
            aria-label="Previous"
            className="absolute top-1/2 -translate-y-1/2 left-0 -ml-2 sm:-ml-4 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-red-600 hover:text-white transition-colors disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={isRTL ? prev : next}
            aria-label="Next"
            className="absolute top-1/2 -translate-y-1/2 right-0 -mr-2 sm:-mr-4 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-red-600 hover:text-white transition-colors disabled:opacity-40"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {showDots && total > perView && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all rounded-full ${
                idx === currentIndex
                  ? 'w-8 h-2 bg-red-600'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
