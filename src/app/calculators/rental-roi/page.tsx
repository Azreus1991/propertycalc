"use client";

import { useState, useMemo } from "react";

/* ────────────────────────────────────────────────────────
   METHODOLOGY
   Standard rental property investment analysis metrics:
   • Cash-on-Cash Return: Annual pre-tax cash flow / total cash invested
   • Cap Rate: NOI / property purchase price
   • Total ROI: (equity + cash flow + appreciation) / cash invested
   • Break-even Occupancy: Minimum occupancy to cover expenses
   • Monthly Cash Flow: Gross rent - vacancy - all expenses

   All figures assume a conventional purchase (no financing
   costs beyond down payment + closing). Mortgage payments
   are intentionally excluded to isolate property performance.
   ──────────────────────────────────────────────────────── */

function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatPct(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}

export default function RentalRoiPage() {
  const [purchasePrice, setPurchasePrice] = useState<string>("300000");
  const [downPaymentPct, setDownPaymentPct] = useState<string>("25");
  const [closingCosts, setClosingCosts] = useState<string>("9000");
  const [monthlyRent, setMonthlyRent] = useState<string>("2200");
  const [vacancyRate, setVacancyRate] = useState<string>("5");
  const [propertyTaxes, setPropertyTaxes] = useState<string>("3600");
  const [insurance, setInsurance] = useState<string>("1800");
  const [hoaMonthly, setHoaMonthly] = useState<string>("0");
  const [maintenancePct, setMaintenancePct] = useState<string>("10");
  const [managementPct, setManagementPct] = useState<string>("8");
  const [appreciationPct, setAppreciationPct] = useState<string>("3");

  const result = useMemo(() => {
    const price = parseFloat(purchasePrice) || 0;
    const dpPct = parseFloat(downPaymentPct) || 0;
    const closing = parseFloat(closingCosts) || 0;
    const rent = parseFloat(monthlyRent) || 0;
    const vacancy = (parseFloat(vacancyRate) || 0) / 100;
    const taxes = parseFloat(propertyTaxes) || 0;
    const ins = parseFloat(insurance) || 0;
    const hoa = parseFloat(hoaMonthly) || 0;
    const maintPct = (parseFloat(maintenancePct) || 0) / 100;
    const mgmtPct = (parseFloat(managementPct) || 0) / 100;
    const apprPct = (parseFloat(appreciationPct) || 0) / 100;

    if (price <= 0 || rent <= 0) return null;

    const downPayment = price * (dpPct / 100);
    const totalCashInvested = downPayment + closing;

    // Annual income
    const grossAnnualRent = rent * 12;
    const vacancyLoss = grossAnnualRent * vacancy;
    const effectiveGrossIncome = grossAnnualRent - vacancyLoss;

    // Annual expenses
    const maintenanceCost = grossAnnualRent * maintPct;
    const managementCost = effectiveGrossIncome * mgmtPct;
    const hoaAnnual = hoa * 12;
    const totalExpenses = taxes + ins + hoaAnnual + maintenanceCost + managementCost;

    // NOI and cash flow
    const noi = effectiveGrossIncome - totalExpenses;
    const annualCashFlow = noi;
    const monthlyCashFlow = annualCashFlow / 12;

    // Return metrics
    const cashOnCash = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;
    const capRate = price > 0 ? (noi / price) * 100 : 0;

    // Break-even occupancy: what occupancy covers total expenses?
    // At break-even: (rent * 12 * occupancy) - (rent * 12 * occupancy * mgmtPct) - (rent * 12 * maintPct) - fixedExpenses = 0
    // occupancy * rent * 12 * (1 - mgmtPct) = fixedExpenses + rent * 12 * maintPct
    const fixedExpenses = taxes + ins + hoaAnnual;
    const breakEvenOccupancy =
      grossAnnualRent * (1 - mgmtPct) > 0
        ? ((fixedExpenses + maintenanceCost) / (grossAnnualRent * (1 - mgmtPct))) * 100
        : 0;

    // Total ROI projections (cash flow + appreciation + equity paydown)
    // Simplified: no mortgage, so equity = down payment, appreciation on full value
    const totalRoi5yr =
      totalCashInvested > 0
        ? ((annualCashFlow * 5 + price * (Math.pow(1 + apprPct, 5) - 1)) / totalCashInvested) * 100
        : 0;
    const totalRoi10yr =
      totalCashInvested > 0
        ? ((annualCashFlow * 10 + price * (Math.pow(1 + apprPct, 10) - 1)) / totalCashInvested) * 100
        : 0;

    // Income vs expense breakdown for table
    const incomeBreakdown = [
      { name: "Gross Annual Rent", amount: grossAnnualRent, type: "income" as const },
      { name: "Vacancy Loss", amount: -vacancyLoss, type: "income" as const },
      { name: "Effective Gross Income", amount: effectiveGrossIncome, type: "subtotal" as const },
    ];

    const expenseBreakdown = [
      { name: "Property Taxes", amount: taxes, icon: "🏛️" },
      { name: "Insurance", amount: ins, icon: "🛡️" },
      { name: "HOA Fees", amount: hoaAnnual, icon: "🏢" },
      { name: "Maintenance & Repairs", amount: maintenanceCost, icon: "🔧" },
      { name: "Property Management", amount: managementCost, icon: "👤" },
    ];

    // Vacancy scenario analysis
    const vacancyScenarios = [0, 3, 5, 8, 10, 15, 20].map((vRate) => {
      const vLoss = grossAnnualRent * (vRate / 100);
      const egi = grossAnnualRent - vLoss;
      const mgmt = egi * mgmtPct;
      const expenses = fixedExpenses + maintenanceCost + mgmt;
      const cf = egi - expenses;
      const coc = totalCashInvested > 0 ? (cf / totalCashInvested) * 100 : 0;
      return { vacancyRate: vRate, annualCashFlow: cf, monthlyCashFlow: cf / 12, cashOnCash: coc };
    });

    return {
      totalCashInvested,
      downPayment,
      grossAnnualRent,
      vacancyLoss,
      effectiveGrossIncome,
      totalExpenses,
      noi,
      annualCashFlow,
      monthlyCashFlow,
      cashOnCash,
      capRate,
      breakEvenOccupancy,
      totalRoi5yr,
      totalRoi10yr,
      incomeBreakdown,
      expenseBreakdown,
      vacancyScenarios,
    };
  }, [
    purchasePrice, downPaymentPct, closingCosts, monthlyRent, vacancyRate,
    propertyTaxes, insurance, hoaMonthly, maintenancePct, managementPct, appreciationPct,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="max-w-3xl mb-12">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
          <a href="/" className="hover:text-amber-600 transition-colors">Home</a>
          <span>/</span>
          <span className="text-slate-600">Rental Property ROI</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Rental Property ROI Calculator
        </h1>
        <p className="mt-4 text-lg text-slate-500 leading-relaxed">
          Analyze any rental property investment with cash-on-cash return, cap rate,
          monthly cash flow, and multi-year ROI projections. Built for landlords,
          house hackers, and serious real estate investors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Input Panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-7">
          <h2 className="text-lg font-bold text-slate-900 mb-6">
            Property Details
          </h2>

          <div className="space-y-5">
            {/* Purchase Price */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Purchase Price
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  $
                </span>
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  className="calc-input pl-8"
                  placeholder="300,000"
                />
              </div>
            </div>

            {/* Down Payment % */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Down Payment
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(e.target.value)}
                  className="calc-input"
                  placeholder="25"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  %
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Investment properties typically require 20-25% down
              </p>
            </div>

            {/* Closing Costs */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Closing Costs
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  $
                </span>
                <input
                  type="number"
                  value={closingCosts}
                  onChange={(e) => setClosingCosts(e.target.value)}
                  className="calc-input pl-8"
                  placeholder="9,000"
                />
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Usually 2-5% of purchase price
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 pt-2">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Income
              </h3>
            </div>

            {/* Monthly Rent */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Monthly Rent
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  $
                </span>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                  className="calc-input pl-8"
                  placeholder="2,200"
                />
              </div>
            </div>

            {/* Vacancy Rate */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Vacancy Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={vacancyRate}
                  onChange={(e) => setVacancyRate(e.target.value)}
                  className="calc-input"
                  placeholder="5"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  %
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                National average is 5-8% for residential rentals
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 pt-2">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Annual Expenses
              </h3>
            </div>

            {/* Property Taxes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Property Taxes (per year)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  $
                </span>
                <input
                  type="number"
                  value={propertyTaxes}
                  onChange={(e) => setPropertyTaxes(e.target.value)}
                  className="calc-input pl-8"
                  placeholder="3,600"
                />
              </div>
            </div>

            {/* Insurance */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Insurance (per year)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  $
                </span>
                <input
                  type="number"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  className="calc-input pl-8"
                  placeholder="1,800"
                />
              </div>
            </div>

            {/* HOA */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                HOA Fees (per month)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  $
                </span>
                <input
                  type="number"
                  value={hoaMonthly}
                  onChange={(e) => setHoaMonthly(e.target.value)}
                  className="calc-input pl-8"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Maintenance % */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Maintenance Reserve
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={maintenancePct}
                  onChange={(e) => setMaintenancePct(e.target.value)}
                  className="calc-input"
                  placeholder="10"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  % of rent
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Most investors budget 8-12% of gross rent
              </p>
            </div>

            {/* Management % */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Property Management Fee
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={managementPct}
                  onChange={(e) => setManagementPct(e.target.value)}
                  className="calc-input"
                  placeholder="8"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  % of collected rent
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Set to 0% if self-managing. Typical PM fee is 8-12%
              </p>
            </div>

            {/* Appreciation */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Expected Annual Appreciation
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={appreciationPct}
                  onChange={(e) => setAppreciationPct(e.target.value)}
                  className="calc-input"
                  placeholder="3"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  %
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                US average is ~3-4% historically
              </p>
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
                    Cash-on-Cash Return
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold mt-2">
                    {formatPct(result.cashOnCash)}
                  </p>
                  <p className="text-sm text-amber-100 mt-1">
                    {formatUSD(result.annualCashFlow)} annual cash flow
                  </p>
                </div>
                <div className="result-card bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">
                    Monthly Cash Flow
                  </p>
                  <p className={`text-3xl sm:text-4xl font-extrabold mt-2 ${result.monthlyCashFlow >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {formatUSD(result.monthlyCashFlow)}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    per month after all expenses
                  </p>
                </div>
              </div>

              {/* Secondary metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="result-card bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Cap Rate
                  </p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {formatPct(result.capRate)}
                  </p>
                </div>
                <div className="result-card bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Break-Even Occ.
                  </p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {formatPct(Math.min(result.breakEvenOccupancy, 100))}
                  </p>
                </div>
                <div className="result-card bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    5-Year Total ROI
                  </p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {formatPct(result.totalRoi5yr, 0)}
                  </p>
                </div>
                <div className="result-card bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    10-Year Total ROI
                  </p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {formatPct(result.totalRoi10yr, 0)}
                  </p>
                </div>
              </div>

              {/* Investment summary insight */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>Investment summary:</strong> You&apos;re investing{" "}
                  {formatUSD(result.totalCashInvested)} upfront (
                  {formatUSD(result.downPayment)} down payment +{" "}
                  {formatUSD(parseFloat(closingCosts) || 0)} closing costs) to generate{" "}
                  {formatUSD(result.effectiveGrossIncome)} in effective annual income
                  against {formatUSD(result.totalExpenses)} in annual expenses. Your
                  property needs at least {formatPct(result.breakEvenOccupancy)} occupancy
                  just to break even.
                </p>
              </div>

              {/* Income vs Expense Breakdown Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900">
                    Income vs. Expense Breakdown
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Annual figures based on your inputs
                  </p>
                </div>
                <div className="divide-y divide-slate-100">
                  {/* Income section */}
                  <div className="px-6 py-3 bg-emerald-50/50">
                    <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Income
                    </span>
                  </div>
                  {result.incomeBreakdown.map((item) => (
                    <div
                      key={item.name}
                      className={`flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors ${
                        item.type === "subtotal" ? "bg-slate-50 font-semibold" : ""
                      }`}
                    >
                      <span className={`text-sm ${item.type === "subtotal" ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
                        {item.name}
                      </span>
                      <span className={`text-sm ${item.amount < 0 ? "text-red-600" : "text-emerald-600"} ${item.type === "subtotal" ? "font-bold" : "font-semibold"}`}>
                        {item.amount < 0 ? "-" : ""}{formatUSD(Math.abs(item.amount))}
                        <span className="text-xs text-slate-400 ml-2">/yr</span>
                      </span>
                    </div>
                  ))}

                  {/* Expense section */}
                  <div className="px-6 py-3 bg-red-50/50">
                    <span className="text-xs font-semibold uppercase tracking-wide text-red-700">
                      Expenses
                    </span>
                  </div>
                  {result.expenseBreakdown.map((item) => (
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
                        <span className="text-sm font-semibold text-red-600">
                          -{formatUSD(item.amount)}
                        </span>
                        <span className="text-xs text-slate-400 ml-2">/yr</span>
                      </div>
                    </div>
                  ))}

                  {/* Totals */}
                  <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50">
                    <span className="text-sm font-bold text-slate-900">
                      Total Annual Expenses
                    </span>
                    <span className="text-sm font-bold text-red-600">
                      -{formatUSD(result.totalExpenses)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 bg-slate-900">
                    <span className="text-sm font-bold text-white">
                      Net Operating Income (NOI)
                    </span>
                    <span className={`text-sm font-bold ${result.noi >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {formatUSD(result.noi)}/yr
                    </span>
                  </div>
                </div>
              </div>

              {/* Bar chart: Income vs Expenses */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Income vs. Expenses
                </h3>
                <div className="space-y-4">
                  {/* Income bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-600 font-medium">Effective Gross Income</span>
                      <span className="font-semibold text-emerald-700">
                        {formatUSD(result.effectiveGrossIncome)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  {/* Expense bars */}
                  {result.expenseBreakdown
                    .filter((item) => item.amount > 0)
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
                              width: `${Math.min((item.amount / result.effectiveGrossIncome) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  {/* NOI bar */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-600 font-medium">Net Operating Income</span>
                      <span className={`font-semibold ${result.noi >= 0 ? "text-emerald-700" : "text-red-600"}`}>
                        {formatUSD(result.noi)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          result.noi >= 0
                            ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                            : "bg-gradient-to-r from-red-400 to-red-500"
                        }`}
                        style={{
                          width: `${Math.min(Math.abs(result.noi / result.effectiveGrossIncome) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Vacancy Scenario Analysis */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900">
                    Scenario: What if Vacancy Increases?
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    See how your returns change at different vacancy rates
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Vacancy
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Monthly Cash Flow
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Annual Cash Flow
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Cash-on-Cash
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {result.vacancyScenarios.map((scenario) => {
                        const isActive =
                          scenario.vacancyRate === (parseFloat(vacancyRate) || 0);
                        return (
                          <tr
                            key={scenario.vacancyRate}
                            className={`transition-colors ${
                              isActive
                                ? "bg-amber-50 font-semibold"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <td className="px-6 py-3 text-slate-700">
                              {scenario.vacancyRate}%
                              {isActive && (
                                <span className="ml-2 text-xs text-amber-600 font-medium">
                                  (current)
                                </span>
                              )}
                            </td>
                            <td className={`px-6 py-3 text-right ${scenario.monthlyCashFlow >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                              {formatUSD(scenario.monthlyCashFlow)}
                            </td>
                            <td className={`px-6 py-3 text-right ${scenario.annualCashFlow >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                              {formatUSD(scenario.annualCashFlow)}
                            </td>
                            <td className={`px-6 py-3 text-right ${scenario.cashOnCash >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                              {formatPct(scenario.cashOnCash)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-12 text-center">
              <p className="text-slate-400">
                Enter your property details to see your rental ROI analysis.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <article className="max-w-3xl mx-auto mt-20 prose prose-slate prose-lg">
        <h2>How to Calculate Rental Property ROI: A Complete Guide</h2>
        <p>
          Evaluating a rental property investment requires more than just comparing the
          purchase price to the monthly rent. Professional real estate investors use
          several key metrics to determine whether a deal is worth pursuing, and
          understanding these numbers is the difference between building wealth and
          bleeding money. This calculator uses the same formulas relied on by
          institutional investors, property managers, and real estate analysts nationwide.
        </p>

        <h3>Cash-on-Cash Return: The Investor&apos;s Favorite Metric</h3>
        <p>
          Cash-on-cash return measures the annual pre-tax cash flow relative to the total
          cash you actually invested. Unlike cap rate, which evaluates the property
          itself, cash-on-cash return evaluates <em>your specific deal</em> based on how
          much of your own money is at risk. The formula is straightforward: divide your
          annual net cash flow by your total cash invested (down payment plus closing
          costs). Most experienced investors target a minimum cash-on-cash return of
          8-12% for residential rentals, though this varies by market. A 10% cash-on-cash
          return means you&apos;re earning 10 cents in annual cash flow for every dollar
          you put in — significantly better than most stock market dividend yields.
        </p>

        <h3>Cap Rate: Evaluating the Property on Its Own Merits</h3>
        <p>
          The capitalization rate (cap rate) strips away financing details to show you the
          property&apos;s raw earning power. It&apos;s calculated by dividing the net
          operating income (NOI) by the property&apos;s purchase price or current market
          value. A property with $18,000 in NOI and a $300,000 price tag has a 6% cap
          rate. Cap rates vary dramatically by location and property type: Class A
          apartments in major metros might trade at 4-5% cap rates, while single-family
          rentals in secondary markets often hit 7-10%. Lower cap rates generally indicate
          lower risk and higher property values, while higher cap rates suggest more
          income relative to price but potentially more risk.
        </p>

        <h3>Understanding Net Operating Income</h3>
        <p>
          NOI is the heartbeat of rental property analysis. It equals your effective gross
          income (gross rent minus vacancy losses) minus all operating expenses — property
          taxes, insurance, maintenance, property management fees, and HOA dues. NOI
          deliberately excludes mortgage payments, capital expenditures, and income taxes
          because those vary by investor. This makes NOI the best apples-to-apples
          comparison metric when evaluating multiple properties. A positive NOI means the
          property pays for itself operationally; a negative NOI means you&apos;re
          subsidizing it out of pocket regardless of how you financed the purchase.
        </p>

        <h3>The Vacancy Factor Most Investors Underestimate</h3>
        <p>
          New landlords often assume their property will stay rented 12 months a year.
          Reality is less forgiving. Even in hot rental markets, you should budget for
          at least 5% vacancy — roughly 18 days per year of lost rent. This accounts for
          turnover time between tenants, seasonal demand fluctuations, and occasional
          longer vacancies. In softer markets or for properties that are harder to rent,
          8-10% is more realistic. Our scenario table shows exactly how sensitive your
          returns are to vacancy changes: a property that looks great at 5% vacancy might
          become a money-loser at 15%.
        </p>

        <h3>Maintenance and Management: The Hidden Costs</h3>
        <p>
          Budgeting 8-12% of gross rent for maintenance covers routine repairs, appliance
          replacements, and turnover costs like painting and cleaning. Skimp on this
          number and you&apos;ll eventually face a surprise $5,000 HVAC replacement or
          $3,000 plumbing repair with no reserves. Property management fees, typically
          8-12% of collected rent for residential properties, are worth including even if
          you self-manage — your time has value, and knowing the true cost of management
          keeps your analysis honest. If you ever decide to step back from hands-on
          landlording, the numbers are already built in.
        </p>

        <h3>Total ROI: The Big Picture Over Time</h3>
        <p>
          Cash flow is only one part of the return equation. Total ROI includes property
          appreciation, which historically averages 3-4% per year nationally, though
          individual markets can range from flat to double-digit growth. Our 5-year and
          10-year projections combine annual cash flow with projected appreciation gains,
          divided by your initial cash investment. Real estate&apos;s true wealth-building
          power becomes clear at the 10-year mark: even a modest 3% annual appreciation
          on a $300,000 property adds nearly $100,000 in equity over a decade. Combined
          with consistent cash flow, the total return often dwarfs what the same capital
          would earn in the stock market — and that&apos;s before accounting for tax
          advantages like depreciation deductions and 1031 exchanges.
        </p>

        <h3>The Break-Even Occupancy Rate</h3>
        <p>
          This often-overlooked metric tells you the minimum percentage of the year your
          property must be occupied to cover all operating expenses. A break-even
          occupancy of 70% gives you a wide safety margin, while 95% means almost any
          vacancy will put you in the red. Properties with low fixed costs relative to
          rent tend to have the most favorable break-even points. When evaluating a deal,
          compare the break-even occupancy to local market vacancy rates — if your
          break-even is higher than the typical vacancy in the area, the deal carries
          significant risk.
        </p>
      </article>
    </div>
  );
}
