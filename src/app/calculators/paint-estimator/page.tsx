"use client";

import { useState, useMemo } from "react";

/* ────────────────────────────────────────────────────────
   PAINT COST ESTIMATOR
   Calculates paint needs for interior room painting:
   • Wall area = 2(L+W)*H minus doors (21 sqft) & windows (15 sqft)
   • Ceiling area = L*W (optional)
   • Coverage: ~350 sqft per gallon per coat
   • Labor rates: $2-4/sqft for professional painters
   • Supplies scaled by room count
   ──────────────────────────────────────────────────────── */

interface Room {
  id: string;
  name: string;
  length: string;
  width: string;
  height: string;
  doors: string;
  windows: string;
}

const paintQualities: Record<string, { label: string; pricePerGallon: number; description: string }> = {
  economy: { label: "Economy", pricePerGallon: 25, description: "Basic coverage, may need extra coats" },
  standard: { label: "Standard", pricePerGallon: 40, description: "Good coverage, durable finish" },
  premium: { label: "Premium", pricePerGallon: 60, description: "Excellent coverage, washable, long-lasting" },
  designer: { label: "Designer", pricePerGallon: 85, description: "Top-tier brands, superior finish and durability" },
};

const COVERAGE_PER_GALLON = 350; // sqft per gallon per coat
const DOOR_AREA = 21; // sqft per standard door
const WINDOW_AREA = 15; // sqft per standard window
const PRIMER_PRICE_PER_GALLON = 20;
const PRIMER_COVERAGE = 300; // sqft per gallon
const TRIM_LINEAR_FT_PER_ROOM = 40; // average linear feet of trim per room
const TRIM_SQFT_PER_LINEAR_FT = 0.5; // ~6 inches wide

function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function createRoom(index: number): Room {
  return {
    id: crypto.randomUUID(),
    name: index === 0 ? "Living Room" : `Room ${index + 1}`,
    length: "14",
    width: "12",
    height: "9",
    doors: "1",
    windows: "2",
  };
}

