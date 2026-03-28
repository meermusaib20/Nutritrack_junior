"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { InputForm } from "@/components/InputForm";
import { Loader } from "@/components/Loader";
import { MealCard } from "@/components/MealCard";
import { PlannerHero } from "@/components/PlannerHero";
import { ScoreBar } from "@/components/ScoreBar";
import { GeneratePlanResponse, GoalType, PlanInput } from "@/lib/types";

const DEFAULT_FORM = {
  age: 6,
  weight: 18,
  dietType: "veg" as "veg" | "non-veg",
  budget: 200,
  goal: "balanced" as GoalType,
};

const FORM_STORAGE_KEY = "nutritrack:form:v1";
const PLAN_STORAGE_KEY = "nutritrack:plan:v1";

export default function PlannerPage() {
  const [form, setForm] = useState<PlanInput>(DEFAULT_FORM);
  const [plan, setPlan] = useState<GeneratePlanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [regenToken, setRegenToken] = useState<number>(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  const expectedWeight = useMemo(() => form.age * 2 + 8, [form.age]);
  const scoreTone = plan ? (plan.score >= 8 ? "success" : plan.score >= 5 ? "warn" : "danger") : "success";
  const validate = useMemo(() => validateInput(form), [form]);

  useEffect(() => {
    try {
      const rawForm = localStorage.getItem(FORM_STORAGE_KEY);
      const rawPlan = localStorage.getItem(PLAN_STORAGE_KEY);
      if (rawForm) {
        const parsed = JSON.parse(rawForm) as PlanInput;
        if (parsed && parsed.age && parsed.weight) setForm(parsed);
      }
      if (rawPlan) {
        const parsedPlan = JSON.parse(rawPlan) as GeneratePlanResponse;
        if (parsedPlan?.meals) setPlan(parsedPlan);
      }
    } catch (storageError) {
      console.error("[ui] localStorage restore failed:", storageError);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form));
    } catch (storageError) {
      console.error("[ui] localStorage save form failed:", storageError);
    }
  }, [form]);

  async function generatePlan(regenerate = false) {
    if (validate) {
      setError(validate);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const token = regenerate ? regenToken + 1 : regenToken;
      if (regenerate) setRegenToken(token);
      console.log("[ui] generate-plan request input:", { ...form, regenerateToken: token });

      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, regenerateToken: token }),
      });

      const data = (await res.json()) as Partial<GeneratePlanResponse> & {
        errors?: string[];
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data?.errors?.[0] ?? data?.error ?? "Could not generate plan.");
      }
      if (!data || !data.meals || data.meals.length === 0) {
        throw new Error("No meals could be generated for the selected input.");
      }

      setPlan(data as GeneratePlanResponse);
      try {
        localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(data));
      } catch (storageError) {
        console.error("[ui] localStorage save plan failed:", storageError);
      }
      console.log("[ui] generate-plan response:", data);
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (e) {
      console.error("[ui] generate-plan failed:", e);
      setError(e instanceof Error ? e.message : "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-cyan-50 to-orange-50/40">
      <PlannerHero>
        <InputForm
          value={form}
          onChange={setForm}
          onGenerate={() => generatePlan(false)}
          onRegenerate={() => generatePlan(true)}
          generating={loading}
          canRegenerate={Boolean(plan)}
          validationError={error}
        />
      </PlannerHero>

      <section ref={resultsRef} className="px-4 pb-12 pt-6 sm:px-6">
        <div className="mx-auto max-w-[900px] space-y-4">
          <Card className="p-5">
            <p className="text-sm font-semibold text-slate-700">Quick Insights</p>
            <p className="mt-1 text-xs text-slate-500">Updates instantly as you fill the form.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <InsightItem label="Expected Weight" value={`${expectedWeight} kg`} />
              <InsightItem label="Focus Age" value={`${form.age} years`} />
              <InsightItem label="Daily Budget" value={`INR ${form.budget}`} />
              <InsightItem label="Diet Preference" value={form.dietType} />
            </div>
            <p className="mt-4 text-xs text-slate-500">Meal budget split: Breakfast 25%, Lunch 35%, Snack 15%, Dinner 25%</p>
          </Card>

          <header className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Your Meal Plan</h2>
            <p className="text-sm text-slate-600">Personalized recommendations designed for your child&apos;s needs.</p>
          </header>

          {loading && (
            <Card className="p-5">
              <Loader rows={5} />
            </Card>
          )}

          {!loading && !plan && (
            <Card className="p-8 text-center">
              <p className="text-slate-500">No plan generated yet. Enter details above and create your first personalized plan.</p>
              {error && (
                <div className="mx-auto mt-4 max-w-xs">
                  <Button onClick={() => generatePlan(false)} className="max-w-xs">
                    Retry Generation
                  </Button>
                </div>
              )}
            </Card>
          )}

          {!loading && plan && (
            <section className="animate-[fadeIn_0.4s_ease-out] space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Total Cost" value={`INR ${plan.totalCost}`} />
                <StatCard label="Age Group" value={plan.ageGroup} />
                <StatCard label="Weight Type" value={plan.weightClass} />
                <StatCard label="Data Source" value={plan.source} />
              </div>

              <ScoreBar score={plan.score} />

              <Card className="p-4">
                <p className="mb-3 text-sm font-semibold text-slate-700">Nutrition Breakdown</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <InfoPill label="Protein" value={`${plan.nutrientBreakdown.protein} g`} />
                  <InfoPill label="Iron" value={`${plan.nutrientBreakdown.iron} mg`} />
                  <InfoPill label="Calcium" value={`${plan.nutrientBreakdown.calcium} mg`} />
                  <InfoPill label="Diversity" value={`${plan.nutrientBreakdown.diversity} foods`} />
                </div>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                {plan.meals.map((meal) => (
                  <MealCard key={meal.mealType} meal={meal} />
                ))}
              </div>

              <Card
                className={`p-4 text-sm ${
                  scoreTone === "success"
                    ? "bg-emerald-50 text-emerald-900"
                    : scoreTone === "warn"
                      ? "bg-amber-50 text-amber-900"
                      : "bg-rose-50 text-rose-900"
                }`}
              >
                <p className="font-semibold">Why this plan?</p>
                <p className="mt-1">{plan.explanation}</p>
              </Card>

              <div className="mx-auto max-w-sm">
                <Button onClick={() => generatePlan(true)} loading={loading} className="text-base">
                  Regenerate Plan
                </Button>
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

function validateInput(input: PlanInput): string {
  if (!Number.isFinite(input.age) || input.age < 2 || input.age > 12) return "Age must be between 2 and 12.";
  if (!Number.isFinite(input.weight) || input.weight < 5 || input.weight > 80) return "Weight must be between 5 and 80 kg.";
  if (!Number.isFinite(input.budget) || input.budget < 100 || input.budget > 400) return "Budget must be between INR 100 and 400.";
  if (!input.dietType) return "Please select a diet type.";
  if (!input.goal) return "Please select a goal.";
  return "";
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-3.5">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold capitalize">{value}</p>
    </Card>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-3 py-2 text-center">
      <p className="text-[11px] uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

function InsightItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gradient-to-b from-slate-50 to-white p-3">
      <p className="text-[11px] uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold capitalize text-slate-800">{value}</p>
    </div>
  );
}
