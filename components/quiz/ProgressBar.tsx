import { Field, FieldLabel } from "./Field";

interface Props {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: Props) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <Field className="w-full">
      <FieldLabel htmlFor="progress-upload">
        <span className="text-zinc-400 text-sm">Quiz progress</span>
        <span className="ml-auto text-zinc-500 text-sm">{percentage}%</span>
      </FieldLabel>

      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Field>
  );
};

export default ProgressBar;
