import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export function Button({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex w-full items-center justify-center rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60";
  const styleMap = {
    primary:
      "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-xl hover:shadow-emerald-500/30",
    secondary:
      "border border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md",
    ghost: "bg-transparent text-slate-700 hover:bg-white/50",
  } as const;
  const spinnerStyle = variant === "primary" ? "border-white/40 border-t-white" : "border-slate-300 border-t-slate-700";

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={`${base} ${styleMap[variant]} ${className}`}>
      {loading ? <span className={`h-4 w-4 animate-spin rounded-full border-2 ${spinnerStyle}`} /> : children}
    </button>
  );
}
