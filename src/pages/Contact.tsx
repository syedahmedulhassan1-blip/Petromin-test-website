import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { openWhatsApp, WhatsAppMessages } from '../utils/whatsapp';
import { useLanguage } from '../contexts/LanguageContext';

export default function Contact() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="pt-32" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('contact.page.title')}
            </h1>
            <p className="text-xl text-gray-300">
              {t('contact.page.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className={`text-3xl font-bold text-gray-900 mb-8 ${isRTL ? 'text-right' : ''}`}>
                {t('contact.info.title')}
              </h2>

              <div className="space-y-6 mb-12">
                <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="bg-red-100 w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-red-600" />
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">
                      {t('contact.office.head')}
                    </h3>
                    <p className="text-gray-600">
                      {t('contact.office.jeddah1')}<br />
                      {t('contact.office.jeddah2')}
                    </p>
                    <p className="text-gray-600 mt-3">
                      <span className="font-medium">{t('contact.office.regional')}</span><br />
                      {t('contact.office.uae')}<br />
                      {t('contact.office.dubai')}
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="bg-red-100 w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-red-600" />
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">{t('contact.phone')}</h3>
                    <a
                      href="tel:+971565012716"
                      className="text-gray-600 hover:text-red-600 transition-colors"
                      dir="ltr"
                    >
                      +971 56 501 2716
                    </a>
                  </div>
                </div>

                <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="bg-red-100 w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-red-600" />
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">{t('contact.email')}</h3>
                    <a
                      href="mailto:info@petrominexpress.ae"
                      className="text-gray-600 hover:text-red-600 transition-colors"
                      dir="ltr"
                    >
                      info@petrominexpress.ae
                    </a>
                  </div>
                </div>

                <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="bg-red-100 w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-7 h-7 text-red-600" />
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">
                      {t('contact.hours')}
                    </h3>
                    <p className="text-gray-600">
                      {t('contact.hours.time')}<br />
                      {t('contact.hours.everyday')}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`bg-gray-50 rounded-xl p-8 ${isRTL ? 'text-right' : ''}`}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t('contact.team.title')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('contact.team.description')}
                </p>
                <p className="text-gray-700 font-semibold">
                  {t('contact.team.response')}
                </p>
              </div>
            </div>

            <div>
              <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-8 ${isRTL ? 'text-right' : ''}`}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {t('contact.form.title')}
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  {t('contact.form.subtitle')}
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => openWhatsApp(WhatsAppMessages.generalInquiry, { source: 'Contact Page - General Inquiry' })}
                    className={`w-full flex items-center gap-4 bg-green-600 text-white px-6 py-5 rounded-lg hover:bg-green-700 transition-all shadow-lg group ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-all">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div className={isRTL ? 'text-right flex-1' : 'text-left flex-1'}>
                      <p className="font-semibold text-lg">{t('contact.whatsapp.title')}</p>
                      <p className="text-sm text-green-100">{t('contact.whatsapp.subtitle')}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => openWhatsApp(WhatsAppMessages.serviceBooking, { source: 'Contact Page - Service Booking' })}
                    className={`w-full flex items-center gap-4 bg-red-600 text-white px-6 py-5 rounded-lg hover:bg-red-700 transition-all shadow-lg group ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-all">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className={isRTL ? 'text-right flex-1' : 'text-left flex-1'}>
                      <p className="font-semibold text-lg">{t('contact.booking.title')}</p>
                      <p className="text-sm text-red-100">{t('contact.booking.subtitle')}</p>
                    </div>
                  </button>

                  <a
                    href="tel:+971565012716"
                    className={`w-full flex items-center gap-4 bg-gray-900 text-white px-6 py-5 rounded-lg hover:bg-gray-800 transition-all shadow-lg group ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-all">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className={isRTL ? 'text-right flex-1' : 'text-left flex-1'}>
                      <p className="font-semibold text-lg">{t('contact.call.title')}</p>
                      <p dir="ltr" className={`text-sm text-gray-300 ${isRTL ? 'text-right' : ''}`}>{t('contact.phone.number')}</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@petrominexpress.ae"
                    className={`w-full flex items-center gap-4 bg-gray-100 text-gray-900 px-6 py-5 rounded-lg hover:bg-gray-200 transition-all border-2 border-gray-300 group ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="bg-gray-900 p-3 rounded-lg group-hover:bg-gray-800 transition-all">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className={isRTL ? 'text-right flex-1' : 'text-left flex-1'}>
                      <p className="font-semibold text-lg">{t('contact.email.title')}</p>
                      <p dir="ltr" className={`text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>{t('contact.email.address')}</p>
                    </div>
                  </a>
                </div>

                <div className={`mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 ${isRTL ? 'text-right' : ''}`}>
                  <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MessageCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">{t('contact.whatsapp.why.title')}</p>
                      <p className="text-sm text-gray-700">
                        {t('contact.whatsapp.why.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('contact.faq.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('contact.faq.subtitle')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <details className={`bg-white rounded-lg p-6 shadow-sm border border-gray-200 ${isRTL ? 'text-right' : ''}`}>
              <summary className="font-semibold text-gray-900 cursor-pointer">
                {t('contact.faq.q1')}
              </summary>
              <p className="mt-3 text-gray-600">
                {t('contact.faq.a1')}
              </p>
            </details>

            <details className={`bg-white rounded-lg p-6 shadow-sm border border-gray-200 ${isRTL ? 'text-right' : ''}`}>
              <summary className="font-semibold text-gray-900 cursor-pointer">
                {t('contact.faq.q2')}
              </summary>
              <p className="mt-3 text-gray-600">
                {t('contact.faq.a2')}
              </p>
            </details>

            <details className={`bg-white rounded-lg p-6 shadow-sm border border-gray-200 ${isRTL ? 'text-right' : ''}`}>
              <summary className="font-semibold text-gray-900 cursor-pointer">
                {t('contact.faq.q3')}
              </summary>
              <p className="mt-3 text-gray-600">
                {t('contact.faq.a3')}
              </p>
            </details>

            <details className={`bg-white rounded-lg p-6 shadow-sm border border-gray-200 ${isRTL ? 'text-right' : ''}`}>
              <summary className="font-semibold text-gray-900 cursor-pointer">
                {t('contact.faq.q4')}
              </summary>
              <p className="mt-3 text-gray-600">
                {t('contact.faq.a4')}
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
