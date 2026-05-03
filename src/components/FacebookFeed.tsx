export default function FacebookFeed() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
      <div className="flex items-center justify-center gap-3 mb-4">
        <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <h3 className="text-2xl font-bold text-gray-900">Facebook</h3>
      </div>

      <p className="text-gray-600 text-center mb-6 leading-relaxed">
        Like our Facebook page for daily updates, service tips, and special promotions for our customers.
      </p>

      <a
        href="https://www.facebook.com/petrominexpressuae/"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-4 rounded-lg transition-all transform hover:scale-105 shadow-md mb-6"
      >
        Like on Facebook
      </a>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">12K+</p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">500+</p>
            <p className="text-sm text-gray-600">Posts</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">4.8★</p>
            <p className="text-sm text-gray-600">Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}
