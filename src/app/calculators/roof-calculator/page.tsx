"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

/* ────────────────────────────────────────────────────────
   ROOF REPAIR VS REPLACE CALCULATOR
   Uses lifecycle cost analysis to recommend repair vs full
   replacement. Factors: material lifespan, current age,
   damage severity, number of layers, regional labor costs,
   and stories. Outputs a clear recommendation with
   cost-over-time projections.
   ──────────────────────────────────────────────────────── */

const regions: Record<string, { label: string; multiplier: number }> = {
  northeast: { label: "Northeast (NY, NJ, PA, CT, MA)", multiplier: 1.15 },
  southeast: { label: "Southeast (FL, GA, NC, SC, VA)", multiplier: 0.95 },
  midwest: { label: "Midwest (OH, IL, MI, IN, WI)", multiplier: 0.90 },
  southwest: { label: "Southwest (TX, AZ, NM, NV)", multiplier: 0.92 },
  west: { label: "West Coast (CA, OR, WA)", multiplier: 1.25 },
  mountain: { label: "Mountain (CO, UT, ID, MT)", multiplier: 1.00 },
};

interface RoofMaterial {
  label: string;
  lifespanYears: number;
  costPerSqftLow: number;
  costPerSqftHigh: number;
  repairCostPct: number; // typical repair as % of replacement
  pros: string[];
  cons: string[];
}

const materials: Record<string, RoofMaterial> = {
  asphalt3tab: {
    label: "Asphalt 3-Tab Shingles",
    lifespanYears: 20,
    costPerSqftLow: 3.0,
    costPerSqftHigh: 5.0,
    repairCostPct: 0.15,
    pros: ["Lowest upfront cost", "Easy to find contractors", "Quick install"],
    cons: ["Shortest lifespan", "Less wind resistance", "Lower home value impact"],
  },
  architectural: {
    label: "Architectural Shingles",
    lifespanYears: 30,
    costPerSqftLow: 4.0,
    costPerSqftHigh: 7.0,
    repairCostPct: 0.12,
    pros: ["Great value for money", "30-year warranty typical", "Better curb appeal"],
    cons: ["Moderate cost", "Still asphalt-based", "15-20yr realistic life in harsh climates"],
  },
  metalStanding: {
    label: "Metal Standing Seam",
    lifespanYears: 50,
    costPerSqftLow: 8.0,
    costPerSqftHigh: 14.0,
    repairCostPct: 0.08,
    pros: ["50+ year lifespan", "Energy efficient", "Very low maintenance", "Fire resistant"],
    cons: ["High upfront cost", "Fewer qualified installers", "Can dent from hail"],
  },
  tile: {
    label: "Tile / Clay",
    lifespanYears: 50,
    costPerSqftLow: 10.0,
    costPerSqftHigh: 18.0,
    repairCostPct: 0.10,
    pros: ["50+ year lifespan", "Beautiful aesthetic", "Excellent in hot climates"],
    cons: ["Very heavy (may need structural reinforcement)", "Expensive", "Fragile if walked on"],
  },
  slate: {
    label: "Natural Slate",
    lifespanYears: 75,
    costPerSqftLow: 15.0,
    costPerSqftHigh: 30.0,
    repairCostPct: 0.06,
    pros: ["75-100+ year lifespan", "Premium appearance", "Virtually indestructible"],
    cons: ["Very expensive", "Extremely heavy", "Specialist installers only"],
  },
};

const damageLevels: Record<string, { label: string; repairMult: number; lifeReduction: number }> = {
  minor: { label: "Minor — cosmetic (curling, discoloration)", repairMult: 0.6, lifeReduction: 0.05 },
  moderate: { label: "Moderate — leaks, missing shingles, flashing issues", repairMult: 1.0, lifeReduction: 0.20 },
  major: { label: "Major — structural damage, widespread leaks, sagging", repairMult: 1.8, lifeReduction: 0.50 },
};

