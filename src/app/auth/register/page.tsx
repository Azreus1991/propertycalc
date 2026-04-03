"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { UserRole } from "@/lib/types";

// ── All 50 US states ──────────────────────────────────────────
const US_STATES = [
  { abbr: "AL", name: "Alabama" },
  { abbr: "AK", name: "Alaska" },
  { abbr: "AZ", name: "Arizona" },
  { abbr: "AR", name: "Arkansas" },
  { abbr: "CA", name: "California" },
  { abbr: "CO", name: "Colorado" },
  { abbr: "CT", name: "Connecticut" },
  { abbr: "DE", name: "Delaware" },
  { abbr: "FL", name: "Florida" },
  { abbr: "GA", name: "Georgia" },
  { abbr: "HI", name: "Hawaii" },
  { abbr: "ID", name: "Idaho" },
  { abbr: "IL", name: "Illinois" },
  { abbr: "IN", name: "Indiana" },
  { abbr: "IA", name: "Iowa" },
  { abbr: "KS", name: "Kansas" },
  { abbr: "KY", name: "Kentucky" },
  { abbr: "LA", name: "Louisiana" },
  { abbr: "ME", name: "Maine" },
  { abbr: "MD", name: "Maryland" },
  { abbr: "MA", name: "Massachusetts" },
  { abbr: "MI", name: "Michigan" },
  { abbr: "MN", name: "Minnesota" },
  { abbr: "MS", name: "Mississippi" },
  { abbr: "MO", name: "Missouri" },
  { abbr: "MT", name: "Montana" },
  { abbr: "NE", name: "Nebraska" },
  { abbr: "NV", name: "Nevada" },
  { abbr: "NH", name: "New Hampshire" },
  { abbr: "NJ", name: "New Jersey" },
  { abbr: "NM", name: "New Mexico" },
  { abbr: "NY", name: "New York" },
  { abbr: "NC", name: "North Carolina" },
  { abbr: "ND", name: "North Dakota" },
  { abbr: "OH", name: "Ohio" },
  { abbr: "OK", name: "Oklahoma" },
  { abbr: "OR", name: "Oregon" },
  { abbr: "PA", name: "Pennsylvania" },
  { abbr: "RI", name: "Rhode Island" },
  { abbr: "SC", name: "South Carolina" },
  { abbr: "SD", name: "South Dakota" },
  { abbr: "TN", name: "Tennessee" },
  { abbr: "TX", name: "Texas" },
  { abbr: "UT", name: "Utah" },
  { abbr: "VT", name: "Vermont" },
  { abbr: "VA", name: "Virginia" },
  { abbr: "WA", name: "Washington" },
  { abbr: "WV", name: "West Virginia" },
  { abbr: "WI", name: "Wisconsin" },
  { abbr: "WY", name: "Wyoming" },
];

