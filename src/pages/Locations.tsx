import { MapPin, Phone, Clock, Navigation, Zap, Target, UserCheck, CreditCard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Locations() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const locations = [
    {
      city: 'Petromin Express - Al Quoz',
      address: 'Al Quoz, Dubai',
      phone: '+971 56 526 4592',
      hours: '9am to 10pm',
      mapUrl: 'https://maps.app.goo.gl/1P63XdFPxKQiUJMu9',
    },
    {
      city: 'Petromin Express - Al Qusais',
      address: 'Al Qusais, Dubai',
      phone: '+971 56 447 5932',
      hours: '9am to 10pm',
      mapUrl: 'https://maps.app.goo.gl/ZCkpBBzx3UdaVG6X8',
    },
    {
      city: 'Petromin Express - Sharjah',
      address: 'Sharjah',
      phone: '+971 56 118 2918',
      hours: '9am to 10pm',
      mapUrl: 'https://maps.app.goo.gl/9d6t7ogNNGz5fgsJA',
    },
    {
      city: 'Petromin Express - Ras Al Khaimah',
      address: 'Ras Al Khaimah',
      phone: '+971 50 210 3055',
      hours: '9am to 10pm',
      mapUrl: 'https://maps.app.goo.gl/yku4bgewKRYXJKQt9',
    },
    {
      city: 'Petromin Express - Musafah',
      address: 'Musafah, Abu Dhabi',
      phone: '+971 50 909 3125',
      hours: '9am to 10pm',
      mapUrl: 'https://maps.app.goo.gl/z71fJgWZbHw1N7AD8',
    },
    {
      city: 'Petromin Express - Umm Ramool',
      address: 'Umm Ramool, Dubai',
      phone: '+971 56 603 0853',
      hours: '9am to 10pm',
      mapUrl: 'https://maps.app.goo.gl/7FEK2fSqQdrhUxTK9',
    },
  ];

  return (
    <div className="pt-32" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('locations.page.title')}
            </h1>
            <p className="text-xl text-red-100">
              {t('locations.page.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('locations.our.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('locations.our.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {locations.map((location, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              >
                <div className={`bg-gradient-to-r from-red-600 to-red-700 p-6 ${isRTL ? 'text-right' : ''}`}>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {location.city}
                  </h3>
                  <p className="text-red-100">{location.address}</p>
                </div>

                <div className={`p-6 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{t('locations.address')}</p>
                      <p className="text-gray-600">{location.address}</p>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Phone className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{t('locations.phone')}</p>
                      <a
                        href={`tel:${location.phone}`}
                        dir="ltr"
                        className={`text-gray-600 hover:text-red-600 block ${isRTL ? 'text-right' : 'text-left'}`}
                      >
                        {location.phone}
                      </a>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Clock className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{t('locations.hours')}</p>
                      <p dir="ltr" className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{location.hours}</p>
                      <p className="text-sm text-gray-500">{t('locations.everyday')}</p>
                    </div>
                  </div>

                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all font-semibold mt-6"
                  >
                    <Navigation className="w-5 h-5" />
                    {t('locations.view.map')}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('locations.coverage.title')}
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              {t('locations.coverage.subtitle')}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <p className="text-gray-900 font-semibold">{t('locations.coverage.dubai')}</p>
                <p className="text-sm text-gray-600">3 {t('locations.coverage.locations')}</p>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <p className="text-gray-900 font-semibold">{t('locations.coverage.sharjah')}</p>
                <p className="text-sm text-gray-600">1 {t('locations.coverage.location')}</p>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <p className="text-gray-900 font-semibold">{t('locations.coverage.abudhabi')}</p>
                <p className="text-sm text-gray-600">1 {t('locations.coverage.location')}</p>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <p className="text-gray-900 font-semibold">{t('locations.coverage.rak')}</p>
                <p className="text-sm text-gray-600">1 {t('locations.coverage.location')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className={isRTL ? 'text-right' : ''}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('locations.why.title')}
              </h2>
              <div className="space-y-4">
                <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('locations.why.fast')}</h4>
                    <p className="text-gray-600">
                      {t('locations.why.fast.desc')}
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('locations.why.appointment')}</h4>
                    <p className="text-gray-600">
                      {t('locations.why.appointment.desc')}
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('locations.why.expert')}</h4>
                    <p className="text-gray-600">
                      {t('locations.why.expert.desc')}
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('locations.why.payment')}</h4>
                    <p className="text-gray-600">
                      {t('locations.why.payment.desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`bg-white rounded-xl p-8 shadow-lg ${isRTL ? 'text-right' : ''}`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t('locations.help.title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('locations.help.subtitle')}
              </p>

              <div className="space-y-4">
                <div className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone className="w-6 h-6 text-red-600" />
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <p className="text-sm text-gray-600">{t('locations.help.call')}</p>
                    <a
                      href="tel:+971507264698"
                      dir="ltr"
                      className={`text-lg font-semibold text-gray-900 hover:text-red-600 block ${isRTL ? 'text-right' : 'text-left'}`}
                    >
                      {t('contact.phone.number')}
                    </a>
                  </div>
                </div>

                <div className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Clock className="w-6 h-6 text-red-600" />
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <p className="text-sm text-gray-600">{t('locations.help.hours')}</p>
                    <p dir="ltr" className={`text-lg font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t('contact.hours.time')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
