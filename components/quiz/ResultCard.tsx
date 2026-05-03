import Link from "next/link";

interface Props {
  result: string;
  explanation: string;
  strengths: string[];
  nextSteps: string[];
  jobBoardUrl: string;
  onExit: () => void;
  onRestart: () => void;
}

const ResultCard = ({
  result,
  explanation,
  strengths,
  nextSteps,
  jobBoardUrl,
  onExit,
  onRestart,
}: Props) => {
  const formatted = result.charAt(0).toUpperCase() + result.slice(1);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 space-y-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Your recommended path</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-zinc-50">{formatted}</h2>
        </div>

        <div className="h-px bg-zinc-800" />

        <p className="text-zinc-400 leading-relaxed text-left">{explanation}</p>

        <div className="text-left space-y-4">
          <div>
            <h3 className="font-semibold text-zinc-200 mb-2">Strengths</h3>
            <ul className="space-y-1">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                  <span className="text-violet-400 mt-0.5">▸</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-200 mb-2">Next Steps</h3>
            <ul className="space-y-1">
              {nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                  <span className="text-violet-400 mt-0.5">▸</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href={jobBoardUrl}
            className="flex items-center justify-center w-full px-4 py-3 bg-violet-500 text-white rounded-full font-semibold hover:bg-violet-600 transition-colors active:scale-[0.98] shadow-lg shadow-violet-500/25"
          >
            View {formatted} Openings
          </Link>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={onExit}
            className="flex-1 px-4 py-2.5 border border-zinc-700 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors text-sm font-medium"
          >
            Exit
          </button>

          <button
            onClick={onRestart}
            className="flex-1 px-4 py-2.5 bg-zinc-800 text-zinc-200 rounded-full hover:bg-zinc-700 transition-colors text-sm font-medium border border-zinc-700"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