// ── Role definitions ──────────────────────────────────────────
interface RoleOption {
  id: UserRole;
  label: string;
  description: string;
  icon: React.ReactNode;
  accentClass: string;
  activeBg: string;
  activeBorder: string;
  activeIcon: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: "investor",
    label: "Investor",
    description: "Find and fund deals, grow your portfolio",
    accentClass: "text-brand-600",
    activeBg: "bg-brand-50",
    activeBorder: "border-brand-400",
    activeIcon: "text-brand-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "bird_dog",
    label: "Bird Dog",
    description: "Source deals, earn finder's fees",
    accentClass: "text-amber-600",
    activeBg: "bg-amber-50",
    activeBorder: "border-amber-400",
    activeIcon: "text-amber-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: "vendor",
    label: "Vendor",
    description: "List services, get leads from investors",
    accentClass: "text-sage-600",
    activeBg: "bg-sage-50",
    activeBorder: "border-sage-400",
    activeIcon: "text-sage-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
      </svg>
    ),
  },
  {
    id: "agent",
    label: "Agent",
    description: "Connect buyers and sellers, close deals",
    accentClass: "text-navy-600",
    activeBg: "bg-navy-50",
    activeBorder: "border-navy-400",
    activeIcon: "text-navy-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: "lender",
    label: "Lender",
    description: "Fund deals, earn interest returns",
    accentClass: "text-emerald-600",
    activeBg: "bg-emerald-50",
    activeBorder: "border-emerald-400",
    activeIcon: "text-emerald-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    id: "contractor",
    label: "Contractor",
    description: "Get project leads, showcase your work",
    accentClass: "text-warm-700",
    activeBg: "bg-warm-100",
    activeBorder: "border-warm-400",
    activeIcon: "text-warm-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "property_manager",
    label: "Property Manager",
    description: "Manage rentals, find new clients",
    accentClass: "text-blue-600",
    activeBg: "bg-blue-50",
    activeBorder: "border-blue-400",
    activeIcon: "text-blue-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

// ── Step indicators ───────────────────────────────────────────
const STEPS = [
  { number: 1, label: "Account" },
  { number: 2, label: "Your Role" },
  { number: 3, label: "Profile" },
];

// ─────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1 state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Step 2 state
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  // Step 3 state
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [bio, setBio] = useState("");

  // Global state
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ── Validation ──────────────────────────────────────────────
  function validateStep1(): string | null {
    if (!fullName.trim()) return "Please enter your full name.";
    if (!email.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  }

  function validateStep2(): string | null {
    if (!selectedRole) return "Please select your primary role.";
    return null;
  }

  function handleNextStep() {
    setError(null);
    if (step === 1) {
      const err = validateStep1();
      if (err) { setError(err); return; }
    }
    if (step === 2) {
      const err = validateStep2();
      if (err) { setError(err); return; }
    }
    setStep((s) => s + 1);
  }

  // ── Final submit ────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // 1. Create auth user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (signUpError || !authData.user) {
      setError(signUpError?.message ?? "Sign up failed. Please try again.");
      setLoading(false);
      return;
    }

    // 2. Update profile with role info
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        primary_role: selectedRole!,
        roles: [selectedRole!],
        company_name: companyName || null,
        location_city: city || null,
        location_state: state || null,
        bio: bio || null,
      } as never)
      .eq("id", authData.user.id);

    if (profileError) {
      // Non-fatal — user is created, just log
      console.error("Profile update error:", profileError.message);
    }

    router.push("/dashboard");
  }

  // ── Password strength ───────────────────────────────────────
  function passwordStrength(pw: string): { label: string; width: string; color: string } {
    if (!pw) return { label: "", width: "0%", color: "" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return { label: "Weak", width: "20%", color: "bg-red-500" };
    if (score <= 2) return { label: "Fair", width: "45%", color: "bg-amber-400" };
    if (score <= 3) return { label: "Good", width: "65%", color: "bg-brand-400" };
    if (score <= 4) return { label: "Strong", width: "82%", color: "bg-sage-500" };
    return { label: "Excellent", width: "100%", color: "bg-sage-600" };
  }

  const pwStrength = passwordStrength(password);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero band */}
      <div className="bg-hero-gradient py-14 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10 max-w-lg mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-8 group">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg group-hover:bg-brand-400 transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">PropertyCalc</span>
          </Link>

          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
            Join PropertyCalc
          </h1>
          <p style={{ color: "rgba(193, 210, 232, 0.9)" }} className="text-base">
            Free forever — no credit card required
          </p>

          {/* Step progress */}
          <div className="mt-8 flex items-center justify-center gap-0">
            {STEPS.map((s, i) => {
              const isComplete = step > s.number;
              const isActive = step === s.number;
              return (
                <div key={s.number} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={[
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                        isComplete
                          ? "bg-sage-500 text-white"
                          : isActive
                          ? "bg-brand-500 text-white shadow-lg shadow-brand-500/40"
                          : "bg-white/10 text-white/50",
                      ].join(" ")}
                    >
                      {isComplete ? (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        s.number
                      )}
                    </div>
                    <span
                      className={[
                        "text-xs font-medium transition-colors",
                        isActive ? "text-white" : isComplete ? "text-sage-300" : "text-white/40",
                      ].join(" ")}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={[
                        "w-16 h-px mx-2 mb-5 transition-colors duration-300",
                        isComplete ? "bg-sage-500" : "bg-white/15",
                      ].join(" ")}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form area */}
      <div className="flex-1 bg-warm-50 flex items-start justify-center px-4 pb-16">
        <div className="w-full max-w-lg -mt-8">
          <div className="card-elevated p-8">

            {/* Error banner */}
            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3.5 animate-fade-in-up">
                <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            {/* ── STEP 1: Account details ─────────────────────── */}
            {step === 1 && (
              <div className="animate-fade-in-up">
                <div className="mb-6">
                  <h2 className="text-xl font-extrabold text-navy-950 tracking-tight">Create your account</h2>
                  <p className="text-sm text-slate-500 mt-1">Fill in the basics to get started.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy-950 mb-1.5">Full name</label>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Smith"
                      className="calc-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-950 mb-1.5">Email address</label>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="calc-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-950 mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 8 characters"
                        className="calc-input pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? (
                          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {/* Strength bar */}
                    {password && (
                      <div className="mt-2">
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${pwStrength.color}`}
                            style={{ width: pwStrength.width }}
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Password strength:{" "}
                          <span
                            className={
                              pwStrength.label === "Weak"
                                ? "text-red-500 font-semibold"
                                : pwStrength.label === "Fair"
                                ? "text-amber-500 font-semibold"
                                : "text-sage-600 font-semibold"
                            }
                          >
                            {pwStrength.label}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-950 mb-1.5">Confirm password</label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        required
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat your password"
                        className={[
                          "calc-input pr-12",
                          confirmPassword && confirmPassword !== password
                            ? "border-red-400 focus:border-red-400"
                            : confirmPassword && confirmPassword === password
                            ? "border-sage-400 focus:border-sage-400"
                            : "",
                        ].join(" ")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showConfirm ? (
                          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                      {/* Match indicator */}
                      {confirmPassword && (
                        <div className="absolute right-10 top-1/2 -translate-y-1/2">
                          {confirmPassword === password ? (
                            <svg className="w-4 h-4 text-sage-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-primary w-full justify-center py-3 text-base mt-6"
                >
                  Continue
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                <p className="mt-5 text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                    Sign in
                  </Link>
                </p>

                <p className="mt-4 text-center text-xs text-slate-400 leading-relaxed">
                  By creating an account you agree to our{" "}
                  <Link href="/terms" className="underline underline-offset-2 hover:text-slate-600 transition-colors">Terms of Service</Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline underline-offset-2 hover:text-slate-600 transition-colors">Privacy Policy</Link>.
                </p>
              </div>
            )}

            {/* ── STEP 2: Role selection ─────────────────────── */}
            {step === 2 && (
              <div className="animate-fade-in-up">
                <div className="mb-6">
                  <h2 className="text-xl font-extrabold text-navy-950 tracking-tight">What best describes you?</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Choose your primary role — you can update this anytime.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {ROLE_OPTIONS.map((role) => {
                    const isSelected = selectedRole === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={[
                          "w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-xl border-[1.5px] transition-all duration-200",
                          isSelected
                            ? `${role.activeBg} ${role.activeBorder} shadow-sm`
                            : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        {/* Icon container */}
                        <div
                          className={[
                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                            isSelected ? `${role.activeBg} ${role.activeIcon}` : "bg-slate-100 text-slate-500",
                          ].join(" ")}
                        >
                          {role.icon}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-sm ${isSelected ? "text-navy-950" : "text-navy-800"}`}>
                            {role.label}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5 leading-snug">{role.description}</p>
                        </div>

                        {/* Check */}
                        <div
                          className={[
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                            isSelected ? "bg-brand-500 border-brand-500" : "border-slate-300",
                          ].join(" ")}
                        >
                          {isSelected && (
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => { setError(null); setStep(1); }}
                    className="btn-secondary flex-1 justify-center py-3 text-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-primary flex-2 flex-1 justify-center py-3 text-sm"
                    style={{ flex: 2 }}
                  >
                    Continue
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Profile details ────────────────────── */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="animate-fade-in-up">
                <div className="mb-6">
                  <h2 className="text-xl font-extrabold text-navy-950 tracking-tight">Tell us about yourself</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Optional — helps others in the network find you.
                  </p>
                </div>

                {/* Selected role recap */}
                {selectedRole && (
                  <div className="flex items-center gap-2.5 mb-5 px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200">
                    <span className="badge badge-brand">
                      {ROLE_OPTIONS.find((r) => r.id === selectedRole)?.label}
                    </span>
                    <span className="text-xs text-slate-500">
                      {ROLE_OPTIONS.find((r) => r.id === selectedRole)?.description}
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy-950 mb-1.5">
                      Company or business name{" "}
                      <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      autoComplete="organization"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Acme Realty LLC"
                      className="calc-input"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-navy-950 mb-1.5">
                        City{" "}
                        <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Phoenix"
                        className="calc-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy-950 mb-1.5">
                        State{" "}
                        <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="calc-input appearance-none"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.1rem", paddingRight: "2.5rem" }}
                      >
                        <option value="">Select…</option>
                        {US_STATES.map((s) => (
                          <option key={s.abbr} value={s.abbr}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-950 mb-1.5">
                      Short bio{" "}
                      <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell the network a little about yourself — your experience, focus markets, or what you're looking for..."
                      rows={3}
                      maxLength={500}
                      className="calc-input resize-none"
                    />
                    <p className="text-xs text-slate-400 mt-1 text-right">{bio.length}/500</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => { setError(null); setStep(2); }}
                    className="btn-secondary flex-1 justify-center py-3 text-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary justify-center py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                    style={{ flex: 2 }}
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Creating account…
                      </>
                    ) : (
                      <>
                        Create Account
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-4 text-center text-xs text-slate-400">
                  You can always fill in more profile details later from your dashboard.
                </p>
              </form>
            )}
          </div>

          {/* Trust signals */}
          <div className="mt-6 flex items-center justify-center gap-5 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-sage-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Secure & private
            </span>
            <span className="w-px h-3 bg-slate-300" />
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-sage-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              No credit card
            </span>
            <span className="w-px h-3 bg-slate-300" />
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-sage-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              2-min setup
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
