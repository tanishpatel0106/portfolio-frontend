"use client";

import { useState } from "react";
import { Button as StatefulButton } from "@/components/ui/stateful-button";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25";

type State = { kind: "idle" } | { kind: "sent" } | { kind: "error"; message: string };

export function ContactForm({ className }: { className?: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [values, setValues] = useState({ name: "", email: "", message: "", company: "" });

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  // Thrown errors tell the stateful button to skip its success tick.
  const submit = async () => {
    setState({ kind: "idle" });
    if (!values.name.trim() || !/\S+@\S+\.\S+/.test(values.email) || values.message.trim().length < 10) {
      const message = "Please add your name, a valid email and a message of at least 10 characters.";
      setState({ kind: "error", message });
      throw new Error(message);
    }
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).catch(() => null);
    if (!res || !res.ok) {
      const data = res ? await res.json().catch(() => null) : null;
      const message = data?.error ?? "The message could not be sent. Please try again.";
      setState({ kind: "error", message });
      throw new Error(message);
    }
    setState({ kind: "sent" });
    setValues({ name: "", email: "", message: "", company: "" });
  };

  return (
    <form
      noValidate
      onSubmit={(e) => e.preventDefault()}
      className={cn("space-y-4 rounded-3xl border bg-card p-6 md:p-8", className)}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={set("name")}
            placeholder="Your name"
            className={field}
          />
        </label>
        <label className="block space-y-1.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={set("email")}
            placeholder="you@company.com"
            className={field}
          />
        </label>
      </div>
      <label className="block space-y-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          value={values.message}
          onChange={set("message")}
          placeholder="What are you working on?"
          className={cn(field, "resize-y")}
        />
      </label>
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set("company")} />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        {/* Aceternity Stateful Button: spinner while sending, tick on success. */}
        <StatefulButton type="button" onClick={submit}>
          Send message
        </StatefulButton>
        <p role="status" aria-live="polite" className="text-sm">
          {state.kind === "sent" && (
            <span className="text-success">Sent. Thanks — I’ll reply soon.</span>
          )}
          {state.kind === "error" && <span className="text-destructive">{state.message}</span>}
        </p>
      </div>
    </form>
  );
}
