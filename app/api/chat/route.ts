import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { answers, result } = await req.json();

    if (!answers || !Array.isArray(answers) || !result) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    A Computer Science student or recent graduate completed a career quiz.

    Here are their responses:

    ${answers
    .map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a: any, i: number) =>
        `${i + 1}. Question: ${a.question}
    Answer: ${a.answer}`
    )
    .join("\n\n")}

    Suggested career: ${result}

    Write a short, personalized explanation (3-5 sentences):
    - Reference 1-2 of their specific answers
    - Explain why those answers point to this career
    - Keep it encouraging and natural
    `;

    const response = await model.generateContent(prompt);
    const text = response.response.text().trim();

    return NextResponse.json({ 
        result,
        explanation: text,
     });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch AI" }, { status: 500 });
  }
}