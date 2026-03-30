"use client";

import { useState, useMemo } from "react";

/* ────────────────────────────────────────────────────────
   CONTRACTOR QUOTE ANALYZER
   Helps homeowners evaluate whether a contractor's quote
   is fair by comparing it against national per-sqft cost
   data, adjusted for region. Includes a visual fairness
   meter, actionable tips, and red-flag warnings.
   ──────────────────────────────────────────────────────── */

const regions: Record<string, { label: string; multiplier: number }> = {
  northeast: { label: "Northeast (NY, NJ, PA, CT, MA)", multiplier: 1.15 },
  southeast: { label: "Southeast (FL, GA, NC, SC, VA)", multiplier: 0.95 },
  midwest: { label: "Midwest (OH, IL, MI, IN, WI)", multiplier: 0.90 },
  southwest: { label: "Southwest (TX, AZ, NM, NV)", multiplier: 0.92 },
  west: { label: "West Coast (CA, OR, WA)", multiplier: 1.25 },
  mountain: { label: "Mountain (CO, UT, ID, MT)", multiplier: 1.00 },
};

// Per-sqft pricing data (national baseline, USD)
// low = budget/DIY-assist, mid = typical licensed contractor, high = premium/specialty
const projectTypes: Record<
  string,
  { label: string; low: number; mid: number; high: number; unit: string; defaultArea: number; icon: string }
> = {
  kitchen_remodel: {
    label: "Kitchen Remodel",
    low: 75,
    mid: 150,
    high: 250,
    unit: "sqft",
    defaultArea: 150,
    icon: "🍳",
  },
  bathroom_remodel: {
    label: "Bathroom Remodel",
    low: 120,
    mid: 200,
    high: 350,
    unit: "sqft",
    defaultArea: 75,
    icon: "🚿",
  },
  roof_replacement: {
    label: "Roof Replacement",
    low: 4,
    mid: 8,
    high: 15,
    unit: "sqft",
    defaultArea: 2000,
    icon: "🏠",
  },
  hvac_install: {
    label: "HVAC Installation",
    low: 6,
    mid: 12,
    high: 20,
    unit: "sqft",
    defaultArea: 2000,
    icon: "🌡️",
  },
  plumbing_repair: {
    label: "Plumbing Repair",
    low: 50,
    mid: 100,
    high: 175,
    unit: "sqft",
    defaultArea: 50,
    icon: "🔧",
  },
  electrical_work: {
    label: "Electrical Work",
    low: 40,
    mid: 80,
    high: 150,
    unit: "sqft",
    defaultArea: 100,
    icon: "⚡",
  },
  painting_interior: {
    label: "Painting (Interior)",
    low: 2,
    mid: 4,
    high: 7,
    unit: "sqft",
    defaultArea: 1500,
    icon: "🎨",
  },
  painting_exterior: {
    label: "Painting (Exterior)",
    low: 3,
    mid: 5.5,
    high: 9,
    unit: "sqft",
    defaultArea: 2000,
    icon: "🖌️",
  },
  flooring_install: {
    label: "Flooring Installation",
    low: 6,
    mid: 12,
    high: 22,
    unit: "sqft",
    defaultArea: 500,
    icon: "🪵",
  },
  deck_build: {
    label: "Deck Build",
    low: 20,
    mid: 40,
    high: 75,
    unit: "sqft",
    defaultArea: 300,
    icon: "🪑",
  },
  fence_install: {
    label: "Fence Installation",
    low: 15,
    mid: 30,
    high: 55,
    unit: "linear ft",
    defaultArea: 150,
    icon: "🏡",
  },
  window_replacement: {
    label: "Window Replacement",
    low: 300,
    mid: 650,
    high: 1100,
    unit: "per window",
    defaultArea: 10,
    icon: "🪟",
  },
  siding: {
    label: "Siding Replacement",
    low: 5,
    mid: 10,
    high: 18,
    unit: "sqft",
    defaultArea: 2000,
    icon: "🧱",
  },
  driveway_concrete: {
    label: "Driveway / Concrete",
    low: 8,
    mid: 14,
    high: 24,
    unit: "sqft",
    defaultArea: 600,
    icon: "🛣️",
  },
  landscaping: {
    label: "Landscaping",
    low: 5,
    mid: 15,
    high: 30,
    unit: "sqft",
    defaultArea: 1000,
    icon: "🌿",
  },
};

