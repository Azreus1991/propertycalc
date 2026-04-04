import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — PropertyCalc",
  description:
    "PropertyCalc terms of service. Read the terms and conditions for using our real estate platform.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-hero-gradient py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-navy-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Terms of Service</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Terms of <span className="text-gradient">Service</span>
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
              <h2 className="text-xl font-bold text-navy-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-navy-500 leading-relaxed">
                By accessing or using PropertyCalc, you agree to be bound by these Terms of Service.
                If you do not agree to these terms, do not use the platform. We reserve the right to
                modify these terms at any time, and continued use constitutes acceptance.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">2. Description of Service</h2>
              <p className="text-navy-500 leading-relaxed">
                PropertyCalc provides real estate calculators, deal sourcing tools, an underwriting
                engine, deal routing, a services marketplace, and related tools. Free features are
                available without an account. Some features require registration and may require a
                paid subscription (Pro or Business tier).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">3. Calculator Disclaimer</h2>
              <p className="text-navy-500 leading-relaxed">
                All calculator results are estimates only and should not be relied upon as financial,
                legal, or professional advice. PropertyCalc is not a licensed financial advisor,
                appraiser, or legal professional. Always consult qualified professionals before
                making major financial decisions related to real estate.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">4. User Accounts</h2>
              <p className="text-navy-500 leading-relaxed">
                You are responsible for maintaining the security of your account credentials.
                You must provide accurate information when creating an account. You may not use
                the platform for fraudulent purposes or misrepresent your identity, qualifications,
                or the properties and deals you submit.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">5. Deal Submissions</h2>
              <p className="text-navy-500 leading-relaxed">
                When you submit a deal to the platform, you represent that the information provided
                is accurate to the best of your knowledge. PropertyCalc&apos;s underwriting engine
                provides automated analysis but does not guarantee the accuracy or viability of any
                deal. All parties are responsible for their own due diligence.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">6. Services Marketplace</h2>
              <p className="text-navy-500 leading-relaxed">
                PropertyCalc connects service providers with property owners and investors but is
                not a party to any agreement between them. We do not guarantee the quality, safety,
                or legality of services offered. Service providers are independent contractors, not
                employees of PropertyCalc.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">7. Paid Subscriptions</h2>
              <p className="text-navy-500 leading-relaxed">
                Pro and Business subscriptions are billed monthly or annually as selected. You may
                cancel at any time from your account settings. Cancellation takes effect at the end
                of the current billing period. Refunds are handled on a case-by-case basis.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">8. Intellectual Property</h2>
              <p className="text-navy-500 leading-relaxed">
                All content, design, code, and branding on PropertyCalc is owned by PropertyCalc
                or its licensors. You may not copy, reproduce, or redistribute any part of the
                platform without written permission. User-submitted content remains the property
                of the user, but you grant PropertyCalc a license to display and use it within
                the platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">9. Limitation of Liability</h2>
              <p className="text-navy-500 leading-relaxed">
                PropertyCalc is provided &quot;as is&quot; without warranties of any kind. We are
                not liable for any damages arising from your use of the platform, including but not
                limited to financial losses from reliance on calculator results, deal underwriting,
                or service provider recommendations. Use the platform at your own risk.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">10. Termination</h2>
              <p className="text-navy-500 leading-relaxed">
                We reserve the right to suspend or terminate accounts that violate these terms,
                engage in fraudulent activity, or misuse the platform. You may delete your account
                at any time through your settings or by contacting support.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">11. Contact</h2>
              <p className="text-navy-500 leading-relaxed">
                For questions about these terms, contact us through our{" "}
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
