import { Tag, CheckCircle, Sparkles, MessageCircle, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';
import { useLanguage } from '../contexts/LanguageContext';
import { logger } from '../utils/logger';
import Carousel from '../components/Carousel';

export default function Offers() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const [phoneNumbers, setPhoneNumbers] = useState<{ [key: number]: string }>({});

  const handlePhoneChange = (index: number, value: string) => {
    setPhoneNumbers({ ...phoneNumbers, [index]: value });
  };

  const trackAndOpenWhatsApp = async (
    offerTitle: string,
    offerSubtitle: string,
    message: string,
    offerIndex: number
  ) => {
    const phoneNumber = phoneNumbers[offerIndex]?.trim();

    const encodedMessage = encodeURIComponent(message);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const whatsappUrl = isMobile
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;

    try {
      const { data, error } = await supabase.from('whatsapp_leads').insert({
        offer_title: offerTitle,
        offer_subtitle: offerSubtitle,
        customer_phone: phoneNumber || null,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
      });

      if (error) {
        logger.error('Error tracking lead:', error);
      }
    } catch (error) {
      logger.error('Exception tracking lead', error instanceof Error ? error : new Error(String(error)));
    }

    if (isMobile) {
      window.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  const offers = [
    {
      titleKey: 'offers.tyre.title',
      subtitleKey: 'offers.tyre.subtitle',
      priceKey: 'offers.tyre.price',
      discountKey: 'offers.tyre.discount',
      image: '/files_7237304-1768045800598-offer1.webp',
      featureKeys: [
        'offers.tyre.feature1',
        'offers.tyre.feature2',
        'offers.tyre.feature3',
        'offers.tyre.feature4',
      ],
      whatsappMessage: "Hello! I'm interested in the *DSF Stock Clearance Sale* - Buy 4 Tyres & Get FREE Oil Change + Filter offer.",
      popular: true,
      popularKey: 'offers.tyre.popular',
    },
    {
      titleKey: 'offers.battery.title',
      subtitleKey: 'offers.battery.subtitle',
      priceKey: 'offers.battery.price',
      discountKey: 'offers.battery.discount',
      image: '/files_7237304-1768045800435-offer2.webp',
      featureKeys: [
        'offers.battery.feature1',
        'offers.battery.feature2',
        'offers.battery.feature3',
        'offers.battery.feature4',
      ],
      whatsappMessage: "Hello! I'm interested in the *Battery Diagnosis & Replacement Service*.",
      popular: false,
    },
    {
      titleKey: 'offers.oil.title',
      subtitleKey: 'offers.oil.subtitle',
      priceKey: 'offers.oil.price',
      discountKey: 'offers.oil.discount',
      image: '/files_7237304-1768045800600-offer3.webp',
      featureKeys: [
        'offers.oil.feature1',
        'offers.oil.feature2',
        'offers.oil.feature3',
        'offers.oil.feature4',
      ],
      whatsappMessage: "Hello! I'm interested in the *Multi-Brand Oil Change Offer* starting from 199 AED.",
      popular: false,
    },
  ];

  return (
    <div className={`pt-32 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className={`inline-flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Tag className="w-8 h-8" />
            <span className="text-xl font-semibold">{t('offers.page.heading')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">{t('offers.page.title')}</h1>
          <p className="text-xl text-red-100 max-w-2xl">{t('offers.page.subtitle')}</p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('offers.current.title')}</h2>
            <p className="text-xl text-gray-600">{t('offers.current.subtitle')}</p>
          </div>

          <Carousel
            itemsPerView={{ base: 1, md: 2, lg: 3 }}
            autoPlay
            autoPlayInterval={7000}
            showArrows
            showDots
            gap={32}
          >
            {offers.map((offer, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl overflow-hidden shadow-lg border-2 ${
                  offer.popular ? 'border-red-500' : 'border-gray-200'
                } hover:shadow-xl transition-all relative h-full flex flex-col`}
              >
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <img src={offer.image} alt={t(offer.titleKey)} className="w-full h-full object-cover" />
                </div>

                <div className={`p-6 flex-1 flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="mb-6">
                    <div className={`flex items-center gap-2 mb-3 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">{t(offer.discountKey)}</span>
                      {offer.popular && offer.popularKey && (
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> {t(offer.popularKey)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{t(offer.titleKey)}</h3>
                    <p className="text-sm text-gray-600 mb-3">{t(offer.subtitleKey)}</p>
                    <span className="text-2xl font-bold text-red-600">{t(offer.priceKey)}</span>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {offer.featureKeys.map((featureKey, idx) => (
                      <li key={idx} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3 mt-auto">
                    <div className="relative">
                      <Phone className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
                      <input
                        type="tel"
                        value={phoneNumbers[index] || ''}
                        onChange={(e) => handlePhoneChange(index, e.target.value)}
                        placeholder={t('offers.phone.placeholder')}
                        className={`w-full py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-sm ${isRTL ? 'pr-10 text-right' : 'pl-10'}`}
                      />
                    </div>
                    <button
                      onClick={() => trackAndOpenWhatsApp(t(offer.titleKey), t(offer.subtitleKey), offer.whatsappMessage, index)}
                      className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" /> {t('offers.claim')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* CENTERED SUBSCRIBE CTA SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <Mail className="absolute -bottom-10 -right-10 w-64 h-64 text-white opacity-5" />
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative z-10">
              {t('offers.newsletter.title')}
            </h2>
            <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto relative z-10">
              {t('offers.newsletter.subtitle')}
            </p>
            
            <div className="flex justify-center relative z-10">
              <button 
                onClick={() => window.location.href = '/subscribe'}
                className="bg-red-600 text-white px-12 py-4 rounded-lg hover:bg-red-700 transition-all font-bold text-lg shadow-lg hover:scale-105 active:scale-95"
              >
                {t('offers.newsletter.button')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('offers.terms.title')}</h2>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <ul className="space-y-3 text-gray-700">
              {[1, 2, 3, 4, 5].map((num) => (
                <li key={num} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <span className="text-red-600 font-bold">•</span>
                  <span>{t(`offers.terms.${num}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
