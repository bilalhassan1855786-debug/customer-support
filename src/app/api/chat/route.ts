import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const SYSTEM_PROMPT = `You are a helpful, friendly customer support assistant. 
Answer clearly and concisely. Be polite and empathetic.
Keep responses short and easy to read.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log("Groq response:", data);

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Groq API error" },
        { status: 500 }
      );
    }

    const reply = data.choices[0]?.message?.content || "Sorry, try again.";
    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Server error: " + String(error) },
      { status: 500 }
    );
  }
}