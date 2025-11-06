"use client";

import { Button } from "@/components/ui/button";
import { useClientOnly } from "@/lib/isomorphic";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../store/theme/themeStore";

export default function ThemeSwitchBtn() {
  const { theme, setTheme } = useThemeStore();
  const isClient = useClientOnly();

  function getIsDark() {
    if (!isClient) {
      return "system";
    }
    return (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }

  function btnHandler() {
    const isDark = getIsDark();
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <Button
      className="p-4 rounded-2xl active:bg-accent-primary md:hover:bg-accent-primary"
      variant={"ghost"}
      onClick={() => btnHandler()}
    >
      {getIsDark() ? <Moon /> : <Sun />}
    </Button>
  );
}
