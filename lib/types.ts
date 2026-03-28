export type DietType = "veg" | "non-veg";
export type MealCategory = "breakfast" | "lunch" | "snack" | "dinner";
export type AgeGroup = "toddler" | "child" | "all";
export type GoalType = "weight_gain" | "maintenance" | "balanced";
export type WeightClass = "underweight" | "normal" | "overweight";

export interface Food {
  id?: string;
  name: string;
  type: DietType;
  category: MealCategory;
  cost: number;
  calories: number;
  protein: number;
  iron: number;
  calcium: number;
  age_group: AgeGroup;
}

export interface PlanInput {
  age: number;
  weight: number;
  dietType: DietType;
  budget: number;
  goal: GoalType;
}

export interface MealPlanItem {
  name: string;
  cost: number;
  calories: number;
  protein: number;
  iron: number;
  calcium: number;
}

export interface MealPlan {
  mealType: MealCategory;
  items: MealPlanItem[];
  mealCost: number;
}

export interface MealPlanResult {
  ageGroup: "toddler" | "child";
  weightClass: WeightClass;
  meals: MealPlan[];
  totalCost: number;
  score: number;
  nutrientBreakdown: {
    protein: number;
    iron: number;
    calcium: number;
    diversity: number;
  };
  explanation: string;
}

export interface GeneratePlanResponse extends MealPlanResult {
  source: "supabase" | "local";
  generatedAt: string;
  input: PlanInput;
}
