"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Camera, Check, Home, Shield, Upload } from "@/components/icons";
import { cn } from "@/lib/utils";

type IdType = "nin" | "passport" | "drivers" | "bvn";

const idTypes = [
  { id: "nin" as IdType, emoji: "🪪", label: "NIN", sub: "National ID Number" },
  { id: "passport" as IdType, emoji: "📘", label: "Int'l Passport", sub: "Nigerian passport" },
  { id: "drivers" as IdType, emoji: "🚗", label: "Driver's License", sub: "FRSC issued" },
  { id: "bvn" as IdType, emoji: "🏦", label: "BVN", sub: "Bank Verification No." },
];

function StepBar({ current }: { current: number }) {
  const labels = ["ID Type", "Documents", "Selfie"];
  return (
    <div className="flex items-center gap-0">
      {labels.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <div key={n} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                done && "bg-green-500 text-white",
                active && "bg-blue-600 text-white ring-4 ring-blue-100",
                !done && !active && "bg-gray-100 text-gray-400"
              )}>
                {done ? <Check className="h-4 w-4" /> : n}
              </div>
              <p className={cn("mt-1 text-xs font-medium", active ? "text-blue-600" : "text-gray-400")}>
                {label}
              </p>
            </div>
            {i < labels.length - 1 && (
              <div className={cn("mb-4 mx-1 h-px flex-1 transition-colors", done ? "bg-green-400" : "bg-gray-200")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function UploadZone({ label, hint }: { label: string; hint?: string }) {
  const [uploaded, setUploaded] = useState(false);
  return (
    <button
      onClick={() => setUploaded((v) => !v)}
      className={cn(
        "flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed py-6 text-center transition-colors",
        uploaded ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/40"
      )}
    >
      {uploaded ? (
        <>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <Check className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm font-medium text-green-700">Uploaded</p>
          <p className="text-xs text-green-600">Click to replace</p>
        </>
      ) : (
        <>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Upload className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="text-xs text-gray-400">{hint ?? "JPG, PNG or PDF · max 5 MB"}</p>
        </>
      )}
    </button>
  );
}

export default function KycPage() {
  const [phase, setPhase] = useState<"intro" | "steps" | "done">("intro");
  const [step, setStep] = useState(1);
  const [idType, setIdType] = useState<IdType | null>(null);
  const [selfieUploaded, setSelfieUploaded] = useState(false);

  if (phase === "intro") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600">
              <Home className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Rentlink</span>
          </Link>

          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Verify your identity</h1>
            <p className="mt-2 text-sm text-gray-500">
              To protect our community, landlords must complete a one-time identity check before listing properties.
            </p>

            <div className="mt-6 space-y-3 text-left">
              {[
                { icon: "🪪", text: "A valid government-issued ID (NIN, passport, driver's licence, or BVN)" },
                { icon: "🤳", text: "A clear selfie — good lighting, face fully visible" },
                { icon: "⏱️", text: "About 2 minutes of your time" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg leading-none">{item.icon}</span>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-blue-50 px-4 py-3 text-xs text-blue-700">
              🔒 Your data is encrypted and only used for identity verification. We never share it with third parties.
            </div>

            <button
              onClick={() => setPhase("steps")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </button>

            <Link href="/landlord/overview" className="mt-3 block text-center text-sm text-gray-400 hover:text-gray-600">
              I&apos;ll do this later
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Documents submitted!</h1>
            <p className="mt-2 text-sm text-gray-500">
              We&apos;re reviewing your identity. This usually takes{" "}
              <span className="font-medium text-gray-700">24–48 hours</span>.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              We&apos;ll email you at{" "}
              <span className="font-medium text-gray-700">john@example.com</span>{" "}
              once your account is approved.
            </p>

            <div className="mt-6 space-y-2.5 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">What happens next</p>
              {[
                "Our team reviews your documents",
                "You receive an email confirmation",
                "Your listings go live for tenants to see",
              ].map((step, i) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-600">{step}</p>
                </div>
              ))}
            </div>

            <Link
              href="/landlord/overview"
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-start justify-center px-4 py-10 sm:py-14">
      <div className="w-full max-w-lg">
        <Link href="/" className="mb-6 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600">
            <Home className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Rentlink</span>
        </Link>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <StepBar current={step} />
          </div>

          {/* ── Step 1: ID type ── */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900">Choose your ID type</h2>
              <p className="mt-1 text-sm text-gray-500">Select a valid government-issued ID to verify with</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {idTypes.map((t) => {
                  const selected = idType === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setIdType(t.id)}
                      className={cn(
                        "rounded-2xl border-2 p-4 text-left transition-all",
                        selected
                          ? "border-blue-500 ring-4 ring-blue-100"
                          : "border-gray-100 hover:border-gray-200"
                      )}
                    >
                      <span className="text-2xl">{t.emoji}</span>
                      <p className="mt-2 text-sm font-semibold text-gray-900">{t.label}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{t.sub}</p>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => idType && setStep(2)}
                disabled={!idType}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* ── Step 2: Upload documents ── */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900">Upload your documents</h2>
              <p className="mt-1 text-sm text-gray-500">
                {idType === "bvn"
                  ? "Enter your BVN to verify automatically"
                  : "Provide your ID number and upload a photo of the document"}
              </p>

              <div className="mt-5">
                <label className="text-sm font-medium text-gray-700">
                  {idType === "nin" && "NIN (National Identification Number)"}
                  {idType === "passport" && "Passport Number"}
                  {idType === "drivers" && "Licence Number"}
                  {idType === "bvn" && "BVN (Bank Verification Number)"}
                </label>
                <input
                  type="text"
                  placeholder={
                    idType === "nin" ? "e.g. 12345678901"
                    : idType === "passport" ? "e.g. A12345678"
                    : idType === "drivers" ? "e.g. AAA00000000001"
                    : "e.g. 12345678901"
                  }
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                />
              </div>

              {idType !== "bvn" && (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-700">Front of ID</p>
                    <UploadZone label="Upload front" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-700">Back of ID</p>
                    <UploadZone label="Upload back" />
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep(1)} className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button onClick={() => setStep(3)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Selfie ── */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900">Take a selfie</h2>
              <p className="mt-1 text-sm text-gray-500">
                We&apos;ll match your face to your ID document to confirm it&apos;s really you
              </p>

              <button
                onClick={() => setSelfieUploaded((v) => !v)}
                className={cn(
                  "mt-5 flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed py-10 transition-colors",
                  selfieUploaded
                    ? "border-green-400 bg-green-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/40"
                )}
              >
                {selfieUploaded ? (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-7 w-7 text-green-500" />
                    </div>
                    <p className="text-sm font-medium text-green-700">Selfie uploaded</p>
                    <p className="text-xs text-green-600">Click to replace</p>
                  </>
                ) : (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                      <Camera className="h-7 w-7 text-blue-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">Upload a selfie photo</p>
                    <p className="text-xs text-gray-400">JPG or PNG · max 5 MB</p>
                  </>
                )}
              </button>

              <div className="mt-4 space-y-1.5 rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-500">Tips for a good selfie</p>
                {[
                  "Good, even lighting — avoid harsh shadows",
                  "Face fully visible — no sunglasses or hats",
                  "Look straight at the camera",
                ].map((tip) => (
                  <div key={tip} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                    <p className="text-xs text-gray-500">{tip}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep(2)} className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  onClick={() => setPhase("done")}
                  disabled={!selfieUploaded}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Submit for review <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
