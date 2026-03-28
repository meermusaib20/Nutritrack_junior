import { FOODS_DATASET } from "@/lib/foods";
import { getSupabaseServerClient } from "@/lib/supabase";
import { Food } from "@/lib/types";

export async function getFoods(): Promise<{ foods: Food[]; source: "supabase" | "local" }> {
  const client = getSupabaseServerClient();
  if (!client) {
    console.log("[food-service] Supabase env missing. Using local dataset.");
    return { foods: FOODS_DATASET, source: "local" };
  }

  const { data, error } = await client.from("foods").select("*");
  if (error) {
    console.error("[food-service] Supabase fetch error. Falling back local dataset.", error.message);
    return { foods: FOODS_DATASET, source: "local" };
  }

  if (!data || data.length === 0) {
    console.warn("[food-service] Supabase returned empty foods. Falling back local dataset.");
    return { foods: FOODS_DATASET, source: "local" };
  }

  return { foods: data as Food[], source: "supabase" };
}