export default function PaintEstimatorPage() {
  const [rooms, setRooms] = useState<Room[]>([createRoom(0)]);
  const [paintQuality, setPaintQuality] = useState<string>("standard");
  const [coats, setCoats] = useState<string>("2");
  const [includeCeiling, setIncludeCeiling] = useState(false);
  const [includeTrim, setIncludeTrim] = useState(true);
  const [usePrimer, setUsePrimer] = useState(true);
  const [hirePro, setHirePro] = useState(false);

  const addRoom = () => {
    setRooms((prev) => [...prev, createRoom(prev.length)]);
  };

  const removeRoom = (id: string) => {
    if (rooms.length <= 1) return;
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRoom = (id: string, field: keyof Room, value: string) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const result = useMemo(() => {
    const numCoats = Math.min(3, Math.max(1, parseInt(coats) || 2));
    const quality = paintQualities[paintQuality];
    if (!quality) return null;

    const roomBreakdown = rooms.map((room) => {
      const l = parseFloat(room.length) || 0;
      const w = parseFloat(room.width) || 0;
      const h = parseFloat(room.height) || 0;
      const d = parseInt(room.doors) || 0;
      const win = parseInt(room.windows) || 0;

      if (l <= 0 || w <= 0 || h <= 0) return null;

      const grossWallArea = 2 * (l + w) * h;
      const doorSubtract = d * DOOR_AREA;
      const windowSubtract = win * WINDOW_AREA;
      const netWallArea = Math.max(0, grossWallArea - doorSubtract - windowSubtract);

      const ceilingArea = includeCeiling ? l * w : 0;
      const trimArea = includeTrim ? TRIM_LINEAR_FT_PER_ROOM * TRIM_SQFT_PER_LINEAR_FT : 0;

      const totalPaintableArea = netWallArea + ceilingArea + trimArea;
      const totalAreaWithCoats = totalPaintableArea * numCoats;
      const gallonsNeeded = Math.ceil(totalAreaWithCoats / COVERAGE_PER_GALLON);

      const primerArea = usePrimer ? totalPaintableArea : 0;
      const primerGallons = usePrimer ? Math.ceil(primerArea / PRIMER_COVERAGE) : 0;

      return {
        name: room.name || "Unnamed Room",
        grossWallArea,
        netWallArea,
        ceilingArea,
        trimArea,
        totalPaintableArea,
        gallonsNeeded,
        primerGallons,
        paintCost: gallonsNeeded * quality.pricePerGallon,
        primerCost: primerGallons * PRIMER_PRICE_PER_GALLON,
        laborSqft: totalPaintableArea,
      };
    });

    // If any room is invalid, still show partial results for valid ones
    const validRooms = roomBreakdown.filter((r) => r !== null);
    if (validRooms.length === 0) return null;

    const totalGallons = validRooms.reduce((s, r) => s + r.gallonsNeeded, 0);
    const totalPrimerGallons = validRooms.reduce((s, r) => s + r.primerGallons, 0);
    const totalPaintCost = validRooms.reduce((s, r) => s + r.paintCost, 0);
    const totalPrimerCost = validRooms.reduce((s, r) => s + r.primerCost, 0);
    const totalPaintableArea = validRooms.reduce((s, r) => s + r.totalPaintableArea, 0);

    // Supplies: tape, drop cloths, rollers, brushes, trays
    const suppliesCost = Math.min(150, Math.max(50, 30 + validRooms.length * 20));

    // Labor: $2-4/sqft depending on complexity (ceiling & trim add cost)
    const laborRate = 2.5 + (includeCeiling ? 0.5 : 0) + (includeTrim ? 0.5 : 0);
    const laborCost = hirePro ? totalPaintableArea * laborRate : 0;

    const totalProjectCost = totalPaintCost + totalPrimerCost + suppliesCost + laborCost;

    return {
      rooms: validRooms,
      totalGallons,
      totalPrimerGallons,
      totalPaintCost,
      totalPrimerCost,
      suppliesCost,
      laborCost,
      totalProjectCost,
      totalPaintableArea,
      laborRate,
      numCoats,
    };
  }, [rooms, paintQuality, coats, includeCeiling, includeTrim, usePrimer, hirePro]);

  // Cost breakdown for the chart
  const costBreakdown = useMemo(() => {
    if (!result) return [];
    const items = [
      { name: "Paint", amount: result.totalPaintCost, color: "from-amber-400 to-amber-500" },
    ];
    if (result.totalPrimerCost > 0) {
      items.push({ name: "Primer", amount: result.totalPrimerCost, color: "from-blue-400 to-blue-500" });
    }
    items.push({ name: "Supplies", amount: result.suppliesCost, color: "from-emerald-400 to-emerald-500" });
    if (result.laborCost > 0) {
      items.push({ name: "Professional Labor", amount: result.laborCost, color: "from-purple-400 to-purple-500" });
    }
    return items;
  }, [result]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="max-w-3xl mb-12">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
          <a href="/" className="hover:text-amber-600 transition-colors">Home</a>
          <span>/</span>
          <span className="text-slate-600">Paint Cost Estimator</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Paint Cost Estimator
        </h1>
        <p className="mt-4 text-lg text-slate-500 leading-relaxed">
          Calculate exactly how much paint you need and what your project will
          cost. Add each room, choose your paint quality, and get a detailed
          breakdown of gallons, materials, and labor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Input Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Settings */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-7">
            <h2 className="text-lg font-bold text-slate-900 mb-6">
              Project Settings
            </h2>

            <div className="space-y-5">
              {/* Paint Quality */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Paint Quality
                </label>
                <select
                  value={paintQuality}
                  onChange={(e) => setPaintQuality(e.target.value)}
                  className="calc-input appearance-none cursor-pointer"
                >
                  {Object.entries(paintQualities).map(([key, q]) => (
                    <option key={key} value={key}>
                      {q.label} &mdash; ${q.pricePerGallon}/gal
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-slate-400">
                  {paintQualities[paintQuality]?.description}
                </p>
              </div>

              {/* Number of Coats */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Number of Coats
                </label>
                <select
                  value={coats}
                  onChange={(e) => setCoats(e.target.value)}
                  className="calc-input appearance-none cursor-pointer"
                >
                  <option value="1">1 coat (touch-ups only)</option>
                  <option value="2">2 coats (recommended)</option>
                  <option value="3">3 coats (dark-to-light color change)</option>
                </select>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={includeCeiling}
                    onChange={(e) => setIncludeCeiling(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900">
                    Include ceilings
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={includeTrim}
                    onChange={(e) => setIncludeTrim(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900">
                    Include trim and baseboards
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={usePrimer}
                    onChange={(e) => setUsePrimer(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900">
                    Use primer (recommended for new drywall or color changes)
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={hirePro}
                    onChange={(e) => setHirePro(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900">
                    Hire a professional painter
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Room Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Rooms ({rooms.length})
              </h2>
              <button
                onClick={addRoom}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Room
              </button>
            </div>

            {rooms.map((room, idx) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    value={room.name}
                    onChange={(e) => updateRoom(room.id, "name", e.target.value)}
                    className="text-sm font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:border-amber-500 focus:outline-none pb-0.5"
                    placeholder="Room name"
                  />
                  {rooms.length > 1 && (
                    <button
                      onClick={() => removeRoom(room.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove room"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Length (ft)
                    </label>
                    <input
                      type="number"
                      value={room.length}
                      onChange={(e) => updateRoom(room.id, "length", e.target.value)}
                      className="calc-input text-sm"
                      placeholder="14"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Width (ft)
                    </label>
                    <input
                      type="number"
                      value={room.width}
                      onChange={(e) => updateRoom(room.id, "width", e.target.value)}
                      className="calc-input text-sm"
                      placeholder="12"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Ceiling Height (ft)
                    </label>
                    <input
                      type="number"
                      value={room.height}
                      onChange={(e) => updateRoom(room.id, "height", e.target.value)}
                      className="calc-input text-sm"
                      placeholder="9"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">
                        Doors
                      </label>
                      <input
                        type="number"
                        value={room.doors}
                        onChange={(e) => updateRoom(room.id, "doors", e.target.value)}
                        className="calc-input text-sm"
                        placeholder="1"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">
                        Windows
                      </label>
                      <input
                        type="number"
                        value={room.windows}
                        onChange={(e) => updateRoom(room.id, "windows", e.target.value)}
                        className="calc-input text-sm"
                        placeholder="2"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                    Total Project Cost
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold mt-2">
                    {formatUSD(result.totalProjectCost)}
                  </p>
                  <p className="text-sm text-amber-100 mt-1">
                    {result.rooms.length} room{result.rooms.length !== 1 ? "s" : ""} &middot; {result.numCoats} coat{result.numCoats !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="result-card bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">
                    Paint Needed
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                    {result.totalGallons} gal
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    {result.totalPaintableArea.toLocaleString()} sqft paintable area
                  </p>
                </div>
              </div>

              {/* Quick Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 text-center">
                  <p className="text-xs font-medium text-slate-400">Paint Cost</p>
                  <p className="text-lg font-bold text-slate-900 mt-1">{formatUSD(result.totalPaintCost)}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 text-center">
                  <p className="text-xs font-medium text-slate-400">Primer</p>
                  <p className="text-lg font-bold text-slate-900 mt-1">
                    {result.totalPrimerCost > 0 ? formatUSD(result.totalPrimerCost) : "N/A"}
                  </p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 text-center">
                  <p className="text-xs font-medium text-slate-400">Supplies</p>
                  <p className="text-lg font-bold text-slate-900 mt-1">{formatUSD(result.suppliesCost)}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 text-center">
                  <p className="text-xs font-medium text-slate-400">Labor</p>
                  <p className="text-lg font-bold text-slate-900 mt-1">
                    {result.laborCost > 0 ? formatUSD(result.laborCost) : "DIY"}
                  </p>
                </div>
              </div>

              {/* Calculation Insight */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>How we calculated this:</strong> Each wall&apos;s area is
                  computed as 2 x (length + width) x height, minus {DOOR_AREA} sqft
                  per door and {WINDOW_AREA} sqft per window. At {COVERAGE_PER_GALLON} sqft
                  coverage per gallon, your {result.numCoats} coat{result.numCoats !== 1 ? "s" : ""} across{" "}
                  {result.totalPaintableArea.toLocaleString()} sqft of paintable surface
                  require {result.totalGallons} gallon{result.totalGallons !== 1 ? "s" : ""} of{" "}
                  {paintQualities[paintQuality]?.label.toLowerCase()} paint.
                  {hirePro && (
                    <> Professional labor is estimated at ${result.laborRate.toFixed(2)}/sqft.</>
                  )}
                </p>
              </div>

              {/* Room-by-Room Breakdown Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900">
                    Room-by-Room Breakdown
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Paintable area and gallons needed per room
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-left">
                        <th className="px-6 py-3 font-semibold text-slate-600">Room</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-right">Wall Area</th>
                        {includeCeiling && (
                          <th className="px-4 py-3 font-semibold text-slate-600 text-right">Ceiling</th>
                        )}
                        <th className="px-4 py-3 font-semibold text-slate-600 text-right">Total Area</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-right">Gallons</th>
                        <th className="px-6 py-3 font-semibold text-slate-600 text-right">Paint Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {result.rooms.map((room) => (
                        <tr key={room.name} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-3.5 font-medium text-slate-700">{room.name}</td>
                          <td className="px-4 py-3.5 text-right text-slate-600">
                            {Math.round(room.netWallArea).toLocaleString()} sqft
                          </td>
                          {includeCeiling && (
                            <td className="px-4 py-3.5 text-right text-slate-600">
                              {Math.round(room.ceilingArea).toLocaleString()} sqft
                            </td>
                          )}
                          <td className="px-4 py-3.5 text-right text-slate-600">
                            {Math.round(room.totalPaintableArea).toLocaleString()} sqft
                          </td>
                          <td className="px-4 py-3.5 text-right font-semibold text-slate-700">
                            {room.gallonsNeeded}
                          </td>
                          <td className="px-6 py-3.5 text-right font-semibold text-slate-900">
                            {formatUSD(room.paintCost)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-50 font-bold">
                        <td className="px-6 py-3.5 text-slate-900">Total</td>
                        <td className="px-4 py-3.5 text-right text-slate-700">
                          {result.rooms.reduce((s, r) => s + Math.round(r.netWallArea), 0).toLocaleString()} sqft
                        </td>
                        {includeCeiling && (
                          <td className="px-4 py-3.5 text-right text-slate-700">
                            {result.rooms.reduce((s, r) => s + Math.round(r.ceilingArea), 0).toLocaleString()} sqft
                          </td>
                        )}
                        <td className="px-4 py-3.5 text-right text-slate-700">
                          {Math.round(result.totalPaintableArea).toLocaleString()} sqft
                        </td>
                        <td className="px-4 py-3.5 text-right text-slate-900">
                          {result.totalGallons}
                        </td>
                        <td className="px-6 py-3.5 text-right text-slate-900">
                          {formatUSD(result.totalPaintCost)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Cost Distribution Bar Chart */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Cost Distribution
                </h3>
                <div className="space-y-3">
                  {costBreakdown
                    .sort((a, b) => b.amount - a.amount)
                    .map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600">{item.name}</span>
                          <span className="font-medium text-slate-700">
                            {formatUSD(item.amount)} ({((item.amount / result.totalProjectCost) * 100).toFixed(0)}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                          <div
                            className={`bg-gradient-to-r ${item.color} h-2.5 rounded-full transition-all duration-500`}
                            style={{
                              width: `${(item.amount / result.totalProjectCost) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Painting Tips
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-amber-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-amber-800 mb-1">Paint Quality Matters</p>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Premium paints have higher pigment concentration, meaning better
                      coverage in fewer coats. A $60 gallon that covers in 1 coat can
                      be cheaper than a $25 gallon needing 3 coats.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-blue-800 mb-1">When to Use Primer</p>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Always prime new drywall, patched areas, when covering dark colors
                      with light ones, or on stained surfaces. Many premium paints
                      include primer, but a dedicated primer still gives the best results.
                    </p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-emerald-800 mb-1">Buy 10% Extra</p>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      Our calculator gives precise estimates, but always buy a little
                      extra for touch-ups, mistakes, and future repairs. Keep leftover
                      paint labeled and sealed for quick fixes.
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-purple-800 mb-1">DIY vs Professional</p>
                    <p className="text-xs text-purple-700 leading-relaxed">
                      Painting is one of the most accessible DIY projects. Hiring pros
                      makes sense for high ceilings, multiple rooms, or when you value
                      your time. Expect pros to charge $2-4 per square foot.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 text-center">
              <p className="text-slate-400">
                Enter valid room dimensions to see your paint cost estimate.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <article className="max-w-3xl mx-auto mt-20 prose prose-slate prose-lg">
        <h2>How to Estimate Interior Paint Costs for Your Home</h2>
        <p>
          Painting is one of the most popular home improvement projects, and for
          good reason. A fresh coat of paint can transform a room for a fraction
          of the cost of other renovations. But before you head to the hardware
          store, you need a solid estimate of how much paint to buy and what the
          project will actually cost. Overbuying wastes money, and underbuying
          means extra trips and potential color-matching headaches.
        </p>

        <h3>Calculating How Much Paint You Need</h3>
        <p>
          The fundamental formula is straightforward: measure the perimeter of
          each room (length + width, times two), multiply by the ceiling height
          to get the total wall area, then subtract openings. A standard interior
          door is about 21 square feet and a typical window is about 15 square
          feet. The remaining area is your paintable surface.
        </p>
        <p>
          One gallon of paint covers approximately 350 square feet with a single
          coat. Most interior painting projects require two coats for even
          coverage, which effectively cuts your coverage in half. A 12-by-14
          foot room with 9-foot ceilings has roughly 468 square feet of wall
          area. After subtracting a door and two windows, you are left with about
          417 square feet. Two coats means 834 square feet of coverage needed, or
          roughly 3 gallons of paint.
        </p>

        <h3>Understanding Paint Quality and Price</h3>
        <p>
          Paint prices range from about $25 per gallon for economy options to
          $85 or more for designer-grade products. The difference is not just
          marketing. Higher-quality paints contain more pigment and better
          binders, which translates to better coverage, richer color, and a
          more durable finish. Economy paints may need three coats to achieve
          what a premium paint does in two, potentially making the cheaper
          option more expensive in the long run.
        </p>
        <p>
          For high-traffic areas like hallways, kitchens, and kids&apos; rooms,
          investing in a washable premium or designer paint pays for itself
          within a few years. For guest bedrooms and closets that see minimal
          wear, a standard-quality paint is perfectly adequate.
        </p>

        <h3>Do You Need Primer?</h3>
        <p>
          Primer is a separate product that prepares the surface for paint. You
          should use primer when painting new drywall (which is very absorbent),
          covering dark colors with lighter ones, painting over stains or
          patches, or switching between paint types (oil to latex). While many
          modern paints advertise &ldquo;paint and primer in one,&rdquo; a
          dedicated primer at $20 per gallon often produces better results and
          can actually save you money by reducing the number of topcoats needed.
        </p>

        <h3>DIY vs Hiring a Professional Painter</h3>
        <p>
          One of the biggest cost decisions is whether to do the work yourself
          or hire a professional. DIY painting costs only materials and your
          time. Professional painters typically charge $2 to $4 per square foot
          of paintable surface, which includes their labor, expertise, and
          usually a faster turnaround. For a typical 2,000 square foot interior
          paint job, professional labor alone can run $4,000 to $8,000.
        </p>
        <p>
          DIY makes sense if you have the time, the ceilings are standard
          height, and you are comfortable on a ladder. Hiring a pro is worth
          the investment for multi-story foyers, intricate trim work, large
          whole-home projects, or when you simply need the job done quickly and
          with a flawless finish.
        </p>

        <h3>Hidden Costs to Plan For</h3>
        <p>
          Beyond paint and labor, budget for supplies. Painter&apos;s tape, drop
          cloths, roller covers, brushes, paint trays, and extension poles
          typically add $50 to $150 to a project depending on how many rooms
          you are painting and whether you already own some supplies. If walls
          have damage, you may also need spackle, sandpaper, and caulk for
          prep work. Proper preparation is the difference between a
          professional-looking result and a sloppy one, so do not skip this
          step.
        </p>

        <h3>Tips for Saving Money on Your Paint Project</h3>
        <p>
          Look for paint sales around holiday weekends, when many retailers
          offer 30-40% discounts. Buy in 5-gallon buckets instead of individual
          gallons for a per-gallon discount of about 10-15%. Use a tinted
          primer that matches your topcoat color to reduce the number of finish
          coats. And always keep leftover paint sealed and labeled for future
          touch-ups, as matching custom colors later can be surprisingly
          difficult. With some planning and the right calculations, your paint
          project can deliver dramatic results without breaking the budget.
        </p>
      </article>
    </div>
  );
}
