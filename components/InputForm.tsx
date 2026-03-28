import { Button } from "@/components/Button";
import { DietToggle } from "@/components/DietToggle";
import { FormCard } from "@/components/FormCard";
import { InputField } from "@/components/InputField";
import { GoalType, PlanInput } from "@/lib/types";

interface InputFormProps {
  value: PlanInput;
  onChange: (next: PlanInput) => void;
  onGenerate: () => void;
  onRegenerate: () => void;
  generating: boolean;
  canRegenerate: boolean;
  validationError: string;
}

const AGE_OPTIONS = Array.from({ length: 11 }, (_, i) => i + 2);
const WEIGHT_OPTIONS = Array.from({ length: 76 }, (_, i) => i + 5);
const BUDGET_OPTIONS = Array.from({ length: 7 }, (_, i) => 100 + i * 50);

export function InputForm({
  value,
  onChange,
  onGenerate,
  onRegenerate,
  generating,
  canRegenerate,
  validationError,
}: InputFormProps) {
  function patch<K extends keyof PlanInput>(key: K, nextValue: PlanInput[K]) {
    onChange({ ...value, [key]: nextValue });
  }

  return (
    <FormCard title="👶 Child Nutrition Form" subtitle="Fill details to generate a personalized meal plan.">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label="Age" htmlFor="age">
            <select
              id="age"
              value={value.age}
              onChange={(e) => patch("age", Number(e.target.value))}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              {AGE_OPTIONS.map((age) => (
                <option key={`age-${age}`} value={age}>
                  {age} years
                </option>
              ))}
            </select>
          </InputField>

          <InputField label="Weight" htmlFor="weight">
            <select
              id="weight"
              value={value.weight}
              onChange={(e) => patch("weight", Number(e.target.value))}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              {WEIGHT_OPTIONS.map((weight) => (
                <option key={`weight-${weight}`} value={weight}>
                  {weight} kg
                </option>
              ))}
            </select>
          </InputField>
        </div>

        <InputField label="Budget" htmlFor="budget">
          <select
            id="budget"
            value={value.budget}
            onChange={(e) => patch("budget", Number(e.target.value))}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            {BUDGET_OPTIONS.map((budget) => (
              <option key={`budget-${budget}`} value={budget}>
                ₹{budget}
              </option>
            ))}
          </select>
        </InputField>

        <InputField label="Diet Preference" htmlFor="diet-toggle">
          <div id="diet-toggle">
            <DietToggle value={value.dietType} onChange={(next) => patch("dietType", next)} />
          </div>
        </InputField>

        <InputField label="Goal" htmlFor="goal">
          <select
            id="goal"
            value={value.goal}
            onChange={(e) => patch("goal", e.target.value as GoalType)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="weight_gain">Weight Gain</option>
            <option value="maintenance">Maintenance</option>
            <option value="balanced">Balanced</option>
          </select>
        </InputField>
      </div>

      {validationError && <p className="mt-4 rounded-xl border border-rose-100 bg-rose-50 p-3 text-sm text-rose-700">{validationError}</p>}

      <div className="mt-5 space-y-3">
        <Button onClick={onGenerate} loading={generating} className="py-3 text-base">
          Generate Smart Meal Plan
        </Button>
        <Button onClick={onRegenerate} disabled={!canRegenerate || generating} variant="secondary">
          Regenerate Plan
        </Button>
      </div>
    </FormCard>
  );
}
