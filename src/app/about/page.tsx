import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About PropertyCalc",
  description:
    "PropertyCalc provides free, accurate property maintenance and real estate calculators. Learn about our methodology and mission.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
        <a href="/" className="hover:text-amber-600 transition-colors">
          Home
        </a>
        <span>/</span>
        <span className="text-slate-600">About</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8">
        About PropertyCalc
      </h1>

      <div className="prose prose-slate prose-lg max-w-none">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 mb-10 not-prose">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            Property decisions shouldn&apos;t be guesswork. Whether you&apos;re a
            first-time homeowner budgeting for maintenance, a landlord evaluating
            an investment, or someone who just wants to know if their
            contractor&apos;s quote is fair — you deserve clear, data-backed
            answers. That&apos;s what PropertyCalc provides, completely free.
          </p>
        </div>

        <h2>Why We Built This</h2>
        <p>
          Property ownership comes with an overwhelming number of financial
          decisions. How much should you set aside for maintenance? Is that roof
          quote reasonable? Will this rental actually cash-flow? Most people
          either guess, ask a friend, or spend hours searching forums for
          conflicting advice.
        </p>
        <p>
          We built PropertyCalc to put professional-grade estimation tools in
          everyone&apos;s hands. The same methodologies used by property managers,
          real estate investors, and home inspectors — packaged into simple
          calculators that anyone can use in 30 seconds.
        </p>

        <h2>Our Methodology</h2>
        <p>
          Every calculator on PropertyCalc is built on established industry
          standards:
        </p>
        <ul>
          <li>
            <strong>Home Maintenance Budget:</strong> Blends the 1% Rule (1% of
            home value annually) with the Square Footage Rule ($1/sqft/year),
            adjusted for home age, region, and condition using data from the
            National Association of Home Builders (NAHB) and American Society of
            Home Inspectors (ASHI).
          </li>
          <li>
            <strong>Rental Property ROI:</strong> Calculates cash-on-cash
            return, cap rate, and total return using standard real estate
            investment analysis frameworks.
          </li>
          <li>
            <strong>Contractor Quote Analyzer:</strong> References regional
            pricing data from HomeAdvisor, Angi, and RSMeans construction cost
            databases to provide fair-market ranges for common home projects.
          </li>
          <li>
            <strong>Paint Estimator:</strong> Uses industry-standard coverage
            rates (350 sqft/gallon) with adjustments for surface texture, and
            labor rates from professional painting associations.
          </li>
          <li>
            <strong>Roof Calculator:</strong> Evaluates repair vs. replacement
            using lifecycle cost analysis, factoring in material lifespans from
            manufacturer warranties and regional labor rates.
          </li>
        </ul>

        <h2>Important Disclaimers</h2>
        <p>
          Our calculators provide <strong>estimates</strong> based on national
          and regional averages. Actual costs can vary based on local market
          conditions, specific contractor pricing, material availability, and the
          unique characteristics of your property.
        </p>
        <p>
          PropertyCalc is an educational resource. For major financial decisions
          — purchasing investment property, undertaking major renovations, or
          making insurance claims — always consult with qualified professionals
          including licensed contractors, real estate agents, home inspectors,
          and financial advisors.
        </p>

        <h2>Contact</h2>
        <p>
          Questions, feedback, or suggestions for new calculators? We&apos;d love
          to hear from you. Reach us at{" "}
          <strong>hello@propertycalc.co</strong>.
        </p>
      </div>
    </div>
  );
}
