"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const fmtFull = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
const pct = (n: number) => n.toFixed(2) + "%";

/* ── All 50 states: effective property tax rate (%), rank (1 = highest), homestead exemption ── */
const STATE_DATA: {
  abbr: string;
  name: string;
  rate: number;
  rank: number;
  homestead: number;
}[] = [
  { abbr: "AL", name: "Alabama", rate: 0.41, rank: 49, homestead: 0 },
  { abbr: "AK", name: "Alaska", rate: 1.19, rank: 19, homestead: 0 },
  { abbr: "AZ", name: "Arizona", rate: 0.66, rank: 41, homestead: 0 },
  { abbr: "AR", name: "Arkansas", rate: 0.62, rank: 43, homestead: 25000 },
  { abbr: "CA", name: "California", rate: 0.76, rank: 37, homestead: 0 },
  { abbr: "CO", name: "Colorado", rate: 0.51, rank: 46, homestead: 0 },
  { abbr: "CT", name: "Connecticut", rate: 2.14, rank: 4, homestead: 0 },
  { abbr: "DE", name: "Delaware", rate: 0.57, rank: 44, homestead: 0 },
  { abbr: "FL", name: "Florida", rate: 0.89, rank: 30, homestead: 50000 },
  { abbr: "GA", name: "Georgia", rate: 0.92, rank: 29, homestead: 0 },
  { abbr: "HI", name: "Hawaii", rate: 0.28, rank: 50, homestead: 0 },
  { abbr: "ID", name: "Idaho", rate: 0.69, rank: 39, homestead: 0 },
  { abbr: "IL", name: "Illinois", rate: 2.27, rank: 2, homestead: 25000 },
  { abbr: "IN", name: "Indiana", rate: 0.85, rank: 32, homestead: 48000 },
  { abbr: "IA", name: "Iowa", rate: 1.57, rank: 13, homestead: 0 },
  { abbr: "KS", name: "Kansas", rate: 1.43, rank: 15, homestead: 0 },
  { abbr: "KY", name: "Kentucky", rate: 0.86, rank: 31, homestead: 46350 },
  { abbr: "LA", name: "Louisiana", rate: 0.55, rank: 45, homestead: 25000 },
  { abbr: "ME", name: "Maine", rate: 1.36, rank: 16, homestead: 25000 },
  { abbr: "MD", name: "Maryland", rate: 1.07, rank: 24, homestead: 0 },
  { abbr: "MA", name: "Massachusetts", rate: 1.23, rank: 18, homestead: 0 },
  { abbr: "MI", name: "Michigan", rate: 1.54, rank: 14, homestead: 0 },
  { abbr: "MN", name: "Minnesota", rate: 1.12, rank: 22, homestead: 0 },
  { abbr: "MS", name: "Mississippi", rate: 0.81, rank: 34, homestead: 30000 },
  { abbr: "MO", name: "Missouri", rate: 0.97, rank: 26, homestead: 0 },
  { abbr: "MT", name: "Montana", rate: 0.84, rank: 33, homestead: 0 },
  { abbr: "NE", name: "Nebraska", rate: 1.73, rank: 7, homestead: 0 },
  { abbr: "NV", name: "Nevada", rate: 0.60, rank: 42, homestead: 0 },
  { abbr: "NH", name: "New Hampshire", rate: 2.18, rank: 3, homestead: 0 },
  { abbr: "NJ", name: "New Jersey", rate: 2.47, rank: 1, homestead: 0 },
  { abbr: "NM", name: "New Mexico", rate: 0.80, rank: 35, homestead: 0 },
  { abbr: "NY", name: "New York", rate: 1.72, rank: 9, homestead: 0 },
  { abbr: "NC", name: "North Carolina", rate: 0.84, rank: 33, homestead: 0 },
  { abbr: "ND", name: "North Dakota", rate: 0.98, rank: 25, homestead: 0 },
  { abbr: "OH", name: "Ohio", rate: 1.59, rank: 12, homestead: 25000 },
  { abbr: "OK", name: "Oklahoma", rate: 0.90, rank: 28, homestead: 25000 },
  { abbr: "OR", name: "Oregon", rate: 0.97, rank: 27, homestead: 0 },
  { abbr: "PA", name: "Pennsylvania", rate: 1.58, rank: 11, homestead: 0 },
  { abbr: "RI", name: "Rhode Island", rate: 1.63, rank: 10, homestead: 0 },
  { abbr: "SC", name: "South Carolina", rate: 0.57, rank: 44, homestead: 50000 },
  { abbr: "SD", name: "South Dakota", rate: 1.31, rank: 17, homestead: 0 },
  { abbr: "TN", name: "Tennessee", rate: 0.71, rank: 38, homestead: 0 },
  { abbr: "TX", name: "Texas", rate: 1.80, rank: 6, homestead: 40000 },
  { abbr: "UT", name: "Utah", rate: 0.63, rank: 40, homestead: 0 },
  { abbr: "VT", name: "Vermont", rate: 1.90, rank: 5, homestead: 0 },
  { abbr: "VA", name: "Virginia", rate: 0.82, rank: 36, homestead: 0 },
  { abbr: "WA", name: "Washington", rate: 1.03, rank: 23, homestead: 0 },
  { abbr: "WV", name: "West Virginia", rate: 0.58, rank: 43, homestead: 0 },
  { abbr: "WI", name: "Wisconsin", rate: 1.73, rank: 8, homestead: 0 },
  { abbr: "WY", name: "Wyoming", rate: 0.61, rank: 41, homestead: 0 },
];

