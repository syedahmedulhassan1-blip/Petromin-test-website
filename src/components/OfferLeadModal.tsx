import { X, Phone, User, Mail } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface OfferLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerTitle: string;
}

export default function OfferLeadModal({ isOpen, onClose, offerTitle }: OfferLeadModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Al Quoz, Dubai');
  const [subscribeToEmails, setSubscribeToEmails] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const locations = [
    { name: 'Al Quoz, Dubai', city: 'Dubai', lat: 25.1372, lng: 55.2355 },
    { name: 'Al Qusais, Dubai', city: 'Dubai', lat: 25.2854, lng: 55.3847 },
    { name: 'Umm Ramool, Dubai', city: 'Dubai', lat: 25.2344, lng: 55.3564 },
    { name: 'Sharjah', city: 'Sharjah', lat: 25.3317, lng: 55.3983 },
    { name: 'Musafah, Abu Dhabi', city: 'Abu Dhabi', lat: 24.3703, lng: 54.5047 },
    { name: 'Ras Al Khaimah', city: 'Ras Al Khaimah', lat: 25.7897, lng: 55.9433 },
  ];

  const validatePhone = (phoneNumber: string): boolean => {
    const phoneRegex = /^[+]?[\d\s\-()]+$/;
    return phoneNumber.length >= 7 && phoneRegex.test(phoneNumber);
  };

  const validateEmail = (emailAddress: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailAddress);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!phone.trim() || !validatePhone(phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    if (email.trim() && !validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    const whatsappMessage = encodeURIComponent(
      `Hello, I'm interested in the "${offerTitle}" offer. My name is ${name} and my phone number is ${phone}.`
    );
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const whatsappUrl = isMobile
      ? `https://wa.me/971565012716?text=${whatsappMessage}`
      : `https://web.whatsapp.com/send?phone=971565012716&text=${whatsappMessage}`;

    // Open WhatsApp immediately to avoid popup blockers
    if (isMobile) {
      window.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, '_blank');
    }

    // Track data in the background (fire and forget)
    supabase.from('offer_leads').insert({
      customer_name: name,
      customer_phone: phone,
      offer_title: offerTitle,
    }).then(({ error }) => {
      if (error) console.error('Error tracking offer lead:', error);
    });

    if (email.trim() && subscribeToEmails) {
      const selectedLocation = locations.find(loc => loc.name === location);
      supabase.from('email_subscribers').upsert({
        email: email.toLowerCase(),
        name: name,
        phone: phone,
        preferred_location: location,
        city: selectedLocation?.city || 'Dubai',
        subscribed: true,
      }, {
        onConflict: 'email',
        ignoreDuplicates: false
      }).then(({ error }) => {
        if (error) console.error('Error subscribing to emails:', error);
      });
    }

    setName('');
    setPhone('');
    setEmail('');
    setLocation('Al Quoz, Dubai');
    setSubscribeToEmails(true);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Claim Offer</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-red-50 p-3 rounded-lg mb-6">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Offer:</span> {offerTitle}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </div>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+971 56 501 2716"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500 mt-1">Include country code (e.g., +971)</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address (Optional)
              </div>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isSubmitting}
            />
          </div>

          {email.trim() && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nearest Branch Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled={isSubmitting}
                >
                  {locations.map((loc) => (
                    <option key={loc.name} value={loc.name}>
                      {loc.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Choose your nearest branch to receive location-specific weather updates
                </p>
              </div>
            </>
          )}

          {email.trim() && (
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 p-4 rounded-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={subscribeToEmails}
                  onChange={(e) => setSubscribeToEmails(e.target.checked)}
                  className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  disabled={isSubmitting}
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Receive daily car care tips & exclusive offers
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Get personalized greetings, weather-based car care tips, and special offers delivered to your inbox every morning.
                  </p>
                </div>
              </label>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-6">
            <p className="text-xs text-blue-700">
              We'll open WhatsApp so you can connect with us to confirm your offer.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Continue to WhatsApp'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
