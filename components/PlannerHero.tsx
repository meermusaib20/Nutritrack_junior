import { ReactNode } from "react";

export function PlannerHero({ children }: { children: ReactNode }) {
  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-green-100 via-white to-blue-100 px-4 py-10 sm:px-6 sm:py-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-14 left-10 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute right-10 top-24 h-44 w-44 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute bottom-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto grid h-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="inline-flex rounded-full border border-emerald-100 bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700">
            🍽️ Personalized Nutrition Assistant
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
            Smart Nutrition Planning for Your Child
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            Personalized meal plans based on age, weight, and budget.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2">🥗 Balanced nutrition</li>
            <li className="flex items-center gap-2">💸 Budget-friendly meals</li>
            <li className="flex items-center gap-2">⚡ Instant results</li>
          </ul>
        </div>

        <div className="flex justify-center lg:justify-end">{children}</div>
      </div>
    </section>
  );
}
