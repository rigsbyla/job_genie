import { CareerType } from "@/app/lib/types/quiz";

interface Option {
  id: string;
  text: string;
  career: CareerType;
}

interface Props {
  options: Option[];
  onSelect: (option: Option) => void;
}

const AnswerList = ({ options, onSelect }: Props) => {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option)}
          className="w-full p-4 border border-zinc-700 bg-zinc-900 rounded-xl text-zinc-300 text-left hover:bg-zinc-800 hover:border-zinc-600 hover:text-zinc-100 transition-colors active:scale-[0.99]"
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default AnswerList;
