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
          className="w-full p-3 border rounded-xl hover:bg-gray-100 transition"
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default AnswerList;
