"use client";

import React from "react";
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
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-500 p-2 rounded-xl">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Job Genie</span>
        </div>
        <div className="flex gap-6 items-center text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="LAUREN" className="hover:text-white transition-colors">
            Job Board
          </a>
          <Link
            href="/quiz"
            className="bg-slate-50 text-slate-950 px-4 py-2 rounded-full font-semibold hover:bg-slate-200 transition-all"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-8 pt-20 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Career Matching</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Your first CS role, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            without the noise.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Stop endlessly scrolling. Find internships and new grad roles in
          vibrant, walkable cities that actually match your skills and vibe.
          Take the quiz, let AI do the heavy lifting, and get hired.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/quiz"
            className="flex items-center justify-center gap-2 bg-indigo-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/25"
          >
            Take the AI Quiz
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="LAUREN"
            className="flex items-center justify-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-700 transition-all border border-slate-700"
          >
            <Search className="w-5 h-5" />
            Browse Job Board
          </Link>
        </div>
      </main>

      {/* Features Bento Box */}
      <section
        id="features"
        className="px-8 py-24 bg-slate-900 border-t border-slate-800"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Everything you need to land it.
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature 1: AI Quiz */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
              <div className="bg-indigo-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/20">
                <Sparkles className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Career Insights</h3>
              <p className="text-slate-400 leading-relaxed">
                Not sure if you lean Frontend, Backend, or Data? Take our
                3-minute quiz. Our AI analyzes your coursework, interests, and
                side projects to recommend the perfect tech disciplines.
              </p>
            </div>

            {/* Feature 2: Smart Job Board */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
              <div className="bg-cyan-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/20">
                <Briefcase className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Curated Aggregator</h3>
              <p className="text-slate-400 leading-relaxed">
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
            <p className="text-slate-400">
              Hand-picked for new grads and undergrads.
            </p>
          </div>
          <a
            href="LAUREN"
            className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
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
              className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
            >
              <div className="mb-4 sm:mb-0">
                <h4 className="text-lg font-bold text-slate-100">{job.role}</h4>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-400">
                  <span className="font-medium text-slate-300">
                    {job.company}
                  </span>
                  <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {job.location}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                  {job.type}
                </span>
                <span className="text-sm text-slate-500">{job.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
