import { Field, FieldLabel } from "./Field";

interface Props {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: Props) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="progress-upload">
        <span>Quiz progress</span>
        <span className="ml-auto">{percentage}%</span>
      </FieldLabel>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-zinc-800 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Field>
  );
};

export default ProgressBar;
