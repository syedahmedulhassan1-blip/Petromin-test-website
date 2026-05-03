import { useAuth } from '../contexts/AuthContext';

export default function WhatsAppSettings() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">WhatsApp Settings</h1>
          <button
            onClick={signOut}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-8">
          <p className="text-gray-600">WhatsApp settings coming soon...</p>
        </div>
      </div>
    </div>
  );
}
