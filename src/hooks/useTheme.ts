"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const KEY = "skn_theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current =
      (document.documentElement.dataset.theme as Theme) || "dark";
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  };

  return { theme, toggleTheme };
}
