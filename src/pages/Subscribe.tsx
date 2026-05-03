import { Mail, Bell, Sun, Zap, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';

export default function Subscribe() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  
  // State management
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Al Quoz, Dubai');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const locations = [
    { name: 'Al Quoz, Dubai', city: 'Dubai' },
    { name: 'Al Qusais, Dubai', city: 'Dubai' },
    { name: 'Umm Ramool, Dubai', city: 'Dubai' },
    { name: 'Sharjah', city: 'Sharjah' },
    { name: 'Musafah, Abu Dhabi', city: 'Abu Dhabi' },
    { name: 'Ras Al Khaimah', city: 'Ras Al Khaimah' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const selectedLocation = locations.find(loc => loc.name === location);

    try {
      // The Database Connection
      const { error: dbError } = await supabase.from('email_subscribers').upsert({
        email: email.toLowerCase(),
        name: name,
        phone: phone || null,
        preferred_location: location,
        city: selectedLocation?.city || 'Dubai',
        subscribed: true,
      }, {
        onConflict: 'email'
      });

      if (dbError) throw dbError;

      // The Welcome Email Trigger
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      await fetch(`${supabaseUrl}/functions/v1/send-welcome-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase(),
          name: name,
          location: location,
        }),
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission failed:', err);
      setError(t('subscribe.form.error.submit'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('subscribe.success.title')}</h2>
            <p className="text-lg text-gray-600 mb-8">{t('subscribe.success.message')}</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors"
            >
              {t('subscribe.success.button')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Mail className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('subscribe.page.title')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('subscribe.page.subtitle')}</p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <Bell className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">{t('subscribe.feature1.title')}</h3>
            <p className="text-gray-600 text-sm mt-2">{t('subscribe.feature1.desc')}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <Sun className="w-10 h-10 text-orange-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">{t('subscribe.feature2.title')}</h3>
            <p className="text-gray-600 text-sm mt-2">{t('subscribe.feature2.desc')}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <Zap className="w-10 h-10 text-red-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">{t('subscribe.feature3.title')}</h3>
            <p className="text-gray-600 text-sm mt-2">{t('subscribe.feature3.desc')}</p>
          </div>
        </div>

        {/* The Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('subscribe.form.name')}</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('subscribe.form.email')}</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('subscribe.form.location')}</label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {locations.map(loc => <option key={loc.name} value={loc.name}>{loc.name}</option>)}
              </select>
            </div>
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-red-600 text-white rounded-lg font-bold text-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? t('subscribe.form.submitting') : t('subscribe.form.button')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
