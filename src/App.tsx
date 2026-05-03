import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import CookieConsent from './components/CookieConsent';

// Lazy load all page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Offers = lazy(() => import('./pages/Offers'));
const Fleet = lazy(() => import('./pages/Fleet'));
const Locations = lazy(() => import('./pages/Locations'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Subscribe = lazy(() => import('./pages/Subscribe'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const WhatsAppSettings = lazy(() => import('./pages/WhatsAppSettings'));
const WhatsAppCustomers = lazy(() => import('./pages/WhatsAppCustomers'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function SuperAdminRoute({ children }: { children: React.ReactNode }) {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user || userRole !== 'super_admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}


function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAuth();
  const isAdminPage = ['/whatsapp-settings', '/whatsapp-customers'].includes(location.pathname);
  const isAuthPage = ['/login', '/unauthorized'].includes(location.pathname);
  const showLayout = (!isAdminPage && !isAuthPage) || user;

  return (
    <div className="min-h-screen bg-white">
      {showLayout ? (
        <>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </>
      ) : (
        <main>{children}</main>
      )}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <ScrollToTop />
            <Layout>
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                  </div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/fleet" element={<Fleet />} />
                  <Route path="/locations" element={<Locations />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/subscribe" element={<Subscribe />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route
                    path="/analytics"
                    element={
                      <SuperAdminRoute>
                        <Analytics />
                      </SuperAdminRoute>
                    }
                  />
                  <Route
                    path="/whatsapp-settings"
                    element={
                      <SuperAdminRoute>
                        <WhatsAppSettings />
                      </SuperAdminRoute>
                    }
                  />
                  <Route
                    path="/whatsapp-customers"
                    element={
                      <SuperAdminRoute>
                        <WhatsAppCustomers />
                      </SuperAdminRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
            <CookieConsent />
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
