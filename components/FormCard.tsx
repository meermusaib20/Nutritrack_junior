import { ReactNode } from "react";
import { Card } from "@/components/Card";

export function FormCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <Card className="w-full max-w-[450px] p-6 shadow-xl transition-all duration-200 hover:-translate-y-0.5 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </Card>
  );
}
