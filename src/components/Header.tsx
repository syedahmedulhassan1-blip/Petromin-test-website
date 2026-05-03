import { MapPin, Menu, X, Languages } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const isRTL = language === 'ar';

  const navigation = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.offers'), path: '/offers' },
    { name: t('nav.fleet'), path: '/fleet' },
    { name: t('nav.subscribe'), path: '/subscribe' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0">
            <img
              src={language === 'en' ? '/english_logo.png' : '/arabic_logo.png'}
              alt="Petromin Express"
              className="h-10 w-auto"
            />
          </Link>

          <div className={`hidden lg:flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} space-x-8`}>
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-red-600 border-b-2 border-red-600 pb-1'
                      : 'text-gray-700 hover:text-red-600'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-red-600 hover:text-red-600 transition-colors text-sm font-medium"
              aria-label="Toggle Language"
            >
              <Languages className="w-4 h-4" />
              {language === 'en' ? 'العربية' : 'English'}
            </button>
            <Link
              to="/locations"
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              {t('nav.locations')}
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-red-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-left px-4 py-3 text-sm font-medium ${
                    isActive
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <button
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-red-600 hover:text-red-600 transition-colors"
            >
              <Languages className="w-4 h-4" />
              {language === 'en' ? 'العربية' : 'English'}
            </button>
            <Link
              to="/locations"
              onClick={() => setIsMenuOpen(false)}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              {t('nav.locations')}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
