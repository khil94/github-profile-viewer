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
  const { setTheme } = useThemeStore();

  useEffect(() => {
    const storedTheme =
      (localStorage.getItem(THEME_STORE_ITEM) as Theme) || defaultTheme;
    setTheme(storedTheme);
  }, []);

  return <></>;
}