function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function getAssessment(pctFromMedian: number): {
  label: string;
  color: string;
  bg: string;
  border: string;
  text: string;
  description: string;
} {
  if (pctFromMedian < -25) {
    return {
      label: "Suspiciously Low",
      color: "text-red-700",
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      description:
        "This quote is significantly below average. While it could be a great deal, quotes this low sometimes indicate cut corners, unlicensed work, cheap materials, or hidden costs that surface later. Ask for a detailed material and labor breakdown before signing.",
    };
  }
  if (pctFromMedian < -10) {
    return {
      label: "Below Average",
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-800",
      description:
        "This quote is below the typical range — a solid deal if the contractor is licensed and insured. Verify their credentials and ask what materials they plan to use to make sure quality isn't being sacrificed for the lower price.",
    };
  }
  if (pctFromMedian <= 15) {
    return {
      label: "Fair / Average",
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-800",
      description:
        "This quote falls within the normal range for your area and project type. This is what most licensed contractors charge. Compare two or three more quotes to confirm, but this looks reasonable.",
    };
  }
  if (pctFromMedian <= 35) {
    return {
      label: "Above Average",
      color: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      description:
        "This quote is higher than average. It could be justified by premium materials, a highly experienced crew, or included warranties. Ask the contractor to explain what drives the premium and whether any line items can be adjusted.",
    };
  }
  return {
    label: "Overpriced",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    description:
      "This quote is significantly above the typical range. Unless the scope includes premium upgrades, structural work, or unusual site conditions, you should get additional quotes. Some contractors quote high expecting negotiation.",
  };
}

