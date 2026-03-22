import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/constants/system-prompt";

interface ChatMessageInput {
  role: string;
  content: string;
  thinking?: string;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { messages } = body;
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json(
      { error: "Messages array is required" },
      { status: 400 }
    );
  }

  const formattedMessages = messages.slice(-20).map(
    (m: ChatMessageInput) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })
  );

  const anthropic = new Anthropic({ apiKey });

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 32000,
      thinking: {
        type: "enabled",
        budget_tokens: 10000,
      },
      system: SYSTEM_PROMPT,
      messages: formattedMessages,
    });

    let thinking = "";
    let text = "";

    for (const block of response.content) {
      if (block.type === "thinking") {
        thinking += block.thinking;
      } else if (block.type === "text") {
        text += block.text;
      }
    }

    return NextResponse.json({ thinking, text });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to get response";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
