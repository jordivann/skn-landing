"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const KEY = "skn_theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Theme | null;
      const initialTheme: Theme = saved === "dark" ? "dark" : "light";

      setTheme(initialTheme);
      document.documentElement.dataset.theme = initialTheme;
    } catch {
      setTheme("light");
      document.documentElement.dataset.theme = "light";
    }
  }, []);

  const setAppTheme = (next: Theme) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;

    try {
      localStorage.setItem(KEY, next);
    } catch {}
  };

  const toggleTheme = () => {
    setAppTheme(theme === "light" ? "dark" : "light");
  };

  return { theme, toggleTheme, setTheme: setAppTheme };
}