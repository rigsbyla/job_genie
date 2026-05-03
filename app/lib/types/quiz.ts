export type CareerType =
  | "frontend"
  | "backend"
  | "algorithms"
  | "data"
  | "devops";

export interface AnswerOption {
  id: string;
  text: string;
  career: CareerType;
}

export interface Question {
  id: string;
  text: string;
  intent: string;
  options: AnswerOption[];
}

export type UserAnswer = {
  question: string;
  answer: string;
  career: CareerType;
  intent: string;
};