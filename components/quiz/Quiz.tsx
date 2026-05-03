"use client";

import { useState } from "react";
import { quizQuestions } from "@/app/lib/data/quiz";
import { getQuizResult } from "@/app/lib/quiz/getQuizResult";
import { CareerType, UserAnswer } from "@/app/lib/types/quiz";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import AnswerList from "./AnswerList";
import ResultCard from "./ResultCard";

interface Props {
  onCancel: () => void;
}

const Quiz = ({ onCancel }: Props) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [result, setResult] = useState<CareerType | null>(null);
  const [loading, setLoading] = useState(false);

  const [explanation, setExplanation] = useState("");
  const [strengths, setStrengths] = useState<string[]>([]);
  const [nextSteps, setNextSteps] = useState<string[]>([]);

  const currentQuestion = quizQuestions[index];
  const totalQuestions = quizQuestions.length;
  const isLast = index === totalQuestions - 1;

  const handleNext = (option: { text: string; career: CareerType }) => {
    if (loading) return;

    const updated = [...answers];
    updated[index] = {
      question: currentQuestion.text,
      answer: option.text,
      career: option.career,
      intent: currentQuestion.intent,
    };
    setAnswers(updated);

    if (isLast) {
      handleEnd(updated);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const handleEnd = async (finalAnswers: UserAnswer[]) => {
    setLoading(true);

    const start = Date.now();
    const quizResult = getQuizResult(finalAnswers);

    try {
      const geminiResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: finalAnswers,
          result: quizResult,
        }),
      });

      const { responseData } = await geminiResponse.json();

      setResult(quizResult);
      setExplanation(
        responseData.explanation || "No explanation available. Try again.",
      );
      setStrengths(responseData.strengths || []);
      setNextSteps(responseData.nextSteps || []);
    } catch (err) {
      console.error(err);
      setResult(quizResult);
      setExplanation("Oops! AI failed, but here's your result.");
    }

    const elapsed = Date.now() - start;
    const remaining = 2000 - elapsed;
    if (remaining > 0) {
      await new Promise((res) => setTimeout(res, remaining));
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-xl mx-auto space-y-4">
        <div className="w-12 h-12 border-4 border-zinc-700 border-t-violet-500 rounded-full animate-spin" />
        <p className="text-zinc-400 font-medium animate-pulse">
          Finding your best career path...
        </p>
      </div>
    );
  }

  if (result) {
    const jobBoardUrl = `/job_board?discipline=${result.toLowerCase()}`;

    return (
      <ResultCard
        result={result}
        explanation={explanation}
        strengths={strengths}
        nextSteps={nextSteps}
        onExit={onCancel}
        jobBoardUrl={jobBoardUrl}
        onRestart={() => {
          setIndex(0);
          setAnswers([]);
          setResult(null);
          setExplanation("");
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-xl space-y-6">
      <ProgressBar current={index} total={totalQuestions} />

      <QuestionCard text={currentQuestion.text} />

      <AnswerList options={currentQuestion.options} onSelect={handleNext} />

      <div className="flex justify-between pt-4">
        <button
          onClick={onCancel}
          className="text-sm font-medium text-zinc-500 hover:text-zinc-300 px-4 py-2 rounded-lg hover:bg-zinc-800 transition-all active:scale-95"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Quiz;
