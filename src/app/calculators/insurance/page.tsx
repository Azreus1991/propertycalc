"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const fmtFull = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);

const NATIONAL_AVG = 1820;

const STATE_PREMIUMS: { abbr: string; name: string; avg: number }[] = [
  { abbr: "AL", name: "Alabama", avg: 2350 },
  { abbr: "AK", name: "Alaska", avg: 900 },
  { abbr: "AZ", name: "Arizona", avg: 1350 },
  { abbr: "AR", name: "Arkansas", avg: 2600 },
  { abbr: "CA", name: "California", avg: 1100 },
  { abbr: "CO", name: "Colorado", avg: 2988 },
  { abbr: "CT", name: "Connecticut", avg: 1200 },
  { abbr: "DE", name: "Delaware", avg: 800 },
  { abbr: "FL", name: "Florida", avg: 4231 },
  { abbr: "GA", name: "Georgia", avg: 2100 },
  { abbr: "HI", name: "Hawaii", avg: 600 },
  { abbr: "ID", name: "Idaho", avg: 950 },
  { abbr: "IL", name: "Illinois", avg: 1800 },
  { abbr: "IN", name: "Indiana", avg: 1750 },
  { abbr: "IA", name: "Iowa", avg: 1000 },
  { abbr: "KS", name: "Kansas", avg: 3100 },
  { abbr: "KY", name: "Kentucky", avg: 2400 },
  { abbr: "LA", name: "Louisiana", avg: 3600 },
  { abbr: "ME", name: "Maine", avg: 850 },
  { abbr: "MD", name: "Maryland", avg: 1400 },
  { abbr: "MA", name: "Massachusetts", avg: 1250 },
  { abbr: "MI", name: "Michigan", avg: 1700 },
  { abbr: "MN", name: "Minnesota", avg: 2500 },
  { abbr: "MS", name: "Mississippi", avg: 2800 },
  { abbr: "MO", name: "Missouri", avg: 2050 },
  { abbr: "MT", name: "Montana", avg: 950 },
  { abbr: "NE", name: "Nebraska", avg: 2700 },
  { abbr: "NV", name: "Nevada", avg: 1150 },
  { abbr: "NH", name: "New Hampshire", avg: 850 },
  { abbr: "NJ", name: "New Jersey", avg: 1500 },
  { abbr: "NM", name: "New Mexico", avg: 1050 },
  { abbr: "NY", name: "New York", avg: 1600 },
  { abbr: "NC", name: "North Carolina", avg: 1900 },
  { abbr: "ND", name: "North Dakota", avg: 900 },
  { abbr: "OH", name: "Ohio", avg: 1650 },
  { abbr: "OK", name: "Oklahoma", avg: 3300 },
  { abbr: "OR", name: "Oregon", avg: 950 },
  { abbr: "PA", name: "Pennsylvania", avg: 1550 },
  { abbr: "RI", name: "Rhode Island", avg: 800 },
  { abbr: "SC", name: "South Carolina", avg: 2200 },
  { abbr: "SD", name: "South Dakota", avg: 900 },
  { abbr: "TN", name: "Tennessee", avg: 1850 },
  { abbr: "TX", name: "Texas", avg: 3525 },
  { abbr: "UT", name: "Utah", avg: 850 },
  { abbr: "VT", name: "Vermont", avg: 800 },
  { abbr: "VA", name: "Virginia", avg: 1450 },
  { abbr: "WA", name: "Washington", avg: 1300 },
  { abbr: "WV", name: "West Virginia", avg: 800 },
  { abbr: "WI", name: "Wisconsin", avg: 1050 },
  { abbr: "WY", name: "Wyoming", avg: 900 },
];

const CONSTRUCTION_TYPES = [
  { value: "wood", label: "Wood Frame", factor: 1.0 },
  { value: "masonry", label: "Masonry / Brick", factor: 0.88 },
  { value: "steel", label: "Steel Frame", factor: 0.82 },
  { value: "mixed", label: "Mixed", factor: 0.94 },
];

