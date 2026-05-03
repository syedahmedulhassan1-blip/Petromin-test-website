import { Star } from 'lucide-react';
import Carousel from './Carousel';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Google Reviews section.
 *
 * NOTE: this currently uses *structured mock data* shaped like a Google Places
 * review payload. Once a Google Places API key + Place ID are available, replace
 * `MOCK_REVIEWS` and `OVERALL` with a fetched response — the component contract
 * (rating 1-5, author_name, relative_time_description, text, profile_photo_url)
 * matches the official Places API so no UI changes will be needed.
 *
 * To wire up the live widget later:
 *  - Use Place Details API: places.googleapis.com/v1/places/{place_id}?fields=reviews,rating,userRatingCount
 *  - Or embed Google's official "Place Card" widget via an iframe.
 */

interface GoogleReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url?: string;
}

const MOCK_REVIEWS: GoogleReview[] = [
  {
    author_name: 'Khalid R.',
    rating: 5,
    relative_time_description: '2 weeks ago',
    text: 'Excellent service. Booked an oil change on WhatsApp, walked in and was out in 25 minutes. Genuine products, friendly staff.',
  },
  {
    author_name: 'Aisha N.',
    rating: 5,
    relative_time_description: '1 month ago',
    text: 'Honest pricing and very professional technicians. They explained everything clearly before doing any work.',
  },
  {
    author_name: 'Omar T.',
    rating: 4,
    relative_time_description: '1 month ago',
    text: 'Quick brake service and a free multi-point inspection. Will be back for my next service.',
  },
  {
    author_name: 'Layla H.',
    rating: 5,
    relative_time_description: '2 months ago',
    text: 'I appreciated the clean lounge and the transparent invoice. No hidden fees, no upsell pressure.',
  },
  {
    author_name: 'Yousef A.',
    rating: 5,
    relative_time_description: '3 months ago',
    text: 'Trusted them with my fleet for over a year. Consistent quality across all branches in the UAE.',
  },
];

const OVERALL = {
  rating: 4.8,
  total: 1240,
};

// Replace with your actual Google Maps place URL when available
const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=Petromin+Express+UAE';

export default function GoogleReviews() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            {/* Google "G" logo */}
            <svg className="w-10 h-10" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {t('google.reviews.title')}
            </h2>
          </div>
          <p className="text-xl text-gray-600 mb-6">
            {t('google.reviews.subtitle')}
          </p>

          <div className={`inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-3xl font-bold text-gray-900">{OVERALL.rating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(OVERALL.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({OVERALL.total.toLocaleString()})
            </span>
          </div>
        </div>

        <Carousel
          itemsPerView={{ base: 1, md: 2, lg: 3 }}
          autoPlay
          autoPlayInterval={7000}
          showArrows
          showDots
          gap={24}
        >
          {MOCK_REVIEWS.map((review, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-md border border-gray-100 h-full flex flex-col ${isRTL ? 'text-right' : ''}`}
            >
              <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {review.author_name.charAt(0)}
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="font-semibold text-gray-900 leading-tight">
                    {review.author_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {review.relative_time_description}
                  </p>
                </div>
              </div>
              <div className={`flex gap-0.5 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed flex-1">
                {review.text}
              </p>
            </div>
          ))}
        </Carousel>

        <div className="text-center mt-10">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-800 hover:border-red-600 hover:text-red-600 px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm"
          >
            {t('google.reviews.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
