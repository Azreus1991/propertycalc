import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — PropertyCalc",
  description:
    "PropertyCalc privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-hero-gradient py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-navy-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Privacy Policy</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-lg text-navy-200 max-w-2xl mx-auto">
            Last updated: April 2026
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose-style space-y-8">
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">1. Information We Collect</h2>
              <p className="text-navy-500 leading-relaxed">
                When you create an account, we collect your name, email address, and the role you
                select (e.g., investor, bird-dog, vendor). When you use our calculators and tools,
                we may collect the data you input to provide results. We also collect standard
                usage data such as pages visited, browser type, and device information through
                cookies and similar technologies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">2. How We Use Your Information</h2>
              <p className="text-navy-500 leading-relaxed">
                We use your information to provide and improve our services, including delivering
                calculator results, matching deals to investors, routing service requests, and
                personalizing your dashboard. We may also use your email to send platform updates,
                but you can opt out at any time.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">3. Data Sharing</h2>
              <p className="text-navy-500 leading-relaxed">
                We do not sell your personal information. We may share data with service providers
                who help us operate the platform (e.g., hosting, email delivery, payment processing).
                Deal and service information may be shared between platform users as part of the
                deal routing and services marketplace functionality you opt into.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">4. Data Security</h2>
              <p className="text-navy-500 leading-relaxed">
                We use industry-standard security measures to protect your data, including encrypted
                connections (TLS/SSL), secure authentication through Supabase, and role-based access
                controls. However, no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">5. Cookies</h2>
              <p className="text-navy-500 leading-relaxed">
                We use essential cookies to maintain your login session and preferences. We may use
                analytics cookies to understand how the platform is used. You can control cookie
                settings through your browser.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">6. Your Rights</h2>
              <p className="text-navy-500 leading-relaxed">
                You can access, update, or delete your account information at any time through your
                dashboard settings. If you wish to have all your data removed, contact us through
                our support center and we will process your request.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">7. Third-Party Services</h2>
              <p className="text-navy-500 leading-relaxed">
                PropertyCalc uses third-party services including Supabase (database and authentication),
                Vercel (hosting), and potentially payment processors for Pro subscriptions. Each of
                these services has their own privacy policies governing their handling of your data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">8. Changes to This Policy</h2>
              <p className="text-navy-500 leading-relaxed">
                We may update this privacy policy from time to time. We will notify registered users
                of material changes via email. Continued use of the platform after changes constitutes
                acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">9. Contact Us</h2>
              <p className="text-navy-500 leading-relaxed">
                If you have questions about this privacy policy or how we handle your data, please
                reach out through our{" "}
                <Link href="/support" className="text-brand-600 hover:text-brand-700 font-medium">
                  Support Center
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
