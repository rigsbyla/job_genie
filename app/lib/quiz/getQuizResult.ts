import { CareerType, UserAnswer } from "@/app/lib/types/quiz";

export const getQuizResult = (answers: UserAnswer[]): CareerType => {
  const counts: Record<string, number> = {};

  answers.forEach((a) => {
    counts[a.career] = (counts[a.career] || 0) + 1;
  });

  let topCareer: CareerType = "frontend"; // fallback
  let max = 0;

  for (const career in counts) {
    if (counts[career] > max) {
      max = counts[career];
      topCareer = career as CareerType;
    }
  }

  return topCareer;
};