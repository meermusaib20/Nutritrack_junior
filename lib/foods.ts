import { Food } from "@/lib/types";

export const FOODS_DATASET: Food[] = [
  { name: "Milk", type: "veg", category: "breakfast", cost: 30, calories: 150, protein: 8, iron: 0.1, calcium: 125, age_group: "all" },
  { name: "Banana", type: "veg", category: "breakfast", cost: 10, calories: 89, protein: 1.1, iron: 0.3, calcium: 5, age_group: "all" },
  { name: "Apple", type: "veg", category: "snack", cost: 20, calories: 95, protein: 0.5, iron: 0.2, calcium: 6, age_group: "all" },
  { name: "Boiled Egg", type: "non-veg", category: "breakfast", cost: 7, calories: 78, protein: 6, iron: 1.2, calcium: 28, age_group: "child" },
  { name: "Omelette", type: "non-veg", category: "breakfast", cost: 15, calories: 154, protein: 10, iron: 1.8, calcium: 50, age_group: "child" },
  { name: "Poha", type: "veg", category: "breakfast", cost: 20, calories: 180, protein: 4, iron: 2.7, calcium: 20, age_group: "all" },
  { name: "Upma", type: "veg", category: "breakfast", cost: 25, calories: 190, protein: 5, iron: 1.5, calcium: 30, age_group: "all" },
  { name: "Idli", type: "veg", category: "breakfast", cost: 15, calories: 58, protein: 2, iron: 0.3, calcium: 10, age_group: "all" },
  { name: "Dosa", type: "veg", category: "breakfast", cost: 30, calories: 168, protein: 4, iron: 1, calcium: 20, age_group: "child" },
  { name: "Paratha", type: "veg", category: "breakfast", cost: 25, calories: 260, protein: 6, iron: 2.5, calcium: 50, age_group: "child" },
  { name: "Rice", type: "veg", category: "lunch", cost: 20, calories: 130, protein: 2.5, iron: 0.2, calcium: 10, age_group: "all" },
  { name: "Dal", type: "veg", category: "lunch", cost: 25, calories: 116, protein: 9, iron: 3.3, calcium: 19, age_group: "all" },
  { name: "Roti", type: "veg", category: "lunch", cost: 10, calories: 70, protein: 3, iron: 1.2, calcium: 15, age_group: "all" },
  { name: "Paneer", type: "veg", category: "dinner", cost: 50, calories: 265, protein: 18, iron: 0.7, calcium: 208, age_group: "child" },
  { name: "Curd", type: "veg", category: "snack", cost: 20, calories: 98, protein: 11, iron: 0.2, calcium: 110, age_group: "all" },
  { name: "Chicken Curry", type: "non-veg", category: "lunch", cost: 60, calories: 239, protein: 27, iron: 1.3, calcium: 15, age_group: "child" },
  { name: "Egg Curry", type: "non-veg", category: "dinner", cost: 40, calories: 220, protein: 13, iron: 2, calcium: 60, age_group: "child" },
  { name: "Vegetable Sabzi", type: "veg", category: "dinner", cost: 20, calories: 90, protein: 2, iron: 1.5, calcium: 40, age_group: "all" },
  { name: "Khichdi", type: "veg", category: "dinner", cost: 30, calories: 200, protein: 7, iron: 2, calcium: 60, age_group: "all" },
  { name: "Peanuts", type: "veg", category: "snack", cost: 15, calories: 567, protein: 26, iron: 4.6, calcium: 92, age_group: "child" },
  { name: "Sprouts", type: "veg", category: "breakfast", cost: 20, calories: 120, protein: 9, iron: 2.5, calcium: 40, age_group: "child" },
  { name: "Fish Curry", type: "non-veg", category: "lunch", cost: 70, calories: 206, protein: 22, iron: 1, calcium: 20, age_group: "child" },
  { name: "Mutton Curry", type: "non-veg", category: "dinner", cost: 80, calories: 294, protein: 25, iron: 2, calcium: 30, age_group: "child" },
  { name: "Samosa", type: "veg", category: "snack", cost: 15, calories: 250, protein: 4, iron: 1, calcium: 30, age_group: "child" },
  { name: "Pakora", type: "veg", category: "snack", cost: 20, calories: 300, protein: 5, iron: 2, calcium: 40, age_group: "child" },
  { name: "Dhokla", type: "veg", category: "snack", cost: 20, calories: 160, protein: 6, iron: 1, calcium: 40, age_group: "all" },
  { name: "Corn Chaat", type: "veg", category: "snack", cost: 20, calories: 150, protein: 5, iron: 1.5, calcium: 20, age_group: "all" },
  { name: "Buttermilk", type: "veg", category: "snack", cost: 10, calories: 60, protein: 3, iron: 0.1, calcium: 100, age_group: "all" },
  { name: "Lassi", type: "veg", category: "snack", cost: 20, calories: 180, protein: 6, iron: 0.1, calcium: 200, age_group: "child" },
];

export const MEAL_ORDER = ["breakfast", "lunch", "snack", "dinner"] as const;

export const BUDGET_SPLIT = {
  breakfast: 0.25,
  lunch: 0.35,
  snack: 0.15,
  dinner: 0.25,
} as const;
