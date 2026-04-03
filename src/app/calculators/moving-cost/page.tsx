"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

/* ────────────────────────────────────────────────────────
   MOVING COST CALCULATOR
   Estimates total moving costs based on:
   • Move type (local, long distance, cross country)
   • Home size (studio through 5+ bedroom)
   • Service level (DIY, basic, full service, white glove)
   • Distance, season, and special items
   Outputs cost range, breakdown, DIY vs Pro comparison,
   money-saving tips, and a moving timeline checklist.
   ──────────────────────────────────────────────────────── */

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

type MoveType = "local" | "longDistance" | "crossCountry";
type HomeSize = "studio" | "1br" | "2br" | "3br" | "4br" | "5br";
type ServiceLevel = "diy" | "basic" | "full" | "whiteGlove";
type Season = "peak" | "offPeak";

interface SpecialItem {
  id: string;
  label: string;
  cost: number;
}

const moveTypes: Record<MoveType, { label: string; description: string; defaultMiles: number }> = {
  local: { label: "Local", description: "Under 50 miles", defaultMiles: 15 },
  longDistance: { label: "Long Distance", description: "50-500 miles", defaultMiles: 250 },
  crossCountry: { label: "Cross Country", description: "500+ miles", defaultMiles: 1500 },
};

const homeSizes: Record<HomeSize, { label: string; weight: number }> = {
  studio: { label: "Studio", weight: 1800 },
  "1br": { label: "1 Bedroom", weight: 3500 },
  "2br": { label: "2 Bedroom", weight: 5000 },
  "3br": { label: "3 Bedroom", weight: 8000 },
  "4br": { label: "4 Bedroom", weight: 12000 },
  "5br": { label: "5+ Bedroom", weight: 17000 },
};

const localBaseRates: Record<HomeSize, { low: number; high: number }> = {
  studio: { low: 300, high: 600 },
  "1br": { low: 500, high: 800 },
  "2br": { low: 800, high: 1500 },
  "3br": { low: 1200, high: 2500 },
  "4br": { low: 1800, high: 3500 },
  "5br": { low: 2500, high: 5000 },
};

const crossCountryFlats: Record<HomeSize, { low: number; high: number }> = {
  studio: { low: 2000, high: 3500 },
  "1br": { low: 2500, high: 4500 },
  "2br": { low: 3500, high: 6000 },
  "3br": { low: 5000, high: 8000 },
  "4br": { low: 7000, high: 10000 },
  "5br": { low: 8500, high: 12000 },
};

const serviceLevels: Record<ServiceLevel, { label: string; description: string; multiplier: number }> = {
  diy: { label: "DIY", description: "Truck rental only — you do the heavy lifting", multiplier: 0.4 },
  basic: { label: "Basic", description: "Loading and unloading help included", multiplier: 0.7 },
  full: { label: "Full Service", description: "Movers handle everything", multiplier: 1.0 },
  whiteGlove: { label: "White Glove", description: "Professional packing and unpacking included", multiplier: 1.5 },
};

const specialItems: SpecialItem[] = [
  { id: "piano", label: "Piano", cost: 450 },
  { id: "poolTable", label: "Pool Table", cost: 400 },
  { id: "hotTub", label: "Hot Tub", cost: 500 },
  { id: "safe", label: "Safe / Heavy Items", cost: 300 },
  { id: "artwork", label: "Artwork", cost: 200 },
  { id: "antiques", label: "Antiques", cost: 150 },
];

const perMileRate = { low: 0.5, high: 0.8 };
const peakSeasonMultiplier = { low: 1.2, high: 1.3 };

