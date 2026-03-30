"use client";

import { useState, useMemo } from "react";
import type { Metadata } from "next";

/* ────────────────────────────────────────────────────────
   METHODOLOGY
   Industry-standard approaches used by property managers:
   • 1% Rule: Set aside 1% of home value per year
   • Square Footage Rule: $1/sqft/year baseline
   • Age multiplier: Older homes need more upkeep
   • Climate/region adjustment
   • Condition modifier (well-maintained vs deferred)

   We blend these methods and break the total into
   line-item categories so the result feels tangible.
   ──────────────────────────────────────────────────────── */

const regions: Record<string, { label: string; multiplier: number }> = {
  northeast: { label: "Northeast (NY, NJ, PA, CT, MA)", multiplier: 1.15 },
  southeast: { label: "Southeast (FL, GA, NC, SC, VA)", multiplier: 0.95 },
  midwest: { label: "Midwest (OH, IL, MI, IN, WI)", multiplier: 0.90 },
  southwest: { label: "Southwest (TX, AZ, NM, NV)", multiplier: 0.92 },
  west: { label: "West Coast (CA, OR, WA)", multiplier: 1.25 },
  mountain: { label: "Mountain (CO, UT, ID, MT)", multiplier: 1.00 },
};

const conditions: Record<string, { label: string; multiplier: number }> = {
  excellent: { label: "Excellent — recently renovated", multiplier: 0.6 },
  good: { label: "Good — well maintained", multiplier: 0.85 },
  average: { label: "Average — typical wear", multiplier: 1.0 },
  fair: { label: "Fair — some deferred maintenance", multiplier: 1.3 },
  poor: { label: "Poor — significant deferred maintenance", multiplier: 1.7 },
};

// Percentage breakdown of typical maintenance spending
const categories = [
  { name: "HVAC (heating & cooling)", pct: 0.18, icon: "🌡️" },
  { name: "Plumbing", pct: 0.14, icon: "🔧" },
  { name: "Electrical", pct: 0.08, icon: "⚡" },
  { name: "Roof & Gutters", pct: 0.15, icon: "🏠" },
  { name: "Exterior (siding, paint, deck)", pct: 0.12, icon: "🎨" },
  { name: "Landscaping & Lawn", pct: 0.10, icon: "🌿" },
  { name: "Appliance Repairs", pct: 0.08, icon: "🍳" },
  { name: "Flooring & Interior", pct: 0.07, icon: "🪵" },
  { name: "Pest Control", pct: 0.03, icon: "🐛" },
  { name: "Emergency Fund Buffer", pct: 0.05, icon: "🚨" },
];

function getAgeMultiplier(age: number): number {
  if (age <= 5) return 0.5;
  if (age <= 10) return 0.7;
  if (age <= 20) return 1.0;
  if (age <= 30) return 1.2;
  if (age <= 50) return 1.5;
  return 1.8;
}

