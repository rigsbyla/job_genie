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
  // ---- Quiz State ----
  const [index, setIndex] = useState(0); // current question index
  const [answers, setAnswers] = useState<UserAnswer[]>([]); // user responses
  const [result, setResult] = useState<CareerType | null>(null); // final quiz result
  const [loading, setLoading] = useState(false); // spinner state

  // ---- Gemini AI Result State ----
  const [explanation, setExplanation] = useState("");
  const [strengths, setStrengths] = useState<string[]>([]);
  const [nextSteps, setNextSteps] = useState<string[]>([]);

  // ---- Derived Values ----
  const currentQuestion = quizQuestions[index];
  const totalQuestions = quizQuestions.length;
  const isLast = index === totalQuestions - 1;

  // ---- Handlers ----

  /* Handles selecting an answer */
  const handleNext = (option: { text: string; career: CareerType }) => {
    if (loading) return;

    // store answer at current index
    const updated = [...answers];
    updated[index] = {
      question: currentQuestion.text,
      answer: option.text,
      career: option.career,
      intent: currentQuestion.intent,
    };
    setAnswers(updated);

    // if last question -> compute result
    if (isLast) {
      handleEnd(updated);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  /* Handles API + generating AI explanation */
  const handleEnd = async (finalAnswers: UserAnswer[]) => {
    // change to loading state
    setLoading(true);

    // track time for spinner
    const start = Date.now();

    const quizResult = getQuizResult(finalAnswers);

    try {
      // send answers to backend for AI analysis
      const geminiResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: finalAnswers,
          result: quizResult,
        }),
      });

      const { responseData } = await geminiResponse.json();

      // update UI with result
      setResult(quizResult);
      setExplanation(
        responseData.explanation || "No explanation available. Try again.",
      );
      setStrengths(responseData.strengths || []);
      setNextSteps(responseData.nextSteps || []);
    } catch (err) {
      console.error(err);

      // fallback if AI fails
      setResult(quizResult);
      setExplanation("Oops! AI failed, but here's your result.");
    }

    // spinner loading time (minimum 2 seconds, for vibes)
    const elapsed = Date.now() - start;
    const remaining = 2000 - elapsed;

    if (remaining > 0) {
      await new Promise((res) => setTimeout(res, remaining));
    }

    setLoading(false);
  };

  // ---- Render States ----

  /* Spinner and loading text */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-gray-600 text-sm">
          Finding your best career path...
        </p>
      </div>
    );
  }

  /* Final result screen */
  if (result) {
    // Construct a dynamic link to connect to the job board
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

  /* Quiz UI */
  return (
    <div className="w-full max-w-xl space-y-6">
      <ProgressBar current={index} total={totalQuestions} />

      <QuestionCard text={currentQuestion.text} />

      <AnswerList options={currentQuestion.options} onSelect={handleNext} />

      <div className="flex justify-between pt-4">
        <button
          onClick={onCancel}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Quiz;
