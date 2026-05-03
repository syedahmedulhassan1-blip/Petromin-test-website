import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Petromin Express UAE. Learn how we collect, use, and protect your personal information."
      />
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: January 9, 2026</p>

            <div className="prose prose-lg max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700">
                  Petromin Express UAE ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Data We Collect</h2>
                <p className="text-gray-700 mb-3">We may collect, use, store and transfer different kinds of personal data about you:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Identity Data: name, username</li>
                  <li>Contact Data: email address, telephone numbers</li>
                  <li>Technical Data: IP address, browser type, device information</li>
                  <li>Usage Data: information about how you use our website</li>
                  <li>Marketing Data: your preferences in receiving marketing from us</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Data</h2>
                <p className="text-gray-700 mb-3">We use your data for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>To provide and maintain our services</li>
                  <li>To respond to your inquiries and support requests</li>
                  <li>To send you service notifications and updates</li>
                  <li>To improve our website and services</li>
                  <li>To send promotional communications (with your consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                <p className="text-gray-700">
                  We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
                <p className="text-gray-700 mb-3">Under data protection laws, you have rights including:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>The right to access your personal data</li>
                  <li>The right to request correction of your personal data</li>
                  <li>The right to request erasure of your personal data</li>
                  <li>The right to object to processing of your personal data</li>
                  <li>The right to request restriction of processing your personal data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies</h2>
                <p className="text-gray-700">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Links</h2>
                <p className="text-gray-700">
                  Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
                <p className="text-gray-700">
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700"><strong>Email:</strong> info@petrominexpress.ae</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +971 56 501 2716</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
