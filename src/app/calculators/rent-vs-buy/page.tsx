"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export default function RentVsBuyCalculator() {
  const [monthlyRent, setMonthlyRent] = useState(2000);
  const [rentInsurance, setRentInsurance] = useState(25);
  const [rentIncrease, setRentIncrease] = useState(3);
  const [homePrice, setHomePrice] = useState(350000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [termYears] = useState(30);
  const [taxRate, setTaxRate] = useState(1.2);
  const [insuranceRate, setInsuranceRate] = useState(0.5);
  const [hoaMonthly, setHoaMonthly] = useState(0);
  const [maintenancePct, setMaintenancePct] = useState(1);
  const [closingPct, setClosingPct] = useState(3);
  const [stayYears, setStayYears] = useState(7);
  const [appreciation, setAppreciation] = useState(3);
  const [investReturn, setInvestReturn] = useState(7);

  const results = useMemo(() => {
    const downPayment = homePrice * (downPct / 100);
    const principal = homePrice - downPayment;
    const closingCosts = homePrice * (closingPct / 100);
    const monthlyRate = rate / 100 / 12;
    const numPayments = termYears * 12;

    let monthlyPI = 0;
    if (monthlyRate > 0) {
      monthlyPI = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      monthlyPI = principal / numPayments;
    }

    let totalRentCost = 0;
    let totalBuyCost = downPayment + closingCosts;
    let rentSavingsInvested = downPayment + closingCosts;
    const yearlyData: { year: number; rentCumulative: number; buyCumulative: number; homeValue: number; equity: number }[] = [];

    let currentRent = monthlyRent;
    let balance = principal;
    let homeValue = homePrice;

    for (let year = 1; year <= stayYears; year++) {
      const yearlyRent = currentRent * 12 + rentInsurance * 12;
      totalRentCost += yearlyRent;

      const yearlyTax = homeValue * (taxRate / 100);
      const yearlyInsurance = homeValue * (insuranceRate / 100);
      const yearlyMaintenance = homeValue * (maintenancePct / 100);
      const yearlyHOA = hoaMonthly * 12;
      const yearlyMortgage = monthlyPI * 12;

      let yearlyInterest = 0;
      let yearlyPrincipalPaid = 0;
      for (let m = 0; m < 12; m++) {
        const intPayment = balance * monthlyRate;
        const prinPayment = monthlyPI - intPayment;
        yearlyInterest += intPayment;
        yearlyPrincipalPaid += prinPayment;
        balance -= prinPayment;
        if (balance < 0) balance = 0;
      }

      const yearlyBuyCost = yearlyMortgage + yearlyTax + yearlyInsurance + yearlyMaintenance + yearlyHOA;
      totalBuyCost += yearlyBuyCost;

      homeValue *= (1 + appreciation / 100);

      const monthlySavings = (yearlyBuyCost - yearlyRent) / 12;
      if (monthlySavings > 0) {
        rentSavingsInvested *= (1 + investReturn / 100);
        rentSavingsInvested += monthlySavings * 12;
      } else {
        rentSavingsInvested *= (1 + investReturn / 100);
      }

      const equity = homeValue - balance;
      yearlyData.push({ year, rentCumulative: totalRentCost, buyCumulative: totalBuyCost, homeValue, equity });
      currentRent *= (1 + rentIncrease / 100);
    }

    const sellingCosts = homeValue * 0.06;
    const netEquity = homeValue - balance - sellingCosts;
    const adjustedBuyCost = totalBuyCost - netEquity;
    const netWorthBuying = netEquity;
    const netWorthRenting = rentSavingsInvested;
    const difference = netWorthBuying - netWorthRenting;
    const recommendation = difference > 0 ? "buying" : "renting";
    const savings = Math.abs(difference);

    let breakEvenYear = 0;
    for (const d of yearlyData) {
      const sellingAtYear = d.homeValue * 0.06;
      const netEqAtYear = d.equity - sellingAtYear - (downPayment + closingCosts);
      if (netEqAtYear > 0 && breakEvenYear === 0) {
        breakEvenYear = d.year;
      }
    }

    return {
      totalRentCost, totalBuyCost, adjustedBuyCost, netEquity, netWorthBuying, netWorthRenting,
      difference, recommendation, savings, breakEvenYear, yearlyData, downPayment, closingCosts,
      monthlyPI, sellingCosts, homeValue,
    };
  }, [monthlyRent, rentInsurance, rentIncrease, homePrice, downPct, rate, termYears, taxRate, insuranceRate, hoaMonthly, maintenancePct, closingPct, stayYears, appreciation, investReturn]);

  return (
    <>
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/calculators" className="hover:text-brand-400 transition-colors">Calculators</Link>
            <span>/</span>
            <span className="text-white">Rent vs Buy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Rent vs Buy Calculator</h1>
          <p className="mt-3 text-slate-300 max-w-2xl">
            Should you keep renting or buy a home? This calculator compares total costs, wealth building,
            and opportunity costs to give you a clear, data-driven answer.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-2 space-y-5">
            {/* Renting */}
            <div className="card p-6 space-y-4">
              <h2 className="text-lg font-bold text-navy-950">Renting</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Monthly Rent ($)</label>
                <input type="number" className="calc-input" value={monthlyRent} onChange={(e) => setMonthlyRent(+e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Renter&apos;s Insurance ($/mo)</label>
                <input type="number" className="calc-input" value={rentInsurance} onChange={(e) => setRentInsurance(+e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Annual Rent Increase (%)</label>
                <input type="number" className="calc-input" value={rentIncrease} step={0.5} onChange={(e) => setRentIncrease(+e.target.value)} />
              </div>
            </div>

            {/* Buying */}
            <div className="card p-6 space-y-4">
              <h2 className="text-lg font-bold text-navy-950">Buying</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Home Price ($)</label>
                <input type="number" className="calc-input" value={homePrice} onChange={(e) => setHomePrice(+e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Down Payment (%)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min={3} max={50} value={downPct} onChange={(e) => setDownPct(+e.target.value)} className="flex-1 accent-brand-500" />
                  <span className="text-sm font-bold text-navy-950 w-14 text-right">{downPct}%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Interest Rate (%)</label>
                <input type="number" className="calc-input" value={rate} step={0.125} onChange={(e) => setRate(+e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Property Tax Rate (%/yr)</label>
                <input type="number" className="calc-input" value={taxRate} step={0.1} onChange={(e) => setTaxRate(+e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Insurance Rate (%/yr)</label>
                <input type="number" className="calc-input" value={insuranceRate} step={0.1} onChange={(e) => setInsuranceRate(+e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Monthly HOA ($)</label>
                <input type="number" className="calc-input" value={hoaMonthly} onChange={(e) => setHoaMonthly(+e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Maintenance (%/yr)</label>
                <input type="number" className="calc-input" value={maintenancePct} step={0.25} onChange={(e) => setMaintenancePct(+e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Closing Costs (%)</label>
                <input type="number" className="calc-input" value={closingPct} step={0.5} onChange={(e) => setClosingPct(+e.target.value)} />
              </div>
            </div>

            {/* Assumptions */}
            <div className="card p-6 space-y-4">
              <h2 className="text-lg font-bold text-navy-950">Assumptions</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">How long will you stay? ({stayYears} years)</label>
                <input type="range" min={1} max={30} value={stayYears} onChange={(e) => setStayYears(+e.target.value)} className="w-full accent-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Annual Appreciation (%)</label>
                <input type="number" className="calc-input" value={appreciation} step={0.5} onChange={(e) => setAppreciation(+e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Investment Return Rate (%)</label>
                <input type="number" className="calc-input" value={investReturn} step={0.5} onChange={(e) => setInvestReturn(+e.target.value)} />
                <p className="text-xs text-slate-400 mt-1">Return on money if invested instead of buying</p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Verdict */}
            <div className={`card p-6 sm:p-8 ${results.recommendation === "buying" ? "border-sage-300 bg-sage-50/30" : "border-brand-300 bg-brand-50/30"}`}>
              <div className="text-sm font-medium text-slate-500 mb-1">Our Analysis</div>
              <div className="text-2xl sm:text-3xl font-black text-navy-950">
                {results.recommendation === "buying" ? "Buying" : "Renting"} saves you {fmt(results.savings)}
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Over {stayYears} years, {results.recommendation} builds more wealth when factoring in equity, appreciation,
                opportunity cost of the down payment, and all housing expenses.
              </p>
              {results.breakEvenYear > 0 && (
                <p className="text-sm font-semibold text-navy-950 mt-2">
                  Break-even point: Year {results.breakEvenYear} — buying becomes financially advantageous after staying {results.breakEvenYear}+ years.
                </p>
              )}
            </div>

            {/* Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card p-5 text-center border-brand-200">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Total Cost of Renting</div>
                <div className="text-xl font-extrabold text-navy-950">{fmt(results.totalRentCost)}</div>
                <div className="text-xs text-slate-400 mt-0.5">{stayYears} years</div>
              </div>
              <div className="card p-5 text-center border-sage-200">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Net Cost of Buying</div>
                <div className="text-xl font-extrabold text-navy-950">{fmt(results.adjustedBuyCost)}</div>
                <div className="text-xs text-slate-400 mt-0.5">After equity & selling costs</div>
              </div>
            </div>

            {/* Wealth Comparison */}
            <div className="card p-6">
              <h3 className="text-base font-bold text-navy-950 mb-4">Net Wealth After {stayYears} Years</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">If you buy (home equity)</span>
                    <span className="font-semibold text-navy-950">{fmt(results.netWorthBuying)}</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sage-500 rounded-full" style={{ width: `${Math.min(100, (results.netWorthBuying / Math.max(results.netWorthBuying, results.netWorthRenting)) * 100)}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">If you rent (invested savings)</span>
                    <span className="font-semibold text-navy-950">{fmt(results.netWorthRenting)}</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${Math.min(100, (results.netWorthRenting / Math.max(results.netWorthBuying, results.netWorthRenting)) * 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Year-by-Year */}
            <div className="card p-6">
              <h3 className="text-base font-bold text-navy-950 mb-4">Year-by-Year Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Year</th>
                      <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Rent Cost</th>
                      <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Buy Cost</th>
                      <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Home Value</th>
                      <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Equity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearlyData.map((d) => (
                      <tr key={d.year} className="border-b border-slate-50">
                        <td className="py-2 font-semibold text-navy-950">{d.year}</td>
                        <td className="py-2 text-right text-slate-600">{fmt(d.rentCumulative)}</td>
                        <td className="py-2 text-right text-slate-600">{fmt(d.buyCumulative)}</td>
                        <td className="py-2 text-right text-sage-600">{fmt(d.homeValue)}</td>
                        <td className="py-2 text-right font-semibold text-sage-600">{fmt(d.equity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Assumptions */}
            <div className="card p-6 bg-warm-50 border-warm-200">
              <h3 className="text-base font-bold text-navy-950 mb-3">Key Factors in This Analysis</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Home appreciation assumed at {appreciation}% annually (national average is ~3-4%)</li>
                <li>Selling costs of 6% (agent commissions + closing) deducted from home equity</li>
                <li>Down payment + closing costs ({fmt(results.downPayment + results.closingCosts)}) invested at {investReturn}% for renting scenario</li>
                <li>Monthly savings when renting is cheaper are also invested at {investReturn}%</li>
                <li>Tax benefits of homeownership are not included (most homeowners take standard deduction)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEO Article */}
        <article className="mt-16 prose-brand max-w-4xl mx-auto">
          <h2>Rent vs Buy: Making the Right Decision</h2>
          <p>
            The rent-versus-buy decision is one of the most consequential financial choices you will face. Conventional wisdom says buying is always
            better because you are &ldquo;building equity instead of throwing money away,&rdquo; but the reality is far more nuanced. In many
            situations, renting and investing the difference can actually build more wealth than buying.
          </p>

          <h3>When Buying Makes More Sense</h3>
          <p>
            Buying tends to win when you plan to stay for 5+ years, local appreciation rates are strong, mortgage rates are favorable, you have a
            substantial down payment, and monthly ownership costs are comparable to rent. The longer you stay, the more time your equity has to compound
            and the more you spread out the fixed costs of buying and selling (closing costs, agent commissions, moving expenses).
          </p>

          <h3>When Renting Makes More Sense</h3>
          <p>
            Renting tends to win when you might move within 3-5 years, local home prices are inflated relative to rents (high price-to-rent ratios),
            you can invest the down payment at higher returns, you value flexibility and lower risk, or when maintenance and property taxes are
            particularly high in your area. In expensive coastal markets, renting often beats buying for residents who plan shorter stays.
          </p>

          <h3>The Hidden Costs of Homeownership</h3>
          <p>
            Beyond the mortgage payment, homeowners face: property taxes (averaging 1.1% nationally but over 2% in states like New Jersey and
            Illinois), homeowner&apos;s insurance, maintenance and repairs (budget 1-3% of home value annually), HOA fees, closing costs when buying
            (2-5%) and selling (5-6% including agent commissions), and opportunity cost of the down payment. Many first-time buyers underestimate these
            costs by 30-50%.
          </p>

          <h3>The Opportunity Cost Factor</h3>
          <p>
            Perhaps the most overlooked factor is the opportunity cost of your down payment. A $70,000 down payment invested in a diversified stock
            portfolio averaging 7-10% annual returns could grow to $137,000 in 10 years. Meanwhile, that same $70,000 as home equity grows only at the
            rate of home appreciation (historically 3-4% nationally). This opportunity cost narrows the gap between renting and buying significantly.
          </p>

          <h3>The 5% Rule</h3>
          <p>
            A popular framework for this decision is the 5% Rule: multiply the home&apos;s value by 5%, then divide by 12. If you can rent for less
            than that monthly amount, renting may be the smarter financial choice. For a $350,000 home, that threshold is $1,458/month. If comparable
            rent is below $1,458, renting could be more financially advantageous.
          </p>
        </article>
      </div>
    </>
  );
}
