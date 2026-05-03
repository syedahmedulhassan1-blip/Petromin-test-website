import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <p className="flex-1 text-sm">
          We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={accept}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition text-sm font-semibold"
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition text-sm font-semibold"
          >
            Decline
          </button>
          <button
            onClick={decline}
            className="text-gray-400 hover:text-white transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
