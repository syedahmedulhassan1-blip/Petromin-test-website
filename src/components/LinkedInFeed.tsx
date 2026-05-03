export default function LinkedInFeed() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
      <div className="flex items-center justify-center gap-3 mb-4">
        <svg className="w-10 h-10 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <h3 className="text-2xl font-bold text-gray-900">LinkedIn</h3>
      </div>

      <p className="text-gray-600 text-center mb-6 leading-relaxed">
        Connect with us on LinkedIn for company updates, career opportunities, and industry insights.
      </p>

      <a
        href="https://www.linkedin.com/company/petromin-express-uae/"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-blue-700 hover:bg-blue-800 text-white text-center font-semibold py-4 rounded-lg transition-all transform hover:scale-105 shadow-md mb-6"
      >
        Follow on LinkedIn
      </a>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-700">4K+</p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-700">100+</p>
            <p className="text-sm text-gray-600">Posts</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-700">6</p>
            <p className="text-sm text-gray-600">Locations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
