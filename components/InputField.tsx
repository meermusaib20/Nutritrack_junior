import { ReactNode } from "react";

interface InputFieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
}

export function InputField({ label, htmlFor, children }: InputFieldProps) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1 block text-sm font-medium text-slate-500">{label}</span>
      {children}
    </label>
  );
}
