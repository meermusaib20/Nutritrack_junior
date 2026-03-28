import { generateDailyPlan } from "@/lib/meal-engine";
import { getFoods } from "@/lib/food-service";
import { DietType, GoalType, PlanInput } from "@/lib/types";

function validateInput(input: Partial<PlanInput>) {
  const errors: string[] = [];

  if (!input.age || input.age < 2 || input.age > 12) errors.push("Age must be between 2 and 12.");
  if (!input.weight || input.weight < 5 || input.weight > 80) errors.push("Weight must be valid.");
  if (!input.budget || input.budget < 100 || input.budget > 400) {
    errors.push("Budget must be between INR 100 and 400.");
  }
  if (!input.dietType || !["veg", "non-veg"].includes(input.dietType)) errors.push("Invalid diet type.");
  if (!input.goal || !["weight_gain", "maintenance", "balanced"].includes(input.goal)) errors.push("Invalid goal.");

  return errors;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<PlanInput> & { regenerateToken?: number };
    console.log("[generate-plan] Input payload:", body);
    const errors = validateInput(body);

    if (errors.length > 0) {
      return Response.json({ errors }, { status: 400 });
    }

    const input: PlanInput = {
      age: Number(body.age),
      weight: Number(body.weight),
      dietType: body.dietType as DietType,
      budget: Number(body.budget),
      goal: body.goal as GoalType,
    };

    const { foods, source } = await getFoods();
    console.log(`[generate-plan] Foods fetched: ${foods.length}, source: ${source}`);
    const seed = (body.regenerateToken ?? Date.now()) + input.age * 31 + input.weight * 17;
    const plan = generateDailyPlan(foods, input, seed);
    console.log("[generate-plan] Plan generated with score:", plan.score);

    return Response.json({
      source,
      generatedAt: new Date().toISOString(),
      input,
      ...plan,
    });
  } catch (error) {
    console.error("[generate-plan] Fatal error:", error);
    return Response.json(
      { error: "Could not generate meal plan. Please retry.", retryable: true },
      { status: 500 }
    );
  }
}
