// ============================================================================
// Footer — public component
// ----------------------------------------------------------------------------
// Reads bilingual content from Supabase `site_settings` (managed via /analytics
// CMS Settings tab). Falls back to translation keys if a setting isn't yet
// populated in the database.
// ============================================================================

import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchSiteSettings, type SiteSetting } from '../lib/cms';

export default function Footer() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const [settings, setSettings] = useState<Record<string, SiteSetting>>({});

  useEffect(() => {
    fetchSiteSettings().then(setSettings).catch(() => setSettings({}));
  }, []);

  // Helper: read a CMS setting by key, with fallback to a translation key,
  // picking the right language column.
  const get = (key: string, fallbackTranslationKey: string): string => {
    const s = settings[key];
    if (s) {
      const v = isRTL ? s.value_ar : s.value_en;
      if (v && v.trim()) return v;
    }
    return t(fallbackTranslationKey);
  };

  const aboutText  = get('footer.about.text',     'footer.about.text');
  const address    = get('footer.address',        'footer.address');
  const phone      = get('footer.phone',          'footer.phone');         // optional fallback key
  const email      = get('footer.email',          'footer.email');
  const hoursRange = get('footer.hours.range',    'footer.hours.range');
  const hoursDays  = get('footer.hours.days',     'footer.hours.days');
  const stations   = settings['footer.stations.count']?.value_en  ?? '700+';
  const countries  = settings['footer.countries.count']?.value_en ?? '6+';

  return (
    <footer className="bg-gray-900 text-white py-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <img
              src={language === 'en' ? '/english_logo.png' : '/arabic_logo.png'}
              alt="Petromin Express UAE"
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm mb-6">{aboutText}</p>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold">{stations}</div>
                <div className="text-gray-400 text-sm">{t('footer.stations')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{countries}</div>
                <div className="text-gray-400 text-sm">{t('footer.countries')}</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quick.title')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition text-sm">{t('nav.home')}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition text-sm">{t('nav.about')}</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition text-sm">{t('nav.services')}</Link></li>
              <li><Link to="/offers" className="text-gray-400 hover:text-white transition text-sm">{t('nav.offers')}</Link></li>
              <li><Link to="/fleet" className="text-gray-400 hover:text-white transition text-sm">{t('nav.fleet')}</Link></li>
              <li><Link to="/locations" className="text-gray-400 hover:text-white transition text-sm">{t('nav.locations')}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition text-sm">{t('nav.contact')}</Link></li>
              <li>
                <Link to="/analytics" className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm">
                  <BarChart3 className="w-4 h-4" />
                  {t('nav.analytics')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.services.title')}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>{t('services.oil')}</li>
              <li>{t('services.brake')}</li>
              <li>{t('services.ac')}</li>
              <li>{t('services.tire')}</li>
              <li>{t('footer.service.detailing')}</li>
              <li>{t('footer.service.fleet')}</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact.title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-red-600" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-red-600" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white transition" dir="ltr">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-red-600" />
                <a href={`mailto:${email}`} className="hover:text-white transition" dir="ltr">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4 mt-1 flex-shrink-0 text-red-600" />
                <div>
                  <div>{hoursRange}</div>
                  <div>{hoursDays}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>{t('footer.copyright')} {t('footer.rights')}</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms-of-service" className="hover:text-white transition">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
