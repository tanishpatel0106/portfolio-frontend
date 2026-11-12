"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import React, {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";
import { ACCENTS, AccentId, DEFAULT_ACCENT } from "@/constants/site";

type MotionPref = "full" | "reduced";

type Preferences = {
  accent: AccentId;
  setAccent: (accent: AccentId) => void;
  motion: MotionPref;
  setMotion: (motion: MotionPref) => void;
};

const PreferencesContext = createContext<Preferences | null>(null);

const ACCENT_KEY = "tp-accent";
const MOTION_KEY = "tp-motion";

const write = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode) — preference just won't persist */
  }
};

/**
 * Runs before first paint (inlined in <head>) so the saved accent and motion
 * preference are applied without a flash. Kept tiny and dependency-free.
 */
export const preferencesScript = `(function(){try{var d=document.documentElement;var a=localStorage.getItem("${ACCENT_KEY}");if(a)d.setAttribute("data-accent",a);var m=localStorage.getItem("${MOTION_KEY}");if(m)d.setAttribute("data-motion",m);}catch(e){}})();`;

/**
 * The source of truth for accent + motion is the <html> element's data
 * attributes (set before paint by `preferencesScript`). Components read them
 * through useSyncExternalStore so there is no effect-driven re-sync.
 */
const subscribeToRoot = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-accent", "data-motion"],
  });
  return () => observer.disconnect();
};

const readAccent = (): AccentId => {
  const value = document.documentElement.getAttribute("data-accent");
  return ACCENTS.some((a) => a.id === value) ? (value as AccentId) : DEFAULT_ACCENT;
};
const readMotion = (): MotionPref =>
  document.documentElement.getAttribute("data-motion") === "reduced"
    ? "reduced"
    : "full";

function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const accent = useSyncExternalStore(subscribeToRoot, readAccent, () => DEFAULT_ACCENT);
  const motion = useSyncExternalStore(subscribeToRoot, readMotion, () => "full" as const);

  const setAccent = useCallback((next: AccentId) => {
    document.documentElement.setAttribute("data-accent", next);
    write(ACCENT_KEY, next);
  }, []);

  const setMotion = useCallback((next: MotionPref) => {
    document.documentElement.setAttribute("data-motion", next);
    write(MOTION_KEY, next);
  }, []);

  return (
    <PreferencesContext.Provider
      value={{ accent, setAccent, motion, setMotion }}
    >
      <MotionConfig reducedMotion={motion === "reduced" ? "always" : "user"}>
        {children}
      </MotionConfig>
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used inside <Providers>");
  return ctx;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PreferencesProvider>{children}</PreferencesProvider>
    </ThemeProvider>
  );
}
