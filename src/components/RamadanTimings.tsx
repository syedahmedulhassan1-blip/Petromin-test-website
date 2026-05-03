import { useState, useEffect } from 'react';
import { Clock, Moon, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function RamadanTimings() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  // Ramadan 2026 begins at sunset on February 18, 2026 at 6:19 PM UAE time
  const ramadanStart = new Date('2026-02-18T18:19:00+04:00');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = ramadanStart.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stations = [
    {
      name: { en: 'SHARJAH', ar: 'الشارقة' },
      primary: '9:00 AM – 6:00 PM',
      evening: '8:00 PM – 12:00 AM'
    },
    {
      name: { en: 'AL-QUSAIS', ar: 'القصيص' },
      primary: '9:00 AM – 6:00 PM',
      evening: '8:00 PM – 11:00 PM'
    },
    {
      name: { en: 'UMM RAMOOL', ar: 'أم رمول' },
      primary: '9:00 AM – 6:00 PM',
      evening: '8:00 PM – 10:00 PM'
    },
    {
      name: { en: 'ABU DHABI', ar: 'أبوظبي' },
      primary: '9:00 AM – 6:00 PM',
      evening: '8:00 PM – 11:00 PM'
    },
    {
      name: { en: 'RAS AL KHAIMAH', ar: 'رأس الخيمة' },
      primary: '9:00 AM – 6:00 PM',
      evening: '8:00 PM – 11:00 PM'
    },
    {
      name: { en: 'AL QUOZ', ar: 'القوز' },
      primary: '9:00 AM – 6:00 PM',
      evening: '8:00 PM – 10:00 PM'
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #4a1a1a 0%, #2d0a0a 50%, #1a0505 100%)'
    }}>
      {/* Decorative Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-yellow-300 opacity-40 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Decorations */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-6 mb-6">
            <Moon
              className="w-16 h-16 text-yellow-400 opacity-80"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(250, 204, 21, 0.5))'
              }}
              fill="currentColor"
            />
            <h2
              className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                textShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
              }}
            >
              {t('ramadan.title')}
            </h2>
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full border-4 border-yellow-400 opacity-80"
                style={{
                  boxShadow: '0 0 20px rgba(250, 204, 21, 0.5)',
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)'
                }}
              >
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 opacity-60"></div>
              </div>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-amber-100 font-medium mb-2">
            {t('ramadan.subtitle')}
          </p>
          <p className="text-lg text-amber-200 opacity-90">
            {t('ramadan.description')}
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12 flex justify-center">
          <div className="bg-gradient-to-r from-amber-900/40 via-amber-800/40 to-amber-900/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-yellow-600/30 shadow-2xl w-full max-w-3xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 text-center">
                {t('ramadan.countdown')}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {[
                { value: timeLeft.days, label: t('ramadan.days') },
                { value: timeLeft.hours, label: t('ramadan.hours') },
                { value: timeLeft.minutes, label: t('ramadan.minutes') },
                { value: timeLeft.seconds, label: t('ramadan.seconds') }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-600 to-amber-700 rounded-xl p-4 sm:p-6 text-center shadow-lg transform hover:scale-105 transition-transform"
                  style={{
                    boxShadow: '0 10px 30px rgba(217, 119, 6, 0.3)'
                  }}
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-amber-100 font-medium uppercase tracking-wide">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timings Table */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-yellow-600/40">
          <div className="overflow-x-auto">
            <table className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}>
              <thead>
                <tr className="bg-gradient-to-r from-amber-800 to-yellow-700 text-white">
                  <th className="px-6 py-4 rounded-tl-xl rounded-tr-xl md:rounded-tr-none text-lg font-bold">
                    {t('ramadan.station')}
                  </th>
                  <th className="px-6 py-4 text-lg font-bold hidden md:table-cell">
                    {t('ramadan.primary')}
                  </th>
                  <th className="px-6 py-4 rounded-tr-xl text-lg font-bold hidden md:table-cell">
                    {t('ramadan.evening')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {stations.map((station, index) => (
                  <tr
                    key={index}
                    className={`border-b-2 border-amber-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-amber-50/50'
                    } hover:bg-yellow-100 transition-colors`}
                  >
                    <td className="px-6 py-4 font-bold text-gray-800">
                      {station.name[language]}
                      <div className="md:hidden mt-2 text-sm">
                        <div className="text-gray-600">
                          <span className="font-semibold">{t('ramadan.primary')}:</span> {station.primary}
                        </div>
                        <div className="text-gray-600 mt-1">
                          <span className="font-semibold">{t('ramadan.evening')}:</span> {station.evening}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 hidden md:table-cell">
                      {station.primary}
                    </td>
                    <td className="px-6 py-4 text-gray-700 hidden md:table-cell">
                      {station.evening}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Special Notes */}
          <div className="mt-8 space-y-4">
            <div className="bg-gradient-to-r from-red-100 to-red-50 border-l-4 border-red-600 p-4 rounded-r-lg">
              <p className="font-bold text-red-900 mb-1">
                {t('ramadan.friday')}
              </p>
              <p className="text-red-800 text-sm">
                {t('ramadan.fridayNote1')}
              </p>
              <p className="text-red-800 text-sm">
                {t('ramadan.fridayNote2')}
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-amber-50 border-l-4 border-yellow-600 p-4 rounded-r-lg">
              <p className="font-bold text-yellow-900">
                {t('ramadan.note')}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p className="text-amber-200 text-lg font-medium">
            {t('ramadan.footer')}
          </p>
        </div>
      </div>
    </section>
  );
}
