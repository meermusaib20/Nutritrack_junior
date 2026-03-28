import { DietType } from "@/lib/types";

interface DietToggleProps {
  value: DietType;
  onChange: (value: DietType) => void;
}

export function DietToggle({ value, onChange }: DietToggleProps) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
      <button
        type="button"
        onClick={() => onChange("veg")}
        className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
          value === "veg"
            ? "bg-emerald-500 text-white shadow"
            : "bg-transparent text-slate-600 hover:bg-white/70"
        }`}
      >
        Veg
      </button>
      <button
        type="button"
        onClick={() => onChange("non-veg")}
        className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
          value === "non-veg"
            ? "bg-emerald-500 text-white shadow"
            : "bg-transparent text-slate-600 hover:bg-white/70"
        }`}
      >
        Non-Veg
      </button>
    </div>
  );
}
