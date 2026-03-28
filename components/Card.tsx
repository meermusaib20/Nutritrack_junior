import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-2xl border border-white/70 bg-white/90 shadow-lg shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 ${className}`}
    >
      {children}
    </section>
  );
}
