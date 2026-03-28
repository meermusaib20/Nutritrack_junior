import Link from "next/link";
import { Button } from "@/components/Button";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-cyan-50 to-orange-50/40">
      <section className="relative flex min-h-[88vh] items-center overflow-hidden px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 left-8 h-60 w-60 rounded-full bg-emerald-300/25 blur-3xl" />
          <div className="absolute right-0 top-12 h-52 w-52 rounded-full bg-cyan-300/25 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-orange-200/35 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="inline-flex rounded-full border border-emerald-100 bg-white/85 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-700">
                Personalized child nutrition, simplified
              </p>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                Smart nutrition planning that feels
                <span className="block bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  practical every day.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                Generate balanced meal plans using age, weight, diet preference, and budget. Designed for Indian families who need quick, trustworthy guidance.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/planner" className="block w-full sm:w-auto sm:min-w-[220px]">
                  <Button>Start Smart Planning</Button>
                </Link>
                <p className="text-sm text-slate-500">No signup needed. Instant results.</p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <FeaturePill title="Balanced Meals" subtitle="Breakfast to dinner plans" />
                <FeaturePill title="Budget-Aware" subtitle="Daily budget control" />
                <FeaturePill title="Quick Output" subtitle="Plan in seconds" />
              </div>
            </div>

            <aside className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-xl shadow-slate-900/10 backdrop-blur-sm sm:p-6">
              <p className="text-sm font-semibold text-slate-700">Sample Daily Snapshot</p>
              <div className="mt-4 space-y-3">
                <PreviewRow meal="Breakfast" item="Poha + Milk" cost="₹50" />
                <PreviewRow meal="Lunch" item="Dal + Rice + Roti" cost="₹55" />
                <PreviewRow meal="Snack" item="Curd + Fruit" cost="₹35" />
                <PreviewRow meal="Dinner" item="Khichdi + Sabzi" cost="₹60" />
              </div>
              <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
                Nutrition score preview: <span className="font-bold">8.5 / 10</span>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeaturePill({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-xl border border-white/80 bg-white/85 p-3 text-left shadow-sm">
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}

function PreviewRow({ meal, item, cost }: { meal: string; item: string; cost: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{meal}</p>
        <p className="text-sm font-medium text-slate-800">{item}</p>
      </div>
      <p className="text-sm font-bold text-slate-700">{cost}</p>
    </div>
  );
}
