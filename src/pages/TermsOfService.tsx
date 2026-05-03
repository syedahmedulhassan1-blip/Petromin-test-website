import SEO from '../components/SEO';

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms of Service for Petromin Express UAE. Read our terms and conditions for using our services."
      />
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: January 9, 2026</p>

            <div className="prose prose-lg max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-700">
                  By accessing and using Petromin Express UAE services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these Terms of Service, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Services Provided</h2>
                <p className="text-gray-700 mb-3">Petromin Express UAE provides automotive maintenance and repair services including but not limited to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Oil change and filter replacement</li>
                  <li>Brake inspection and repair</li>
                  <li>Air conditioning services</li>
                  <li>Battery replacement and testing</li>
                  <li>Tire services</li>
                  <li>Vehicle diagnostics</li>
                  <li>Fleet maintenance solutions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Service Standards</h2>
                <p className="text-gray-700">
                  We strive to provide high-quality services using genuine parts and certified technicians. All services are performed in accordance with manufacturer specifications and industry standards. Service times may vary depending on vehicle condition and service requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Pricing and Payment</h2>
                <p className="text-gray-700">
                  Prices are subject to change without notice. Payment is due upon completion of services unless otherwise arranged. We accept various payment methods including cash, credit cards, and approved payment plans. Additional charges may apply for premium services or parts.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Warranty</h2>
                <p className="text-gray-700">
                  We provide warranty coverage on our services and parts as specified at the time of service. Warranty terms vary by service type and are subject to normal vehicle usage conditions. Warranty does not cover damage resulting from accidents, misuse, or unauthorized modifications.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-700">
                  Petromin Express UAE shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our liability is limited to the cost of the specific service provided.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Customer Responsibilities</h2>
                <p className="text-gray-700 mb-3">As a customer, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide accurate information about your vehicle and its condition</li>
                  <li>Disclose any known issues or previous repairs</li>
                  <li>Follow recommended maintenance schedules</li>
                  <li>Collect your vehicle within agreed timeframes</li>
                  <li>Make timely payments for services rendered</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cancellation Policy</h2>
                <p className="text-gray-700">
                  Appointments can be cancelled or rescheduled with at least 24 hours notice. Late cancellations or no-shows may be subject to cancellation fees. For urgent situations, please contact us as soon as possible.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Intellectual Property</h2>
                <p className="text-gray-700">
                  All content on our website, including text, graphics, logos, and images, is the property of Petromin Express UAE and protected by copyright laws. Unauthorized use is prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
                <p className="text-gray-700">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
                <p className="text-gray-700">
                  These Terms of Service shall be governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of the UAE.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
                <p className="text-gray-700">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700"><strong>Email:</strong> info@petrominexpress.ae</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +971 56 501 2716</p>
                  <p className="text-gray-700"><strong>Hours:</strong> 9:00 AM - 10:00 PM, Daily</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