export default function MovingCostCalculator() {
  const [moveType, setMoveType] = useState<MoveType>("local");
  const [homeSize, setHomeSize] = useState<HomeSize>("2br");
  const [distance, setDistance] = useState(15);
  const [serviceLevel, setServiceLevel] = useState<ServiceLevel>("full");
  const [selectedSpecialItems, setSelectedSpecialItems] = useState<string[]>([]);
  const [season, setSeason] = useState<Season>("offPeak");

  const handleMoveTypeChange = (type: MoveType) => {
    setMoveType(type);
    setDistance(moveTypes[type].defaultMiles);
  };

  const toggleSpecialItem = (id: string) => {
    setSelectedSpecialItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const results = useMemo(() => {
    const sizeData = homeSizes[homeSize];
    const service = serviceLevels[serviceLevel];
    const dist = Math.max(1, distance);

    // Base cost calculation
    let baseLow: number;
    let baseHigh: number;

    if (moveType === "local") {
      baseLow = localBaseRates[homeSize].low;
      baseHigh = localBaseRates[homeSize].high;
    } else if (moveType === "longDistance") {
      const localBase = localBaseRates[homeSize];
      const mileageLow = dist * perMileRate.low;
      const mileageHigh = dist * perMileRate.high;
      const weightSurcharge = sizeData.weight * 0.04;
      baseLow = localBase.low + mileageLow + weightSurcharge * 0.8;
      baseHigh = localBase.high + mileageHigh + weightSurcharge * 1.2;
    } else {
      baseLow = crossCountryFlats[homeSize].low;
      baseHigh = crossCountryFlats[homeSize].high;
      // Adjust for actual distance beyond 1000
      if (dist > 1000) {
        const extraMiles = dist - 1000;
        baseLow += extraMiles * 0.3;
        baseHigh += extraMiles * 0.5;
      }
    }

    // Apply service level multiplier
    const servicedLow = baseLow * service.multiplier;
    const servicedHigh = baseHigh * service.multiplier;

    // Special items cost
    const specialItemsCost = selectedSpecialItems.reduce((sum, id) => {
      const item = specialItems.find((s) => s.id === id);
      return sum + (item ? item.cost : 0);
    }, 0);

    // Season adjustment
    const seasonLow = season === "peak" ? peakSeasonMultiplier.low : 1.0;
    const seasonHigh = season === "peak" ? peakSeasonMultiplier.high : 1.0;

    const adjustedLow = servicedLow * seasonLow;
    const adjustedHigh = servicedHigh * seasonHigh;

    // Build cost breakdown
    const laborPctLow = moveType === "local" ? 0.55 : 0.40;
    const laborPctHigh = moveType === "local" ? 0.60 : 0.45;
    const transportPct = moveType === "local" ? 0.20 : 0.30;
    const packingPct = serviceLevel === "whiteGlove" ? 0.15 : serviceLevel === "full" ? 0.08 : 0.03;
    const insurancePct = 0.04;
    const fuelPct = moveType === "local" ? 0.06 : 0.12;

    const totalLow = adjustedLow + specialItemsCost;
    const totalHigh = adjustedHigh + specialItemsCost;

    const breakdown = {
      labor: { low: adjustedLow * laborPctLow, high: adjustedHigh * laborPctHigh },
      transport: { low: adjustedLow * transportPct, high: adjustedHigh * transportPct },
      packing: { low: adjustedLow * packingPct, high: adjustedHigh * packingPct },
      insurance: { low: adjustedLow * insurancePct, high: adjustedHigh * insurancePct },
      specialItems: { low: specialItemsCost, high: specialItemsCost },
      fuel: { low: adjustedLow * fuelPct, high: adjustedHigh * fuelPct },
    };

    // DIY comparison
    const truckRentalBase = moveType === "local" ? 40 : moveType === "longDistance" ? 800 : 1800;
    const truckSizeMultiplier =
      homeSize === "studio" ? 0.5 : homeSize === "1br" ? 0.6 : homeSize === "2br" ? 0.8 : homeSize === "3br" ? 1.0 : homeSize === "4br" ? 1.2 : 1.4;
    const truckRental = Math.round(truckRentalBase * truckSizeMultiplier);
    const diyFuel = moveType === "local" ? 25 : Math.round(dist * 0.25);
    const diySupplies = homeSize === "studio" ? 50 : homeSize === "1br" ? 80 : homeSize === "2br" ? 120 : homeSize === "3br" ? 180 : homeSize === "4br" ? 230 : 300;
    const diyInsurance = Math.round(truckRental * 0.15);
    const diyTotal = truckRental + diyFuel + diySupplies + diyInsurance + specialItemsCost;

    const proMid = Math.round((totalLow + totalHigh) / 2);
    const savings = proMid - diyTotal;

    return {
      totalLow: Math.round(totalLow),
      totalHigh: Math.round(totalHigh),
      breakdown,
      diy: { truckRental, fuel: diyFuel, supplies: diySupplies, insurance: diyInsurance, specialItems: specialItemsCost, total: diyTotal },
      pro: { total: proMid },
      savings: Math.max(0, savings),
      weight: sizeData.weight,
    };
  }, [moveType, homeSize, distance, serviceLevel, selectedSpecialItems, season]);

  const breakdownItems = [
    { label: "Labor", low: results.breakdown.labor.low, high: results.breakdown.labor.high, color: "bg-brand-500" },
    { label: "Truck / Transport", low: results.breakdown.transport.low, high: results.breakdown.transport.high, color: "bg-navy-600" },
    { label: "Packing Supplies", low: results.breakdown.packing.low, high: results.breakdown.packing.high, color: "bg-sage-500" },
    { label: "Insurance", low: results.breakdown.insurance.low, high: results.breakdown.insurance.high, color: "bg-warm-500" },
    { label: "Special Items", low: results.breakdown.specialItems.low, high: results.breakdown.specialItems.high, color: "bg-purple-500" },
    { label: "Fuel / Mileage", low: results.breakdown.fuel.low, high: results.breakdown.fuel.high, color: "bg-sky-500" },
  ];

  const maxBreakdown = Math.max(...breakdownItems.map((b) => b.high));

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-brand-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-brand-400 transition-colors">Calculators</Link>
            <span>/</span>
            <span className="text-white">Moving Cost</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Moving Cost Calculator
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl">
            Estimate your total moving costs based on distance, home size, service level, and special requirements.
            Compare DIY vs professional movers and get a personalized moving timeline.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Move Type */}
            <div className="card p-6 space-y-5">
              <h2 className="text-lg font-bold text-navy-950">Move Details</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Move Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.entries(moveTypes) as [MoveType, typeof moveTypes[MoveType]][]).map(([key, mt]) => (
                    <button
                      key={key}
                      onClick={() => handleMoveTypeChange(key)}
                      className={`py-2.5 px-2 rounded-lg text-center transition-all ${
                        moveType === key
                          ? "bg-navy-950 text-white"
                          : "bg-warm-100 text-slate-600 hover:bg-warm-200"
                      }`}
                    >
                      <div className="text-sm font-semibold">{mt.label}</div>
                      <div className={`text-[10px] mt-0.5 ${moveType === key ? "text-slate-300" : "text-slate-400"}`}>{mt.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Home Size */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Home Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.entries(homeSizes) as [HomeSize, typeof homeSizes[HomeSize]][]).map(([key, hs]) => (
                    <button
                      key={key}
                      onClick={() => setHomeSize(key)}
                      className={`py-2 px-2 rounded-lg text-sm font-semibold transition-all ${
                        homeSize === key
                          ? "bg-navy-950 text-white"
                          : "bg-warm-100 text-slate-600 hover:bg-warm-200"
                      }`}
                    >
                      {hs.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-1.5">Estimated weight: {homeSizes[homeSize].weight.toLocaleString()} lbs</p>
              </div>

              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Distance (miles)</label>
                <input
                  type="number"
                  className="calc-input"
                  value={distance}
                  min={1}
                  onChange={(e) => setDistance(Math.max(1, +e.target.value))}
                />
                <p className="text-xs text-slate-400 mt-1">Auto-filled based on move type — adjust for your actual distance</p>
              </div>

              {/* Service Level */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Service Level</label>
                <div className="space-y-2">
                  {(Object.entries(serviceLevels) as [ServiceLevel, typeof serviceLevels[ServiceLevel]][]).map(([key, sl]) => (
                    <button
                      key={key}
                      onClick={() => setServiceLevel(key)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                        serviceLevel === key
                          ? "border-brand-500 bg-brand-50/50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-semibold ${serviceLevel === key ? "text-brand-700" : "text-slate-700"}`}>{sl.label}</span>
                        <span className={`badge ${serviceLevel === key ? "badge-brand" : "badge-navy"}`}>{sl.multiplier}x</span>
                      </div>
                      <p className={`text-xs mt-0.5 ${serviceLevel === key ? "text-brand-600" : "text-slate-400"}`}>{sl.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Special Items & Season */}
            <div className="card p-6 space-y-5">
              <h3 className="text-base font-bold text-navy-950">Additional Options</h3>

              {/* Special Items */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Special Items</label>
                <div className="grid grid-cols-2 gap-2">
                  {specialItems.map((item) => {
                    const isChecked = selectedSpecialItems.includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all border ${
                          isChecked ? "border-brand-300 bg-brand-50" : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSpecialItem(item.id)}
                          className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                        />
                        <div>
                          <div className="text-sm font-medium text-slate-700">{item.label}</div>
                          <div className="text-[10px] text-slate-400">+{fmt(item.cost)}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Season */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Moving Season</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSeason("peak")}
                    className={`py-3 rounded-lg text-center transition-all ${
                      season === "peak"
                        ? "bg-brand-500 text-white"
                        : "bg-warm-100 text-slate-600 hover:bg-warm-200"
                    }`}
                  >
                    <div className="text-sm font-semibold">Peak Season</div>
                    <div className={`text-[10px] mt-0.5 ${season === "peak" ? "text-brand-100" : "text-slate-400"}`}>May &ndash; September (+20-30%)</div>
                  </button>
                  <button
                    onClick={() => setSeason("offPeak")}
                    className={`py-3 rounded-lg text-center transition-all ${
                      season === "offPeak"
                        ? "bg-sage-600 text-white"
                        : "bg-warm-100 text-slate-600 hover:bg-warm-200"
                    }`}
                  >
                    <div className="text-sm font-semibold">Off-Peak</div>
                    <div className={`text-[10px] mt-0.5 ${season === "offPeak" ? "text-sage-100" : "text-slate-400"}`}>October &ndash; April (best rates)</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Total Estimate */}
            <div className="card p-6 sm:p-8 border-brand-200 bg-brand-50/30">
              <div className="text-sm font-medium text-slate-500 mb-1">Estimated Moving Cost</div>
              <div className="text-4xl sm:text-5xl font-black text-navy-950">
                {fmt(results.totalLow)} &ndash; {fmt(results.totalHigh)}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="badge badge-brand">{moveTypes[moveType].label}</span>
                <span className="badge badge-navy">{homeSizes[homeSize].label}</span>
                <span className="badge badge-sage">{serviceLevels[serviceLevel].label}</span>
                {season === "peak" && <span className="badge badge-brand">Peak Season</span>}
                <span className="badge">{distance} miles</span>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="card p-6">
              <h3 className="text-base font-bold text-navy-950 mb-4">Cost Breakdown</h3>
              <div className="space-y-3">
                {breakdownItems.map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{b.label}</span>
                      <span className="font-semibold text-navy-950">
                        {fmt(b.low)} &ndash; {fmt(b.high)}
                      </span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${b.color} rounded-full transition-all`}
                        style={{ width: maxBreakdown > 0 ? `${(b.high / maxBreakdown) * 100}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DIY vs Professional */}
            <div className="card p-6">
              <h3 className="text-base font-bold text-navy-950 mb-4">DIY vs Professional Comparison</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* DIY Column */}
                <div className="p-4 rounded-xl bg-sage-50 border border-sage-200">
                  <div className="text-sm font-bold text-sage-700 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    DIY Move
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Truck Rental</span>
                      <span className="font-medium text-slate-700">{fmt(results.diy.truckRental)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fuel</span>
                      <span className="font-medium text-slate-700">{fmt(results.diy.fuel)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Packing Supplies</span>
                      <span className="font-medium text-slate-700">{fmt(results.diy.supplies)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Insurance</span>
                      <span className="font-medium text-slate-700">{fmt(results.diy.insurance)}</span>
                    </div>
                    {results.diy.specialItems > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Special Items</span>
                        <span className="font-medium text-slate-700">{fmt(results.diy.specialItems)}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-sage-200 flex justify-between">
                      <span className="font-bold text-sage-800">Total</span>
                      <span className="font-black text-sage-800">{fmt(results.diy.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Pro Column */}
                <div className="p-4 rounded-xl bg-brand-50 border border-brand-200">
                  <div className="text-sm font-bold text-brand-700 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    Professional
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Full Service Estimate</span>
                      <span className="font-medium text-slate-700">{fmt(results.pro.total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Low Estimate</span>
                      <span className="font-medium text-slate-700">{fmt(results.totalLow)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">High Estimate</span>
                      <span className="font-medium text-slate-700">{fmt(results.totalHigh)}</span>
                    </div>
                    <div className="pt-2 border-t border-brand-200 flex justify-between">
                      <span className="font-bold text-brand-800">Avg Total</span>
                      <span className="font-black text-brand-800">{fmt(results.pro.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {results.savings > 0 && (
                <div className="mt-4 p-4 bg-sage-50 rounded-xl border border-sage-200 text-center">
                  <span className="text-sm font-bold text-sage-700">
                    DIY could save you approximately {fmt(results.savings)} compared to professional movers
                  </span>
                </div>
              )}
            </div>

            {/* Money-Saving Tips */}
            <div className="card p-6">
              <h3 className="text-base font-bold text-navy-950 mb-4">Money-Saving Tips</h3>
              <ul className="space-y-3">
                {[
                  { icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5", tip: "Move during off-peak months (October through April) to save 20-30% on moving costs. Mid-week moves are even cheaper." },
                  { icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25-2.25M12 13.875V7.5", tip: "Declutter before you move. Every pound you don't move saves money. Host a garage sale or donate to offset costs and lighten your load." },
                  { icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z", tip: "Get at least 3-5 quotes from different moving companies. Prices can vary by 30-50% for the same move. Never accept the first quote." },
                  { icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z", tip: "Collect free boxes from grocery stores, liquor stores, and Craigslist/Facebook Marketplace. You can save $100-200 on packing materials alone." },
                  { icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z", tip: "Ask your employer about relocation benefits. Many companies cover partial or full moving costs, even for lateral moves. Always negotiate." },
                ].map(({ icon, tip }, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Moving Timeline/Checklist */}
            <div className="card p-6">
              <h3 className="text-base font-bold text-navy-950 mb-5">Moving Timeline Checklist</h3>
              <div className="relative">
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-200" />
                <div className="space-y-6">
                  {[
                    {
                      time: "8 Weeks Before",
                      badge: "badge-sage",
                      tasks: ["Research and get quotes from 3-5 moving companies", "Create a moving budget and inventory of belongings", "Begin decluttering room by room — sell, donate, or discard items you no longer need"],
                    },
                    {
                      time: "4 Weeks Before",
                      badge: "badge-sage",
                      tasks: ["Book your moving company or reserve a rental truck", "Start collecting free boxes and buy packing supplies", "File a change of address with USPS and update accounts"],
                    },
                    {
                      time: "2 Weeks Before",
                      badge: "badge-navy",
                      tasks: ["Begin packing non-essential rooms (guest bedroom, garage, storage)", "Confirm moving date and details with your movers", "Arrange utility transfers and set up services at the new address"],
                    },
                    {
                      time: "1 Week Before",
                      badge: "badge-navy",
                      tasks: ["Pack the majority of your belongings, leaving only daily essentials", "Prepare a \"first night\" box with toiletries, chargers, snacks, sheets, and tools", "Defrost the freezer, drain hoses, and prep large appliances"],
                    },
                    {
                      time: "Moving Day",
                      badge: "badge-brand",
                      tasks: ["Do a final walkthrough of every room, closet, and cabinet", "Confirm inventory with movers and review the bill of lading", "Keep valuables, documents, and medications with you — never on the truck"],
                    },
                    {
                      time: "After the Move",
                      badge: "badge-brand",
                      tasks: ["Inspect all items and file damage claims within 9 months (federal law)", "Update your driver's license and vehicle registration", "Meet your neighbors and locate nearby essentials (grocery, pharmacy, hospital)"],
                    },
                  ].map((phase, idx) => (
                    <div key={idx} className="relative flex gap-4">
                      <div className="flex-shrink-0 w-[30px] flex items-start justify-center z-10">
                        <div className={`w-3 h-3 rounded-full mt-1.5 ${idx <= 1 ? "bg-sage-500" : idx <= 3 ? "bg-navy-600" : "bg-brand-500"}`} />
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`badge ${phase.badge}`}>{phase.time}</span>
                        </div>
                        <ul className="space-y-1.5">
                          {phase.tasks.map((task, tIdx) => (
                            <li key={tIdx} className="flex gap-2 text-sm text-slate-600">
                              <svg className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="card p-6 bg-warm-50 border-warm-200">
              <h3 className="text-base font-bold text-navy-950 mb-3">Related Calculators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { name: "Rent vs Buy", href: "/calculators/rent-vs-buy" },
                  { name: "Mortgage Calculator", href: "/calculators/mortgage" },
                  { name: "Home Maintenance", href: "/calculators/home-maintenance" },
                  { name: "Home Insurance", href: "/calculators/insurance" },
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

        {/* ── SEO Article ── */}
        <article className="mt-16 prose-brand max-w-4xl mx-auto">
          <h2>Understanding Moving Costs: The Complete Guide for 2024</h2>

          <p>
            Moving is one of the most stressful and expensive life events most people experience. According to the American Moving and Storage Association,
            the average American moves 11.7 times in their lifetime, yet most people dramatically underestimate what a move will actually cost. Whether you
            are relocating across town or across the country, understanding the true costs involved will help you budget accurately and avoid unpleasant
            surprises on moving day. This guide breaks down every factor that influences your moving costs and provides actionable strategies for keeping
            those costs under control.
          </p>

          <h3>Moving Costs by Type: Local vs Long Distance vs Cross Country</h3>
          <p>
            The single biggest factor in your moving cost is distance. Local moves (under 50 miles) are typically charged by the hour, with rates ranging
            from $80 to $120 per hour for a two-person crew and a truck. A typical local move for a 2-bedroom apartment takes 4 to 6 hours, putting the
            total between $400 and $1,500 depending on the amount of stuff and accessibility of both locations. Stairs, narrow hallways, and long carries
            from the door to the truck all add time and cost.
          </p>
          <p>
            Long-distance moves (50 to 500 miles) shift to a weight-and-distance pricing model. Movers will estimate the weight of your shipment, typically
            using a formula based on the number of rooms and the types of furniture you have. A 3-bedroom home averaging 8,000 pounds moved 300 miles might
            cost $3,000 to $6,000 with full-service movers. The per-mile rate typically ranges from $0.50 to $0.80, but the bulk of the cost comes from the
            base rate and weight charges rather than pure mileage.
          </p>
          <p>
            Cross-country moves (500+ miles) are the most expensive, with flat-rate pricing being the norm. Moving a 3-bedroom home from New York to Los
            Angeles can cost $5,000 to $8,000 or more. At this distance, the logistics become more complex: your belongings may be loaded onto a shared
            truck with other shipments, delivery windows stretch from days to weeks, and the risk of damage increases with handling. If you need a dedicated
            truck and guaranteed delivery date, expect to pay a significant premium.
          </p>

          <h3>DIY vs Professional Movers: The Real Comparison</h3>
          <p>
            On paper, a DIY move looks dramatically cheaper. A 26-foot truck rental for a local move might cost $40 to $80 per day, while a one-way
            cross-country rental runs $1,500 to $3,000. Add fuel ($0.20 to $0.30 per mile for a loaded truck), packing supplies ($100 to $300), and
            rental insurance ($15 to $30 per day), and you are still well below professional moving costs.
          </p>
          <p>
            But DIY moves have hidden costs that are easy to overlook. You will need to recruit friends or hire day laborers for loading and unloading
            ($200 to $400). You risk personal injury — back injuries from lifting are extremely common during moves. You may need to take multiple days
            off work. And damage to your belongings or the rental property is your responsibility with no professional liability coverage. For local moves,
            DIY usually makes financial sense. For long-distance moves, the savings narrow considerably once you account for fuel, lodging, meals on the
            road, and the sheer time investment. Run the numbers carefully using our calculator before committing either way.
          </p>

          <h3>How to Save Money on Your Move</h3>
          <p>
            The most impactful way to reduce moving costs is timing. Moving during peak season (May through September) costs 20 to 30 percent more than
            off-peak months. Within any given month, end-of-month moves are the most expensive because most leases end on the 30th or 31st. Mid-month,
            mid-week moves offer the deepest discounts — some moving companies drop rates by 15 to 25 percent on Tuesdays and Wednesdays.
          </p>
          <p>
            Decluttering aggressively before your move is the second most effective strategy. Professional movers charge by weight and volume. Every box
            you eliminate saves money twice: once on the move itself and again because you did not have to buy a box and packing materials for it. Most
            people are surprised by how much they can shed — a thorough declutter of a 3-bedroom home typically reduces the shipment weight by 1,000 to
            2,000 pounds, translating to $200 to $500 in savings on a long-distance move.
          </p>
          <p>
            Other proven strategies include collecting free boxes from grocery and liquor stores (save $100 to $200), using towels, linens, and clothing
            as packing material instead of buying bubble wrap, packing everything yourself even if you hire movers for the heavy lifting, and negotiating
            directly with the moving company — most are willing to match competitor quotes.
          </p>

          <h3>How to Get Accurate Moving Quotes</h3>
          <p>
            Never accept a moving quote given over the phone or based solely on the number of bedrooms. Reputable moving companies will send an estimator
            to your home or offer a video survey where you walk through every room with your phone camera. This in-home or virtual estimate should be free
            and result in a binding or not-to-exceed quote.
          </p>
          <p>
            A <strong>binding quote</strong> means you pay the quoted price regardless of the actual weight or time. A <strong>not-to-exceed quote</strong> means
            you pay the quoted price or less if the actual move comes in under the estimate. Avoid <strong>non-binding estimates</strong>, which are just
            guesses — the final price can be significantly higher. Federal law requires interstate movers to provide a written estimate, and the price cannot
            exceed 110 percent of a non-binding estimate at delivery (the balance is due within 30 days). Always get at least three quotes and verify each
            company&apos;s USDOT number on the FMCSA website.
          </p>

          <h3>Tipping Your Movers</h3>
          <p>
            Tipping is not mandatory, but it is standard practice and genuinely appreciated by movers doing backbreaking work. The general guideline is $20
            to $30 per mover for a half-day (4 hours or less) and $40 to $60 per mover for a full day. For an exceptionally complex move — three flights of
            stairs, a piano, or extreme weather conditions — tipping on the higher end or even $80 to $100 per person is appropriate. Tip in cash directly to
            each mover at the end of the job, not as a lump sum to the foreman. In addition to cash tips, providing cold drinks, snacks, and a lunch break
            goes a long way toward keeping your crew motivated and careful with your belongings.
          </p>

          <h3>Moving Insurance: Protecting Your Belongings</h3>
          <p>
            Every interstate mover is required to offer two levels of liability coverage. <strong>Released Value Protection</strong> is free but covers your
            belongings at only $0.60 per pound per article. That means if a mover damages your 10-pound, $2,000 television, you receive $6. This coverage is
            essentially worthless for anything valuable.
          </p>
          <p>
            <strong>Full Value Protection</strong> requires the mover to repair, replace, or pay the current market value of any item they damage or lose.
            This typically costs 1 to 2 percent of the total declared value of your shipment. For a shipment valued at $50,000, expect to pay $500 to $1,000
            for full value protection. It is almost always worth the investment. Additionally, check your homeowner&apos;s or renter&apos;s insurance policy — some
            policies cover belongings during a move, which could save you the cost of purchasing additional moving insurance. For especially valuable items
            (fine art, antiques, jewelry), consider purchasing a separate transit insurance policy through a specialty insurer.
          </p>

          <h3>Red Flags: How to Spot a Moving Scam</h3>
          <p>
            The moving industry, unfortunately, has its share of bad actors. Watch out for these warning signs: a mover who demands a large cash deposit
            upfront (reputable movers rarely require more than a small booking deposit), an estimate that seems dramatically lower than competitors (this
            is a classic bait-and-switch tactic where the price balloons on moving day), no physical address or USDOT number, a mover who shows up in an
            unmarked truck, and a mover who asks you to sign blank documents. If a mover holds your belongings hostage and demands payment beyond the
            110 percent limit, contact the FMCSA and local law enforcement immediately.
          </p>

          <h3>Planning Your Moving Timeline</h3>
          <p>
            The key to a smooth, cost-effective move is starting early. Begin planning at least eight weeks before your move date. Use the first two weeks
            to research moving companies, get quotes, and finalize your budget. Weeks four through six are for the unglamorous but essential work:
            decluttering, organizing a garage sale, donating unwanted items, filing your change of address, and transferring utilities. The final two weeks
            before your move should be focused on packing, confirming logistics, and preparing your new home. A well-organized move is not just less
            stressful — it is measurably cheaper, because last-minute decisions (rush bookings, emergency supplies, forgotten logistics) always cost more.
          </p>
        </article>
      </div>
    </>
  );
}
