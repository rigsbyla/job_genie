interface Props {
  result: string;
  explanation: string;
  strengths: string[];
  nextSteps: string[];
  onExit: () => void;
  onRestart: () => void;
}

const ResultCard = ({
  result,
  explanation,
  strengths,
  nextSteps,
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

        <h3 className="mt-4 font-semibold">Strengths</h3>
        <ul className="list-disc ml-5">
          {strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <h3 className="mt-4 font-semibold">Next Steps</h3>
        <ul className="list-disc ml-5">
          {nextSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>

        <div className="flex justify-center gap-3 pt-4">
          <button
            onClick={onExit}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Exit
          </button>

          <button
            onClick={onRestart}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Retake
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
