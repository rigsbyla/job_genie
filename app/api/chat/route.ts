import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini client with API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Simple in-memory cache to avoid repeated API calls for same inputs
// Key = stringified answers + result
// Value = AI-generated response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<string, any>();

// Handle POST requests to /api/chat
export async function POST(req: Request) {
  try {
    // Parse incoming request body
    const { answers, result } = await req.json();

    // Basic validation
    if (!answers || !Array.isArray(answers) || !result) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    
    // Create a uniqe cache key based on inputs
    const cacheKey = JSON.stringify({ answers, result });

    // Return cached response if it exists (prevents $$$ API calls)
    if (cache.has(cacheKey)) {
      return NextResponse.json(cache.get(cacheKey));
}

    // Initialize Gemini Generative AI
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
    A user (Computer Science student or recent grad) just completed a CS-scoped career quiz.

    Answers: ${JSON.stringify(answers)}
    Predicted result: ${result}

    Return ONLY valid JSON (no markdown, no backticks).

    Requirements:
    - explanation: 3–5 sentences, specific and personalized
    - strengths: at least 4 bullet points
    - nextSteps: at least 4 actionable steps

    Format:
    {
      "explanation": "...",
      "strengths": ["...", "...", "...", "..."],
      "nextSteps": ["...", "...", "...", "..."]
    }

    Also include:
    - a short "title" like "Creative UI Builder" or "Visual Experience Engineer"
    `;
  
  // Call Gemini API & extract response
  const response = await model.generateContent(prompt);
  const text = response.response.text().trim();

  // Clean possible markdown formatting (just in case model ignores instructions)
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  let genieWisdom;
  try {
    // Attempt to parse AI response as JSON
    genieWisdom = JSON.parse(cleaned);
  } catch {
    // Fallback response if parsing fails or AI response was garbage
    // Prevents frontend from breaking
    genieWisdom = {};
  }
  genieWisdom = {
    explanation:
      genieWisdom.explanation || "You show strong alignment with this path based on your answers.",

    strengths:
      Array.isArray(genieWisdom.strengths) && genieWisdom.strengths.length
        ? genieWisdom.strengths
        : [
            "Interest in relevant technologies",
            "Alignment with core responsibilities",
            "Motivation to learn and build",
            "Strong problem-solving tendencies",
          ],

    nextSteps:
      Array.isArray(genieWisdom.nextSteps) && genieWisdom.nextSteps.length
        ? genieWisdom.nextSteps
        : [
            "Build a small project in this area",
            "Explore core tools and frameworks",
            "Follow tutorials or courses",
            "Start a portfolio to showcase your work",
          ],
  };

  // Shape response for frontend
  const responseData = {
    result,
    explanation: genieWisdom.explanation,
    strengths: genieWisdom.strengths,
    nextSteps: genieWisdom.nextSteps,
  }
  // Store result in cache for future identical requests
  cache.set(cacheKey, responseData);

  return NextResponse.json({ responseData });
  } catch (error) {
    // Catch unexpected errors (API failure, parsing, etc.)
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch AI" }, { status: 500 });
  }
}