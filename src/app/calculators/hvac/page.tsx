"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

/* ────────────────────────────────────────────────────────
   HVAC COST ESTIMATOR
   Compares new system cost vs repair cost and recommends
   repair or replace based on: system age, condition,
   50% cost rule, expected lifespan, and energy savings.
   Regional labor multipliers adjust all estimates.
   ──────────────────────────────────────────────────────── */

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

/* ── System data ──────────────────────────────────────── */

interface SystemType {
  label: string;
  costLow: number;
  costHigh: number;
  lifespan: number;
  avgRepairCost: number;
  annualEnergyCost: number;     // avg annual operating cost for old system
  newEnergyReduction: number;   // % savings with modern unit
  efficiencyRating: string;     // SEER / AFUE descriptor
}

const systemTypes: Record<string, SystemType> = {
  centralAC: {
    label: "Central Air Conditioner",
    costLow: 3800,
    costHigh: 7500,
    lifespan: 15,
    avgRepairCost: 450,
    annualEnergyCost: 1200,
    newEnergyReduction: 0.30,
    efficiencyRating: "SEER 16-21",
  },
  heatPump: {
    label: "Heat Pump",
    costLow: 4200,
    costHigh: 8500,
    lifespan: 15,
    avgRepairCost: 550,
    annualEnergyCost: 1400,
    newEnergyReduction: 0.35,
    efficiencyRating: "SEER 16-22 / HSPF 9-10",
  },
  gasFurnace: {
    label: "Gas Furnace",
    costLow: 2800,
    costHigh: 6500,
    lifespan: 20,
    avgRepairCost: 400,
    annualEnergyCost: 900,
    newEnergyReduction: 0.25,
    efficiencyRating: "AFUE 95-98%",
  },
  electricFurnace: {
    label: "Electric Furnace",
    costLow: 2000,
    costHigh: 4500,
    lifespan: 20,
    avgRepairCost: 300,
    annualEnergyCost: 1500,
    newEnergyReduction: 0.15,
    efficiencyRating: "AFUE 95-100%",
  },
  miniSplit: {
    label: "Ductless Mini-Split",
    costLow: 3000,
    costHigh: 8000,
    lifespan: 20,
    avgRepairCost: 500,
    annualEnergyCost: 1000,
    newEnergyReduction: 0.35,
    efficiencyRating: "SEER 20-30+",
  },
  boilerHotWater: {
    label: "Boiler (Hot Water)",
    costLow: 3500,
    costHigh: 10000,
    lifespan: 25,
    avgRepairCost: 600,
    annualEnergyCost: 1100,
    newEnergyReduction: 0.20,
    efficiencyRating: "AFUE 90-98%",
  },
  boilerSteam: {
    label: "Boiler (Steam)",
    costLow: 4000,
    costHigh: 10000,
    lifespan: 25,
    avgRepairCost: 700,
    annualEnergyCost: 1300,
    newEnergyReduction: 0.18,
    efficiencyRating: "AFUE 80-90%",
  },
};

const regions: Record<string, { label: string; multiplier: number }> = {
  northeast: { label: "Northeast (NY, NJ, PA, CT, MA)", multiplier: 1.15 },
  southeast: { label: "Southeast (FL, GA, NC, SC, VA)", multiplier: 0.95 },
  midwest: { label: "Midwest (OH, IL, MI, IN, WI)", multiplier: 1.0 },
  southwest: { label: "Southwest (TX, AZ, NM, NV)", multiplier: 0.90 },
  westCoast: { label: "West Coast (CA, OR, WA)", multiplier: 1.20 },
  mountain: { label: "Mountain (CO, UT, ID, MT)", multiplier: 1.05 },
};

const conditions: Record<string, { label: string; repairMult: number; efficiencyPenalty: number }> = {
  good: { label: "Good — runs well, minor issues", repairMult: 0.7, efficiencyPenalty: 0.05 },
  fair: { label: "Fair — occasional breakdowns", repairMult: 1.0, efficiencyPenalty: 0.15 },
  poor: { label: "Poor — frequent repairs, noisy", repairMult: 1.6, efficiencyPenalty: 0.30 },
};

