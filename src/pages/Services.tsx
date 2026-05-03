import { Droplet, Wind, Battery, Settings, Disc, Car, Lightbulb, Wrench, MessageCircle, Check, Zap, Shield, Banknote, UserCheck, Star, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { openWhatsApp, WhatsAppMessages } from '../utils/whatsapp';
import { useLanguage } from '../contexts/LanguageContext';
import Carousel from '../components/Carousel';

export default function Services() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const services = [
    {
      icon: Droplet,
      titleKey: 'service.oil.title',
      color: 'bg-blue-100 text-blue-600',
      image: '/oil_chaneg.jpg',
      rating: 4.9,
      reviews: 1243,
      featureKeys: [
        'service.oil.feature1',
        'service.oil.feature2',
        'service.oil.feature3',
        'service.oil.feature4',
      ],
    },
    {
      icon: Droplet,
      titleKey: 'service.fluids.title',
      color: 'bg-cyan-100 text-cyan-600',
      image: '/fluids.webp',
      rating: 4.8,
      reviews: 987,
      featureKeys: [
        'service.fluids.feature1',
        'service.fluids.feature2',
        'service.fluids.feature3',
        'service.fluids.feature4',
      ],
    },
    {
      icon: Settings,
      titleKey: 'service.wheel.title',
      color: 'bg-gray-700 text-white',
      image: '/unnamed_(1).jpg',
      rating: 4.9,
      reviews: 1156,
      featureKeys: [
        'service.wheel.feature1',
        'service.wheel.feature2',
        'service.wheel.feature3',
        'service.wheel.feature4',
      ],
    },
    {
      icon: Wind,
      titleKey: 'service.ac.title',
      color: 'bg-sky-100 text-sky-600',
      image: '/ac.jpg',
      rating: 4.9,
      reviews: 892,
      featureKeys: [
        'service.ac.feature1',
        'service.ac.feature2',
        'service.ac.feature3',
        'service.ac.feature4',
      ],
    },
    {
      icon: Battery,
      titleKey: 'service.battery.title',
      color: 'bg-yellow-100 text-yellow-600',
      image: '/battery.webp',
      rating: 4.9,
      reviews: 1425,
      featureKeys: [
        'service.battery.feature1',
        'service.battery.feature2',
        'service.battery.feature3',
        'service.battery.feature4',
      ],
    },
    {
      icon: Lightbulb,
      titleKey: 'service.wipers.title',
      color: 'bg-orange-100 text-orange-600',
      image: '/360_f_245920161_c3to1zjlmu2q5ky65bvllvzrnp01x9fa.jpg',
      rating: 4.8,
      reviews: 743,
      featureKeys: [
        'service.wipers.feature1',
        'service.wipers.feature2',
        'service.wipers.feature3',
        'service.wipers.feature4',
      ],
    },
    {
      icon: Disc,
      titleKey: 'service.brake.title',
      color: 'bg-red-100 text-red-600',
      image: '/brake.jpg',
      rating: 4.9,
      reviews: 1567,
      featureKeys: [
        'service.brake.feature1',
        'service.brake.feature2',
        'service.brake.feature3',
        'service.brake.feature4',
      ],
    },
    {
      icon: Wrench,
      titleKey: 'service.transmission.title',
      color: 'bg-teal-100 text-teal-600',
      image: '/depositphotos_32819239-stock-photo-gearbox-and-clutch-cross-section.jpg',
      rating: 4.7,
      reviews: 678,
      featureKeys: [
        'service.transmission.feature1',
        'service.transmission.feature2',
        'service.transmission.feature3',
        'service.transmission.feature4',
      ],
    },
    {
      icon: Settings,
      titleKey: 'service.tuning.title',
      color: 'bg-slate-100 text-slate-600',
      image: '/serviceman-laptop-checks-engine-car-600nw-2593113533.webp',
      rating: 4.8,
      reviews: 1034,
      featureKeys: [
        'service.tuning.feature1',
        'service.tuning.feature2',
        'service.tuning.feature3',
        'service.tuning.feature4',
      ],
    },
    {
      icon: Car,
      titleKey: 'service.wash.title',
      color: 'bg-emerald-100 text-emerald-600',
      image: '/woman-washing-her-car-selfservice-600nw-1861269733.webp',
      rating: 4.9,
      reviews: 2134,
      featureKeys: [
        'service.wash.feature1',
        'service.wash.feature2',
        'service.wash.feature3',
        'service.wash.feature4',
      ],
    },
  ];

  return (
    <div className="pt-32" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('services.hero.title')}
            </h1>
            <p className="text-xl text-gray-300">
              {t('services.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('services.our.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.our.subtitle')}
            </p>
          </div>

          <Carousel
            itemsPerView={{ base: 1, md: 2, lg: 3 }}
            autoPlay
            autoPlayInterval={6000}
            showArrows
            showDots
            gap={32}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={service.image}
                    alt={t(service.titleKey)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} bg-gradient-to-br from-amber-400 to-orange-500 text-white px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm`}>
                    <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Star className="w-4 h-4 fill-white" />
                      <span className="font-bold text-sm">{service.rating}</span>
                    </div>
                    <div className="text-[10px] text-white/90 font-medium mt-0.5">
                      {service.reviews.toLocaleString()} {t('services.reviews')}
                    </div>
                  </div>

                  <service.icon className={`w-12 h-12 text-white absolute bottom-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] ${isRTL ? 'right-6' : 'left-1/2 transform -translate-x-1/2'}`} />
                </div>
                <div className={`p-6 flex-1 flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t(service.titleKey)}
                  </h3>
                  <ul className="space-y-3 flex-1">
                    {service.featureKeys.map((featureKey, idx) => (
                      <li key={idx} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
                        <Check className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Book Now WhatsApp button — added per audit */}
                  <button
                    onClick={() =>
                      openWhatsApp(
                        `Hello! I would like to *Book ${t(service.titleKey)}* at Petromin Express. Could you please share availability and pricing?`,
                        { source: `Services Card - ${t(service.titleKey)}` }
                      )
                    }
                    className={`mt-6 w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t('services.book.now')}
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t('services.cta.title')}
            </h2>
            <p className="text-xl mb-8 text-red-100">
              {t('services.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openWhatsApp(WhatsAppMessages.serviceBooking, { source: 'Services Page - Book Service' })}
                className="flex items-center justify-center gap-2 bg-white text-red-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all text-lg font-semibold shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                {t('services.cta.book')}
              </button>
              <button
                onClick={() => openWhatsApp(WhatsAppMessages.carPickup, { source: 'Services Page - Car Pickup' })}
                className="flex flex-col items-center justify-center gap-1 bg-white text-red-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all text-lg font-semibold shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  <span>{t('services.cta.pickup')}</span>
                </div>
                <span className="text-xs font-normal text-gray-600">{t('services.cta.pickup.charges')}</span>
              </button>
              <Link
                to="/offers"
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-red-600 transition-all text-lg font-semibold"
              >
                {t('services.cta.offers')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('services.promise.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className={isRTL ? 'text-right' : 'text-center'}>
              <div className={`flex mb-4 ${isRTL ? 'justify-end' : 'justify-center'}`}>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('services.promise.fast')}
              </h3>
              <p className="text-gray-600">
                {t('services.promise.fast.desc')}
              </p>
            </div>

            <div className={isRTL ? 'text-right' : 'text-center'}>
              <div className={`flex mb-4 ${isRTL ? 'justify-end' : 'justify-center'}`}>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('services.promise.quality')}
              </h3>
              <p className="text-gray-600">
                {t('services.promise.quality.desc')}
              </p>
            </div>

            <div className={isRTL ? 'text-right' : 'text-center'}>
              <div className={`flex mb-4 ${isRTL ? 'justify-end' : 'justify-center'}`}>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Banknote className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('services.promise.pricing')}
              </h3>
              <p className="text-gray-600">
                {t('services.promise.pricing.desc')}
              </p>
            </div>

            <div className={isRTL ? 'text-right' : 'text-center'}>
              <div className={`flex mb-4 ${isRTL ? 'justify-end' : 'justify-center'}`}>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <UserCheck className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('services.promise.experts')}
              </h3>
              <p className="text-gray-600">
                {t('services.promise.experts.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
