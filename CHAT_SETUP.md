# Chat About Me — Setup Guide

The **Chat About Me** feature adds an AI-powered chat section to your portfolio where visitors can ask questions about you. It uses Claude AI (by Anthropic) with extended thinking enabled, so users can see the AI's reasoning process.

## How It Works

- **Frontend**: A chat UI at `/chat` with suggested questions, streaming responses, and collapsible thinking blocks
- **Backend**: A Next.js API route at `/api/chat` that proxies requests to the Claude API
- **API Key**: Your Anthropic API key stays server-side — it is **never** exposed to the browser

## Prerequisites

- Node.js 18+
- An Anthropic API key

## Getting Your API Key

1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to **API Keys** in the dashboard
4. Click **Create Key** and copy the key (it starts with `sk-ant-`)

## Setup

1. **Copy the environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Add your API key** to `.env.local`:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```

3. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

4. **Start the dev server:**
   ```bash
   npm run dev
   ```

5. **Navigate** to `/chat` in the sidebar — you should see the chat interface with suggested questions.

## Configuration

### Changing the AI Model

In `src/app/api/chat/route.ts`, you can change the model:

```typescript
model: "claude-sonnet-4-20250514",  // Default: fast and capable
// model: "claude-opus-4-20250514",    // Alternative: most capable, slower
// model: "claude-haiku-4-5-20251001", // Alternative: fastest, cheapest
```

### Adjusting Thinking Budget

The thinking budget controls how much reasoning the AI does before responding. In the same file:

```typescript
thinking: {
  type: "enabled",
  budget_tokens: 10000,  // Increase for more detailed reasoning, decrease for speed
},
```

### Updating Your Information

All the AI's knowledge about you lives in `src/constants/system-prompt.ts`. Update this file whenever you:
- Add new projects or research
- Change roles or positions
- Want to add new information the AI should know

### Customizing Suggested Questions

Edit the `questions` array in `src/components/chat/SuggestedQuestions.tsx` to change the pre-built question pills.

## Cost Considerations

- The chat uses **Claude Sonnet** with extended thinking enabled
- Extended thinking adds to token usage (budget capped at 10,000 tokens per request)
- Each conversation turn sends the full message history (capped at last 20 messages)
- For a portfolio site with light traffic, costs should be minimal (a few cents per conversation)
- Monitor usage at [https://console.anthropic.com/usage](https://console.anthropic.com/usage)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "API key not configured" error | Make sure `.env.local` exists and has `ANTHROPIC_API_KEY` set. Restart the dev server after changes. |
| Chat not loading | Check browser console for errors. Ensure `npm install` was run after pulling changes. |
| Slow responses | Extended thinking adds latency. Reduce `budget_tokens` or switch to a faster model. |
| Build errors | Run `npm run build` and check for TypeScript errors. |

## Files Overview

| File | Purpose |
|------|---------|
| `src/app/chat/page.tsx` | Chat page (server component) |
| `src/app/api/chat/route.ts` | API route — proxies Claude API calls |
| `src/constants/system-prompt.ts` | All knowledge about you (edit this!) |
| `src/components/chat/ChatInterface.tsx` | Main chat orchestrator |
| `src/components/chat/ChatInput.tsx` | Input textarea + send button |
| `src/components/chat/MessageBubble.tsx` | Message rendering with markdown |
| `src/components/chat/ThinkingBlock.tsx` | Expandable thinking display |
| `src/components/chat/SuggestedQuestions.tsx` | Pre-built question pills |
| `src/types/chat.ts` | TypeScript types |
| `.env.example` | Environment variable template |
