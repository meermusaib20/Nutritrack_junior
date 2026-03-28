function getColor(score: number) {
  if (score >= 8) return "from-emerald-500 to-teal-500";
  if (score >= 5) return "from-amber-400 to-orange-500";
  return "from-rose-500 to-red-500";
}

export function ScoreBar({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, score * 10));

  return (
    <div className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-lg shadow-slate-900/5">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-700">Nutrition Score</p>
          <p className="text-xs text-slate-500">Protein, iron, calcium and diversity</p>
        </div>
        <p className="text-4xl font-extrabold text-slate-900">{score}/10</p>
      </div>
      <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full bg-gradient-to-r ${getColor(score)} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
