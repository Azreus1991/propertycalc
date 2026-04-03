"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const fmtFull = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [propertyTax, setPropertyTax] = useState(4200);
  const [insurance, setInsurance] = useState(1800);
  const [pmiRate, setPmiRate] = useState(0.5);
  const [hoa, setHoa] = useState(0);
  const [extraPayment, setExtraPayment] = useState(0);

  const results = useMemo(() => {
    const downPayment = homePrice * (downPct / 100);
    const principal = homePrice - downPayment;
    const monthlyRate = rate / 100 / 12;
    const numPayments = termYears * 12;

    let monthlyPI = 0;
    if (monthlyRate > 0) {
      monthlyPI = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      monthlyPI = principal / numPayments;
    }

    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const needsPMI = downPct < 20;
    const monthlyPMI = needsPMI ? (principal * (pmiRate / 100)) / 12 : 0;
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI + hoa;
    const totalCost = monthlyPI * numPayments + propertyTax * termYears + insurance * termYears + monthlyPMI * 12 * Math.min(termYears, 10) + hoa * numPayments;
    const totalInterest = monthlyPI * numPayments - principal;

    // Amortization snapshots
    const snapshots: { year: number; balance: number; equity: number; interestPaid: number }[] = [];
    let balance = principal;
    let cumInterest = 0;
    for (let month = 1; month <= numPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      cumInterest += interestPayment;
      balance -= principalPayment;
      if (balance < 0) balance = 0;
      const year = month / 12;
      if ([1, 5, 10, 15, 20, 25, 30].includes(year) && year <= termYears) {
        snapshots.push({
          year,
          balance: Math.max(0, balance),
          equity: homePrice - Math.max(0, balance),
          interestPaid: cumInterest,
        });
      }
    }

    // Extra payment analysis
    let extraMonths = 0;
    let extraTotalInterest = 0;
    if (extraPayment > 0) {
      let bal = principal;
      let months = 0;
      let totInt = 0;
      while (bal > 0 && months < numPayments) {
        const intPmt = bal * monthlyRate;
        const prinPmt = monthlyPI - intPmt + extraPayment;
        totInt += intPmt;
        bal -= prinPmt;
        months++;
        if (bal < 0) bal = 0;
      }
      extraMonths = numPayments - months;
      extraTotalInterest = totalInterest - totInt;
    }

    return {
      downPayment, principal, monthlyPI, monthlyTax, monthlyInsurance, monthlyPMI, needsPMI,
      totalMonthly, totalCost, totalInterest, snapshots, extraMonths, extraTotalInterest,
    };
  }, [homePrice, downPct, rate, termYears, propertyTax, insurance, pmiRate, hoa, extraPayment]);

  const breakdown = [
    { label: "Principal & Interest", value: results.monthlyPI, color: "bg-brand-500" },
    { label: "Property Tax", value: results.monthlyTax, color: "bg-navy-600" },
    { label: "Insurance", value: results.monthlyInsurance, color: "bg-sage-500" },
    ...(results.needsPMI ? [{ label: "PMI", value: results.monthlyPMI, color: "bg-warm-500" }] : []),
    ...(hoa > 0 ? [{ label: "HOA", value: hoa, color: "bg-slate-400" }] : []),
  ];
  const maxBreakdown = Math.max(...breakdown.map((b) => b.value));

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/calculators" className="hover:text-brand-400 transition-colors">Calculators</Link>
            <span>/</span>
            <span className="text-white">Mortgage</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Mortgage Calculator
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl">
            Calculate monthly payments, total interest, amortization schedule, and see how extra
            payments can save you thousands. Uses the standard amortization formula.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-2 space-y-5">
            <div className="card p-6 space-y-5">
              <h2 className="text-lg font-bold text-navy-950">Loan Details</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Home Price</label>
                <input type="number" className="calc-input" value={homePrice} onChange={(e) => setHomePrice(+e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Down Payment (%)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min={0} max={50} step={1} value={downPct} onChange={(e) => setDownPct(+e.target.value)} className="flex-1 accent-brand-500" />
                  <span className="text-sm font-bold text-navy-950 w-14 text-right">{downPct}%</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{fmt(homePrice * (downPct / 100))} down</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Interest Rate (%)</label>
                <input type="number" className="calc-input" value={rate} step={0.125} onChange={(e) => setRate(+e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Loan Term</label>
                <div className="flex gap-2">
                  {[15, 20, 30].map((t) => (
                    <button key={t} onClick={() => setTermYears(t)} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${termYears === t ? "bg-navy-950 text-white" : "bg-warm-100 text-slate-600 hover:bg-warm-200"}`}>
                      {t} yr
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Annual Property Tax ($)</label>
                <input type="number" className="calc-input" value={propertyTax} onChange={(e) => setPropertyTax(+e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Annual Home Insurance ($)</label>
                <input type="number" className="calc-input" value={insurance} onChange={(e) => setInsurance(+e.target.value)} />
              </div>

              {results.needsPMI && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">PMI Rate (%)</label>
                  <input type="number" className="calc-input" value={pmiRate} step={0.1} onChange={(e) => setPmiRate(+e.target.value)} />
                  <p className="text-xs text-slate-400 mt-1">Required when down payment is less than 20%</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Monthly HOA ($)</label>
                <input type="number" className="calc-input" value={hoa} onChange={(e) => setHoa(+e.target.value)} />
              </div>
            </div>

            {/* Extra Payment */}
            <div className="card p-6">
              <h3 className="text-base font-bold text-navy-950 mb-3">Early Payoff Simulator</h3>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Extra Monthly Payment ($)</label>
              <input type="number" className="calc-input" value={extraPayment} onChange={(e) => setExtraPayment(+e.target.value)} />
              {extraPayment > 0 && results.extraMonths > 0 && (
                <div className="mt-4 p-4 bg-sage-50 rounded-xl border border-sage-200">
                  <div className="text-sm font-bold text-sage-700">
                    Pay off {Math.floor(results.extraMonths / 12)} years and {results.extraMonths % 12} months early
                  </div>
                  <div className="text-sm text-sage-600 mt-1">
                    Save {fmt(results.extraTotalInterest)} in interest
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Total Payment */}
            <div className="card p-6 sm:p-8 border-brand-200 bg-brand-50/30">
              <div className="text-sm font-medium text-slate-500 mb-1">Total Monthly Payment</div>
              <div className="text-4xl sm:text-5xl font-black text-navy-950">{fmtFull(results.totalMonthly)}</div>
              <div className="text-sm text-slate-400 mt-1">
                {fmt(results.principal)} loan at {rate}% for {termYears} years
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="card p-6">
              <h3 className="text-base font-bold text-navy-950 mb-4">Monthly Payment Breakdown</h3>
              <div className="space-y-3">
                {breakdown.map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{b.label}</span>
                      <span className="font-semibold text-navy-950">{fmtFull(b.value)}</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${b.color} rounded-full transition-all`}
                        style={{ width: `${(b.value / maxBreakdown) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="card p-5 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Cost</div>
                <div className="text-xl font-extrabold text-navy-950 mt-1">{fmt(results.totalCost)}</div>
                <div className="text-xs text-slate-400 mt-0.5">Over {termYears} years</div>
              </div>
              <div className="card p-5 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Interest</div>
                <div className="text-xl font-extrabold text-red-600 mt-1">{fmt(results.totalInterest)}</div>
                <div className="text-xs text-slate-400 mt-0.5">{((results.totalInterest / results.principal) * 100).toFixed(0)}% of loan</div>
              </div>
              <div className="card p-5 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Down Payment</div>
                <div className="text-xl font-extrabold text-sage-600 mt-1">{fmt(results.downPayment)}</div>
                <div className="text-xs text-slate-400 mt-0.5">{downPct}% of home price</div>
              </div>
            </div>

            {/* Amortization */}
            {results.snapshots.length > 0 && (
              <div className="card p-6">
                <h3 className="text-base font-bold text-navy-950 mb-4">Amortization Snapshots</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Year</th>
                        <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Balance</th>
                        <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Equity</th>
                        <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Interest Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.snapshots.map((s) => (
                        <tr key={s.year} className="border-b border-slate-50">
                          <td className="py-2.5 font-semibold text-navy-950">Year {s.year}</td>
                          <td className="py-2.5 text-right text-slate-600">{fmt(s.balance)}</td>
                          <td className="py-2.5 text-right text-sage-600 font-semibold">{fmt(s.equity)}</td>
                          <td className="py-2.5 text-right text-red-500">{fmt(s.interestPaid)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Related */}
            <div className="card p-6 bg-warm-50 border-warm-200">
              <h3 className="text-base font-bold text-navy-950 mb-3">Related Calculators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { name: "Rent vs Buy", href: "/calculators/rent-vs-buy" },
                  { name: "Rental Property ROI", href: "/calculators/rental-roi" },
                  { name: "Property Tax Estimator", href: "/calculators/property-tax" },
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

        {/* SEO Article */}
        <article className="mt-16 prose-brand max-w-4xl mx-auto">
          <h2>Understanding Your Mortgage: The Complete Guide</h2>

          <p>
            A mortgage is likely the largest financial commitment you will ever make. Understanding how mortgage payments are calculated, what factors
            affect your rate, and how to optimize your loan structure can save you tens of thousands of dollars over the life of your loan.
          </p>

          <h3>How Mortgage Payments Are Calculated</h3>
          <p>
            Your monthly mortgage payment is determined by the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1], where M is the monthly
            payment, P is the loan principal, r is the monthly interest rate, and n is the total number of payments. This formula ensures that each
            payment covers the interest accrued that month plus a portion of the principal, with the split shifting over time — early payments are
            mostly interest, while later payments are mostly principal. This is why the first few years of a mortgage feel like you are barely making
            progress on the balance.
          </p>

          <h3>Understanding Amortization</h3>
          <p>
            Amortization is the process of spreading your loan payments over time. With a 30-year fixed-rate mortgage at 6.5%, roughly 65% of your first
            payment goes toward interest and only 35% toward principal. By year 15, the split is about 50/50. In the final years, nearly all of each
            payment goes toward principal. This front-loading of interest is why making extra payments early in the loan term has such a dramatic impact
            on total interest paid.
          </p>

          <h3>Fixed-Rate vs. Adjustable-Rate Mortgages</h3>
          <p>
            A fixed-rate mortgage locks in your interest rate for the entire loan term, providing predictable payments. An adjustable-rate mortgage (ARM)
            typically offers a lower initial rate that adjusts periodically based on market conditions. ARMs are usually expressed as 5/1 or 7/1,
            meaning the rate is fixed for 5 or 7 years, then adjusts annually. ARMs can be a smart choice if you plan to sell or refinance before the
            adjustment period begins, but they carry the risk of significant payment increases if rates rise.
          </p>

          <h3>How to Get the Best Mortgage Rate</h3>
          <p>
            Your mortgage rate is influenced by several factors you can control: your credit score (aim for 740+ for the best rates), your
            debt-to-income ratio (keep it below 36%), your down payment size (20% or more avoids PMI and often gets better rates), and your loan type
            and term (shorter terms typically have lower rates). Shopping multiple lenders is critical — rate differences of even 0.25% can translate to
            thousands of dollars over the life of your loan. Get at least 3-5 quotes and compare not just rates, but closing costs and loan terms.
          </p>

          <h3>PMI: What It Is and How to Remove It</h3>
          <p>
            Private Mortgage Insurance (PMI) is required when your down payment is less than 20% of the home price. It typically costs 0.3% to 1.5% of
            the original loan amount per year. For a $280,000 loan, that could be $70 to $350 per month. The good news: PMI is not permanent. Under the
            Homeowners Protection Act, your lender must automatically cancel PMI when your loan balance reaches 78% of the original home value. You can
            also request removal at 80% loan-to-value, which may require a new appraisal. If your home has appreciated significantly, getting a new
            appraisal could help you reach the 80% threshold faster.
          </p>

          <h3>When to Refinance</h3>
          <p>
            Refinancing replaces your current mortgage with a new one, typically at a lower rate. The general rule of thumb is that refinancing makes
            sense when you can reduce your rate by at least 0.75-1.0 percentage points and plan to stay in the home long enough to recoup closing costs
            (usually 2-5 years). Calculate your break-even point by dividing the closing costs by your monthly savings. For example, if refinancing
            costs $6,000 and saves you $200/month, the break-even point is 30 months. If you plan to stay in the home longer than that, refinancing is
            likely worthwhile.
          </p>

          <h3>Common Mistakes First-Time Buyers Make</h3>
          <p>
            The most common mistakes include: not getting pre-approved before house hunting, only comparing interest rates instead of total loan costs,
            stretching to the maximum approved amount instead of budgeting comfortably, forgetting about closing costs (typically 2-5% of the home
            price), skipping the home inspection, not budgeting for ongoing maintenance (typically 1-3% of home value annually), and making large
            purchases or changing jobs between pre-approval and closing. Avoiding these pitfalls can save you significant stress and money.
          </p>

          <h3>The 28/36 Rule</h3>
          <p>
            Most financial advisors recommend spending no more than 28% of your gross monthly income on housing costs (mortgage, taxes, insurance) and
            no more than 36% on total debt payments. If your household income is $100,000/year, your total monthly housing costs should stay below
            $2,333. This conservative approach ensures you have room in your budget for savings, emergencies, and quality of life.
          </p>
        </article>
      </div>
    </>
  );
}
