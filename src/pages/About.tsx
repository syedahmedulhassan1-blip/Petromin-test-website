import { Target, Eye, Award, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import FacilitySlideshow from '../components/FacilitySlideshow';

export default function About() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="pt-32" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('about.page.title')}
            </h1>
            <p className="text-xl text-red-100">
              {t('about.page.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={isRTL ? 'text-right' : ''}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('about.main.title')}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>{t('about.main.text1')}</p>
                <p>{t('about.main.text2')}</p>
                <p>{t('about.main.text3')}</p>
              </div>
            </div>

            <div className="relative h-[500px]">
              <FacilitySlideshow />
              <div className={`absolute -bottom-6 ${isRTL ? '-right-6' : '-left-6'} bg-red-600 text-white p-6 rounded-lg shadow-xl z-30`}>
                <p className="text-4xl font-bold mb-1">50+</p>
                <p className="text-sm">{t('about.legacy')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className={`bg-white rounded-xl p-10 shadow-lg border border-gray-100 ${isRTL ? 'text-right' : ''}`}>
              <div className={`bg-red-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${isRTL ? 'ml-auto' : ''}`}>
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.mission.title')}</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t('about.mission.text')}
              </p>
            </div>

            <div className={`bg-white rounded-xl p-10 shadow-lg border border-gray-100 ${isRTL ? 'text-right' : ''}`}>
              <div className={`bg-red-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${isRTL ? 'ml-auto' : ''}`}>
                <Eye className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.vision.title')}</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t('about.vision.text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('about.different.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('about.different.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={isRTL ? 'text-right' : 'text-center'}>
              <div className={`bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isRTL ? 'ml-auto' : 'mx-auto'}`}>
                <Award className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('about.quality.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.quality.text')}
              </p>
            </div>

            <div className={isRTL ? 'text-right' : 'text-center'}>
              <div className={`bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isRTL ? 'ml-auto' : 'mx-auto'}`}>
                <Globe className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('about.expertise.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.expertise.text')}
              </p>
            </div>

            <div className={isRTL ? 'text-right' : 'text-center'}>
              <div className={`bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isRTL ? 'ml-auto' : 'mx-auto'}`}>
                <Target className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('about.focus.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.focus.text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('about.special.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('about.warranty')}</h3>
              <p className="text-gray-600">{t('about.warranty.text')}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('about.parts')}</h3>
              <p className="text-gray-600">{t('about.parts.text')}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('about.technicians')}</h3>
              <p className="text-gray-600">{t('about.technicians.text')}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('about.oils')}</h3>
              <p className="text-gray-600">{t('about.oils.text')}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('about.lounge')}</h3>
              <p className="text-gray-600">{t('about.lounge.text')}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('about.history')}</h3>
              <p className="text-gray-600">{t('about.history.text')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
