import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist."
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-200">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
            </div>

            <h1 className="text-6xl sm:text-8xl font-bold text-gray-900 mb-4">404</h1>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-all text-lg font-semibold shadow-lg hover:shadow-red-600/50 transform hover:scale-105"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all text-lg font-semibold shadow-lg border-2 border-gray-200 hover:border-gray-300"
              >
                View Services
              </Link>
            </div>
          </div>

          <div className="mt-8 text-gray-600">
            <p className="text-sm">
              Need help? <Link to="/contact" className="text-red-600 hover:text-red-700 font-semibold underline">Contact us</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
