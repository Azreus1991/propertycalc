import type { DealGrade, DealType } from './types'

interface UnderwriteInput {
  asking_price: number
  arv?: number
  estimated_repair?: number
  monthly_rent?: number
  monthly_expenses?: number
  down_payment_pct?: number
  interest_rate?: number
  loan_term?: number
}

interface UnderwriteResult {
  roi_score: number        // 0-100
  cash_flow_score: number  // 0-100
  risk_score: number       // 0-100 (higher = riskier)
  overall_grade: DealGrade
  strategy_detected: DealType[]
  monthly_cash_flow: number
  annual_roi: number
  cap_rate: number
  cash_on_cash: number
  equity_at_close: number
  dscr: number            // debt service coverage ratio
  the_70_rule: number     // max offer for flippers
  rent_to_price: number   // monthly rent / purchase price
  breakdown: {
    label: string
    value: string
    status: 'good' | 'warning' | 'danger'
  }[]
}

export function underwriteDeal(input: UnderwriteInput): UnderwriteResult {
  const {
    asking_price,
    arv = asking_price,
    estimated_repair = 0,
    monthly_rent = 0,
    monthly_expenses = 0,
    down_payment_pct = 20,
    interest_rate = 7,
    loan_term = 30
  } = input

  // Core calculations
  const down_payment = asking_price * (down_payment_pct / 100)
  const loan_amount = asking_price - down_payment
  const monthly_rate = interest_rate / 100 / 12
  const num_payments = loan_term * 12
  const monthly_mortgage = monthly_rate > 0
    ? loan_amount * (monthly_rate * Math.pow(1 + monthly_rate, num_payments)) / (Math.pow(1 + monthly_rate, num_payments) - 1)
    : loan_amount / num_payments

  const total_monthly_expenses = monthly_expenses + monthly_mortgage
  const monthly_cash_flow = monthly_rent - total_monthly_expenses
  const annual_cash_flow = monthly_cash_flow * 12
  const noi = (monthly_rent - monthly_expenses) * 12

  // Metrics
  const cap_rate = asking_price > 0 ? (noi / asking_price) * 100 : 0
  const total_cash_invested = down_payment + estimated_repair
  const cash_on_cash = total_cash_invested > 0 ? (annual_cash_flow / total_cash_invested) * 100 : 0
  const annual_roi = total_cash_invested > 0 ? ((annual_cash_flow + (arv - asking_price)) / total_cash_invested) * 100 : 0
  const equity_at_close = arv - asking_price - estimated_repair
  const dscr = monthly_mortgage > 0 ? (monthly_rent - monthly_expenses) / monthly_mortgage : 0
  const the_70_rule = arv * 0.7 - estimated_repair
  const rent_to_price = asking_price > 0 ? (monthly_rent / asking_price) * 100 : 0

  // Scoring (0-100)
  const roi_score = Math.min(100, Math.max(0, cash_on_cash * 5)) // 20% CoC = 100
  const cash_flow_score = Math.min(100, Math.max(0, (monthly_cash_flow / 50) * 10 + 50)) // $250/mo = 100
  const risk_score = Math.min(100, Math.max(0,
    (dscr < 1 ? 40 : dscr < 1.25 ? 20 : 0) +
    (estimated_repair / asking_price > 0.3 ? 30 : estimated_repair / asking_price > 0.15 ? 15 : 0) +
    (cap_rate < 4 ? 20 : cap_rate < 6 ? 10 : 0) +
    (rent_to_price < 0.6 ? 10 : 0)
  ))

  // Overall grade
  const composite = (roi_score * 0.35 + cash_flow_score * 0.35 + (100 - risk_score) * 0.3)
  let overall_grade: DealGrade = 'F'
  if (composite >= 80) overall_grade = 'A'
  else if (composite >= 65) overall_grade = 'B'
  else if (composite >= 50) overall_grade = 'C'
  else if (composite >= 35) overall_grade = 'D'

  // Strategy detection
  const strategy_detected: DealType[] = []
  if (arv > asking_price * 1.2 && estimated_repair > 0) strategy_detected.push('flip')
  if (monthly_cash_flow > 100 && monthly_rent > 0) strategy_detected.push('rental')
  if (arv > asking_price * 1.15 && monthly_cash_flow > 0 && estimated_repair > 0) strategy_detected.push('brrrr')
  if (asking_price < the_70_rule * 0.9) strategy_detected.push('wholesale')
  if (strategy_detected.length === 0) strategy_detected.push('rental')

  // Breakdown
  const status = (val: number, good: number, warn: number, higher: boolean = true): 'good' | 'warning' | 'danger' => {
    if (higher) return val >= good ? 'good' : val >= warn ? 'warning' : 'danger'
    return val <= good ? 'good' : val <= warn ? 'warning' : 'danger'
  }

  const breakdown = [
    { label: 'Monthly Cash Flow', value: `$${monthly_cash_flow.toFixed(0)}`, status: status(monthly_cash_flow, 200, 0) },
    { label: 'Cap Rate', value: `${cap_rate.toFixed(1)}%`, status: status(cap_rate, 8, 5) },
    { label: 'Cash-on-Cash Return', value: `${cash_on_cash.toFixed(1)}%`, status: status(cash_on_cash, 10, 5) },
    { label: 'DSCR', value: dscr.toFixed(2), status: status(dscr, 1.25, 1.0) },
    { label: 'Rent-to-Price Ratio', value: `${rent_to_price.toFixed(2)}%`, status: status(rent_to_price, 1.0, 0.6) },
    { label: '70% Rule Max Offer', value: `$${the_70_rule.toLocaleString()}`, status: status(the_70_rule - asking_price, 0, -10000) },
    { label: 'Equity at Close', value: `$${equity_at_close.toLocaleString()}`, status: status(equity_at_close, 10000, 0) },
    { label: 'Risk Level', value: risk_score > 60 ? 'High' : risk_score > 30 ? 'Medium' : 'Low', status: status(risk_score, 30, 60, false) },
  ]

  return {
    roi_score,
    cash_flow_score,
    risk_score,
    overall_grade,
    strategy_detected,
    monthly_cash_flow,
    annual_roi,
    cap_rate,
    cash_on_cash,
    equity_at_close,
    dscr,
    the_70_rule,
    rent_to_price,
    breakdown
  }
}
