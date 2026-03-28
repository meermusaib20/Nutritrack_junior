import { BUDGET_SPLIT, MEAL_ORDER } from "@/lib/foods";
import { Food, MealCategory, MealPlan, MealPlanResult, PlanInput, WeightClass } from "@/lib/types";

const TODDLER_RESTRICTED = new Set(["Pakora", "Samosa", "Peanuts"]);
const OVERWEIGHT_RESTRICTED = new Set(["Pakora", "Samosa", "Mutton Curry", "Paratha"]);
const UNDERWEIGHT_PREFERRED = new Set(["Paneer", "Milk", "Boiled Egg", "Omelette", "Banana"]);

function expectedWeight(age: number) {
  return age * 2 + 8;
}

export function getAgeGroup(age: number): "toddler" | "child" {
  return age <= 5 ? "toddler" : "child";
}

export function classifyWeight(age: number, weight: number): WeightClass {
  const expected = expectedWeight(age);
  if (weight < expected - 2) return "underweight";
  if (weight > expected + 5) return "overweight";
  return "normal";
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const clone = [...arr];
  let localSeed = seed;
  for (let i = clone.length - 1; i > 0; i -= 1) {
    localSeed = (localSeed * 9301 + 49297) % 233280;
    const j = Math.floor((localSeed / 233280) * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function getMealBudget(totalBudget: number, meal: MealCategory): number {
  return Math.max(1, Math.round(totalBudget * BUDGET_SPLIT[meal]));
}

function proteinFirstSort(a: Food, b: Food) {
  return b.protein - a.protein;
}

function pickMealItems(
  foods: Food[],
  meal: MealCategory,
  budgetCap: number,
  weightClass: WeightClass,
  seed: number
) {
  const mealFoods = foods.filter((f) => f.category === meal);
  const fallbackFoods = foods.filter((f) => f.category !== meal);
  const candidatePool = mealFoods.length > 0 ? mealFoods : fallbackFoods;
  if (candidatePool.length === 0) return [] as Food[];
  const randomized = seededShuffle(candidatePool, seed);
  const preferred =
    weightClass === "underweight"
      ? randomized.sort((a, b) => {
          const aBoost = UNDERWEIGHT_PREFERRED.has(a.name) ? 1 : 0;
          const bBoost = UNDERWEIGHT_PREFERRED.has(b.name) ? 1 : 0;
          if (aBoost !== bBoost) return bBoost - aBoost;
          return proteinFirstSort(a, b);
        })
      : randomized;

  const picks: Food[] = [];
  let runningCost = 0;

  for (const item of preferred) {
    if (picks.length >= 3) break;
    if (runningCost + item.cost <= budgetCap) {
      picks.push(item);
      runningCost += item.cost;
    }
  }

  if (!picks.some((item) => item.protein >= 8)) {
    const highProtein = preferred.find((item) => item.protein >= 8 && !picks.some((p) => p.name === item.name));
    if (highProtein) {
      const currentCost = picks.reduce((sum, item) => sum + item.cost, 0);
      if (picks.length < 3) {
        if (currentCost + highProtein.cost <= budgetCap) {
          picks.push(highProtein);
        }
      } else {
        const replacedCost = currentCost - picks[picks.length - 1].cost + highProtein.cost;
        if (replacedCost <= budgetCap) {
          picks[picks.length - 1] = highProtein;
        }
      }
    }
  }

  if (picks.length === 0 && preferred.length > 0) {
    const affordable = preferred.filter((item) => item.cost <= budgetCap);
    if (affordable.length > 0) picks.push(affordable[0]);
  }

  return picks.slice(0, 3);
}

function getCheapestByMeal(foods: Food[]) {
  const byMeal = {} as Record<MealCategory, number>;
  for (const meal of MEAL_ORDER) {
    const mealFoods = foods.filter((f) => f.category === meal);
    if (mealFoods.length === 0) {
      byMeal[meal] = Number.POSITIVE_INFINITY;
    } else {
      byMeal[meal] = Math.min(...mealFoods.map((f) => f.cost));
    }
  }
  return byMeal;
}

function getRemainingMinCost(
  cheapestByMeal: Record<MealCategory, number>,
  fromIndex: number
) {
  return MEAL_ORDER.slice(fromIndex).reduce((sum, meal) => sum + cheapestByMeal[meal], 0);
}

function summarize(plan: MealPlan[]) {
  const all = plan.flatMap((meal) => meal.items);
  const totalCost = all.reduce((sum, i) => sum + i.cost, 0);
  const protein = all.reduce((sum, i) => sum + i.protein, 0);
  const iron = all.reduce((sum, i) => sum + i.iron, 0);
  const calcium = all.reduce((sum, i) => sum + i.calcium, 0);
  const diversityCount = new Set(all.map((i) => i.name)).size;

  let score = 0;
  if (protein >= 30) score += 3;
  else if (protein >= 20) score += 2;

  if (iron >= 8) score += 3;
  else if (iron >= 5) score += 2;

  if (calcium >= 350) score += 2;
  else if (calcium >= 250) score += 1;

  if (diversityCount >= 8) score += 2;
  else if (diversityCount >= 6) score += 1;

  return {
    totalCost,
    protein: Number(protein.toFixed(1)),
    iron: Number(iron.toFixed(1)),
    calcium: Number(calcium.toFixed(1)),
    diversityCount,
    score: Math.min(10, score),
  };
}

function buildExplanation(input: PlanInput, weightClass: WeightClass, score: number, totalCost: number) {
  const goalMap = {
    weight_gain: "support weight gain with calorie-dense and protein-rich picks",
    maintenance: "maintain a stable growth pattern with moderate calories",
    balanced: "provide a balanced mix of nutrients for daily growth",
  };
  return `This plan is tailored for a ${input.age}-year-old child (${weightClass}), designed to ${goalMap[input.goal]}. It stays around your daily budget with a total cost of INR ${totalCost} and achieves a nutrition score of ${score}/10 based on protein, iron, calcium, and diversity.`;
}

export function generateDailyPlan(foods: Food[], input: PlanInput, seed = Date.now()): MealPlanResult {
  if (!foods || foods.length === 0) {
    throw new Error("No foods available for plan generation.");
  }

  const ageGroup = getAgeGroup(input.age);
  const weightClass = classifyWeight(input.age, input.weight);

  let filtered = foods.filter((food) => {
    const ageAllowed = food.age_group === "all" || food.age_group === ageGroup;
    const dietAllowed = input.dietType === "veg" ? food.type === "veg" : true;
    return ageAllowed && dietAllowed;
  });

  filtered = filtered.filter((food) => !TODDLER_RESTRICTED.has(food.name) || ageGroup !== "toddler");
  if (weightClass === "overweight") {
    filtered = filtered.filter((food) => !OVERWEIGHT_RESTRICTED.has(food.name));
  }
  if (input.goal === "maintenance") {
    filtered = filtered.filter((food) => !["Mutton Curry", "Paratha"].includes(food.name));
  }

  // Ensure generation can always proceed with at least the valid age/diet pool.
  if (filtered.length === 0) {
    filtered = foods.filter((food) => {
      const ageAllowed = food.age_group === "all" || food.age_group === ageGroup;
      const dietAllowed = input.dietType === "veg" ? food.type === "veg" : true;
      return ageAllowed && dietAllowed;
    });
  }

  if (filtered.length === 0) {
    filtered = [...foods];
  }

  const cheapestByMeal = getCheapestByMeal(filtered);
  const minimumRequiredBudget = getRemainingMinCost(cheapestByMeal, 0);
  if (!Number.isFinite(minimumRequiredBudget) || minimumRequiredBudget <= 0) {
    throw new Error("Insufficient food categories to build a full-day plan.");
  }
  if (input.budget < minimumRequiredBudget) {
    throw new Error(`Daily budget is too low. Minimum required is INR ${minimumRequiredBudget}.`);
  }

  let remainingBudget = input.budget;
  const meals: MealPlan[] = [];

  for (let idx = 0; idx < MEAL_ORDER.length; idx += 1) {
    const meal = MEAL_ORDER[idx];
    const minReserveForFuture = getRemainingMinCost(cheapestByMeal, idx + 1);
    const maxForCurrentMeal = Math.max(0, remainingBudget - minReserveForFuture);
    const splitTarget = getMealBudget(input.budget, meal);
    const mealCap = Math.max(cheapestByMeal[meal], Math.min(splitTarget, maxForCurrentMeal));

    let items = pickMealItems(filtered, meal, mealCap, weightClass, seed + idx * 43);

    if (items.length === 0) {
      const mealFoods = filtered.filter((f) => f.category === meal);
      const cheapest = mealFoods.sort((a, b) => a.cost - b.cost)[0];
      if (!cheapest) throw new Error(`No foods available for ${meal}.`);
      items = [cheapest];
    }

    const mealCost = items.reduce((sum, item) => sum + item.cost, 0);
    remainingBudget = Math.max(0, remainingBudget - mealCost);

    meals.push({
      mealType: meal,
      items: items.map((item) => ({
        name: item.name,
        cost: item.cost,
        calories: item.calories,
        protein: item.protein,
        iron: item.iron,
        calcium: item.calcium,
      })),
      mealCost,
    });
  }

  const nutrition = summarize(meals);
  if (nutrition.totalCost > input.budget) {
    throw new Error("Generated plan exceeds daily budget. Please regenerate.");
  }

  return {
    ageGroup,
    weightClass,
    meals,
    totalCost: nutrition.totalCost,
    score: nutrition.score,
    nutrientBreakdown: {
      protein: nutrition.protein,
      iron: nutrition.iron,
      calcium: nutrition.calcium,
      diversity: nutrition.diversityCount,
    },
    explanation: buildExplanation(input, weightClass, nutrition.score, nutrition.totalCost),
  };
}
