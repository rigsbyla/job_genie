"use client";

import Link from "next/link";
import {
  Sparkles,
  Search,
  Briefcase,
  MapPin,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-violet-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <img src="/magic-lamp.svg" className="w-9 h-9" alt="" />   
          <span className="text-xl font-bold tracking-tight">Job Genie</span>
        </div>
        <div className="flex gap-6 items-center text-sm font-medium text-zinc-300">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="/job_board" className="hover:text-white transition-colors">
            Job Board
          </a>
          <Link
            href="/quiz"
            className="bg-zinc-50 text-zinc-950 px-4 py-2 rounded-full font-semibold hover:bg-zinc-200 transition-all"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-8 pt-20 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Career Matching</span>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -top-16 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[300px] bg-violet-500/10 rounded-full blur-3xl" />
          </div>
          <h1 className="relative text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Your first CS role, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-300">
              without the noise.
            </span>
          </h1>
        </div>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          Stop endlessly scrolling. Find internships and new grad roles 
          that actually match your skills and vibe.
          Take the quiz, let AI do the heavy lifting, and get hired.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/quiz"
            className="flex items-center justify-center gap-2 bg-violet-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-violet-600 transition-all shadow-lg shadow-violet-500/25"
          >
            Take the AI Quiz
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/job_board"
            className="flex items-center justify-center gap-2 bg-zinc-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-700 transition-all border border-zinc-700"
          >
            <Search className="w-5 h-5" />
            Browse Job Board
          </Link>
        </div>
      </main>

      {/* Features Bento Box */}
      <section
        id="features"
        className="px-8 py-24 bg-zinc-900 border-t border-zinc-800"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Everything you need to land it.
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature 1: AI Quiz */}
            <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800  transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all" />
              <div className="bg-violet-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-violet-500/20">
                <Sparkles className="w-7 h-7 text-violet-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Career Insights</h3>
              <p className="text-zinc-400 leading-relaxed">
                Not sure if you lean Frontend, Backend, or Data? Take our
                3-minute quiz. Our AI analyzes your coursework, interests, and
                side projects to recommend the perfect tech disciplines.
              </p>
            </div>

            {/* Feature 2: Smart Job Board */}
            <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800  transition-colors group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all" />
              <div className="bg-violet-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-violet-500/20">
                <Briefcase className="w-7 h-7 text-violet-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Curated Aggregator</h3>
              <p className="text-zinc-400 leading-relaxed">
                Filter by what actually matters to students. Sort by posting
                age, specific CS disciplines, employment type (internship vs.
                full-time), and exact location requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Job Board Teaser */}
      <section id="jobs" className="px-8 py-24 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Fresh Opportunities</h2>
            <p className="text-zinc-400">
              Hand-picked for new grads and undergrads.
            </p>
          </div>
          <a
            href="/job_board"
            className="text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid gap-4">
          {[
            {
              role: "Frontend Engineering Intern",
              company: "Vercel",
              location: "San Francisco, CA (Hybrid)",
              type: "Internship",
              time: "2h ago",
            },
            {
              role: "Junior Full Stack Developer",
              company: "Spotify",
              location: "New York, NY (On-site)",
              type: "New Grad",
              time: "5h ago",
            },
            {
              role: "Software Engineer I",
              company: "Stripe",
              location: "Seattle, WA (Walkable District)",
              type: "Full-time",
              time: "1d ago",
            },
          ].map((job, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/50 hover:border-zinc-700 transition-colors cursor-pointer group"
            >
              <div className="mb-4 sm:mb-0">
                <h4 className="text-lg font-bold text-zinc-100">{job.role}</h4>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-zinc-400">
                  <span className="font-medium text-zinc-300">
                    {job.company}
                  </span>
                  <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {job.location}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
                  {job.type}
                </span>
                <span className="text-sm text-zinc-500">{job.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
