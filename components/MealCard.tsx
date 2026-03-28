import { MealPlan } from "@/lib/types";
import { Card } from "@/components/Card";

const ICONS: Record<MealPlan["mealType"], string> = {
  breakfast: "🌅",
  lunch: "🍛",
  snack: "🍎",
  dinner: "🌙",
};

export function MealCard({ meal }: { meal: MealPlan }) {
  return (
    <Card className="group p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/70">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold capitalize text-slate-900">
          <span className="mr-2">{ICONS[meal.mealType]}</span>
          {meal.mealType}
        </h3>
        <p className="rounded-lg bg-gradient-to-r from-emerald-100 to-cyan-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
          INR {meal.mealCost}
        </p>
      </div>
      <ul className="space-y-2">
        {meal.items.map((item) => (
          <li key={`${meal.mealType}-${item.name}`} className="rounded-xl border border-slate-100 bg-white px-3 py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-800">{item.name}</p>
              <p className="text-xs font-semibold text-slate-500">INR {item.cost}</p>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {item.calories} kcal | P {item.protein}g | Fe {item.iron}mg | Ca {item.calcium}mg
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
