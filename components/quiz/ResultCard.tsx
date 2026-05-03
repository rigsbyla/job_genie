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
      <div className="rounded-2xl border shadow-sm p-8 space-y-6 text-center bg-white">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Your recommended path</p>
          <h2 className="text-3xl font-bold">{formatted}</h2>
        </div>

        <div className="h-px bg-gray-200" />

        <p className="text-gray-700 leading-relaxed text-left">{explanation}</p>

        <div className="text-left">
          <h3 className="mt-4 font-semibold text-gray-900">Strengths</h3>
          <ul className="list-disc ml-5 text-gray-600">
            {strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h3 className="mt-4 font-semibold text-gray-900">Next Steps</h3>
          <ul className="list-disc ml-5 text-gray-600">
            {nextSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="pt-4">
          <Link
            href={jobBoardUrl}
            className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors active:scale-[0.98]"
          >
            View {formatted} Openings
          </Link>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={onExit}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
          >
            Exit
          </button>

          <button
            onClick={onRestart}
            className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
