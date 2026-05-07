import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          output:
            "OpenAI API key is missing. Add OPENAI_API_KEY to .env.local and Vercel Environment Variables, then restart the dev server.",
        },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are the AI Systems Assistant for Anthony Spearman's AI Systems Lab portfolio. Answer like an AI Solutions Engineer. Use clear sections: Business Problem, Workflow Diagnosis, AI System Design, Automation Path, Risks and Guardrails, Recommended Next Steps. Keep the answer practical, recruiter-friendly, and focused on business execution. Avoid heavy markdown formatting.",
          },
          {
            role: "user",
            content:
              message ||
              "Explain how AI systems can help a business reduce missed leads and improve follow-up.",
          },
        ],
        temperature: 0.65,
        max_tokens: 850,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          output:
            data?.error?.message ||
            "OpenAI returned an error, but no message was provided.",
        },
        { status: response.status }
      );
    }

    const output =
      data?.choices?.[0]?.message?.content ||
      "The assistant received the request but did not generate a response.";

    return NextResponse.json({ output });
  } catch (error) {
    return NextResponse.json(
      {
        output:
          error instanceof Error
            ? `Server error: ${error.message}`
            : "Server error. Check the API route and restart the dev server.",
      },
      { status: 500 }
    );
  }
}
