"use client";

import { useEffect } from "react";
import {
  Theme,
  THEME_STORE_ITEM,
  useThemeStore,
} from "../store/theme/themeStore";

export default function ThemeProvider({
  defaultTheme = "system",
}: {
  defaultTheme?: Theme;
}) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const storedData = localStorage.getItem(THEME_STORE_ITEM);
    if (storedData) {
      const storedTheme = JSON.parse(storedData).state.theme;
      setTheme(storedTheme);
    } else {
      setTheme(defaultTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }, [theme]);

  return <></>;
}
