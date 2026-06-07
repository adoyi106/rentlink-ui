"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Home, Users2, Building2 } from "@/components/icons";
import { cn } from "@/lib/utils";

type Role = "tenant" | "landlord";

const inputCls =
  "mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors";

/* ── Step indicator ── */
function StepBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-0">
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <div key={n} className="flex flex-1 items-center">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                done && "bg-green-500 text-white",
                active && "bg-blue-600 text-white ring-4 ring-blue-100",
                !done && !active && "bg-gray-100 text-gray-400"
              )}
            >
              {done ? <Check className="h-4 w-4" /> : n}
            </div>
            {i < total - 1 && (
              <div className={cn("mx-1 h-px flex-1 transition-colors", done ? "bg-green-400" : "bg-gray-200")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Role card ── */
const roles = [
  {
    id: "tenant" as Role,
    icon: Users2,
    title: "I'm a Tenant",
    desc: "Looking for a home to rent",
    perks: ["Browse thousands of listings", "Apply directly to landlords", "Pay rent securely"],
    bg: "bg-pink-50",
    iconColor: "text-pink-500",
    border: "border-pink-500",
    ring: "ring-pink-100",
  },
  {
    id: "landlord" as Role,
    icon: Building2,
    title: "I'm a Landlord",
    desc: "I have properties to rent out",
    perks: ["List properties for free", "Screen tenants easily", "Collect rent online"],
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
    border: "border-blue-500",
    ring: "ring-blue-100",
  },
];

/* ── OTP box ── */
function OtpInput({
  otp,
  refs,
  onChange,
  onKeyDown,
}: {
  otp: string[];
  refs: React.MutableRefObject<Array<HTMLInputElement | null>>;
  onChange: (i: number, val: string) => void;
  onKeyDown: (i: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex gap-2 sm:gap-3">
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => onChange(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          className="h-12 w-full rounded-xl border border-gray-200 text-center text-lg font-bold text-gray-900 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:h-14"
        />
      ))}
    </div>
  );
}

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([null, null, null, null, null, null]);

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const email = "john@example.com"; // would come from form state in production

  return (
    <div className="flex min-h-screen items-start justify-center px-4 py-10 sm:py-14">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <Link href="/" className="mb-6 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600">
            <Home className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Rentlink</span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          {/* Step indicator (steps 1–3 only; step 4 is success) */}
          {step < 4 && (
            <div className="mb-6">
              <StepBar current={step} total={3} />
              <p className="mt-3 text-xs text-gray-400">
                {step === 1 && "Step 1 of 3 — Choose your role"}
                {step === 2 && "Step 2 of 3 — Your details"}
                {step === 3 && "Step 3 of 3 — Verify your email"}
              </p>
            </div>
          )}

          {/* ── Step 1: Role selection ── */}
          {step === 1 && (
            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Who are you?</h1>
              <p className="mt-1 text-sm text-gray-500">Choose your account type to get started</p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const selected = role === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={cn(
                        "rounded-2xl border-2 p-5 text-left transition-all",
                        selected
                          ? `${r.border} ring-4 ${r.ring}`
                          : "border-gray-100 hover:border-gray-200"
                      )}
                    >
                      <div className={cn("inline-flex rounded-xl p-2.5", r.bg)}>
                        <Icon className={cn("h-6 w-6", r.iconColor)} />
                      </div>
                      <p className="mt-3 font-semibold text-gray-900">{r.title}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{r.desc}</p>
                      <ul className="mt-3 space-y-1.5">
                        {r.perks.map((p) => (
                          <li key={p} className="flex items-center gap-2 text-xs text-gray-600">
                            <Check className="h-3.5 w-3.5 shrink-0 text-green-500" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => role && setStep(2)}
                disabled={!role}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-4 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                  Sign in
                </Link>
              </p>
            </div>
          )}

          {/* ── Step 2: Personal details ── */}
          {step === 2 && (
            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Tell us about you</h1>
              <p className="mt-1 text-sm text-gray-500">Fill in your details to create your account</p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">First name</label>
                  <input type="text" placeholder="John" className={inputCls} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Last name</label>
                  <input type="text" placeholder="Doe" className={inputCls} />
                </div>
              </div>

              <div className="mt-3">
                <label className="text-sm font-medium text-gray-700">Email address</label>
                <input type="email" placeholder="you@example.com" className={inputCls} />
              </div>

              <div className="mt-3">
                <label className="text-sm font-medium text-gray-700">Phone number</label>
                <div className="relative mt-1.5">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">🇳🇬 +234</span>
                  <input
                    type="tel"
                    placeholder="801 234 5678"
                    className="w-full rounded-xl border border-gray-200 py-3 pl-24 pr-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative mt-1.5">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="At least 8 characters"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-11 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                  />
                  <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <label className="text-sm font-medium text-gray-700">Confirm password</label>
                <div className="relative mt-1.5">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-11 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                  />
                  <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label className="mt-4 flex items-start gap-2.5 text-xs text-gray-500">
                <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-blue-600" />
                <span>
                  I agree to Rentlink&apos;s{" "}
                  <Link href="/terms" className="font-medium text-blue-600 hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="font-medium text-blue-600 hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep(1)} className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button onClick={() => setStep(3)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                  Create account <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Email OTP ── */}
          {step === 3 && (
            <div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <span className="text-2xl">📬</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Check your inbox</h1>
              <p className="mt-1 text-sm text-gray-500">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-gray-700">{email}</span>
              </p>

              <div className="mt-6">
                <OtpInput otp={otp} refs={otpRefs} onChange={handleOtpChange} onKeyDown={handleOtpKeyDown} />
              </div>

              <p className="mt-4 text-center text-xs text-gray-400">
                Didn&apos;t receive it?{" "}
                <button className="font-medium text-blue-600 hover:text-blue-700">Resend code</button>
              </p>

              <button onClick={() => setStep(4)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                Verify email <ArrowRight className="h-4 w-4" />
              </button>

              <button onClick={() => setStep(2)} className="mt-3 flex w-full items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-3.5 w-3.5" /> Go back
              </button>
            </div>
          )}

          {/* ── Step 4: Success ── */}
          {step === 4 && (
            <div className="py-4 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">You&apos;re in!</h1>
              <p className="mt-2 text-sm text-gray-500">Your Rentlink account has been created successfully.</p>

              {role === "landlord" ? (
                <div className="mt-8 space-y-3">
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-left">
                    <p className="text-sm font-semibold text-blue-900">One more step to list properties</p>
                    <p className="mt-1 text-xs text-blue-700">
                      Complete identity verification (KYC) so tenants can trust your listings. It only takes 2 minutes.
                    </p>
                  </div>
                  <Link
                    href="/kyc"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Verify my identity <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/landlord/overview"
                    className="flex w-full items-center justify-center rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Go to dashboard
                  </Link>
                </div>
              ) : (
                <div className="mt-8 space-y-3">
                  <Link
                    href="/search"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Browse homes <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/tenant/overview"
                    className="flex w-full items-center justify-center rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Go to dashboard
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