function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function HomeMaintenancePage() {
  const [homeValue, setHomeValue] = useState<string>("350000");
  const [sqft, setSqft] = useState<string>("2000");
  const [age, setAge] = useState<string>("15");
  const [region, setRegion] = useState<string>("southeast");
  const [condition, setCondition] = useState<string>("average");
  const [hasPool, setHasPool] = useState(false);
  const [hasOldRoof, setHasOldRoof] = useState(false);

  const result = useMemo(() => {
    const hv = parseFloat(homeValue) || 0;
    const sf = parseFloat(sqft) || 0;
    const a = parseFloat(age) || 0;

    if (hv <= 0 || sf <= 0) return null;

    // Blend two methods
    const onePercent = hv * 0.01;
    const sqftBased = sf * 1.0;
    const blended = (onePercent * 0.6 + sqftBased * 0.4);

    // Apply multipliers
    const ageMult = getAgeMultiplier(a);
    const regionMult = regions[region]?.multiplier ?? 1.0;
    const condMult = conditions[condition]?.multiplier ?? 1.0;

    let annual = blended * ageMult * regionMult * condMult;

    // Add-ons
    if (hasPool) annual += 1800;
    if (hasOldRoof) annual += 1200;

    const monthly = annual / 12;

    const breakdown = categories.map((cat) => ({
      ...cat,
      amount: annual * cat.pct,
    }));

    return { annual, monthly, breakdown, ageMult, regionMult, condMult };
  }, [homeValue, sqft, age, region, condition, hasPool, hasOldRoof]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="max-w-3xl mb-12">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
          <a href="/" className="hover:text-amber-600 transition-colors">Home</a>
          <span>/</span>
          <span className="text-slate-600">Home Maintenance Budget</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Home Maintenance Budget Estimator
        </h1>
        <p className="mt-4 text-lg text-slate-500 leading-relaxed">
          Find out how much you should set aside each year for home
          maintenance. Based on the industry-standard 1% rule and square footage
          method, adjusted for your home&apos;s age, location, and condition.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Input Panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-7">
          <h2 className="text-lg font-bold text-slate-900 mb-6">
            Your Home Details
          </h2>

          <div className="space-y-5">
            {/* Home Value */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Estimated Home Value
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  $
                </span>
                <input
                  type="number"
                  value={homeValue}
                  onChange={(e) => setHomeValue(e.target.value)}
                  className="calc-input pl-8"
                  placeholder="350,000"
                />
              </div>
            </div>

            {/* Square Footage */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Square Footage
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={sqft}
                  onChange={(e) => setSqft(e.target.value)}
                  className="calc-input"
                  placeholder="2,000"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  sqft
                </span>
              </div>
            </div>

            {/* Home Age */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Home Age (years)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="calc-input"
                placeholder="15"
              />
              <p className="mt-1 text-xs text-slate-400">
                Older homes typically require more maintenance
              </p>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="calc-input appearance-none cursor-pointer"
              >
                {Object.entries(regions).map(([key, r]) => (
                  <option key={key} value={key}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Overall Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="calc-input appearance-none cursor-pointer"
              >
                {Object.entries(conditions).map(([key, c]) => (
                  <option key={key} value={key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={hasPool}
                  onChange={(e) => setHasPool(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900">
                  Has a pool or hot tub (+$1,800/yr)
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={hasOldRoof}
                  onChange={(e) => setHasOldRoof(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900">
                  Roof is 15+ years old (+$1,200/yr)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-3 space-y-6">
          {result ? (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="result-card bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg shadow-amber-500/15">
                  <p className="text-sm font-medium text-amber-100">
                    Annual Maintenance Budget
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold mt-2">
                    {formatUSD(result.annual)}
                  </p>
                  <p className="text-sm text-amber-100 mt-1">
                    {((result.annual / (parseFloat(homeValue) || 1)) * 100).toFixed(1)}% of
                    home value
                  </p>
                </div>
                <div className="result-card bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">
                    Monthly Set-Aside
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                    {formatUSD(result.monthly)}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    per month into savings
                  </p>
                </div>
              </div>

              {/* Multiplier insight */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>How we calculated this:</strong> We blended the 1%
                  Rule ({formatUSD((parseFloat(homeValue) || 0) * 0.01)}) and
                  the Square Footage Rule ({formatUSD((parseFloat(sqft) || 0) * 1.0)}/yr), then adjusted for
                  your home&apos;s age ({result.ageMult}x), region ({result.regionMult}x),
                  and condition ({result.condMult}x).
                </p>
              </div>

              {/* Breakdown Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900">
                    Where Your Money Goes
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Typical maintenance spending breakdown
                  </p>
                </div>
                <div className="divide-y divide-slate-100">
                  {result.breakdown.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm font-medium text-slate-700">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-slate-900">
                          {formatUSD(item.amount)}
                        </span>
                        <span className="text-xs text-slate-400 ml-2">
                          /yr
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bar chart visualization */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Cost Distribution
                </h3>
                <div className="space-y-3">
                  {result.breakdown
                    .sort((a, b) => b.amount - a.amount)
                    .map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600">{item.name}</span>
                          <span className="font-medium text-slate-700">
                            {formatUSD(item.amount)}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-amber-400 to-amber-500 h-2.5 rounded-full transition-all duration-500"
                            style={{
                              width: `${(item.amount / result.annual) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 text-center">
              <p className="text-slate-400">
                Enter your home details to see your maintenance budget estimate.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <article className="max-w-3xl mx-auto mt-20 prose prose-slate prose-lg">
        <h2>How Much Should You Budget for Home Maintenance?</h2>
        <p>
          Most financial advisors recommend setting aside <strong>1% to 4%</strong> of
          your home&apos;s value each year for maintenance and repairs. A $350,000 home,
          for example, should budget between $3,500 and $14,000 annually.
        </p>
        <p>
          The exact amount depends on several factors that our calculator accounts for:
        </p>

        <h3>The 1% Rule</h3>
        <p>
          The simplest approach: save 1% of your home&apos;s current market value per
          year. A $400,000 home means $4,000 in annual maintenance savings. This
          rule works well for newer homes in good condition but can underestimate
          costs for older properties.
        </p>

        <h3>The Square Footage Rule</h3>
        <p>
          An alternative method that budgets $1 per square foot per year. A 2,500
          sqft home would need $2,500 annually. This method better accounts for the
          actual size of systems and surfaces that need maintenance.
        </p>

        <h3>Why Home Age Matters</h3>
        <p>
          A home built in the last 5 years may only need 50% of the standard
          maintenance budget — most systems are under warranty and materials are
          fresh. A home over 30 years old, however, often needs 120-180% of the
          baseline as major systems approach end-of-life: the roof, HVAC, water
          heater, and plumbing all have 15-30 year lifespans.
        </p>

        <h3>Regional Cost Differences</h3>
        <p>
          Labor and material costs vary significantly by region. West Coast
          homeowners typically pay 20-25% more than the national average for
          maintenance services, while Midwest and Southeast homeowners may pay
          5-10% less. Climate also plays a role — harsh winters accelerate wear
          on roofing, siding, and HVAC systems.
        </p>

        <h3>The Cost of Deferred Maintenance</h3>
        <p>
          Skipping maintenance doesn&apos;t save money — it shifts smaller costs
          into larger emergency repairs. A $200 annual gutter cleaning prevents
          $5,000+ in water damage. Regular HVAC servicing ($150/year) can prevent
          a $7,000 compressor replacement. Our calculator increases estimates for
          homes with deferred maintenance because catch-up costs are real.
        </p>
      </article>
    </div>
  );
}
