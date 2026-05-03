import { Truck, Users, Clock, FileText, Shield, TrendingDown, CheckCircle, MapPin, BarChart, Leaf, Laptop, MessageCircle, Package, KeyRound, Building, Landmark, Car } from 'lucide-react';
import { openWhatsApp, WhatsAppMessages } from '../utils/whatsapp';
import { useLanguage } from '../contexts/LanguageContext';

export default function Fleet() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const topReasons = [
    {
      icon: Clock,
      titleKey: 'fleet.why.turnaround',
      descriptionKey: 'fleet.why.turnaround.desc',
    },
    {
      icon: Users,
      titleKey: 'fleet.why.certified',
      descriptionKey: 'fleet.why.certified.desc',
    },
    {
      icon: Shield,
      titleKey: 'fleet.why.parts',
      descriptionKey: 'fleet.why.parts.desc',
    },
    {
      icon: FileText,
      titleKey: 'fleet.why.pricing',
      descriptionKey: 'fleet.why.pricing.desc',
    },
    {
      icon: Laptop,
      titleKey: 'fleet.why.health',
      descriptionKey: 'fleet.why.health.desc',
    },
    {
      icon: MapPin,
      titleKey: 'fleet.why.locations',
      descriptionKey: 'fleet.why.locations.desc',
    },
    {
      icon: BarChart,
      titleKey: 'fleet.why.dashboard',
      descriptionKey: 'fleet.why.dashboard.desc',
    },
  ];

  const benefits = [
    {
      icon: TrendingDown,
      titleKey: 'fleet.benefit.volume',
      descriptionKey: 'fleet.benefit.volume.desc',
    },
    {
      icon: Users,
      titleKey: 'fleet.benefit.manager',
      descriptionKey: 'fleet.benefit.manager.desc',
    },
    {
      icon: Clock,
      titleKey: 'fleet.benefit.priority',
      descriptionKey: 'fleet.benefit.priority.desc',
    },
    {
      icon: FileText,
      titleKey: 'fleet.benefit.reports',
      descriptionKey: 'fleet.benefit.reports.desc',
    },
  ];

  const services = [
    {
      categoryKey: 'fleet.service.routine',
      itemKeys: [
        'fleet.service.routine.1',
        'fleet.service.routine.2',
        'fleet.service.routine.3',
        'fleet.service.routine.4',
        'fleet.service.routine.5',
        'fleet.service.routine.6',
        'fleet.service.routine.7',
      ],
    },
    {
      categoryKey: 'fleet.service.diagnostics',
      itemKeys: [
        'fleet.service.diagnostics.1',
        'fleet.service.diagnostics.2',
        'fleet.service.diagnostics.3',
        'fleet.service.diagnostics.4',
        'fleet.service.diagnostics.5',
        'fleet.service.diagnostics.6',
        'fleet.service.diagnostics.7',
      ],
    },
    {
      categoryKey: 'fleet.service.brake',
      itemKeys: [
        'fleet.service.brake.1',
        'fleet.service.brake.2',
        'fleet.service.brake.3',
        'fleet.service.brake.4',
        'fleet.service.brake.5',
        'fleet.service.brake.6',
        'fleet.service.brake.7',
      ],
    },
    {
      categoryKey: 'fleet.service.quick',
      itemKeys: [
        'fleet.service.quick.1',
        'fleet.service.quick.2',
        'fleet.service.quick.3',
        'fleet.service.quick.4',
      ],
    },
  ];

  const industries = [
    { nameKey: 'fleet.industry.logistics', icon: Truck },
    { nameKey: 'fleet.industry.ridehailing', icon: Car },
    { nameKey: 'fleet.industry.ecommerce', icon: Package },
    { nameKey: 'fleet.industry.rental', icon: KeyRound },
    { nameKey: 'fleet.industry.corporate', icon: Building },
    { nameKey: 'fleet.industry.government', icon: Landmark },
  ];

  return (
    <div className="pt-32" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('fleet.page.title')}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {t('fleet.page.subtitle')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-3xl font-bold text-red-500">6</p>
                <p className="text-sm text-gray-300">{t('fleet.stat.branches')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-500">50%+</p>
                <p className="text-sm text-gray-300">{t('fleet.stat.market')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-500">50+</p>
                <p className="text-sm text-gray-300">{t('fleet.stat.excellence')}</p>
              </div>
            </div>
            <button
              onClick={() => openWhatsApp(WhatsAppMessages.fleetQuote, { source: 'Fleet Page - Top CTA' })}
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-all text-lg font-semibold shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              {t('fleet.cta.quote')}
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {t('fleet.legacy.title')}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  {t('fleet.legacy.text1')}
                </p>
                <p>
                  {t('fleet.legacy.text2')}
                </p>
                <p>
                  {t('fleet.legacy.text3')}
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/11 copy.webp"
                alt="Fleet Vehicles"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('fleet.why.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('fleet.why.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topReasons.map((reason, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-all border border-gray-200 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <div className="bg-red-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <reason.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t(reason.titleKey)}
                </h3>
                <p className="text-gray-600 leading-relaxed">{t(reason.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('fleet.services.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('fleet.services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 hover:shadow-xl transition-all border border-gray-200 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <h3 className="text-xl font-bold text-red-600 mb-4">
                  {t(service.categoryKey)}
                </h3>
                <ul className="space-y-2">
                  {service.itemKeys.map((itemKey, idx) => (
                    <li key={idx} className={`flex items-start gap-2 text-sm text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>{t(itemKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('fleet.industries.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('fleet.industries.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 hover:shadow-lg transition-all border border-gray-200 ${isRTL ? 'text-right' : 'text-center'}`}
              >
                <div className={`flex mb-4 ${isRTL ? 'justify-end' : 'justify-center'}`}>
                  <industry.icon className="w-12 h-12 text-red-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900">{t(industry.nameKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('fleet.packages.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('fleet.packages.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-all border border-gray-200 text-center ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <div className="bg-red-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <benefit.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t(benefit.titleKey)}
                </h3>
                <p className="text-gray-600 leading-relaxed">{t(benefit.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('fleet.results.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('fleet.results.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <img
                src="/12 copy.webp"
                alt="Fleet Operations"
                className="rounded-xl shadow-2xl"
              />
            </div>
            <div>
              <div className={`bg-white rounded-xl p-8 border-l-4 border-red-600 shadow-lg mb-8 ${isRTL ? 'text-right border-l-0 border-r-4' : 'text-left'}`}>
                <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">
                  "{t('fleet.testimonial.quote')}"
                </p>
                <p className="font-bold text-gray-900 text-lg">{t('fleet.testimonial.author')}</p>
                <p className="text-gray-600">{t('fleet.testimonial.role')}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className={`bg-red-50 rounded-lg p-6 ${isRTL ? 'text-right' : 'text-center'}`}>
                  <p className="text-4xl font-bold text-red-600 mb-2">25%</p>
                  <p className="text-sm text-gray-700 font-semibold">{t('fleet.stat.uptime')}</p>
                </div>
                <div className={`bg-red-50 rounded-lg p-6 ${isRTL ? 'text-right' : 'text-center'}`}>
                  <p className="text-4xl font-bold text-red-600 mb-2">30min</p>
                  <p className="text-sm text-gray-700 font-semibold">{t('fleet.stat.turnaround')}</p>
                </div>
                <div className={`bg-red-50 rounded-lg p-6 ${isRTL ? 'text-right' : 'text-center'}`}>
                  <p className="text-4xl font-bold text-red-600 mb-2">50%</p>
                  <p className="text-sm text-gray-700 font-semibold">{t('fleet.stat.market')}</p>
                </div>
                <div className={`bg-red-50 rounded-lg p-6 ${isRTL ? 'text-right' : 'text-center'}`}>
                  <p className="text-4xl font-bold text-red-600 mb-2">6</p>
                  <p className="text-sm text-gray-700 font-semibold">{t('fleet.stat.locations')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('fleet.trusted.title')}
              </h3>
              <p className="text-gray-600">
                {t('fleet.trusted.subtitle')}
              </p>
            </div>
            <img
              src="/10 copy.webp"
              alt="Fleet Clients"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              {t('fleet.proposal.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              {t('fleet.proposal.subtitle')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm hover:bg-white/15 transition-all">
                <p className="text-4xl font-bold mb-2 text-red-400">700+</p>
                <p className="text-gray-300">{t('stats.stations')}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm hover:bg-white/15 transition-all">
                <p className="text-4xl font-bold mb-2 text-red-400">6+</p>
                <p className="text-gray-300">{t('stats.countries')}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm hover:bg-white/15 transition-all">
                <p className="text-4xl font-bold mb-2 text-red-400">50+</p>
                <p className="text-gray-300">{t('stats.excellence')}</p>
              </div>
            </div>

            <button
              onClick={() => openWhatsApp(WhatsAppMessages.fleetProposal, { source: 'Fleet Page - Bottom CTA' })}
              className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-10 py-5 rounded-lg hover:bg-green-700 transition-all text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              <span>{t('fleet.proposal.button')}</span>
            </button>
            <p className="text-gray-400 text-sm mt-4">{t('fleet.proposal.response')}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('fleet.sustainable.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('fleet.sustainable.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={`bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 hover:shadow-xl transition-all ${isRTL ? 'text-right' : ''}`}>
              <Leaf className={`w-12 h-12 text-green-600 mb-4 ${isRTL ? 'mr-auto' : ''}`} />
              <h3 className="font-bold text-gray-900 mb-3 text-lg">{t('fleet.sustainable.eco.title')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('fleet.sustainable.eco.desc')}</p>
            </div>
            <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 hover:shadow-xl transition-all ${isRTL ? 'text-right' : ''}`}>
              <Shield className={`w-12 h-12 text-blue-600 mb-4 ${isRTL ? 'mr-auto' : ''}`} />
              <h3 className="font-bold text-gray-900 mb-3 text-lg">{t('fleet.sustainable.safety.title')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('fleet.sustainable.safety.desc')}</p>
            </div>
            <div className={`bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-8 hover:shadow-xl transition-all ${isRTL ? 'text-right' : ''}`}>
              <FileText className={`w-12 h-12 text-yellow-600 mb-4 ${isRTL ? 'mr-auto' : ''}`} />
              <h3 className="font-bold text-gray-900 mb-3 text-lg">{t('fleet.sustainable.digital.title')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('fleet.sustainable.digital.desc')}</p>
            </div>
            <div className={`bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 hover:shadow-xl transition-all ${isRTL ? 'text-right' : ''}`}>
              <Users className={`w-12 h-12 text-red-600 mb-4 ${isRTL ? 'mr-auto' : ''}`} />
              <h3 className="font-bold text-gray-900 mb-3 text-lg">{t('fleet.sustainable.comfort.title')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('fleet.sustainable.comfort.desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