const NATIONAL_AVG_TAX = 2690;
const NATIONAL_AVG_RATE = 1.10;

export default function PropertyTaxEstimator() {
  const [stateAbbr, setStateAbbr] = useState("TX");
  const [assessedValue, setAssessedValue] = useState(300000);
  const [marketValue, setMarketValue] = useState(350000);
  const [useMarketValue, setUseMarketValue] = useState(false);
  const [applyHomestead, setApplyHomestead] = useState(false);

  const selectedState = useMemo(
    () => STATE_DATA.find((s) => s.abbr === stateAbbr)!,
    [stateAbbr]
  );

  const results = useMemo(() => {
    const baseValue = useMarketValue ? marketValue : assessedValue;
    const homesteadDeduction =
      applyHomestead && selectedState.homestead > 0 ? selectedState.homestead : 0;
    const taxableValue = Math.max(0, baseValue - homesteadDeduction);
    const annualTax = taxableValue * (selectedState.rate / 100);
    const monthlyTax = annualTax / 12;
    const effectiveRate = baseValue > 0 ? (annualTax / baseValue) * 100 : 0;

    const stateAvgTax = 250000 * (selectedState.rate / 100); // avg home
    const vsNational = ((annualTax - NATIONAL_AVG_TAX) / NATIONAL_AVG_TAX) * 100;
    const stateVsNational =
      ((selectedState.rate - NATIONAL_AVG_RATE) / NATIONAL_AVG_RATE) * 100;

    return {
      taxableValue,
      homesteadDeduction,
      annualTax,
      monthlyTax,
      effectiveRate,
      stateAvgTax,
      vsNational,
      stateVsNational,
    };
  }, [stateAbbr, assessedValue, marketValue, useMarketValue, applyHomestead, selectedState]);

  const top10Highest = useMemo(
    () => [...STATE_DATA].sort((a, b) => b.rate - a.rate).slice(0, 10),
    []
  );
  const top10Lowest = useMemo(
    () => [...STATE_DATA].sort((a, b) => a.rate - b.rate).slice(0, 10),
    []
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/calculators" className="hover:text-brand-400 transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-white">Property Tax Estimator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Property Tax Estimator
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl">
            Estimate your annual and monthly property taxes by state. Compare your tax burden
            against state and national averages, see how homestead exemptions reduce your bill,
            and explore where every state ranks.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Inputs (1/3) ── */}
          <div className="lg:col-span-1 space-y-5">
            <div className="card p-6 space-y-5">
              <h2 className="text-lg font-bold text-navy-950">Property Details</h2>

              {/* State selector */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">State</label>
                <select
                  value={stateAbbr}
                  onChange={(e) => setStateAbbr(e.target.value)}
                  className="calc-input"
                >
                  {STATE_DATA.map((s) => (
                    <option key={s.abbr} value={s.abbr}>
                      {s.name} ({pct(s.rate)})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  Average effective rate: <span className="font-semibold">{pct(selectedState.rate)}</span> &middot; Rank #{selectedState.rank} of 50
                </p>
              </div>

              {/* Assessed Value */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Assessed Value ($)
                </label>
                <input
                  type="number"
                  className="calc-input"
                  value={assessedValue}
                  onChange={(e) => setAssessedValue(+e.target.value)}
                />
              </div>

              {/* Market Value */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Market Value ($)
                </label>
                <input
                  type="number"
                  className="calc-input"
                  value={marketValue}
                  onChange={(e) => setMarketValue(+e.target.value)}
                />
                <p className="text-xs text-slate-400 mt-1">
                  Note: Assessed value may differ significantly from market value depending on
                  your county&apos;s assessment practices.
                </p>
              </div>

              {/* Assessment Ratio Toggle */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Calculate Tax Based On
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUseMarketValue(false)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                      !useMarketValue
                        ? "bg-navy-950 text-white"
                        : "bg-warm-100 text-slate-600 hover:bg-warm-200"
                    }`}
                  >
                    Assessed
                  </button>
                  <button
                    onClick={() => setUseMarketValue(true)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                      useMarketValue
                        ? "bg-navy-950 text-white"
                        : "bg-warm-100 text-slate-600 hover:bg-warm-200"
                    }`}
                  >
                    Market
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Using: {fmt(useMarketValue ? marketValue : assessedValue)}
                </p>
              </div>

              {/* Homestead Exemption */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applyHomestead}
                    onChange={(e) => setApplyHomestead(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Apply Homestead Exemption
                  </span>
                </label>
                {selectedState.homestead > 0 ? (
                  <p className="text-xs text-sage-600 mt-2 ml-8">
                    {selectedState.name} offers a {fmt(selectedState.homestead)} homestead exemption.
                    {applyHomestead && (
                      <span className="font-semibold">
                        {" "}Saves you {fmtFull(selectedState.homestead * (selectedState.rate / 100))}/yr.
                      </span>
                    )}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 mt-2 ml-8">
                    {selectedState.name} does not offer a standard homestead exemption.
                    Check with your county for local exemptions.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── Results (2/3) ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Primary Result */}
            <div className="card p-6 sm:p-8 border-brand-200 bg-brand-50/30">
              <div className="text-sm font-medium text-slate-500 mb-1">
                Estimated Annual Property Tax
              </div>
              <div className="text-4xl sm:text-5xl font-black text-navy-950">
                {fmtFull(results.annualTax)}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                {fmt(results.taxableValue)} taxable value &times; {pct(selectedState.rate)} effective rate
              </div>
              {results.homesteadDeduction > 0 && (
                <div className="mt-2">
                  <span className="badge badge-sage">
                    Homestead exemption: -{fmt(results.homesteadDeduction)}
                  </span>
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="card p-5 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Monthly Equivalent
                </div>
                <div className="text-xl font-extrabold text-navy-950 mt-1">
                  {fmtFull(results.monthlyTax)}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Per month</div>
              </div>
              <div className="card p-5 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Effective Rate
                </div>
                <div className="text-xl font-extrabold text-brand-600 mt-1">
                  {pct(results.effectiveRate)}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  National avg: {pct(NATIONAL_AVG_RATE)}
                </div>
              </div>
              <div className="card p-5 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  State Rank
                </div>
                <div className="text-xl font-extrabold text-navy-950 mt-1">
                  #{selectedState.rank}
                  <span className="text-sm font-normal text-slate-400"> of 50</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">1 = highest taxes</div>
              </div>
            </div>

            {/* Comparison Card */}
            <div className="card p-6">
              <h3 className="text-base font-bold text-navy-950 mb-4">
                How You Compare
              </h3>
              <div className="space-y-4">
                {/* vs National Average */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Your Estimate vs National Average ({fmt(NATIONAL_AVG_TAX)}/yr)</span>
                    <span
                      className={`font-semibold ${
                        results.vsNational > 0 ? "text-red-600" : "text-sage-600"
                      }`}
                    >
                      {results.vsNational > 0 ? "+" : ""}
                      {results.vsNational.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        results.vsNational > 0 ? "bg-red-400" : "bg-sage-400"
                      }`}
                      style={{
                        width: `${Math.min(100, Math.abs(results.vsNational) + 20)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Your estimated tax is{" "}
                    <span className="font-semibold">
                      {fmt(Math.abs(results.annualTax - NATIONAL_AVG_TAX))}
                    </span>{" "}
                    {results.annualTax > NATIONAL_AVG_TAX ? "above" : "below"} the national average.
                  </p>
                </div>

                {/* State rate vs National rate */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">
                      {selectedState.name} Rate ({pct(selectedState.rate)}) vs National Avg Rate ({pct(NATIONAL_AVG_RATE)})
                    </span>
                    <span
                      className={`font-semibold ${
                        results.stateVsNational > 0 ? "text-red-600" : "text-sage-600"
                      }`}
                    >
                      {results.stateVsNational > 0 ? "+" : ""}
                      {results.stateVsNational.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        results.stateVsNational > 0 ? "bg-red-400" : "bg-sage-400"
                      }`}
                      style={{
                        width: `${Math.min(100, Math.abs(results.stateVsNational) + 20)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedState.name}&apos;s effective tax rate is{" "}
                    <span className="font-semibold">
                      {Math.abs(results.stateVsNational).toFixed(1)}%
                    </span>{" "}
                    {results.stateVsNational > 0 ? "above" : "below"} the national average rate.
                  </p>
                </div>
              </div>
            </div>

            {/* State Comparison Tables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Top 10 Highest */}
              <div className="card p-6">
                <h3 className="text-base font-bold text-navy-950 mb-4 flex items-center gap-2">
                  <span className="badge badge-brand">Highest</span> Top 10 Tax States
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          #
                        </th>
                        <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          State
                        </th>
                        <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {top10Highest.map((s, i) => (
                        <tr
                          key={s.abbr}
                          className={`border-b border-slate-50 ${
                            s.abbr === stateAbbr ? "bg-brand-50 font-semibold" : ""
                          }`}
                        >
                          <td className="py-2 text-slate-400">{i + 1}</td>
                          <td className="py-2 text-navy-950">{s.name}</td>
                          <td className="py-2 text-right text-red-600">{pct(s.rate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top 10 Lowest */}
              <div className="card p-6">
                <h3 className="text-base font-bold text-navy-950 mb-4 flex items-center gap-2">
                  <span className="badge badge-sage">Lowest</span> Top 10 Tax States
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          #
                        </th>
                        <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          State
                        </th>
                        <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {top10Lowest.map((s, i) => (
                        <tr
                          key={s.abbr}
                          className={`border-b border-slate-50 ${
                            s.abbr === stateAbbr ? "bg-sage-50 font-semibold" : ""
                          }`}
                        >
                          <td className="py-2 text-slate-400">{i + 1}</td>
                          <td className="py-2 text-navy-950">{s.name}</td>
                          <td className="py-2 text-right text-sage-600">{pct(s.rate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="card p-6 bg-warm-50 border-warm-200">
              <h3 className="text-base font-bold text-navy-950 mb-3">Related Calculators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { name: "Mortgage Calculator", href: "/calculators/mortgage" },
                  { name: "Rental Property ROI", href: "/calculators/rental-roi" },
                  { name: "Rent vs Buy", href: "/calculators/rent-vs-buy" },
                  { name: "Home Maintenance Budget", href: "/calculators/home-maintenance" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors py-1"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SEO Article ── */}
        <article className="mt-16 prose-brand max-w-4xl mx-auto">
          <h2>Understanding Property Taxes: A Complete Homeowner&apos;s Guide</h2>

          <p>
            Property taxes are one of the largest ongoing costs of homeownership, yet they remain one of the
            most misunderstood. Unlike your mortgage payment, which shrinks over time as you pay down principal,
            property taxes tend to increase as home values rise and local governments adjust mill rates. For many
            homeowners, property taxes represent the second-largest line item after the mortgage itself, and in
            some high-tax states, the annual bill can exceed $10,000 on a median-priced home. Understanding how
            property taxes work, how your bill is calculated, and what options you have to reduce it is essential
            for accurate budgeting and long-term financial planning.
          </p>

          <h3>How Property Taxes Are Calculated</h3>
          <p>
            Your property tax bill is the product of two numbers: your property&apos;s assessed value and the
            local tax rate (often called the mill rate or millage rate). The assessed value is determined by your
            county or municipal assessor, who evaluates your property based on recent comparable sales, the
            condition and size of improvements, lot size, and location. This assessed value may or may not equal
            your home&apos;s fair market value, and the difference between the two is a common source of
            confusion for homeowners.
          </p>
          <p>
            The tax rate is set by local taxing authorities, which typically include the county government, city
            or township, school district, and special districts (fire, library, parks). Each entity sets its own
            rate based on its budget needs, and the rates are combined into a single composite rate that applies
            to your property. A mill rate of 20 mills means you pay $20 per $1,000 of assessed value, which is
            equivalent to a 2.0% effective tax rate. When you see quoted rates like New Jersey&apos;s 2.47% or
            Hawaii&apos;s 0.28%, those represent the effective rate, which is the total tax paid as a percentage
            of the home&apos;s market value.
          </p>

          <h3>Assessed Value vs. Market Value: A Critical Distinction</h3>
          <p>
            One of the most important concepts in property taxation is the difference between assessed value and
            market value. Market value is what a willing buyer would pay a willing seller in an open market
            transaction. Assessed value is the value your local assessor assigns for tax purposes, and it can
            differ dramatically from market value for several reasons.
          </p>
          <p>
            Many states apply an assessment ratio, meaning they only tax a percentage of the market value.
            California&apos;s Proposition 13, for example, caps assessed value increases at 2% per year regardless
            of how fast the market moves, so a home purchased in 1990 for $200,000 that is now worth $1.2 million
            might have an assessed value of only $400,000. Other states like Indiana assess at 100% of market
            value but offer various deductions and credits to lower the effective rate. The disconnect between
            assessed and market value is precisely why you should understand both numbers when estimating your
            property taxes, and why our calculator lets you toggle between them.
          </p>

          <h3>How to Appeal Your Property Tax Assessment</h3>
          <p>
            If you believe your property has been over-assessed, you have the right to file an appeal in every
            state. Property tax appeals are more common and more successful than most homeowners realize. Studies
            suggest that between 30% and 60% of residential properties are over-assessed, and roughly half of
            all appeals result in a reduction. Here is how the process typically works.
          </p>
          <p>
            First, review your assessment notice carefully. Check that the physical characteristics of your
            property are recorded correctly, including square footage, number of bedrooms and bathrooms, lot
            size, and condition. Errors are surprisingly common and can lead to immediate corrections without a
            formal appeal. Second, research comparable sales in your area. Pull recent sales data for homes
            similar to yours in size, condition, and location. If comparable homes are selling for less than
            your assessed value, you have a strong case. Third, file your appeal within the deadline, which
            varies by jurisdiction but is typically 30 to 90 days after you receive your assessment notice.
            You will present your evidence to a local board of review. Many homeowners handle appeals
            themselves, though you can also hire a property tax attorney or consultant who typically works on
            a contingency basis, taking a percentage of the savings.
          </p>

          <h3>Homestead Exemptions by State</h3>
          <p>
            A homestead exemption reduces the taxable value of your primary residence, lowering your property
            tax bill. The availability and amount of homestead exemptions varies widely by state. Florida offers
            one of the most generous programs, exempting the first $50,000 of assessed value from property taxes
            for primary residences. Texas exempts $40,000 from school district taxes, with additional exemptions
            for seniors and disabled homeowners. Indiana provides a standard deduction of $48,000 or 60% of the
            assessed value, whichever is less. Illinois offers a $25,000 reduction in the equalized assessed
            value for homesteads. Kentucky exempts the first $46,350 of assessed value.
          </p>
          <p>
            Some states that do not appear to offer homestead exemptions at the state level may still provide
            them through individual counties or municipalities. It is always worth checking with your local
            assessor&apos;s office. The exemption typically applies only to your primary residence, not
            investment properties or second homes. You usually need to apply and may need to reapply annually,
            though some jurisdictions make it automatic once you are in the system. Missing the filing deadline
            for a homestead exemption is one of the most common and costly mistakes new homeowners make.
          </p>

          <h3>Senior, Veteran, and Disability Exemptions</h3>
          <p>
            Beyond standard homestead exemptions, many states offer additional property tax relief for specific
            populations. Senior citizen exemptions are available in most states, typically requiring the
            homeowner to be 65 or older and often subject to income limitations. These can range from modest
            reductions of a few hundred dollars to complete exemptions for low-income seniors.
          </p>
          <p>
            Veterans may qualify for property tax exemptions based on service-connected disability ratings. Many
            states offer partial exemptions for veterans with any level of disability and full exemptions for
            those rated 100% disabled by the VA. Surviving spouses of veterans who died in service or from
            service-connected disabilities often qualify as well. Texas, for example, provides a full property
            tax exemption for veterans with a 100% disability rating. Florida offers a significant discount for
            combat-disabled veterans. These exemptions can save eligible homeowners thousands of dollars annually
            and are frequently underutilized because many qualifying individuals do not realize they are eligible.
          </p>

          <h3>Why Property Taxes Vary So Much by State</h3>
          <p>
            The wide range in property tax rates across states, from Hawaii&apos;s 0.28% to New Jersey&apos;s
            2.47%, reflects fundamental differences in how states fund government services. States with no income
            tax, like Texas and New Hampshire, tend to have higher property tax rates because they rely more
            heavily on property taxes to fund schools, infrastructure, and public services. Conversely, states
            with robust income tax systems, like Hawaii and California, can afford to keep property tax rates
            lower. The quality and cost of local services, particularly public schools, is a major driver.
            School districts typically account for 40% to 60% of the total property tax bill in most
            jurisdictions.
          </p>
          <p>
            Local factors matter enormously as well. Two homes with identical market values in the same state
            can have vastly different property tax bills depending on which county, city, and school district
            they fall within. Urban areas often have higher rates than rural areas due to the cost of providing
            services to denser populations, though this is not universally true. Special assessment districts
            for flood control, transit, or community development can add additional layers of taxation.
          </p>

          <h3>Strategies to Reduce Your Property Tax Bill</h3>
          <p>
            Beyond appealing your assessment and claiming all available exemptions, there are several strategies
            that can help manage your property tax burden. Avoid over-improving your home relative to the
            neighborhood, as major renovations will trigger reassessments at higher values. Be aware that adding
            square footage, finishing a basement, or building a pool will almost certainly increase your assessed
            value. If you are buying a home, factor property taxes into your total cost of ownership and compare
            taxes across different neighborhoods and jurisdictions before making an offer. Some homeowners in
            border areas between high-tax and low-tax jurisdictions can save significantly by choosing a
            location that is just across the line. Finally, check your bill for errors every single year.
            Duplicate charges, incorrect land classifications, and other administrative mistakes happen more
            often than you might expect.
          </p>

          <h3>Property Taxes and Investment Properties</h3>
          <p>
            For real estate investors, property taxes are a critical variable in cash flow analysis and
            return calculations. Investment properties do not qualify for homestead exemptions, so you will
            pay the full rate on the assessed value. In high-tax states, property taxes can significantly
            erode rental income and push the breakeven point on a property much further out. Conversely, in
            low-tax states, the same rental income goes further because less of it is consumed by property
            taxes. When analyzing a potential investment property, always use the actual tax bill from the
            county assessor rather than an estimate, and account for potential increases due to reassessment
            after purchase. Many jurisdictions reassess properties at the sale price, which can result in a
            substantial jump in taxes if the property was previously under-assessed. The good news for
            investors is that property taxes are fully deductible as a business expense against rental income,
            reducing your federal and state income tax liability.
          </p>
        </article>
      </div>
    </>
  );
}
