import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "classic" | "nemesis-blue" | "lower-decks";

interface LCARSThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface LCARSThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: LCARSThemeProviderState = {
  theme: "nemesis-blue",
  setTheme: () => null,
};

const LCARSThemeProviderContext = createContext<LCARSThemeProviderState>(initialState);

export function LCARSThemeProvider({
  children,
  defaultTheme = "nemesis-blue",
  storageKey = "lcars-theme",
  ...props
}: LCARSThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove previous theme classes
    root.classList.remove("theme-classic", "theme-nemesis-blue", "theme-lower-decks");

    // Add current theme class
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <LCARSThemeProviderContext.Provider {...props} value={value}>
      {children}
    </LCARSThemeProviderContext.Provider>
  );
}

export const useLCARSTheme = () => {
  const context = useContext(LCARSThemeProviderContext);

  if (context === undefined)
    throw new Error("useLCARSTheme must be used within a LCARSThemeProvider");

  return context;
};