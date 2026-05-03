import { X, Phone, User, Mail, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface WhatsAppLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerTitle: string;
  offerSubtitle: string;
  whatsappMessage: string;
  whatsappNumber: string;
}

export default function WhatsAppLeadModal({
  isOpen,
  onClose,
  offerTitle,
  offerSubtitle,
  whatsappMessage,
  whatsappNumber,
}: WhatsAppLeadModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validatePhone = (phoneNumber: string): boolean => {
    const phoneRegex = /^[+]?[\d\s\-()]+$/;
    return phoneNumber.length >= 7 && phoneRegex.test(phoneNumber);
  };

  const validateEmail = (emailAddress: string): boolean => {
    if (!emailAddress) return true;
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

    if (email && !validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const whatsappUrl = isMobile
      ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // Open WhatsApp immediately to avoid popup blockers
    if (isMobile) {
      window.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, '_blank');
    }

    // Track data in the background (fire and forget)
    supabase.from('whatsapp_leads').insert({
      offer_title: offerTitle,
      offer_subtitle: offerSubtitle,
      customer_name: name.trim(),
      customer_phone: phone.trim(),
      customer_email: email.trim() || null,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    }).then(({ error }) => {
      if (error) console.error('Error tracking WhatsApp lead:', error);
    });

    setName('');
    setPhone('');
    setEmail('');
    setIsSubmitting(false);
    onClose();
  };

  const handleClose = () => {
    setName('');
    setPhone('');
    setEmail('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Contact Us on WhatsApp</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <p className="text-sm font-semibold text-gray-900 mb-1">{offerTitle}</p>
            <p className="text-xs text-gray-600">{offerSubtitle}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </div>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number *
              </div>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+971 50 123 4567"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isSubmitting}
              required
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <MessageCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="text-sm text-green-800">
                Your information will be saved and we'll open WhatsApp so you can chat with us directly about this offer.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <MessageCircle className="w-4 h-4" />
              {isSubmitting ? 'Opening...' : 'Continue to WhatsApp'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
