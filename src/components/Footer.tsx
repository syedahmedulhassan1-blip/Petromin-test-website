import { Mail, Phone, MapPin, Clock, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

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
            <p className="text-gray-400 text-sm mb-6">
              Leading car care service provider in UAE, committed to excellence and customer satisfaction.
            </p>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold">700+</div>
                <div className="text-gray-400 text-sm">Stations</div>
              </div>
              <div>
                <div className="text-2xl font-bold">6+</div>
                <div className="text-gray-400 text-sm">Countries</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-gray-400 hover:text-white transition text-sm">
                  Offers
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="text-gray-400 hover:text-white transition text-sm">
                  Fleet Services
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-gray-400 hover:text-white transition text-sm">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm">
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Oil Change & Filter Replacement</li>
              <li>Brake Inspection</li>
              <li>AC & Battery Check</li>
              <li>Tire Rotation & Balancing</li>
              <li>Car Detailing</li>
              <li>Fleet Maintenance</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-red-600" />
                <span>Petromin Express UAE, Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-red-600" />
                <a href="tel:+971565012716" className="hover:text-white transition" dir="ltr">
                  +971 56 501 2716
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-red-600" />
                <a href="mailto:info@petrominexpress.ae" className="hover:text-white transition" dir="ltr">
                  info@petrominexpress.ae
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4 mt-1 flex-shrink-0 text-red-600" />
                <div>
                  <div>9am to 10pm</div>
                  <div>Everyday</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>&copy; 2026 Petromin Express UAE. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
