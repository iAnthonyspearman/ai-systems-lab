"use client";

import { useState } from "react";

const quickPrompts = [
  "Our business misses customer messages from Instagram, email, and website forms. How would AI fix this?",
  "Our sales team follows up too slowly with leads. How would you design an AI workflow?",
  "How can an AI assistant connect to a CRM and support customer follow-up?",
  "A small business wants automation but still needs human review. What system would you build?",
];

const systemLayers = [
  {
    step: "01",
    label: "Capture",
    title: "Business Signal",
    text: "Collect customer messages, sales notes, forms, emails, CRM details, and operational requests.",
  },
  {
    step: "02",
    label: "Reason",
    title: "AI Diagnosis",
    text: "Identify intent, urgency, pain points, risks, missing data, and the most useful next step.",
  },
  {
    step: "03",
    label: "Execute",
    title: "Workflow Action",
    text: "Generate CRM notes, follow-up messages, routing decisions, task lists, and human handoffs.",
  },
  {
    step: "04",
    label: "Measure",
    title: "Business Outcome",
    text: "Track response time, pipeline movement, customer experience, workload reduction, and conversion quality.",
  },
];

const useCases = [
  {
    title: "Lead Follow-Up Automation",
    problem: "Leads show interest, but the business responds too slowly or inconsistently.",
    solution: "AI classifies lead intent, drafts a response, updates CRM notes, and recommends the next action.",
    outcome: "Faster response coverage and fewer lost opportunities.",
  },
  {
    title: "Customer Service Triage",
    problem: "Messages come from many channels and teams struggle to know what matters first.",
    solution: "AI detects urgency, topic, sentiment, and routing path before handing the case to the right person.",
    outcome: "Cleaner support flow and stronger customer experience.",
  },
  {
    title: "Internal Operations Assistant",
    problem: "Teams repeat manual summaries, status updates, and routine decision-support tasks.",
    solution: "AI summarizes, organizes, drafts, and turns requests into structured recommendations.",
    outcome: "Less manual work and more time for higher-value decisions.",
  },
];

const framework = [
  "Define the business problem",
  "Map the current workflow",
  "Find the friction point",
  "Design the AI assistant role",
  "Connect API and data flow",
  "Add guardrails and review",
  "Measure business impact",
];

const proofPoints = [
  ["API Integration", "Server-side OpenAI route with protected environment variable handling."],
  ["Workflow Thinking", "Each use case connects input, AI reasoning, action, handoff, and measurable result."],
  ["Business Value", "Focused on speed, CRM quality, follow-up consistency, and operational clarity."],
  ["Portfolio Ready", "Designed to show AI Solutions Engineering thinking to recruiters and hiring managers."],
];