export default function ContractorQuotePage() {
  const [projectType, setProjectType] = useState<string>("kitchen_remodel");
  const [area, setArea] = useState<string>("150");
  const [quoteAmount, setQuoteAmount] = useState<string>("22000");
  const [region, setRegion] = useState<string>("southeast");

  // Update default area when project type changes
  const handleProjectChange = (type: string) => {
    setProjectType(type);
    const project = projectTypes[type];
    if (project) {
      setArea(String(project.defaultArea));
    }
  };

  const result = useMemo(() => {
    const sq = parseFloat(area) || 0;
    const quote = parseFloat(quoteAmount) || 0;
    const project = projectTypes[projectType];
    const regionMult = regions[region]?.multiplier ?? 1.0;

    if (sq <= 0 || quote <= 0 || !project) return null;

    // Regional adjusted per-unit costs
    const lowPerUnit = project.low * regionMult;
    const midPerUnit = project.mid * regionMult;
    const highPerUnit = project.high * regionMult;

    // Total cost ranges for this square footage
    const lowTotal = lowPerUnit * sq;
    const midTotal = midPerUnit * sq;
    const highTotal = highPerUnit * sq;

    // Where the quote falls relative to median
    const pctFromMedian = ((quote - midTotal) / midTotal) * 100;

    // Assessment
    const assessment = getAssessment(pctFromMedian);

    // Fair range (10% below mid to 15% above mid)
    const fairLow = midTotal * 0.9;
    const fairHigh = midTotal * 1.15;

    // Per-unit cost of the quote
    const quotePerUnit = quote / sq;

    // Meter positioning: scale from lowTotal * 0.5 to highTotal * 1.3
    const meterMin = lowTotal * 0.5;
    const meterMax = highTotal * 1.3;
    const meterRange = meterMax - meterMin;
    const quotePosition = Math.max(0, Math.min(100, ((quote - meterMin) / meterRange) * 100));
    const lowPosition = ((lowTotal - meterMin) / meterRange) * 100;
    const midPosition = ((midTotal - meterMin) / meterRange) * 100;
    const highPosition = ((highTotal - meterMin) / meterRange) * 100;

    return {
      lowPerUnit,
      midPerUnit,
      highPerUnit,
      lowTotal,
      midTotal,
      highTotal,
      pctFromMedian,
      assessment,
      fairLow,
      fairHigh,
      quotePerUnit,
      quotePosition,
      lowPosition,
      midPosition,
      highPosition,
      regionMult,
    };
  }, [projectType, area, quoteAmount, region]);

  const currentProject = projectTypes[projectType];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="max-w-3xl mb-12">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
          <a href="/" className="hover:text-amber-600 transition-colors">Home</a>
          <span>/</span>
          <span className="text-slate-600">Contractor Quote Analyzer</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Contractor Quote Analyzer
        </h1>
        <p className="mt-4 text-lg text-slate-500 leading-relaxed">
          Enter your contractor&apos;s quote and project details to see if the price
          is fair. We compare it against regional cost data for 15 common home
          improvement projects so you can negotiate with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Input Panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-7">
          <h2 className="text-lg font-bold text-slate-900 mb-6">
            Quote Details
          </h2>

          <div className="space-y-5">
            {/* Project Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Project Type
              </label>
              <select
                value={projectType}
                onChange={(e) => handleProjectChange(e.target.value)}
                className="calc-input appearance-none cursor-pointer"
              >
                {Object.entries(projectTypes).map(([key, p]) => (
                  <option key={key} value={key}>
                    {p.icon} {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Area / Quantity */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {currentProject?.unit === "per window"
                  ? "Number of Windows"
                  : currentProject?.unit === "linear ft"
                  ? "Linear Feet"
                  : "Square Footage / Area Affected"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="calc-input"
                  placeholder={String(currentProject?.defaultArea ?? 100)}
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  {currentProject?.unit ?? "sqft"}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {currentProject?.unit === "per window"
                  ? "Total number of windows being replaced"
                  : currentProject?.unit === "linear ft"
                  ? "Total linear feet of fence"
                  : "Total area the project covers"}
              </p>
            </div>

            {/* Quote Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Your Quote Amount
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  $
                </span>
                <input
                  type="number"
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                  className="calc-input pl-8"
                  placeholder="22,000"
                />
              </div>
              <p className="mt-1 text-xs text-slate-400">
                The total price your contractor quoted (materials + labor)
              </p>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Your Region
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
              <p className="mt-1 text-xs text-slate-400">
                Costs vary by region — labor rates and material availability differ
              </p>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-3 space-y-6">
          {result ? (
            <>
              {/* Assessment Card */}
              <div
                className={`result-card ${result.assessment.bg} rounded-2xl p-6 border ${result.assessment.border} shadow-sm`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Quote Assessment
                    </p>
                    <p className={`text-2xl sm:text-3xl font-extrabold mt-1 ${result.assessment.color}`}>
                      {result.assessment.label}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">vs. Median</p>
                    <p
                      className={`text-xl font-bold ${
                        result.pctFromMedian > 0 ? "text-amber-600" : "text-emerald-600"
                      }`}
                    >
                      {result.pctFromMedian > 0 ? "+" : ""}
                      {result.pctFromMedian.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <p className={`mt-3 text-sm leading-relaxed ${result.assessment.text}`}>
                  {result.assessment.description}
                </p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="result-card bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg shadow-amber-500/15">
                  <p className="text-sm font-medium text-amber-100">
                    Your Quote
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold mt-2">
                    {formatUSD(parseFloat(quoteAmount) || 0)}
                  </p>
                  <p className="text-sm text-amber-100 mt-1">
                    {formatUSD(result.quotePerUnit)} / {currentProject.unit}
                  </p>
                </div>
                <div className="result-card bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">
                    Estimated Fair Range
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                    {formatUSD(result.fairLow)} &ndash; {formatUSD(result.fairHigh)}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    for {area} {currentProject.unit} in your region
                  </p>
                </div>
              </div>

              {/* Fairness Meter */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Price Fairness Meter
                </h3>
                <div className="relative">
                  {/* Bar background with gradient zones */}
                  <div className="w-full h-8 rounded-full overflow-hidden flex">
                    <div
                      className="bg-red-200 h-full"
                      style={{ width: `${result.lowPosition}%` }}
                    />
                    <div
                      className="bg-emerald-200 h-full"
                      style={{ width: `${result.highPosition - result.lowPosition}%` }}
                    />
                    <div
                      className="bg-red-200 h-full"
                      style={{ width: `${100 - result.highPosition}%` }}
                    />
                  </div>

                  {/* Fair zone overlay */}
                  <div
                    className="absolute top-0 h-8 bg-emerald-400/30 border-x-2 border-emerald-500/50"
                    style={{
                      left: `${Math.max(0, ((result.fairLow - result.lowTotal * 0.5) / (result.highTotal * 1.3 - result.lowTotal * 0.5)) * 100)}%`,
                      width: `${((result.fairHigh - result.fairLow) / (result.highTotal * 1.3 - result.lowTotal * 0.5)) * 100}%`,
                    }}
                  />

                  {/* Quote marker */}
                  <div
                    className="absolute top-0 h-8 flex flex-col items-center"
                    style={{ left: `${result.quotePosition}%`, transform: "translateX(-50%)" }}
                  >
                    <div className="w-1 h-8 bg-slate-800 rounded-full" />
                  </div>

                  {/* Quote label */}
                  <div
                    className="absolute -bottom-7 flex flex-col items-center"
                    style={{
                      left: `${result.quotePosition}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
                      Your Quote
                    </span>
                  </div>

                  {/* Range labels */}
                  <div className="flex justify-between mt-10 text-xs text-slate-500">
                    <span>
                      Low: {formatUSD(result.lowTotal)}
                    </span>
                    <span className="font-medium text-slate-700">
                      Mid: {formatUSD(result.midTotal)}
                    </span>
                    <span>
                      High: {formatUSD(result.highTotal)}
                    </span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-5 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-200" />
                    <span className="text-slate-500">Below / Above typical range</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-200" />
                    <span className="text-slate-500">Typical range</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-400/50 border border-emerald-500/50" />
                    <span className="text-slate-500">Fair zone</span>
                  </div>
                </div>
              </div>

              {/* Per-unit Breakdown */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900">
                    Regional Price Breakdown
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {currentProject.label} costs per {currentProject.unit} in your region ({regions[region].label.split("(")[0].trim()}, {result.regionMult}x multiplier)
                  </p>
                </div>
                <div className="divide-y divide-slate-100">
                  <div className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📉</span>
                      <span className="text-sm font-medium text-slate-700">
                        Budget / Low End
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-slate-900">
                        {formatUSD(result.lowPerUnit)}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">
                        / {currentProject.unit}
                      </span>
                      <span className="text-xs text-slate-400 ml-2">
                        ({formatUSD(result.lowTotal)} total)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📊</span>
                      <span className="text-sm font-medium text-slate-700">
                        Typical / Median
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-emerald-700">
                        {formatUSD(result.midPerUnit)}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">
                        / {currentProject.unit}
                      </span>
                      <span className="text-xs text-slate-400 ml-2">
                        ({formatUSD(result.midTotal)} total)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📈</span>
                      <span className="text-sm font-medium text-slate-700">
                        Premium / High End
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-slate-900">
                        {formatUSD(result.highPerUnit)}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">
                        / {currentProject.unit}
                      </span>
                      <span className="text-xs text-slate-400 ml-2">
                        ({formatUSD(result.highTotal)} total)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">💰</span>
                      <span className="text-sm font-bold text-slate-900">
                        Your Quote
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-bold ${result.assessment.color}`}>
                        {formatUSD(result.quotePerUnit)}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">
                        / {currentProject.unit}
                      </span>
                      <span className="text-xs text-slate-400 ml-2">
                        ({formatUSD(parseFloat(quoteAmount) || 0)} total)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips Sections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Questions to Ask */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Questions to Ask Your Contractor
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Can I see your license and proof of insurance?",
                      "Will you provide a detailed written estimate with material and labor broken out?",
                      "What is your timeline, and what could cause delays?",
                      "Do you pull permits, and are permit fees included in the quote?",
                      "What warranty do you offer on labor and materials?",
                      "Who will be on-site daily — you or a crew foreman?",
                      "How do you handle change orders and unexpected issues?",
                      "Can I speak with three recent references for similar projects?",
                      "What is your payment schedule? (Never pay more than 10-15% upfront.)",
                      "Will you provide lien waivers from subcontractors?",
                    ].map((q) => (
                      <li key={q} className="flex gap-2.5 text-sm text-slate-600">
                        <span className="text-amber-500 mt-0.5 shrink-0">&#10003;</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Red Flags */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Red Flags to Watch For
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Demands full payment upfront or cash only",
                      "No written contract or vague scope of work",
                      "Cannot provide license number or proof of insurance",
                      "Pressures you to decide immediately (\"price only good today\")",
                      "Quote is dramatically lower than all other bids",
                      "No physical business address or only a P.O. box",
                      "Refuses to pull required permits",
                      "Wants to start before signing a contract",
                      "No references or only references from years ago",
                      "Uses a personal vehicle with no company branding",
                    ].map((flag) => (
                      <li key={flag} className="flex gap-2.5 text-sm text-slate-600">
                        <span className="text-red-500 mt-0.5 shrink-0">&#9888;</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Methodology note */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>How we calculated this:</strong> We use national per-unit
                  cost data for {currentProject.label.toLowerCase()} (low: {formatUSD(currentProject.low)}, mid: {formatUSD(currentProject.mid)}, high: {formatUSD(currentProject.high)} per {currentProject.unit}), adjusted by
                  your regional multiplier ({result.regionMult}x for {regions[region].label.split("(")[0].trim()}).
                  The &ldquo;fair zone&rdquo; represents 90-115% of the regional median. Actual costs
                  may vary based on material choices, site conditions, and project complexity.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 text-center">
              <p className="text-slate-400">
                Enter your project details and quote amount to see the analysis.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <article className="max-w-3xl mx-auto mt-20 prose prose-slate prose-lg">
        <h2>How to Evaluate a Contractor Quote Like a Pro</h2>
        <p>
          Getting a quote from a contractor can feel like navigating a foreign language.
          The numbers seem arbitrary, the line items are confusing, and you have no idea
          whether the price is fair or inflated. The truth is that contractor pricing
          follows predictable patterns, and once you understand those patterns, you can
          evaluate any quote with confidence.
        </p>

        <h3>Understanding What Goes Into a Contractor Quote</h3>
        <p>
          A legitimate contractor quote is built from three main components: materials,
          labor, and overhead. Materials typically account for 30-50% of the total cost
          depending on the project type. Labor usually represents 35-55%. The remaining
          10-20% covers overhead — insurance, licensing fees, vehicle costs, office
          expenses, and the contractor&apos;s profit margin.
        </p>
        <p>
          When a quote seems high, it is often the labor component that drives the
          difference. Experienced contractors with specialized skills, proper insurance,
          and a reliable crew command higher rates. This is not necessarily a bad thing.
          Cheap labor often means inexperienced workers, which leads to mistakes, delays,
          and costly repairs down the road.
        </p>

        <h3>Why You Should Always Get Three Quotes</h3>
        <p>
          The golden rule of hiring contractors is to get at least three written quotes
          for any project over $1,000. This gives you a natural range to compare against.
          If two quotes are similar and one is dramatically lower, the low bid should
          raise questions — not excitement. Conversely, if one quote is much higher, the
          contractor should be able to articulate exactly what justifies the premium,
          whether that is better materials, longer warranties, or a more experienced crew.
        </p>
        <p>
          When comparing quotes, make sure you are comparing equivalent scopes of work.
          One contractor might include demolition and disposal while another does not.
          One might quote premium materials while another uses builder-grade. A quote
          that looks cheaper on paper can end up costing more once you account for what
          was left out.
        </p>

        <h3>Regional Price Variation Is Real</h3>
        <p>
          Contractor costs vary significantly by geography. A kitchen remodel that costs
          $25,000 in the Midwest might run $40,000 or more on the West Coast. This is
          driven by differences in labor rates, material availability, building code
          requirements, and cost of living. Our calculator applies regional multipliers
          based on national cost data from industry sources like the National Association
          of Home Builders, RSMeans, and Remodeling Magazine&apos;s annual Cost vs. Value
          report.
        </p>

        <h3>What a Good Quote Should Include</h3>
        <p>
          A professional contractor quote should be a detailed written document, not a
          verbal estimate or a number scribbled on the back of a business card. At
          minimum, it should include a detailed scope of work describing exactly what
          will and will not be done, an itemized breakdown of materials and labor, a
          project timeline with start and completion dates, payment terms and schedule,
          warranty information for both labor and materials, and the contractor&apos;s
          license and insurance details.
        </p>
        <p>
          If a contractor hands you a one-line quote — for example, &ldquo;Kitchen remodel
          — $28,000&rdquo; with no further detail — ask for a full breakdown. A contractor
          who cannot or will not itemize their pricing may not have a clear plan for
          your project, which often leads to scope creep, change orders, and cost
          overruns.
        </p>

        <h3>The Danger of Choosing the Lowest Bid</h3>
        <p>
          Homeowners naturally gravitate toward the lowest price, but the cheapest
          contractor is rarely the best value. Low bids can signal several problems:
          the contractor may be unlicensed or uninsured, plan to use substandard
          materials, employ inexperienced labor, or plan to cut corners on prep work
          that is invisible until problems surface months later. A common tactic among
          less scrupulous contractors is to bid low to win the job, then pile on change
          orders once work begins.
        </p>
        <p>
          The best approach is to look for a quote in the middle of your range from a
          contractor who is licensed, insured, has strong references, and communicates
          clearly. A slightly higher price from a contractor you trust will almost
          always deliver better long-term value than a bargain from someone you found
          on a random online listing with no reviews.
        </p>

        <h3>Negotiation Tips That Actually Work</h3>
        <p>
          Contractors expect some negotiation, but approaching it the wrong way can
          backfire. Instead of simply asking &ldquo;Can you do it for less?&rdquo; — which
          often results in corners being cut — try more targeted approaches. Ask if
          there are material alternatives that could reduce costs without sacrificing
          quality. Ask whether scheduling the project during the contractor&apos;s slower
          season (typically late fall through early spring) would earn a discount.
          Offer to handle demolition or disposal yourself if you are physically able.
          Bundle multiple projects together for a volume discount. These approaches
          show respect for the contractor&apos;s expertise while finding legitimate ways
          to bring the price closer to your budget.
        </p>

        <h3>When to Walk Away</h3>
        <p>
          No matter how good the price seems, walk away if the contractor cannot provide
          proof of licensing and insurance, refuses to sign a written contract, demands
          more than 10-15% of the total upfront, or pressures you to make an immediate
          decision. These are not negotiation tactics — they are warning signs that
          the contractor may not deliver on their promises, and you could be left with
          an unfinished project, property damage, or a lien on your home from unpaid
          subcontractors.
        </p>
      </article>
    </div>
  );
}
