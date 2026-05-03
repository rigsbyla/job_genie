import { Question } from "../types/quiz";

export const quizQuestions: Question[] = [
  {
    id: "q1",
    text: "When working on a project, what part excites you the most?",
    intent: "Identifies which stage of the development process the user is naturally drawn to (UI/UX, backend systems, problem-solving, data analysis, or system reliability)",
    options: [
      { id: "q1a", text: "Designing user interactions and visuals", career: "frontend" },
      { id: "q1b", text: "Building efficient backend systems", career: "backend" },
      { id: "q1c", text: "Solving complex logic problems", career: "algorithms" },
      { id: "q1d", text: "Analyzing data and finding patterns", career: "data" },
      { id: "q1e", text: "Ensuring reliability and smooth operation", career: "devops" },
    ],
  },
  {
    id: "q2",
    text: "Which task sounds the most satisfying?",
    intent: "Measures intrinsic motivation by identifying what type of work the user finds most rewarding (creative output, scalability, technical challenges, data insights, or automation)",
    options: [
      { id: "q2a", text: "Polishing a UI into something beautiful", career: "frontend" },
      { id: "q2b", text: "Scaling a system to handle heavy traffic", career: "backend" },
      { id: "q2c", text: "Solving a tricky algorithm or bug", career: "algorithms" },
      { id: "q2d", text: "Extracting insights from messy data", career: "data" },
      { id: "q2e", text: "Automating deployments and workflows", career: "devops" },
    ],
  },
  {
    id: "q3",
    text: "What type of problems do you enjoy most?",
    intent: "Determines the user's preferred problem-solving style (creative, systems-oriented, abstract/logical, data-driven, or operational)",
    options: [
      { id: "q3a", text: "Creative and design-focused", career: "frontend" },
      { id: "q3b", text: "Scalability and infrastructure", career: "backend" },
      { id: "q3c", text: "Abstract and logical puzzles", career: "algorithms" },
      { id: "q3d", text: "Data-driven questions", career: "data" },
      { id: "q3e", text: "Efficiency and reliability", career: "devops" },
    ],
  },
  {
    id: "q4",
    text: "How do you prefer to work?",
    intent: "Identifies the user's preferred work style and environment (collaborative, architectural, independent deep work, experimental, or process-oriented)",
    options: [
      { id: "q4a", text: "Collaborating with designers and users", career: "frontend" },
      { id: "q4b", text: "Designing system architecture", career: "backend" },
      { id: "q4c", text: "Deep focus on technical challenges", career: "algorithms" },
      { id: "q4d", text: "Experimenting and iterating", career: "data" },
      { id: "q4e", text: "Improving pipelines and workflows", career: "devops" },
    ],
  },
  {
    id: "q5",
    text: "Which tool or activity appeals most?",
    intent: "Assesses alignment with common tools and workflows used in different CS roles (frontend frameworks, backend systems, algorithms, data tools, or cloud/devops infrastructure)",
    options: [
      { id: "q5a", text: "React, CSS, UI design tools", career: "frontend" },
      { id: "q5b", text: "APIs, databases, distributed systems", career: "backend" },
      { id: "q5c", text: "Algorithms and coding challenges", career: "algorithms" },
      { id: "q5d", text: "Python, SQL, data visualization", career: "data" },
      { id: "q5e", text: "Docker, CI/CD, cloud platforms", career: "devops" },
    ],
  },
];