const DEDUCTIBLE_OPTIONS = [500, 1000, 2000, 5000];

const COVERAGE_LEVELS = [
  { value: "basic", label: "Basic", factor: 0.75, description: "Covers named perils only (fire, wind, theft)" },
  { value: "standard", label: "Standard", factor: 1.0, description: "Open-peril dwelling + named-peril personal property" },
  { value: "premium", label: "Premium", factor: 1.35, description: "Open-peril on all, guaranteed replacement cost, higher limits" },
];

const sortedByAvgDesc = [...STATE_PREMIUMS].sort((a, b) => b.avg - a.avg);
const top5Expensive = sortedByAvgDesc.slice(0, 5);
const top5Cheapest = sortedByAvgDesc.slice(-5).reverse();

export default function InsuranceCalculator() {
  const [homeValue, setHomeValue] = useState(350000);
  const [stateAbbr, setStateAbbr] = useState("TX");
  const [constructionType, setConstructionType] = useState("wood");
  const [yearBuilt, setYearBuilt] = useState(1995);
  const [deductible, setDeductible] = useState(1000);
  const [coverageLevel, setCoverageLevel] = useState("standard");

  const results = useMemo(() => {
    const stateData = STATE_PREMIUMS.find((s) => s.abbr === stateAbbr)!;
    const constructionData = CONSTRUCTION_TYPES.find((c) => c.value === constructionType)!;
    const coverageData = COVERAGE_LEVELS.find((c) => c.value === coverageLevel)!;

    // Base premium: scale state average by home value relative to national median ($350k)
    const homeValueFactor = homeValue / 350000;
    let basePremium = stateData.avg * homeValueFactor;

    // Construction adjustment
    basePremium *= constructionData.factor;

    // Age adjustment: older homes cost more to insure
    const currentYear = 2026;
    const age = currentYear - yearBuilt;
    let ageFactor = 1.0;
    if (age > 50) ageFactor = 1.25;
    else if (age > 30) ageFactor = 1.15;
    else if (age > 15) ageFactor = 1.05;
    else if (age < 5) ageFactor = 0.92;
    basePremium *= ageFactor;

    // Deductible adjustment: $1,000 is baseline
    let deductibleFactor = 1.0;
    if (deductible === 500) deductibleFactor = 1.12;
    else if (deductible === 1000) deductibleFactor = 1.0;
    else if (deductible === 2000) deductibleFactor = 0.88;
    else if (deductible === 5000) deductibleFactor = 0.72;
    basePremium *= deductibleFactor;

    // Coverage level adjustment
    basePremium *= coverageData.factor;

    const annualPremium = Math.round(basePremium);
    const monthlyPremium = annualPremium / 12;
    const vsState = annualPremium - stateData.avg;
    const vsNational = annualPremium - NATIONAL_AVG;

    // Deductible savings table
    const deductibleTable = DEDUCTIBLE_OPTIONS.map((ded) => {
      let df = 1.0;
      if (ded === 500) df = 1.12;
      else if (ded === 1000) df = 1.0;
      else if (ded === 2000) df = 0.88;
      else if (ded === 5000) df = 0.72;
      const premium = Math.round((basePremium / deductibleFactor) * df);
      return { deductible: ded, premium, savings: Math.round((basePremium / deductibleFactor) * 1.12) - premium };
    });

    // Coverage recommendations
    const recommendations: string[] = [];
    if (homeValue >= 500000) {
      recommendations.push("Consider an umbrella policy for additional liability coverage beyond your homeowner's policy limits.");
      recommendations.push("Guaranteed replacement cost coverage is strongly recommended for high-value homes to protect against construction cost surges.");
    }
    if (homeValue >= 300000) {
      recommendations.push("Ensure your personal property coverage is at least 50-70% of your dwelling coverage to adequately protect your belongings.");
    }
    recommendations.push(`With a ${fmt(homeValue)} home, your dwelling coverage should be at least ${fmt(homeValue * 1.0)} — many experts recommend 100-125% of your home's value to account for rebuilding costs that exceed market value.`);
    if (stateData.avg > 2500) {
      recommendations.push(`${stateData.name} is a high-premium state. Look into state-backed insurance programs like Citizens (FL) or FAIR plans for potentially lower rates.`);
    }
    if (age > 30) {
      recommendations.push("Your home's age may increase premiums. Consider upgrading electrical, plumbing, and roofing to qualify for discounts.");
    }
    if (coverageLevel === "basic") {
      recommendations.push("Basic coverage leaves significant gaps. Consider upgrading to Standard for open-peril dwelling protection, which covers risks not explicitly excluded rather than only named perils.");
    }

    return {
      annualPremium,
      monthlyPremium,
      vsState,
      vsNational,
      stateData,
      deductibleTable,
      recommendations,
      ageFactor,
      coverageData,
    };
  }, [homeValue, stateAbbr, constructionType, yearBuilt, deductible, coverageLevel]);

  const costSavingTips = [
    "Bundle your home and auto insurance with the same carrier — most insurers offer 10-25% multi-policy discounts.",
    "Install a monitored security system, smoke detectors, and deadbolt locks to qualify for safety discounts of 5-15%.",
    "Raise your deductible from $500 to $2,000 to save up to 20% on your annual premium — just ensure you have that amount in your emergency fund.",
    "Maintain a strong credit score (740+). In most states, insurers use credit-based insurance scores as a major rating factor.",
    "Review your policy annually and shop quotes from at least 3 carriers every 2-3 years. Loyalty rarely pays off in insurance.",
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/calculators" className="hover:text-brand-400 transition-colors">Calculators</Link>
            <span>/</span>
            <span className="text-white">Home Insurance Estimator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Home Insurance Estimator
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl">
            Estimate your homeowner&apos;s insurance premium based on your state, home value, construction type, and
            coverage preferences. Compare costs across all 50 states and find ways to save.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-2 space-y-5">
            <div className="card p-6 space-y-5">
              <h2 className="text-lg font-bold text-navy-950">Property Details</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Home Value ($)</label>
                <input
                  type="number"
                  className="calc-input"
                  value={homeValue}
                  onChange={(e) => setHomeValue(+e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">State</label>
                <select
                  className="calc-input"
                  value={stateAbbr}
                  onChange={(e) => setStateAbbr(e.target.value)}
                >
                  {STATE_PREMIUMS.map((s) => (
                    <option key={s.abbr} value={s.abbr}>
                      {s.name} — avg {fmt(s.avg)}/yr
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Construction Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {CONSTRUCTION_TYPES.map((ct) => (
                    <button
                      key={ct.value}
                      onClick={() => setConstructionType(ct.value)}
                      className={`py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                        constructionType === ct.value
                          ? "bg-navy-950 text-white"
                          : "bg-warm-100 text-slate-600 hover:bg-warm-200"
                      }`}
                    >
                      {ct.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Year Built</label>
                <input
                  type="number"
                  className="calc-input"
                  value={yearBuilt}
                  min={1800}
                  max={2026}
                  onChange={(e) => setYearBuilt(+e.target.value)}
                />
                <p className="text-xs text-slate-400 mt-1">
                  {2026 - yearBuilt} years old — {results.ageFactor > 1 ? `+${Math.round((results.ageFactor - 1) * 100)}% age surcharge` : results.ageFactor < 1 ? `${Math.round((1 - results.ageFactor) * 100)}% newer-home discount` : "no age adjustment"}
                </p>
              </div>
            </div>

            <div className="card p-6 space-y-5">
              <h2 className="text-lg font-bold text-navy-950">Coverage Options</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Deductible</label>
                <div className="flex gap-2">
                  {DEDUCTIBLE_OPTIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDeductible(d)}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                        deductible === d
                          ? "bg-navy-950 text-white"
                          : "bg-warm-100 text-slate-600 hover:bg-warm-200"
                      }`}
                    >
                      {fmt(d)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Coverage Level</label>
                <div className="space-y-2">
                  {COVERAGE_LEVELS.map((cl) => (
                    <button
                      key={cl.value}
                      onClick={() => setCoverageLevel(cl.value)}
                      className={`w-full text-left p-3 rounded-lg transition-all border ${
                        coverageLevel === cl.value
                          ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${coverageLevel === cl.value ? "text-brand-700" : "text-navy-950"}`}>
                          {cl.label}
                        </span>
                        <span className={`badge ${
                          cl.value === "basic" ? "badge-navy" : cl.value === "standard" ? "badge-sage" : "badge-brand"
                        }`}>
                          {cl.factor === 1 ? "Baseline" : cl.factor < 1 ? `${Math.round((1 - cl.factor) * 100)}% less` : `+${Math.round((cl.factor - 1) * 100)}%`}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{cl.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Primary Result */}
            <div className="card p-6 sm:p-8 border-brand-200 bg-brand-50/30">
              <div className="text-sm font-medium text-slate-500 mb-1">Estimated Annual Premium</div>
              <div className="text-4xl sm:text-5xl font-black text-navy-950">{fmt(results.annualPremium)}</div>
              <div className="text-lg font-semibold text-slate-500 mt-1">{fmtFull(results.monthlyPremium)}<span className="text-sm font-normal"> / month</span></div>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className={`badge ${results.vsState >= 0 ? "badge-brand" : "badge-sage"}`}>
                  {results.vsState >= 0 ? "+" : ""}{fmt(results.vsState)} vs {results.stateData.name} avg
                </span>
                <span className={`badge ${results.vsNational >= 0 ? "badge-brand" : "badge-sage"}`}>
                  {results.vsNational >= 0 ? "+" : ""}{fmt(results.vsNational)} vs national avg
                </span>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="card p-5 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Your Estimate</div>
                <div className="text-xl font-extrabold text-navy-950 mt-1">{fmt(results.annualPremium)}</div>
                <div className="text-xs text-slate-400 mt-0.5">{fmtFull(results.monthlyPremium)}/mo</div>
              </div>
              <div className="card p-5 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{results.stateData.name} Avg</div>
                <div className="text-xl font-extrabold text-brand-600 mt-1">{fmt(results.stateData.avg)}</div>
                <div className="text-xs text-slate-400 mt-0.5">{fmtFull(results.stateData.avg / 12)}/mo</div>
              </div>
              <div className="card p-5 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">National Avg</div>
                <div className="text-xl font-extrabold text-sage-600 mt-1">{fmt(NATIONAL_AVG)}</div>
                <div className="text-xs text-slate-400 mt-0.5">{fmtFull(NATIONAL_AVG / 12)}/mo</div>
              </div>
            </div>

            {/* Deductible Comparison */}
            <div className="card p-6">
              <h3 className="text-base font-bold text-navy-950 mb-4">How Your Deductible Affects Premium</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Deductible</th>
                      <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Annual Premium</th>
                      <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Monthly</th>
                      <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Savings vs $500</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.deductibleTable.map((row) => (
                      <tr
                        key={row.deductible}
                        className={`border-b border-slate-50 ${row.deductible === deductible ? "bg-brand-50/50" : ""}`}
                      >
                        <td className="py-2.5 font-semibold text-navy-950">
                          {fmt(row.deductible)}
                          {row.deductible === deductible && (
                            <span className="ml-2 badge badge-brand text-[10px]">Selected</span>
                          )}
                        </td>
                        <td className="py-2.5 text-right text-slate-600">{fmt(row.premium)}</td>
                        <td className="py-2.5 text-right text-slate-600">{fmtFull(row.premium / 12)}</td>
                        <td className="py-2.5 text-right font-semibold text-sage-600">
                          {row.savings > 0 ? `${fmt(row.savings)}/yr` : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Coverage Recommendations */}
            <div className="card p-6">
              <h3 className="text-base font-bold text-navy-950 mb-4">Coverage Recommendations</h3>
              <div className="space-y-3">
                {results.recommendations.map((rec, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-sage-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost-Saving Tips */}
            <div className="card p-6 bg-sage-50/50 border-sage-200">
              <h3 className="text-base font-bold text-navy-950 mb-4">5 Ways to Lower Your Premium</h3>
              <div className="space-y-3">
                {costSavingTips.map((tip, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-600 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* State Comparison */}
            <div className="card p-6">
              <h3 className="text-base font-bold text-navy-950 mb-4">State-by-State Comparison</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                    </svg>
                    Top 5 Most Expensive
                  </h4>
                  <div className="space-y-2">
                    {top5Expensive.map((s, i) => (
                      <div key={s.abbr} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 w-4">{i + 1}.</span>
                          <span className="text-sm font-semibold text-navy-950">{s.name}</span>
                        </div>
                        <span className="text-sm font-bold text-red-600">{fmt(s.avg)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-sage-600 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                    Top 5 Least Expensive
                  </h4>
                  <div className="space-y-2">
                    {top5Cheapest.map((s, i) => (
                      <div key={s.abbr} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 w-4">{i + 1}.</span>
                          <span className="text-sm font-semibold text-navy-950">{s.name}</span>
                        </div>
                        <span className="text-sm font-bold text-sage-600">{fmt(s.avg)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="card p-6 bg-warm-50 border-warm-200">
              <h3 className="text-base font-bold text-navy-950 mb-3">Related Calculators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { name: "Mortgage Calculator", href: "/calculators/mortgage" },
                  { name: "Rent vs Buy", href: "/calculators/rent-vs-buy" },
                  { name: "Rental Property ROI", href: "/calculators/rental-roi" },
                  { name: "Home Maintenance Budget", href: "/calculators/home-maintenance" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors py-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SEO Article */}
        <article className="mt-16 prose-brand max-w-4xl mx-auto">
          <h2>Home Insurance: The Complete Guide for Homeowners</h2>

          <p>
            Homeowner&apos;s insurance is one of those expenses that feels invisible — until you need it. Whether you are buying your first home,
            refinancing, or simply reviewing your current coverage, understanding how home insurance works can save you hundreds of dollars a year
            and protect you from catastrophic financial loss. The average American homeowner pays {fmt(NATIONAL_AVG)} per year, but premiums
            vary wildly by state, property characteristics, and the coverage options you choose. This guide breaks down everything you need to
            know to make smart insurance decisions.
          </p>

          <h3>Types of Homeowner&apos;s Insurance Coverage</h3>
          <p>
            A standard homeowner&apos;s insurance policy (HO-3) is actually a bundle of six distinct coverage types, each protecting you against
            different risks. <strong>Dwelling coverage (Coverage A)</strong> pays to repair or rebuild your home&apos;s structure if damaged by a
            covered peril like fire, wind, or hail. This is the core of your policy and should be set to the full replacement cost of your home —
            not its market value, which includes land. <strong>Other structures coverage (Coverage B)</strong> protects detached structures like
            garages, fences, and sheds, typically set at 10% of your dwelling coverage. <strong>Personal property coverage (Coverage C)</strong>
            covers your belongings — furniture, electronics, clothing — usually at 50-70% of dwelling coverage. Most standard policies cover
            personal property on an actual cash value basis (replacement cost minus depreciation), but you can upgrade to replacement cost
            coverage for a small premium increase.
          </p>
          <p>
            <strong>Loss of use coverage (Coverage D)</strong> pays for temporary living expenses if your home becomes uninhabitable after a
            covered loss — hotel bills, restaurant meals, and other costs above your normal expenses. <strong>Personal liability coverage
            (Coverage E)</strong> protects you if someone is injured on your property or if you accidentally damage someone else&apos;s property,
            covering legal defense costs and settlements up to your policy limit (typically $100,000 to $500,000). Finally, <strong>medical
            payments coverage (Coverage F)</strong> pays for minor medical bills when a guest is injured on your property, regardless of fault,
            usually with limits of $1,000 to $5,000.
          </p>

          <h3>How Home Insurance Premiums Are Calculated</h3>
          <p>
            Insurance companies use dozens of rating factors to calculate your premium, but several carry the most weight. <strong>Location</strong>
            is the single biggest factor. States prone to hurricanes (Florida, Louisiana), tornadoes (Oklahoma, Kansas, Texas), or severe
            hailstorms (Colorado, Nebraska, Minnesota) have dramatically higher premiums. Florida homeowners pay an average of {fmt(4231)} per
            year — more than five times what homeowners in Hawaii ({fmt(600)}) pay. Within your state, your specific ZIP code matters too:
            proximity to fire stations, coastlines, floodplains, and crime rates all influence your rate.
          </p>
          <p>
            <strong>Home characteristics</strong> are the second major factor. Your home&apos;s age, construction type, square footage, roof
            material and condition, electrical and plumbing systems, and overall condition all affect your premium. A masonry or brick home
            typically costs 8-12% less to insure than a wood-frame home because it is more resistant to fire and wind damage. Steel-frame
            construction offers the lowest rates. Homes built after 2000 with modern building codes often qualify for discounts of 8-15%
            compared to older homes, which may have outdated wiring, plumbing, or structural elements that increase risk.
          </p>
          <p>
            <strong>Your deductible</strong> has a direct, predictable impact on your premium. Raising your deductible from $500 to $1,000
            typically saves 8-12%, while going to $2,000 can save 15-20% and a $5,000 deductible can save 25-30%. The tradeoff is straightforward:
            you pay more out of pocket when you file a claim, but your monthly costs drop. For most homeowners, a $1,000 to $2,000 deductible
            strikes the right balance — you should never set your deductible higher than what you could comfortably pay from your emergency fund.
          </p>

          <h3>How to Save Money on Home Insurance</h3>
          <p>
            Beyond choosing the right deductible, there are several proven strategies to lower your premiums. <strong>Bundling</strong> your home
            and auto insurance with the same carrier is the single easiest discount, typically saving 10-25%. <strong>Home security
            discounts</strong> are widely available for monitored alarm systems (5-10% off), smoke and carbon monoxide detectors, deadbolts, and
            fire extinguishers. Some insurers now offer discounts for smart home devices like water leak sensors and smart smoke detectors.
          </p>
          <p>
            <strong>Claims-free discounts</strong> reward homeowners who have not filed a claim in 3-5 years, typically saving 5-20%.
            Conversely, filing small claims can raise your rates for years, which is why many advisors recommend only filing claims for losses
            that significantly exceed your deductible. <strong>Credit score</strong> is a major factor in most states — maintaining a score above
            740 can save you hundreds annually compared to scores below 650. <strong>Shopping around</strong> is critical because pricing varies
            dramatically between carriers for the same property. Getting quotes from at least three insurers every two to three years ensures you
            are not overpaying.
          </p>
          <p>
            Home improvements can also reduce your premium: upgrading your roof to impact-resistant shingles, replacing old electrical wiring,
            installing a sump pump or backup generator, and adding storm shutters or hurricane clips in wind-prone areas all qualify for
            discounts with most carriers. Some states like Florida offer substantial wind mitigation credits that can cut premiums by 20-45%.
          </p>

          <h3>Flood and Earthquake Riders: What Standard Policies Do Not Cover</h3>
          <p>
            One of the most dangerous misconceptions in homeownership is assuming your standard home insurance policy covers every natural
            disaster. It does not. <strong>Flood damage</strong> is explicitly excluded from every standard homeowner&apos;s policy. If your home
            is in a FEMA-designated flood zone and you have a federally-backed mortgage, flood insurance is required. But even if it is not
            required, it is often wise — over 25% of flood claims come from outside high-risk zones. The National Flood Insurance Program (NFIP)
            offers policies up to $250,000 for dwelling coverage and $100,000 for contents. Private flood insurers may offer higher limits and
            sometimes lower rates.
          </p>
          <p>
            <strong>Earthquake damage</strong> is also excluded from standard policies. If you live in a seismically active area (California,
            Pacific Northwest, New Madrid fault zone), a separate earthquake policy or endorsement is essential. In California, the California
            Earthquake Authority (CEA) offers policies through participating insurers. Earthquake insurance typically comes with high deductibles
            (10-20% of dwelling coverage), so a $500,000 home might have a $50,000-$100,000 deductible. Despite the high deductible, this
            coverage prevents total financial loss in a major quake.
          </p>
          <p>
            Other perils you may need separate coverage for include <strong>sewer and drain backup</strong> (a common and costly endorsement,
            typically $50-$100/year for $10,000-$25,000 in coverage), <strong>identity theft protection</strong>, <strong>equipment breakdown
            </strong> (covering HVAC, water heaters, and appliances), and <strong>scheduled personal property riders</strong> for high-value
            items like jewelry, art, and collectibles that exceed standard sub-limits.
          </p>

          <h3>The Claims Process: What to Expect and How to Prepare</h3>
          <p>
            When disaster strikes, knowing how to navigate the claims process can make the difference between a smooth recovery and months of
            frustration. <strong>Document everything before you need to.</strong> Create a home inventory — photograph or video every room,
            record serial numbers for electronics, and keep receipts for major purchases. Store this documentation in the cloud or a safe deposit
            box so it survives whatever damages your home. Apps like Encircle or Sortly make this process simple.
          </p>
          <p>
            When you need to file a claim, act quickly: contact your insurer within 24 hours, take photos and video of all damage before making
            any temporary repairs, and save all receipts for emergency expenses (tarps, board-up services, temporary housing). Your insurer will
            assign an adjuster to inspect the damage and estimate repair costs. You have the right to get your own independent estimates, and if
            you disagree with the adjuster&apos;s assessment, you can request a re-inspection or hire a public adjuster to advocate on your behalf.
            Public adjusters typically charge 5-15% of the claim payout but can often negotiate significantly higher settlements.
          </p>
          <p>
            A critical tip: <strong>do not accept the first offer if it seems low.</strong> Initial estimates from insurance adjusters are often
            conservative. Provide detailed contractor estimates, document every damaged item, and be persistent. Most states have a Department of
            Insurance that handles complaints and can intervene if your insurer is acting in bad faith. Understanding your policy before you
            need it — knowing your coverage limits, deductibles, and exclusions — puts you in a much stronger position when it matters most.
          </p>

          <h3>How Much Coverage Do You Actually Need?</h3>
          <p>
            The most common mistake homeowners make is insuring their home for its market value rather than its replacement cost. Market value
            includes land, location premiums, and market conditions — none of which matter when you are rebuilding a structure. Your dwelling
            coverage should reflect the cost to rebuild your home from scratch at current construction prices, which may be higher or lower than
            what you paid for the property. Most insurers offer a replacement cost estimator, but getting an independent appraisal or
            contractor estimate every few years ensures your coverage keeps pace with rising construction costs. For high-value homes,
            guaranteed replacement cost or extended replacement cost endorsements (which pay 125-150% of your dwelling limit) provide an
            essential buffer against post-disaster construction cost surges, when demand for contractors and materials spikes in your area.
          </p>
          <p>
            For personal property, take stock of what you actually own. Many homeowners are surprised to find that their belongings are worth
            far more than they assumed — a fully furnished home with electronics, appliances, clothing, and personal items can easily exceed
            $75,000-$150,000 in replacement value. Upgrading from actual cash value to replacement cost coverage for personal property typically
            adds only 10-15% to your premium but ensures you can replace damaged items with new equivalents rather than receiving depreciated
            payouts that leave you short. Review your coverage annually, especially after major purchases, renovations, or life changes.
          </p>
        </article>
      </div>
    </>
  );
}
