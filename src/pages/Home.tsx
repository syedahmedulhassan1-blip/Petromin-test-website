import { Wrench, Users, Droplet, ShieldCheck, Car, Battery, Settings, MessageCircle, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import FacebookFeed from '../components/FacebookFeed';
import InstagramFeed from '../components/InstagramFeed';
import LinkedInFeed from '../components/LinkedInFeed';
import LiveCarCounter from '../components/LiveCarCounter';
import HeroSlideshow from '../components/HeroSlideshow';
import Carousel from '../components/Carousel';
import GoogleReviews from '../components/GoogleReviews';
import { openWhatsApp, WhatsAppMessages } from '../utils/whatsapp';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const features = [
    {
      icon: Droplet,
      title: t('features.oil.title'),
      description: t('features.oil.description'),
    },
    {
      icon: Wrench,
      title: t('features.tech.title'),
      description: t('features.tech.description'),
    },
    {
      icon: ShieldCheck,
      title: t('features.genuine.title'),
      description: t('features.genuine.description'),
    },
    {
      icon: Car,
      title: t('features.network.title'),
      description: t('features.network.description'),
    },
  ];

  const services = [
    { name: t('services.oil'), icon: Droplet },
    { name: t('services.brake'), icon: Wrench },
    { name: t('services.ac'), icon: Battery },
    { name: t('services.tire'), icon: Settings },
  ];

  const testimonials = [
    {
      text: t('testimonials.1.text'),
      author: t('testimonials.1.author'),
      location: t('testimonials.1.location'),
    },
    {
      text: t('testimonials.2.text'),
      author: t('testimonials.2.author'),
      location: t('testimonials.2.location'),
    },
    {
      text: t('testimonials.3.text'),
      author: t('testimonials.3.author'),
      location: t('testimonials.3.location'),
    },
    {
      text: t('testimonials.4.text'),
      author: t('testimonials.4.author'),
      location: t('testimonials.4.location'),
    },
    {
      text: t('testimonials.5.text'),
      author: t('testimonials.5.author'),
      location: t('testimonials.5.location'),
    },
  ];

  return (
    <>
      <SEO />
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        <section className="relative bg-gray-900 text-white pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-gray-900/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('hero.title.line1')}<br />
                <span className="text-white">{t('hero.title.line2')}</span>
              </h1>
              <p className="text-xl text-white mb-8 leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-all text-lg font-semibold shadow-lg hover:shadow-red-600/50 transform hover:scale-105"
                >
                  <Wrench className="w-5 h-5" />
                  {t('hero.cta')}
                </Link>
              </div>
            </div>

            <div className="w-full">
              <div className="h-[300px] sm:h-[400px] lg:h-[500px] w-full">
                <HeroSlideshow />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-red-600 to-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8 text-white text-center">
            <div>
              <p className="text-4xl lg:text-5xl font-bold mb-2">700+</p>
              <p className="text-red-100 text-sm lg:text-base">{t('stats.stations')}</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold mb-2">6+</p>
              <p className="text-red-100 text-sm lg:text-base">{t('stats.countries')}</p>
            </div>
            <div className="col-span-2 md:col-span-1 order-first md:order-none">
              <LiveCarCounter />
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold mb-2">50+</p>
              <p className="text-red-100 text-sm lg:text-base">{t('stats.excellence')}</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold mb-2">6</p>
              <p className="text-red-100 text-sm lg:text-base">{t('stats.uae')}</p>
            </div>
          </div>
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
                onClick={() => openWhatsApp(WhatsAppMessages.serviceBooking, { source: 'Home Page - Book Service' })}
                className="flex items-center justify-center gap-2 bg-white text-red-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all text-lg font-semibold shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                {t('services.cta.book')}
              </button>
              <button
                onClick={() => openWhatsApp(WhatsAppMessages.carPickup, { source: 'Home Page - Car Pickup' })}
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
              {t('why.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('why.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-shadow border border-gray-100 ${isRTL ? 'text-right' : 'text-center'}`}
              >
                <div className={`bg-red-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${isRTL ? 'ml-auto' : 'mx-auto'}`}>
                  <feature.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('services.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-8 hover:shadow-lg transition-all border border-gray-200 hover:border-red-300 ${isRTL ? 'text-right' : 'text-center'}`}
              >
                <div className={`flex mb-4 ${isRTL ? 'justify-end' : 'justify-center'}`}>
                  <service.icon className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.name}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-all text-lg font-semibold shadow-lg"
            >
              {t('services.view')}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-4">
            <Carousel
              itemsPerView={{ base: 1, md: 2, lg: 3 }}
              autoPlay
              autoPlayInterval={6000}
              showArrows
              showDots
              gap={24}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow h-full ${isRTL ? 'text-right' : ''}`}
                >
                  <div className={`flex items-center gap-1 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-red-600" />
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-gray-600 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      <GoogleReviews />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('social.updates')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('social.updates.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <FacebookFeed />
            <InstagramFeed />
            <LinkedInFeed />
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
