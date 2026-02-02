"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { AnimatePresence, motion } from "framer-motion"
import {
  IconMessageCircle,
  IconX,
  IconSend,
  IconChevronDown,
  IconExternalLink,
  IconBriefcase,
} from "@tabler/icons-react"
import { twMerge } from "tailwind-merge"

// Types
interface Citation {
  chunk_id: string
  url: string
  title: string
  section_heading: string
  snippet: string
}

// Suggested prompts
const SUGGESTED_PROMPTS = [
  "What are Tanish's main projects?",
  "Tell me about his AI experience",
  "What research has he done?",
  "What's his educational background?",
]

// Custom transport to capture headers
class ChatTransportWithCitations extends DefaultChatTransport {
  onCitationsReceived?: (citations: Citation[]) => void

  constructor(options: { api: string; onCitationsReceived?: (citations: Citation[]) => void }) {
    super({ api: options.api })
    this.onCitationsReceived = options.onCitationsReceived
  }
}

export function AskMeChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [recruiterMode, setRecruiterMode] = useState(false)
  const [citations, setCitations] = useState<Map<string, Citation[]>>(new Map())
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ id, messages }) => ({
        body: {
          messages,
          recruiterMode,
        },
      }),
    }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Parse citations from assistant messages
  const parseCitationsFromMessage = useCallback((text: string): Citation[] => {
    try {
      const match = text.match(/```citations\n([\s\S]*?)\n```/)
      if (match) {
        return JSON.parse(match[1])
      }
    } catch {
      // Ignore parse errors
    }
    return []
  }, [])

  // Get clean message text (without citations block)
  const getCleanMessageText = useCallback((text: string): string => {
    return text.replace(/```citations\n[\s\S]*?\n```/g, "").trim()
  }, [])

  // Extract text from message parts
  const getMessageText = useCallback((message: { parts?: Array<{ type: string; text?: string }> }): string => {
    if (!message.parts || !Array.isArray(message.parts)) return ""
    return message.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text" && typeof p.text === "string")
      .map((p) => p.text)
      .join("")
  }, [])

  const handleSendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isLoading) return
      sendMessage({ text }, { body: { recruiterMode } })
      setInput("")
    },
    [isLoading, recruiterMode, sendMessage]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(input)
  }

  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt)
  }

  const handleClearChat = () => {
    setMessages([])
    setCitations(new Map())
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-sky-500 px-4 py-3 text-white shadow-lg transition-colors hover:bg-sky-600"
          >
            <IconMessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Ask about me</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-white">
                  <IconMessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">Ask about Tanish</h3>
                  <p className="text-xs text-neutral-500">AI-powered portfolio assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                  title="Clear chat"
                >
                  <IconChevronDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                >
                  <IconX className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Recruiter Mode Toggle */}
            <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/50 px-4 py-2">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-600">
                <IconBriefcase className="h-3.5 w-3.5" />
                <span>Recruiter Mode</span>
              </label>
              <button
                onClick={() => setRecruiterMode(!recruiterMode)}
                className={twMerge(
                  "relative h-5 w-9 rounded-full transition-colors",
                  recruiterMode ? "bg-sky-500" : "bg-neutral-300"
                )}
              >
                <span
                  className={twMerge(
                    "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                    recruiterMode && "translate-x-4"
                  )}
                />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-500">
                    <IconMessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      Hi! I can answer questions about Tanish.
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Try one of the suggestions below or ask your own question.
                    </p>
                  </div>
                  <div className="mt-2 flex flex-wrap justify-center gap-2">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSuggestedPrompt(prompt)}
                        className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-700 transition-colors hover:border-sky-300 hover:bg-sky-50"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => {
                    const text = getMessageText(message)
                    const cleanText = message.role === "assistant" ? getCleanMessageText(text) : text
                    const messageCitations =
                      message.role === "assistant" ? parseCitationsFromMessage(text) : []

                    return (
                      <div
                        key={message.id}
                        className={twMerge(
                          "flex",
                          message.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={twMerge(
                            "max-w-[85%] rounded-2xl px-4 py-2.5",
                            message.role === "user"
                              ? "bg-sky-500 text-white"
                              : "bg-neutral-100 text-neutral-900"
                          )}
                        >
                          <p className="whitespace-pre-wrap text-sm">{cleanText}</p>

                          {/* Citations */}
                          {messageCitations.length > 0 && (
                            <CitationsSection citations={messageCitations} />
                          )}
                        </div>
                      </div>
                    )
                  })}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-1 rounded-2xl bg-neutral-100 px-4 py-3">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-neutral-200 p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, experience, skills..."
                  disabled={isLoading}
                  className="flex-1 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-sky-300 focus:bg-white disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <IconSend className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Citations Section Component
function CitationsSection({ citations }: { citations: Citation[] }) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (citations.length === 0) return null

  return (
    <div className="mt-3 border-t border-neutral-200/50 pt-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between text-xs text-neutral-500 hover:text-neutral-700"
      >
        <span>{citations.length} sources</span>
        <IconChevronDown
          className={twMerge("h-3 w-3 transition-transform", isExpanded && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 space-y-2 overflow-hidden"
          >
            {citations.map((citation, i) => (
              <a
                key={citation.chunk_id || i}
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg bg-white/50 p-2 text-xs transition-colors hover:bg-white"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium text-neutral-700">{citation.title}</p>
                    <p className="truncate text-neutral-500">{citation.section_heading}</p>
                    <p className="mt-1 line-clamp-2 text-neutral-400">{citation.snippet}</p>
                  </div>
                  <IconExternalLink className="h-3 w-3 flex-shrink-0 text-neutral-400" />
                </div>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
