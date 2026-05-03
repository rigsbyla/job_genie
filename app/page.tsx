// import Image from "next/image";
// import { useState } from "react";
// import ReactMarkdown from "react-markdown";

// components
import { ProgressWithLabel } from "../components/ui/labeledprogress";
import { Button } from "@/components/ui/button";

export default function Home() {
  //   /* Gemini AI state */
  //   const [input, setInput] = useState("");
  //   const [response, setResponse] = useState("");
  //   const [loading, setLoading] = useState(false);

  //   /* Gemini AI handlers */
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     const res = await fetch("/api/chat", {
  //       method: "POST",
  //       body: JSON.stringify({ prompt: input }),
  //     });
  //     const data = await res.json();
  //     setResponse(data.text);
  //     setLoading(false);
  //   };

  //   /* Quiz state */
  //   const [currentStep, setCurrentStep] = useState(1);
  //   const [answers, setAnswers] = useState({});

  //   /* Quiz handlers */
  //   const handleSelect = (questionId, answerValue) => {
  //     setAnswers({ ...answers, [questionId]: answerValue });
  //     if (currentStep < 5) setCurrentStep(currentStep + 1);
  //   };

  return (
    // <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
    //   <h1 className="text-2xl font-bold text-slate-800 mb-4">
    //     Gemini AI Assistant
    //   </h1>

    //   <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
    //     <input
    //       className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    //       value={input}
    //       onChange={(e) => setInput(e.target.value)}
    //       placeholder="Ask anything..."
    //     />
    //     <button
    //       disabled={loading}
    //       className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
    //     >
    //       {loading ? "Thinking..." : "Send"}
    //     </button>
    //   </form>

    //   <div className="prose prose-slate max-w-none border-t pt-4">
    //     {response ? (
    //       <ReactMarkdown>{response}</ReactMarkdown>
    //     ) : (
    //       <p className="text-slate-400 italic">
    //         AI response will appear here...
    //       </p>
    //     )}
    //   </div>
    //   </div>
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <>
          {/* Quiz */}
          <ProgressWithLabel />
          <Button variant="outline">Button</Button>
          {/* <Quiz onSelect={handleSelect} /> */}
        </>
      </main>
    </div>
  );
}
