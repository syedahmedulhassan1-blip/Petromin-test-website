import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <ShieldOff className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
