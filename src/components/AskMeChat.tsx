"use client";

import { useMemo, useState } from "react";
import { useChat } from "ai/react";
import { twMerge } from "tailwind-merge";

const suggestedPrompts = [
  "What are your core skills and specialties?",
  "Which projects best showcase your AI work?",
  "Summarize your experience in 3 bullets.",
  "What research or publications should I know about?",
];

type Citation = {
  chunk_id: string;
  url: string;
  title: string;
  section_heading: string;
  snippet: string;
};

type AssistantPayload = {
  answer: string;
  citations: Citation[];
};

const parseAssistantMessage = (content: string): AssistantPayload => {
  try {
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed.answer === "string") {
      return {
        answer: parsed.answer,
        citations: Array.isArray(parsed.citations) ? parsed.citations : [],
      };
    }
  } catch (error) {
    return { answer: content, citations: [] };
  }
  return { answer: content, citations: [] };
};

export const AskMeChat = () => {
  const [open, setOpen] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    append,
    isLoading,
  } = useChat({
    api: "/api/chat",
    streamProtocol: "data",
    body: {
      recruiterMode,
    },
  });

  const chatMessages = useMemo(
    () =>
      messages.map((message) => ({
        ...message,
        parsed:
          message.role === "assistant"
            ? parseAssistantMessage(message.content)
            : null,
      })),
    [messages]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-black px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-neutral-800"
      >
        Ask about me
      </button>

      {open ? (
        <div className="fixed bottom-20 right-5 z-50 flex w-[90vw] max-w-md flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-neutral-900">Ask about me</p>
              <p className="text-xs text-neutral-500">
                Answers grounded in site content
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold text-neutral-500 hover:text-neutral-800"
            >
              Close
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 border-b border-neutral-100 px-4 py-2 text-xs text-neutral-600">
            <span>Recruiter mode</span>
            <button
              type="button"
              onClick={() => setRecruiterMode((prev) => !prev)}
              className={twMerge(
                "rounded-full px-3 py-1 text-xs font-semibold",
                recruiterMode
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-600"
              )}
            >
              {recruiterMode ? "On" : "Off"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-neutral-100 px-4 py-3">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  setInput(prompt);
                  append({ role: "user", content: prompt });
                }}
                className="rounded-full border border-neutral-200 px-3 py-1 text-[11px] text-neutral-600 hover:border-neutral-400"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-3 text-sm text-neutral-700">
            {chatMessages.length === 0 ? (
              <p className="text-xs text-neutral-500">
                Ask a question to learn more about my experience and projects.
              </p>
            ) : (
              chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={twMerge(
                    "rounded-xl px-3 py-2",
                    message.role === "user"
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-800"
                  )}
                >
                  {message.role === "assistant" && message.parsed ? (
                    <div className="space-y-2">
                      <p className="whitespace-pre-wrap">{message.parsed.answer}</p>
                      {message.parsed.citations.length > 0 ? (
                        <details className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs">
                          <summary className="cursor-pointer font-semibold text-neutral-700">
                            Sources
                          </summary>
                          <div className="mt-2 space-y-2">
                            {message.parsed.citations.map((citation) => (
                              <div key={citation.chunk_id} className="space-y-1">
                                <a
                                  href={citation.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-semibold text-neutral-900 underline"
                                >
                                  {citation.title}
                                </a>
                                <p className="text-[11px] text-neutral-500">
                                  {citation.section_heading}
                                </p>
                                <p className="text-[11px] text-neutral-600">
                                  {citation.snippet}
                                </p>
                              </div>
                            ))}
                          </div>
                        </details>
                      ) : null}
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              ))
            )}
            {isLoading ? (
              <p className="text-xs text-neutral-500">Thinking...</p>
            ) : null}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-neutral-100 px-4 py-3"
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a question..."
              className="flex-1 rounded-full border border-neutral-200 px-3 py-2 text-xs text-neutral-800 focus:border-neutral-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || input.trim().length === 0}
              className="rounded-full bg-neutral-900 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              Send
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};
