"use client";

import { useTheme } from "next-themes";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ACCENTS } from "@/constants/site";
import { cn } from "@/lib/utils";
import { usePreferences } from "./providers";

const noopSubscribe = () => () => {};
/** true on the client after hydration, false during SSR. */
const useMounted = () =>
  useSyncExternalStore(noopSubscribe, () => true, () => false);

/** Cycles system → light → dark. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const order = ["system", "light", "dark"] as const;
  const current = (mounted ? theme : "system") as (typeof order)[number];
  const next = order[(order.indexOf(current) + 1) % order.length];
  const Icon =
    current === "light" ? IconSun : current === "dark" ? IconMoon : IconDeviceDesktop;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${current}. Switch to ${next}.`}
      title={`Theme: ${current}`}
      className={cn(
        "relative z-20 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        className
      )}
    >
      <Icon className="h-[18px] w-[18px]" stroke={1.75} />
    </button>
  );
}

/** Small popover to try accent colours live. */
export function AccentPicker({ className }: { className?: string }) {
  const { accent, setAccent } = usePreferences();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useMounted();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative z-20", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Choose accent colour"
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-accent"
      >
        <span className="h-4 w-4 rounded-full bg-primary ring-2 ring-background shadow-[0_0_0_1px_var(--border)]" />
      </button>
      {open && mounted && (
        <div
          role="menu"
          className="absolute right-0 top-11 w-44 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-xl"
        >
          <p className="px-2 pb-1.5 pt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Accent
          </p>
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              role="menuitemradio"
              aria-checked={accent === a.id}
              onClick={() => {
                setAccent(a.id);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-accent",
                accent === a.id && "bg-accent"
              )}
            >
              <span
                className="h-3.5 w-3.5 rounded-full"
                style={{ background: a.swatch }}
              />
              {a.label}
              {accent === a.id && (
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                  on
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function MotionToggle({ className }: { className?: string }) {
  const { motion, setMotion } = usePreferences();
  const mounted = useMounted();
  const reduced = mounted && motion === "reduced";
  return (
    <button
      type="button"
      onClick={() => setMotion(reduced ? "full" : "reduced")}
      aria-pressed={reduced}
      className={cn(
        "font-mono text-xs uppercase tracking-wider text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline",
        className
      )}
    >
      {reduced ? "Resume motion" : "Pause motion"}
    </button>
  );
}
