interface Props {
  text: string;
}

const QuestionCard = ({ text }: Props) => {
  return <h2 className="text-xl font-semibold text-center">{text}</h2>;
};

export default QuestionCard;