function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function RoofCalculatorPage() {
  const [roofArea, setRoofArea] = useState("2000");
  const [roofAge, setRoofAge] = useState("18");
  const [material, setMaterial] = useState("architectural");
  const [layers, setLayers] = useState("1");
  const [damage, setDamage] = useState("moderate");
  const [region, setRegion] = useState("southeast");
  const [stories, setStories] = useState("1");

  const result = useMemo(() => {
    const area = parseFloat(roofArea) || 0;
    const age = parseFloat(roofAge) || 0;
    const layerCount = parseInt(layers) || 1;
    const storyCount = parseInt(stories) || 1;

    if (area <= 0) return null;

    const mat = materials[material];
    const dmg = damageLevels[damage];
    const regionMult = regions[region]?.multiplier ?? 1.0;
    const storyMult = storyCount === 1 ? 1.0 : storyCount === 2 ? 1.15 : 1.30;

    // Replacement cost
    const avgCostPerSqft = (mat.costPerSqftLow + mat.costPerSqftHigh) / 2;
    const tearOffCost = layerCount > 1 ? area * 1.50 * (layerCount - 1) : 0;
    const replacementCost = (area * avgCostPerSqft * regionMult * storyMult) + tearOffCost;
    const replaceLow = (area * mat.costPerSqftLow * regionMult * storyMult) + tearOffCost;
    const replaceHigh = (area * mat.costPerSqftHigh * regionMult * storyMult) + tearOffCost;

    // Repair cost
    const baseRepairCost = replacementCost * mat.repairCostPct * dmg.repairMult;
    const repairCost = baseRepairCost * regionMult * storyMult;

    // Remaining life calculations
    const totalLife = mat.lifespanYears;
    const usedLife = Math.min(age, totalLife);
    const remainingLifeNoRepair = Math.max(0, totalLife - usedLife);
    const lifeAfterRepair = Math.max(1, remainingLifeNoRepair * (1 - dmg.lifeReduction) + 3);
    const newRoofLife = mat.lifespanYears;

    // Cost per year
    const repairCostPerYear = lifeAfterRepair > 0 ? repairCost / lifeAfterRepair : Infinity;
    const replaceCostPerYear = replacementCost / newRoofLife;

    // 15-year total cost projection
    const yearsToProject = 15;
    let repairTotal15yr = repairCost;
    if (lifeAfterRepair < yearsToProject) {
      repairTotal15yr += replacementCost; // will need replacement too
    }
    const replaceTotal15yr = replacementCost;

    // Recommendation logic
    let recommendation: "repair" | "replace";
    let reasons: string[] = [];

    if (age >= totalLife * 0.85) {
      recommendation = "replace";
      reasons.push(`Your roof has used ${Math.round((age / totalLife) * 100)}% of its expected lifespan`);
    } else if (damage === "major") {
      recommendation = "replace";
      reasons.push("Major structural damage typically means repair won't last long enough to justify the cost");
    } else if (repairCostPerYear > replaceCostPerYear * 0.8) {
      recommendation = "replace";
      reasons.push("The cost-per-year of repair is nearly as high as a full replacement");
    } else if (lifeAfterRepair < 5) {
      recommendation = "replace";
      reasons.push("Even after repair, you'd likely need replacement within 5 years");
    } else if (layerCount >= 3) {
      recommendation = "replace";
      reasons.push("Most building codes limit roofs to 2 layers — a third layer isn't advisable");
    } else {
      recommendation = "repair";
      reasons.push(`Repair extends life by ~${Math.round(lifeAfterRepair)} years at ${Math.round((repairCost / replacementCost) * 100)}% of replacement cost`);
    }

    if (recommendation === "repair" && repairCost > replacementCost * 0.4) {
      reasons.push("However, the repair cost is significant relative to replacement — get a second opinion");
    }

    if (recommendation === "replace" && repairCost < 1500) {
      reasons.push("That said, the repair cost is low — a patch could buy time while you budget for replacement");
    }

    return {
      replacementCost,
      replaceLow,
      replaceHigh,
      repairCost,
      lifeAfterRepair,
      newRoofLife,
      repairCostPerYear,
      replaceCostPerYear,
      repairTotal15yr,
      replaceTotal15yr,
      recommendation,
      reasons,
      remainingLifeNoRepair,
      usedLifePct: (usedLife / totalLife) * 100,
    };
  }, [roofArea, roofAge, material, layers, damage, region, stories]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
          <a href="/" className="hover:text-brand-600 transition-colors">Home</a>
          <span>/</span>
          <span className="text-slate-600">Roof Repair vs Replace</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
          Roof Repair vs Replace Calculator
        </h1>
        <p className="mt-4 text-lg text-slate-500 leading-relaxed">
          Should you patch your roof or replace the whole thing? Enter your details
          and get a data-driven recommendation with full cost comparison.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Input Panel */}
        <div className="lg:col-span-2 card p-7">
          <h2 className="text-lg font-bold text-navy-950 mb-6">Roof Details</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Roof Area</label>
              <div className="relative">
                <input type="number" value={roofArea} onChange={(e) => setRoofArea(e.target.value)} className="calc-input" placeholder="2,000" />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">sqft</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">Roof area is typically 1.2-1.5x your home&apos;s floor area</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Roof Age</label>
              <div className="relative">
                <input type="number" value={roofAge} onChange={(e) => setRoofAge(e.target.value)} className="calc-input" placeholder="18" />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">years</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Roofing Material</label>
              <select value={material} onChange={(e) => setMaterial(e.target.value)} className="calc-input appearance-none cursor-pointer">
                {Object.entries(materials).map(([key, m]) => (
                  <option key={key} value={key}>{m.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Existing Layers</label>
              <select value={layers} onChange={(e) => setLayers(e.target.value)} className="calc-input appearance-none cursor-pointer">
                <option value="1">1 layer (original)</option>
                <option value="2">2 layers (one overlay)</option>
                <option value="3">3 layers (needs full tear-off)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Damage Severity</label>
              <select value={damage} onChange={(e) => setDamage(e.target.value)} className="calc-input appearance-none cursor-pointer">
                {Object.entries(damageLevels).map(([key, d]) => (
                  <option key={key} value={key}>{d.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Region</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} className="calc-input appearance-none cursor-pointer">
                {Object.entries(regions).map(([key, r]) => (
                  <option key={key} value={key}>{r.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Stories</label>
              <select value={stories} onChange={(e) => setStories(e.target.value)} className="calc-input appearance-none cursor-pointer">
                <option value="1">1 story</option>
                <option value="2">2 stories (+15% labor)</option>
                <option value="3">3 stories (+30% labor)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-3 space-y-6">
          {result ? (
            <>
              {/* Recommendation Banner */}
              <div className={`rounded-2xl p-7 shadow-lg ${result.recommendation === "replace" ? "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/15" : "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/15"}`}>
                <div className="flex items-center gap-3 mb-3">
                  {result.recommendation === "replace" ? (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  )}
                  <div>
                    <p className="text-sm font-medium opacity-80">Our Recommendation</p>
                    <p className="text-2xl font-extrabold">
                      {result.recommendation === "replace" ? "Replace Your Roof" : "Repair Is the Better Value"}
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

              {/* Roof Life Bar */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-navy-950 mb-4">Roof Life Used</h3>
                <div className="w-full bg-slate-100 rounded-full h-5 overflow-hidden">
                  <div
                    className={`h-5 rounded-full transition-all duration-700 ${result.usedLifePct > 80 ? "bg-red-500" : result.usedLifePct > 60 ? "bg-brand-500" : "bg-emerald-500"}`}
                    style={{ width: `${Math.min(result.usedLifePct, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>Installed</span>
                  <span className="font-semibold text-slate-700">{Math.round(result.usedLifePct)}% used</span>
                  <span>End of life ({materials[material].lifespanYears} yrs)</span>
                </div>
              </div>

              {/* Side by Side Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`result-card rounded-2xl p-6 border-2 ${result.recommendation === "repair" ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-navy-950">Repair</h3>
                    {result.recommendation === "repair" && (
                      <span className="text-xs font-bold bg-emerald-500 text-white px-2.5 py-1 rounded-full">RECOMMENDED</span>
                    )}
                  </div>
                  <p className="text-3xl font-extrabold text-navy-950">{formatUSD(result.repairCost)}</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Extends life by</span>
                      <span className="font-semibold text-slate-700">~{Math.round(result.lifeAfterRepair)} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cost per year</span>
                      <span className="font-semibold text-slate-700">{formatUSD(result.repairCostPerYear)}/yr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">15-year total cost</span>
                      <span className="font-semibold text-slate-700">{formatUSD(result.repairTotal15yr)}</span>
                    </div>
                  </div>
                </div>

                <div className={`result-card rounded-2xl p-6 border-2 ${result.recommendation === "replace" ? "border-brand-300 bg-brand-50" : "border-slate-200 bg-white"}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-navy-950">Replace</h3>
                    {result.recommendation === "replace" && (
                      <span className="text-xs font-bold bg-brand-500 text-white px-2.5 py-1 rounded-full">RECOMMENDED</span>
                    )}
                  </div>
                  <p className="text-3xl font-extrabold text-navy-950">{formatUSD(result.replacementCost)}</p>
                  <p className="text-xs text-slate-400 mt-1">Range: {formatUSD(result.replaceLow)} &ndash; {formatUSD(result.replaceHigh)}</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">New roof lifespan</span>
                      <span className="font-semibold text-slate-700">{result.newRoofLife} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cost per year</span>
                      <span className="font-semibold text-slate-700">{formatUSD(result.replaceCostPerYear)}/yr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">15-year total cost</span>
                      <span className="font-semibold text-slate-700">{formatUSD(result.replaceTotal15yr)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings insight */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>15-year cost comparison:</strong> Repairing now will cost a total of{" "}
                  {formatUSD(result.repairTotal15yr)} over 15 years (including eventual replacement if needed).
                  Replacing now costs {formatUSD(result.replaceTotal15yr)} for the full 15 years.{" "}
                  {result.replaceTotal15yr < result.repairTotal15yr
                    ? `Replacing now saves you ${formatUSD(result.repairTotal15yr - result.replaceTotal15yr)} long-term.`
                    : `Repairing saves you ${formatUSD(result.replaceTotal15yr - result.repairTotal15yr)} if the roof holds.`}
                </p>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center">
              <p className="text-slate-400">Enter your roof details to see a repair vs replace analysis.</p>
            </div>
          )}
        </div>
      </div>

      {/* Material Comparison Table */}
      <div className="mt-16 card overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-navy-950">Roofing Material Comparison</h3>
          <p className="text-sm text-slate-400 mt-1">Compare lifespan, cost, and trade-offs for common materials</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Material</th>
                <th className="text-left px-6 py-3 font-semibold">Lifespan</th>
                <th className="text-left px-6 py-3 font-semibold">Cost/sqft</th>
                <th className="text-left px-6 py-3 font-semibold">Pros</th>
                <th className="text-left px-6 py-3 font-semibold">Cons</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(materials).map(([key, m]) => (
                <tr key={key} className={key === material ? "bg-brand-50" : "hover:bg-slate-50"}>
                  <td className="px-6 py-3.5 font-medium text-navy-950 whitespace-nowrap">
                    {m.label}
                    {key === material && <span className="ml-2 text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">Selected</span>}
                  </td>
                  <td className="px-6 py-3.5 text-slate-700">{m.lifespanYears} years</td>
                  <td className="px-6 py-3.5 text-slate-700">${m.costPerSqftLow}–${m.costPerSqftHigh}</td>
                  <td className="px-6 py-3.5 text-slate-500">{m.pros.join(", ")}</td>
                  <td className="px-6 py-3.5 text-slate-500">{m.cons.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Content */}
      <article className="max-w-3xl mx-auto mt-20 prose prose-slate prose-lg">
        <h2>Roof Repair vs Replacement: How to Decide</h2>
        <p>
          Your roof is one of the most expensive components of your home, and deciding
          whether to repair or replace it is a major financial decision. A full
          replacement for a typical 2,000 sqft home runs between $8,000 and $30,000+
          depending on material, while repairs can range from a few hundred to several
          thousand dollars.
        </p>

        <h3>When Repair Makes Sense</h3>
        <p>
          If your roof is less than 60% through its expected lifespan and the damage is
          localized (a few missing shingles, minor flashing issues, small leak), repair
          is almost always the right call. You&apos;re paying 10-20% of replacement cost
          to extend the life by several years.
        </p>
        <p>
          The key question is: <strong>how much usable life does the repair buy?</strong> If
          a $1,500 repair gets you 8 more years, that&apos;s $187/year — far cheaper than
          a $15,000 replacement at $500/year over 30 years. But if that same repair only
          buys 2 years, you&apos;re paying $750/year, which makes replacement more
          cost-effective.
        </p>

        <h3>When Replacement Is Inevitable</h3>
        <p>
          Several signs point to replacement being the smarter investment:
        </p>
        <ul>
          <li><strong>Age:</strong> If your roof has used more than 80% of its expected lifespan, major repairs are throwing good money after bad.</li>
          <li><strong>Multiple layers:</strong> Most building codes allow a maximum of two layers of shingles. If you already have two, the next step is a full tear-off and replacement.</li>
          <li><strong>Widespread damage:</strong> If damage affects more than 30% of the roof area, repair costs approach replacement costs without giving you a new roof.</li>
          <li><strong>Structural issues:</strong> Sagging, rotted decking, or compromised trusses mean repairs won&apos;t address the underlying problem.</li>
          <li><strong>Selling soon:</strong> A new roof adds significant resale value and eliminates a major inspection red flag. Buyers will negotiate $10,000+ off the price for an aging roof.</li>
        </ul>

        <h3>The Lifecycle Cost Approach</h3>
        <p>
          Our calculator uses lifecycle cost analysis — the same method commercial
          property managers use. Instead of comparing upfront costs, we calculate the
          <strong> cost per year of useful life</strong> for both options. This accounts
          for the fact that a $20,000 replacement lasting 30 years ($667/year) is
          actually cheaper than a $4,000 repair lasting 4 years ($1,000/year).
        </p>

        <h3>Getting Accurate Quotes</h3>
        <p>
          Always get at least three quotes from licensed, insured roofing contractors.
          Make sure quotes specify: material brand and type, whether old layers will be
          removed, warranty details (manufacturer vs. workmanship), timeline, and
          cleanup procedures. Be wary of quotes that are significantly below average —
          low bids often mean corners will be cut on materials or labor.
        </p>
      </article>
    </div>
  );
}