/* ── Size multiplier based on sqft ────────────────────── */

function getSizeFactor(sqft: number): number {
  if (sqft <= 1000) return 0.65;
  if (sqft <= 1500) return 0.78;
  if (sqft <= 2000) return 0.88;
  if (sqft <= 2500) return 1.0;
  if (sqft <= 3000) return 1.12;
  if (sqft <= 3500) return 1.22;
  if (sqft <= 4000) return 1.32;
  return 1.45;
}

/* ── Component ────────────────────────────────────────── */

export default function HVACCostEstimatorPage() {
  const [systemType, setSystemType] = useState("centralAC");
  const [sqft, setSqft] = useState(2000);
  const [systemAge, setSystemAge] = useState(12);
  const [region, setRegion] = useState("southeast");
  const [condition, setCondition] = useState("fair");

  const result = useMemo(() => {
    const sys = systemTypes[systemType];
    const reg = regions[region];
    const cond = conditions[condition];
    if (!sys || !reg || !cond) return null;

    const sizeFactor = getSizeFactor(sqft);
    const regionMult = reg.multiplier;

    // New system cost range
    const newCostLow = Math.round(sys.costLow * sizeFactor * regionMult);
    const newCostHigh = Math.round(sys.costHigh * sizeFactor * regionMult);
    const newCostMid = Math.round((newCostLow + newCostHigh) / 2);

    // Repair cost estimate — scales with condition and age
    const ageFactor = 1 + Math.max(0, (systemAge - 5) * 0.08);
    const repairCost = Math.round(sys.avgRepairCost * cond.repairMult * ageFactor * regionMult);

    // Lifespan analysis
    const remainingLife = Math.max(0, sys.lifespan - systemAge);
    const newLifespan = sys.lifespan;
    const lifePctUsed = Math.min(100, Math.round((systemAge / sys.lifespan) * 100));

    // Energy savings
    const currentEnergyCost = Math.round(sys.annualEnergyCost * (1 + cond.efficiencyPenalty) * (sqft / 2500));
    const newEnergyCost = Math.round(sys.annualEnergyCost * (1 - sys.newEnergyReduction) * (sqft / 2500));
    const annualSavings = currentEnergyCost - newEnergyCost;

    // Payback period
    const paybackYears = annualSavings > 0 ? Math.round((newCostMid / annualSavings) * 10) / 10 : 0;

    // Repair vs Replace recommendation (50% rule + age + condition)
    const fiftyPctCost = newCostMid * 0.5;
    let recommendation: "repair" | "replace" | "borderline";
    const reasons: string[] = [];

    if (repairCost > fiftyPctCost) {
      recommendation = "replace";
      reasons.push(`Repair cost (${fmt(repairCost)}) exceeds 50% of new system cost (${fmt(fiftyPctCost)}) — the industry standard threshold`);
    } else if (systemAge >= sys.lifespan * 0.85) {
      recommendation = "replace";
      reasons.push(`Your system is ${systemAge} years old — at or beyond ${Math.round(sys.lifespan * 0.85)} years, the end of its expected lifespan`);
    } else if (condition === "poor" && systemAge >= sys.lifespan * 0.6) {
      recommendation = "replace";
      reasons.push("Poor condition combined with significant age means ongoing repairs will cost more than replacement");
    } else if (condition === "poor" && repairCost > fiftyPctCost * 0.7) {
      recommendation = "borderline";
      reasons.push(`Repair cost is approaching the 50% replacement threshold, and system condition is poor`);
    } else {
      recommendation = "repair";
      reasons.push(`Repair cost (${fmt(repairCost)}) is well below 50% of replacement cost (${fmt(fiftyPctCost)})`);
    }

    if (recommendation === "replace" && annualSavings > 300) {
      reasons.push(`A new ${sys.efficiencyRating}-rated system will save approximately ${fmt(annualSavings)}/year in energy costs`);
    }
    if (recommendation === "repair" && remainingLife >= 5) {
      reasons.push(`Your system still has an estimated ${remainingLife} years of remaining life`);
    }
    if (recommendation === "repair" && remainingLife < 5 && remainingLife > 0) {
      reasons.push(`However, only ~${remainingLife} years of life remain — start budgeting for replacement`);
    }
    if (recommendation === "borderline") {
      reasons.push("Get two to three repair quotes — if any approach 50% of replacement cost, replace instead");
    }

    return {
      newCostLow,
      newCostHigh,
      newCostMid,
      repairCost,
      recommendation,
      reasons,
      annualSavings,
      paybackYears,
      remainingLife,
      newLifespan,
      lifePctUsed,
      currentEnergyCost,
      newEnergyCost,
      efficiencyRating: sys.efficiencyRating,
    };
  }, [systemType, sqft, systemAge, region, condition]);

  const sys = systemTypes[systemType];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/calculators" className="hover:text-brand-400 transition-colors">Calculators</Link>
            <span>/</span>
            <span className="text-white">HVAC Cost Estimator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            HVAC Cost Estimator
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl">
            Should you repair your heating or cooling system, or invest in a new one?
            Enter your system details and get a data-driven recommendation with full cost
            breakdown, energy savings, and payback analysis.
          </p>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Inputs (left column) ─────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            <div className="card p-6 space-y-5">
              <h2 className="text-lg font-bold text-navy-950">System Details</h2>

              {/* System type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">System Type</label>
                <select
                  value={systemType}
                  onChange={(e) => setSystemType(e.target.value)}
                  className="calc-input appearance-none cursor-pointer"
                >
                  {Object.entries(systemTypes).map(([key, s]) => (
                    <option key={key} value={key}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* Square footage */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Home Square Footage
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={500}
                    max={5000}
                    step={100}
                    value={sqft}
                    onChange={(e) => setSqft(+e.target.value)}
                    className="flex-1 accent-brand-500"
                  />
                  <div className="relative w-24">
                    <input
                      type="number"
                      min={500}
                      max={5000}
                      value={sqft}
                      onChange={(e) => {
                        const v = Math.min(5000, Math.max(500, +e.target.value || 500));
                        setSqft(v);
                      }}
                      className="calc-input pr-8 text-right"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">ft&sup2;</span>
                  </div>
                </div>
              </div>

              {/* System age */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Current System Age
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={30}
                    value={systemAge}
                    onChange={(e) => setSystemAge(+e.target.value)}
                    className="flex-1 accent-brand-500"
                  />
                  <span className="text-sm font-bold text-navy-950 w-16 text-right">{systemAge} yrs</span>
                </div>
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Region</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="calc-input appearance-none cursor-pointer"
                >
                  {Object.entries(regions).map(([key, r]) => (
                    <option key={key} value={key}>{r.label}</option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Current System Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="calc-input appearance-none cursor-pointer"
                >
                  {Object.entries(conditions).map(([key, c]) => (
                    <option key={key} value={key}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* System info badge */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="badge badge-brand">{sys.efficiencyRating}</span>
                <span className="badge badge-navy">{sys.lifespan}-year lifespan</span>
                <span className="badge badge-sage">Avg repair: {fmt(sys.avgRepairCost)}</span>
              </div>
            </div>

            {/* Related calculators */}
            <div className="card p-6 bg-warm-50 border-warm-200">
              <h3 className="text-base font-bold text-navy-950 mb-3">Related Calculators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { name: "Home Maintenance", href: "/calculators/home-maintenance" },
                  { name: "Roof Repair vs Replace", href: "/calculators/roof-calculator" },
                  { name: "Contractor Quote Checker", href: "/calculators/contractor-quote" },
                  { name: "Paint Estimator", href: "/calculators/paint-estimator" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors py-1"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Results (right column) ───────────────────── */}
          <div className="lg:col-span-3 space-y-6">
            {result ? (
              <>
                {/* Recommendation banner */}
                <div
                  className={`rounded-2xl p-7 shadow-lg ${
                    result.recommendation === "replace"
                      ? "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/15"
                      : result.recommendation === "borderline"
                        ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-500/15"
                        : "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/15"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {result.recommendation === "replace" ? (
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                      </svg>
                    ) : result.recommendation === "borderline" ? (
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126Z" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    )}
                    <div>
                      <p className="text-sm font-medium opacity-80">Our Recommendation</p>
                      <p className="text-2xl font-extrabold">
                        {result.recommendation === "replace"
                          ? "Replace Your System"
                          : result.recommendation === "borderline"
                            ? "Borderline — Get Quotes"
                            : "Repair Is the Better Value"}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mt-4">
                    {result.reasons.map((r, i) => (
                      <li key={i} className="text-sm opacity-90 flex items-start gap-2">
                        <span className="mt-0.5">&#8226;</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* System lifespan bar */}
                <div className="card p-6">
                  <h3 className="text-lg font-bold text-navy-950 mb-4">System Lifespan</h3>
                  <div className="space-y-4">
                    {/* Current system */}
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-slate-700">Current System</span>
                        <span className="text-slate-500">
                          {systemAge} of {sys.lifespan} years ({result.lifePctUsed}% used)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-5 overflow-hidden">
                        <div
                          className={`h-5 rounded-full transition-all duration-700 ${
                            result.lifePctUsed > 80
                              ? "bg-red-500"
                              : result.lifePctUsed > 60
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                          }`}
                          style={{ width: `${Math.min(result.lifePctUsed, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>Installed</span>
                        <span>
                          {result.remainingLife > 0
                            ? `~${result.remainingLife} years remaining`
                            : "Past expected lifespan"}
                        </span>
                      </div>
                    </div>
                    {/* New system */}
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-slate-700">New System</span>
                        <span className="text-slate-500">{result.newLifespan} years of life</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-5 overflow-hidden">
                        <div
                          className="h-5 rounded-full bg-brand-500 transition-all duration-700"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>Install day</span>
                        <span>Full {result.newLifespan}-year warranty</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side-by-side cost cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Repair */}
                  <div className={`card rounded-2xl p-6 border-2 ${result.recommendation === "repair" ? "border-emerald-300 bg-emerald-50" : "border-slate-200"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-navy-950">Repair</h3>
                      {result.recommendation === "repair" && (
                        <span className="text-xs font-bold bg-emerald-500 text-white px-2.5 py-1 rounded-full">RECOMMENDED</span>
                      )}
                    </div>
                    <p className="text-3xl font-extrabold text-navy-950">{fmt(result.repairCost)}</p>
                    <p className="text-xs text-slate-400 mt-1">Average repair estimate</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Remaining life</span>
                        <span className="font-semibold text-slate-700">~{result.remainingLife} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Current energy cost</span>
                        <span className="font-semibold text-slate-700">{fmt(result.currentEnergyCost)}/yr</span>
                      </div>
                    </div>
                  </div>

                  {/* Replace */}
                  <div className={`card rounded-2xl p-6 border-2 ${result.recommendation === "replace" ? "border-brand-300 bg-brand-50" : "border-slate-200"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-navy-950">Replace</h3>
                      {result.recommendation === "replace" && (
                        <span className="text-xs font-bold bg-brand-500 text-white px-2.5 py-1 rounded-full">RECOMMENDED</span>
                      )}
                    </div>
                    <p className="text-3xl font-extrabold text-navy-950">{fmt(result.newCostMid)}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Range: {fmt(result.newCostLow)} &ndash; {fmt(result.newCostHigh)}
                    </p>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">New system life</span>
                        <span className="font-semibold text-slate-700">{result.newLifespan} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">New energy cost</span>
                        <span className="font-semibold text-slate-700">{fmt(result.newEnergyCost)}/yr</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Energy savings + payback */}
                <div className="card p-6 bg-sage-50 border-sage-200">
                  <h3 className="text-base font-bold text-navy-950 mb-3">Energy Savings with New System</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-extrabold text-sage-700">{fmt(result.annualSavings)}</p>
                      <p className="text-xs text-slate-500 mt-1">Annual savings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-extrabold text-sage-700">{result.paybackYears} yrs</p>
                      <p className="text-xs text-slate-500 mt-1">Payback period</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-extrabold text-sage-700">{fmt(result.annualSavings * result.newLifespan)}</p>
                      <p className="text-xs text-slate-500 mt-1">Lifetime savings</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                    Upgrading from your current system to a new {result.efficiencyRating}-rated unit
                    reduces annual operating costs by approximately{" "}
                    {fmt(result.annualSavings)}. At that rate, the new system pays for itself in
                    roughly {result.paybackYears} years through energy savings alone.
                  </p>
                </div>

                {/* Assumptions */}
                <div className="card p-5 bg-slate-50">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Assumptions</p>
                  <ul className="space-y-1.5 text-sm text-slate-600">
                    <li>Costs include equipment and standard installation labor</li>
                    <li>Regional multiplier applied: {regions[region].label} ({regions[region].multiplier}x)</li>
                    <li>Energy savings based on upgrading to current high-efficiency models</li>
                    <li>Repair estimate accounts for system age, condition, and typical failure rates</li>
                    <li>Always get 2-3 local quotes — actual costs vary by contractor and home specifics</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="card p-12 text-center">
                <p className="text-slate-400">Enter your HVAC system details to see a repair vs replace analysis.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── When to Replace guidelines ─────────────────── */}
        <div className="mt-16 bg-section-warm rounded-2xl p-8 sm:p-10">
          <h2 className="text-2xl font-black text-navy-950 mb-6">When to Replace Your HVAC System</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "The 50% Rule",
                desc: "If a single repair costs more than 50% of what a new system would cost, replacement is the smarter financial move. Multiple smaller repairs that total 50% in a single year also qualify.",
                icon: (
                  <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
              },
              {
                title: "Age Thresholds",
                desc: "Air conditioners and heat pumps last 15-20 years. Furnaces last 15-25 years. Boilers can last 20-30 years. Once past 80% of expected life, budget for replacement even if it is still running.",
                icon: (
                  <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
              },
              {
                title: "Rising Energy Bills",
                desc: "If your energy bills have risen 20%+ over two years without rate increases, your system is losing efficiency. New systems rated SEER 16+ or AFUE 95%+ can cut heating and cooling costs by 25-35%.",
                icon: (
                  <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>
                ),
              },
              {
                title: "Frequent Repairs",
                desc: "More than two repair calls per year is a strong signal. Each visit typically costs $150-500, and the cumulative cost adds up fast. Track your repair spending — it often surprises homeowners.",
                icon: (
                  <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                  </svg>
                ),
              },
              {
                title: "Comfort Problems",
                desc: "Uneven temperatures, excessive humidity, short cycling, or rooms that never reach the set temperature indicate your system can no longer handle the load. A properly sized new system solves this.",
                icon: (
                  <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  </svg>
                ),
              },
              {
                title: "R-22 Refrigerant",
                desc: "If your AC uses R-22 (Freon), which was phased out in 2020, refrigerant refills now cost $100-150 per pound. A single recharge can run $600-2,000. Switching to a modern R-410A system eliminates this.",
                icon: (
                  <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <div className="flex items-center gap-3 mb-2">
                  {item.icon}
                  <h3 className="font-bold text-navy-950">{item.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── System comparison table ────────────────────── */}
        <div className="mt-12 card overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h3 className="text-lg font-bold text-navy-950">HVAC System Comparison</h3>
            <p className="text-sm text-slate-400 mt-1">
              Baseline costs for a mid-size home (2,500 sqft). Your estimate adjusts for home size and region.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold">System</th>
                  <th className="text-left px-6 py-3 font-semibold">Cost Range</th>
                  <th className="text-left px-6 py-3 font-semibold">Lifespan</th>
                  <th className="text-left px-6 py-3 font-semibold">Efficiency</th>
                  <th className="text-left px-6 py-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.entries(systemTypes).map(([key, s]) => (
                  <tr key={key} className={key === systemType ? "bg-brand-50" : "hover:bg-slate-50"}>
                    <td className="px-6 py-3.5 font-medium text-navy-950 whitespace-nowrap">
                      {s.label}
                      {key === systemType && (
                        <span className="ml-2 text-xs bg-brand-200 text-brand-800 px-2 py-0.5 rounded-full">
                          Selected
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-slate-700">
                      {fmt(s.costLow)} &ndash; {fmt(s.costHigh)}
                    </td>
                    <td className="px-6 py-3.5 text-slate-700">{s.lifespan} years</td>
                    <td className="px-6 py-3.5 text-slate-700">{s.efficiencyRating}</td>
                    <td className="px-6 py-3.5 text-slate-500">
                      {key === "centralAC" && "Cooling only, pairs with furnace"}
                      {key === "heatPump" && "Moderate climates, heating + cooling"}
                      {key === "gasFurnace" && "Cold climates, reliable heating"}
                      {key === "electricFurnace" && "No gas access, budget option"}
                      {key === "miniSplit" && "Zone control, no ductwork needed"}
                      {key === "boilerHotWater" && "Radiant floor or baseboard heat"}
                      {key === "boilerSteam" && "Older homes with radiators"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── SEO Article ────────────────────────────────── */}
        <article className="mt-16 prose-brand max-w-4xl mx-auto">
          <h2>The Complete Guide to HVAC Systems: Costs, Efficiency, and Maintenance</h2>

          <p>
            Your HVAC system accounts for roughly 50% of your home&apos;s total energy consumption and represents
            one of the most significant mechanical investments you will make as a homeowner. Understanding how
            different systems work, what efficiency ratings mean, and when to repair versus replace can save you
            thousands of dollars over the life of your equipment. This guide covers everything you need to make
            an informed decision.
          </p>

          <h3>Understanding HVAC System Types</h3>

          <p>
            The right HVAC system depends on your climate, home layout, existing infrastructure, and budget.
            Here is a breakdown of the most common residential systems:
          </p>

          <p>
            <strong>Central Air Conditioners</strong> are the most common cooling system in the United States.
            They use an outdoor compressor unit and an indoor evaporator coil connected by refrigerant lines to
            cool air that is distributed through ductwork. Modern central AC units range from 14 to 25+ SEER
            (Seasonal Energy Efficiency Ratio), with the Department of Energy requiring a minimum of 14 SEER
            for new installations in most regions and 15 SEER in southern states. A higher SEER rating means
            lower operating costs but a higher purchase price — the sweet spot for most homeowners is 16-18 SEER.
          </p>

          <p>
            <strong>Heat Pumps</strong> are essentially air conditioners that can reverse their cycle to provide
            heating as well as cooling. In moderate climates (where temperatures rarely drop below 25-30 degrees
            Fahrenheit), heat pumps are extremely efficient because they move heat rather than generate it. Modern
            cold-climate heat pumps can now operate effectively down to -15 degrees Fahrenheit, making them
            viable in northern regions where they were previously impractical. Heat pumps are rated by both SEER
            (cooling) and HSPF (Heating Seasonal Performance Factor), with higher numbers indicating better efficiency.
          </p>

          <p>
            <strong>Gas Furnaces</strong> remain the most popular heating system in cold climates. They burn natural
            gas to produce heat, which is distributed through ductwork. Efficiency is measured by AFUE (Annual Fuel
            Utilization Efficiency) — a 95% AFUE furnace converts 95 cents of every dollar of gas into heat.
            High-efficiency condensing furnaces achieve 95-98% AFUE versus 80% for standard models. The upfront cost
            difference ($800-1,500 more for high-efficiency) typically pays for itself within 3-5 years through lower
            gas bills.
          </p>

          <p>
            <strong>Electric Furnaces</strong> are less expensive to purchase and install but significantly more
            expensive to operate in most markets because electricity costs more per BTU than natural gas. They are
            primarily used in regions without natural gas infrastructure or in very mild climates where heating
            demand is minimal. AFUE ratings for electric furnaces are nearly 100% since all electrical energy
            converts to heat, but this does not account for the higher cost of electricity itself.
          </p>

          <p>
            <strong>Ductless Mini-Split Systems</strong> are ideal for homes without existing ductwork, additions,
            converted garages, or for zoned temperature control. Each indoor unit serves a specific zone, allowing
            you to heat or cool only the rooms you are using. Mini-splits achieve some of the highest efficiency
            ratings available (SEER 20-30+), and eliminating ductwork removes the 20-30% energy loss typical
            in ducted systems. The main drawback is cost — a multi-zone system with four to five indoor heads
            can run $8,000-15,000 installed.
          </p>

          <p>
            <strong>Boilers</strong> heat water that is circulated through radiators, baseboard heaters, or radiant
            floor tubing. Hot water (hydronic) systems are more common in newer installations, while steam boilers
            are found in older homes built before the 1950s. Boilers tend to last longer than forced-air systems
            (20-30 years) and provide very even, comfortable heat. However, they do not provide cooling, so a
            separate AC system is needed in warm climates.
          </p>

          <h3>Efficiency Ratings Explained: SEER, AFUE, and HSPF</h3>

          <p>
            Efficiency ratings are your key to understanding operating costs, and they have evolved significantly
            in recent years:
          </p>

          <p>
            <strong>SEER (Seasonal Energy Efficiency Ratio)</strong> measures cooling efficiency. The minimum
            federal standard is 14 SEER (15 in the South), but ENERGY STAR certification starts at 15 SEER. Every
            SEER point above minimum saves approximately 7-8% on cooling costs. A system rated 20 SEER versus 14
            SEER will use roughly 30% less electricity for the same cooling output. As of January 2023, new systems
            must also meet SEER2 standards, which use updated testing procedures that yield slightly lower numbers
            for the same equipment.
          </p>

          <p>
            <strong>AFUE (Annual Fuel Utilization Efficiency)</strong> measures heating efficiency for furnaces
            and boilers as a percentage. An 80% AFUE furnace loses 20 cents of every fuel dollar up the flue.
            A 96% AFUE condensing furnace captures that extra heat by condensing exhaust gases. The Department
            of Energy sets the minimum at 80% for non-weatherized gas furnaces, but most new installations are
            90%+ because the energy savings justify the higher price.
          </p>

          <p>
            <strong>HSPF (Heating Seasonal Performance Factor)</strong> measures heat pump heating efficiency.
            A minimum HSPF of 8.2 is required for new installations, with ENERGY STAR requiring 8.5+. Like SEER,
            higher numbers mean lower costs. New variable-speed heat pumps achieve HSPF ratings of 10-13, offering
            substantial savings in climates where they handle the bulk of heating needs.
          </p>

          <h3>Repair vs Replace: The Decision Framework</h3>

          <p>
            The decision to repair or replace is fundamentally a cost-per-remaining-year calculation. Here is the
            framework professionals use:
          </p>

          <p>
            <strong>The 50% Rule:</strong> If a single repair costs more than 50% of what a new system would cost,
            replace it. This is the most widely cited guideline in the industry and it holds up well in practice.
            A $2,500 repair on a system that would cost $5,000 to replace is a bad investment — you are paying half
            the price of new for a unit that will likely need more repairs soon.
          </p>

          <p>
            <strong>The $5,000 Rule (Age x Repair Cost):</strong> Multiply the age of your system by the estimated
            repair cost. If the result exceeds $5,000, replace. For example, a 12-year-old system needing a $500
            repair: 12 x $500 = $6,000, which suggests replacement. This rule accounts for the compounding
            probability of additional repairs as systems age.
          </p>

          <p>
            <strong>Frequency matters:</strong> A single $400 repair on a 10-year-old system is reasonable. Three
            $400 repairs in the same year totaling $1,200 is a pattern. Track your repair costs annually — if
            year-over-year repair spending is increasing, the trend line points toward replacement even if no
            single repair triggers the 50% rule.
          </p>

          <h3>Seasonal Maintenance Schedule</h3>

          <p>
            Proper maintenance extends system life by 5-10 years and maintains peak efficiency. Follow this
            schedule to protect your investment:
          </p>

          <p>
            <strong>Monthly:</strong> Check and replace air filters. A clogged filter forces your system to work
            harder, increasing energy consumption by 5-15% and accelerating wear. Standard 1-inch filters should
            be replaced monthly during heavy-use seasons. Higher-quality 4-inch pleated filters can last 3-6
            months but should still be checked monthly.
          </p>

          <p>
            <strong>Spring (Before Cooling Season):</strong> Schedule a professional AC tune-up that includes
            refrigerant level check, coil cleaning, thermostat calibration, electrical connection tightening,
            condensate drain clearing, and blower component inspection. Clean the outdoor condenser unit of debris,
            trim vegetation to maintain 2 feet of clearance, and test the system before the first hot day. A spring
            tune-up typically costs $75-150 and can prevent $500+ emergency repairs mid-summer.
          </p>

          <p>
            <strong>Fall (Before Heating Season):</strong> Schedule a furnace or boiler tune-up. This includes
            heat exchanger inspection for cracks (a cracked heat exchanger is a carbon monoxide risk and a
            non-negotiable replacement), burner cleaning, ignition system testing, flue inspection, and safety
            control verification. For heat pumps, the fall visit covers the reversing valve, defrost controls,
            and supplemental heat strips. Replace batteries in carbon monoxide detectors.
          </p>

          <p>
            <strong>Annually:</strong> Have ductwork inspected every 3-5 years for leaks, which waste 20-30% of
            conditioned air in the average home. Seal leaks with mastic (not duct tape, despite the name). Consider
            duct cleaning every 5-7 years if you notice dust buildup, musty smells, or have family members with
            respiratory sensitivities. Flush boiler systems and bleed radiators annually before heating season.
          </p>

          <h3>How to Save on HVAC Replacement Costs</h3>

          <p>
            If replacement is in your future, these strategies can reduce the financial impact. First, get a minimum
            of three quotes from licensed, insured contractors. Prices for the same equipment can vary by 30-50%
            between contractors. Second, consider off-season installation — scheduling in spring or fall when demand
            is lower often yields discounts of 10-20%. Third, check for utility rebates and federal tax credits.
            The Inflation Reduction Act provides tax credits of up to $2,000 for qualifying heat pumps and up to
            $600 for high-efficiency furnaces and central AC. Many utility companies offer additional rebates of
            $200-1,000 for ENERGY STAR certified equipment. Fourth, do not oversize — a system that is too large
            for your home will short-cycle, reducing efficiency and lifespan. Insist on a Manual J load calculation
            to properly size the new system.
          </p>

          <p>
            Finally, consider the total cost of ownership rather than just the purchase price. A $6,000 system
            running at 16 SEER that costs $900 per year to operate will cost $19,500 over 15 years. A $4,500
            system running at 14 SEER that costs $1,100 per year will cost $21,000 over the same period. The
            more expensive system saves $1,500 over its lifetime while providing better comfort and reliability.
          </p>
        </article>
      </div>
    </>
  );
}
