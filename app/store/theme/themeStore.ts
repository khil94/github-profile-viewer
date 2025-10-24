import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export const THEME_STORE_ITEM = "github-profile-viewer-theme";
export type Theme = "light" | "dark" | "system";
export type ThemeState = {
  theme: Theme;
};
const initialState: ThemeState = {
  theme: "system",
};

export const useThemeStore = create(
  persist(
    combine(initialState, (set) => ({
      setTheme: (theme: Theme) => {
        set({ theme: theme });
      },
    })),
    {
      name: THEME_STORE_ITEM,
    }
  )
);
