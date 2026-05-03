import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Genie",
  description: "Career Guidance for CS Students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b px-6 py-4 flex items-center justify-between">
          <span className="font-semibold text-lg">Job Genie</span>
          <nav className="flex gap-4 text-sm">
            <a href="/">Retake the Quiz</a>
            <a href="/job_board">All Jobs</a>
  
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