function cleanAiText(value: string) {
  return value
    .replace(/^#{1,6}\\s+/gm, "")
    .replace(/\\*\\*/g, "")
    .replace(/^-\\s+/gm, "• ")
    .trim();
}

export default function Home() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState(
    "Give me a business workflow problem and I will break it down into the business problem, workflow diagnosis, AI system design, automation path, guardrails, and next steps."
  );
  const [loading, setLoading] = useState(false);
  const [lastPrompt, setLastPrompt] = useState("Waiting for workflow input");

  async function askAssistant(promptOverride?: string) {
    const message = (promptOverride || input).trim();

    if (!message) {
      setAnswer("Enter a business workflow problem first, then I will analyze it like an AI Solutions Engineer.");
      return;
    }

    setLoading(true);
    setLastPrompt(message);
    setAnswer("Analyzing business problem, workflow design, automation path, risks, and next steps...");
    setInput("");

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.output || "The AI assistant could not complete the request.");
      }

      setAnswer(data.output || "The AI assistant returned an empty response.");
    } catch (error) {
      setAnswer(
        error instanceof Error
          ? error.message
          : "Something went wrong while connecting to the AI assistant."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#030711] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-12rem] top-[-14rem] h-[38rem] w-[38rem] rounded-full bg-cyan-400/20 blur-[140px]" />
        <div className="absolute right-[-14rem] top-[16rem] h-[38rem] w-[38rem] rounded-full bg-blue-500/20 blur-[150px]" />
        <div className="absolute bottom-[-20rem] left-[20%] h-[40rem] w-[40rem] rounded-full bg-violet-500/12 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:82px_82px] opacity-[0.15]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030711_72%)]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030711]/82 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-sm font-black text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.2)]">
              AI
            </span>
            <div>
              <p className="text-sm font-black tracking-wide">AI Systems Lab</p>
              <p className="text-xs text-white/45">Anthony Spearman • AI Solutions</p>
            </div>
          </a>

          <div className="hidden items-center gap-7 text-sm text-white/60 md:flex">
            <a href="#system" className="transition hover:text-cyan-200">System</a>
            <a href="#use-cases" className="transition hover:text-cyan-200">Use Cases</a>
            <a href="#framework" className="transition hover:text-cyan-200">Framework</a>
            <a href="#demo" className="transition hover:text-cyan-200">Live Demo</a>
          </div>

          <a
            href="#demo"
            className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-2 text-sm font-bold text-cyan-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/15"
          >
            Test Assistant
          </a>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-14 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div>
          <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-[0.7rem] font-black uppercase tracking-[0.28em] text-cyan-200">
            Live AI Workflow Demo
          </p>

          <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.055em] md:text-6xl xl:text-7xl">
            AI systems that turn business problems into executable workflows.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/64">
            A portfolio project showing how I analyze business gaps, map workflows, connect AI through an API,
            protect environment variables, and turn AI output into practical business execution.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#demo"
              className="rounded-full bg-white px-7 py-3 font-black text-black transition hover:bg-cyan-100"
            >
              Run the Demo
            </a>
            <a
              href="#system"
              className="rounded-full border border-white/15 px-7 py-3 font-black text-white/75 transition hover:border-cyan-300/40 hover:text-cyan-100"
            >
              View System
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {proofPoints.map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-cyan-200/65">{label}</p>
                <p className="mt-3 text-sm leading-6 text-white/60">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-8 hidden h-[86%] w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/0 via-cyan-300/35 to-cyan-300/0 lg:block" />
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
            <div className="rounded-[2rem] border border-cyan-300/15 bg-black/35 p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-200/70">
                    Executive Console
                  </p>
                  <h2 className="mt-2 text-2xl font-black leading-tight">AI Workflow Command Center</h2>
                </div>
                <span className="rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-[0.68rem] font-black text-green-300">
                  API Connected
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {systemLayers.map((card) => (
                  <div key={card.step} className="relative rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                    <div className="flex items-start gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-sm font-black text-cyan-200">
                        {card.step}
                      </span>
                      <div>
                        <p className="text-[0.68rem] font-black uppercase tracking-[0.23em] text-cyan-200/55">{card.label}</p>
                        <h3 className="mt-1 text-lg font-black leading-tight">{card.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-white/58">{card.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="system" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-cyan-300">
              System Thinking
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black leading-[1.08] tracking-[-0.045em] md:text-5xl">
              The goal is not just to use AI. The goal is to build a system that moves work.
            </h2>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7">
            <p className="text-lg leading-8 text-white/65">
              A strong AI solution starts with a business process. The assistant should understand the input,
              support a decision, generate a useful output, and connect that output to the next step in the workflow.
              That is how AI moves from a chatbot into business execution.
            </p>

            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {[
                "Customer Input → AI Understanding",
                "AI Reasoning → Workflow Recommendation",
                "Recommendation → CRM / Task / Handoff",
                "Human Review → Business Outcome",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-cyan-400/10 via-white/[0.035] to-violet-500/10 p-6 md:p-8">
          <div className="grid gap-4 lg:grid-cols-4">
            {systemLayers.map((layer, index) => (
              <div key={layer.title} className="relative rounded-3xl border border-white/10 bg-black/25 p-5">
                {index < systemLayers.length - 1 && (
                  <div className="absolute right-[-1.25rem] top-1/2 hidden h-px w-10 bg-cyan-300/35 lg:block" />
                )}
                <p className="text-3xl font-black text-cyan-200">{layer.step}</p>
                <h3 className="mt-5 text-xl font-black leading-tight">{layer.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{layer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-cyan-300">Real Business Use Cases</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[1.08] tracking-[-0.045em] md:text-5xl">
              Practical AI workflows for revenue, service, and operations.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/55">
            Each card connects a business gap to a system design and a measurable outcome.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-white/[0.07]"
            >
              <h3 className="text-2xl font-black leading-tight">{item.title}</h3>
              <p className="mt-5 text-sm leading-6 text-white/58">
                <span className="font-bold text-cyan-200">Problem:</span> {item.problem}
              </p>
              <p className="mt-4 text-sm leading-6 text-white/58">
                <span className="font-bold text-cyan-200">AI System:</span> {item.solution}
              </p>
              <div className="mt-5 rounded-2xl border border-green-400/20 bg-green-400/10 p-4">
                <p className="text-sm leading-6 text-green-200">
                  <span className="font-bold">Outcome:</span> {item.outcome}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="framework" className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.035] to-violet-500/10 p-7 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-cyan-300">
            AI Solutions Framework
          </p>
          <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[1.08] tracking-[-0.045em] md:text-5xl">
            My process for turning an idea into a working AI system.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {framework.map((item, index) => (
              <div key={item} className="relative rounded-3xl border border-white/10 bg-black/25 p-5">
                {index < framework.length - 1 && (
                  <div className="absolute right-[-1.25rem] top-1/2 hidden h-px w-10 bg-cyan-300/30 lg:block" />
                )}
                <p className="text-3xl font-black text-cyan-200">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-5 text-sm font-bold leading-6 text-white/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-6 pb-10 pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-cyan-300">Live Demo</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black leading-[1.08] tracking-[-0.045em] md:text-5xl">
              Test how I design AI workflow solutions.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/64">
              Choose a prompt or type your own business problem. The assistant returns one clean executive recommendation.
            </p>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-5">
              <p className="text-sm font-black text-cyan-200">Recruiter-friendly prompts</p>
              <div className="mt-4 grid gap-3">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => askAssistant(prompt)}
                    disabled={loading}
                    className="rounded-2xl border border-white/10 bg-black/25 p-4 text-left text-sm leading-6 text-white/68 transition hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-cyan-300/15 bg-white/[0.045] p-5 shadow-2xl shadow-cyan-950/35">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-200/65">AI Systems Assistant</p>
                <h3 className="mt-2 text-2xl font-black leading-tight">Executive Workflow Recommendation</h3>
              </div>
              <span className="rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-xs font-black text-green-300">
                API Connected
              </span>
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-black/35 p-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-white/35">Current Prompt</p>
              <p className="mt-3 text-sm leading-6 text-white/58">{lastPrompt}</p>
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-black/35 p-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-white/35">Recommendation</p>
              <div className="mt-4 max-h-[430px] overflow-y-auto pr-2">
                <p className="whitespace-pre-line text-sm leading-7 text-white/75">
                  {cleanAiText(answer)}
                </p>
              </div>
            </div>

            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Example: Our team misses Instagram messages and needs a better follow-up process."
              className="mt-5 min-h-32 w-full resize-none rounded-[1.5rem] border border-white/10 bg-black/30 p-4 text-sm leading-6 text-white outline-none placeholder:text-white/35 focus:border-cyan-300/50"
            />

            <button
              type="button"
              onClick={() => askAssistant()}
              disabled={loading}
              className="mt-4 w-full rounded-full bg-white px-6 py-4 font-black text-black transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Thinking Through Workflow..." : "Ask AI Systems Assistant"}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-8 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-cyan-300">Portfolio Positioning</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[1.08] tracking-[-0.045em] md:text-5xl">
            Built to show AI Solutions Engineering thinking.
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-white/64">
            This project shows how I approach business problems, design AI-powered workflows,
            connect an API route, protect environment variables, and present the result in a professional portfolio-ready system.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Next.js", "OpenAI API", "Vercel", "CRM Logic", "Workflow Automation", "AI Systems Design", "Human Review", "Business Process Improvement"].map((tool) => (
              <span key={tool} className="rounded-full border border-white/10 bg-black/25 px-5 py-3 text-sm text-white/65">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-8">
        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 AI Systems Lab. Built by Anthony Spearman.</p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:iAnthonySpearman@gmail.com" className="hover:text-cyan-300">Email</a>
            <a href="https://www.linkedin.com/in/anthony-spearman-5466a61b6/" target="_blank" rel="noreferrer" className="hover:text-cyan-300">LinkedIn</a>
            <a href="https://github.com/iAnthonyspearman/ai-systems-lab" target="_blank" rel="noreferrer" className="hover:text-cyan-300">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
