"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../store/theme/themeStore";

export default function ThemeSwitchBtn() {
  const { theme, setTheme } = useThemeStore();

  function getIsDark() {
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
      className="p-4 rounded-2xl hover:bg-accent-primary"
      variant={"ghost"}
      onClick={() => btnHandler()}
    >
      {getIsDark() ? <Moon /> : <Sun />}
    </Button>
  );
}
