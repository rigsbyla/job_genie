interface Props {
  text: string;
}

const QuestionCard = ({ text }: Props) => {
  return <h2 className="text-2xl font-bold text-zinc-50 text-center leading-snug">{text}</h2>;
};

export default QuestionCard;
