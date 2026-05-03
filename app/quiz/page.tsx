"use client";

import Quiz from "@/components/quiz/Quiz";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-950 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-24 px-8">
        <Quiz onCancel={() => router.push("/")} />
      </main>
    </div>
  );
}
