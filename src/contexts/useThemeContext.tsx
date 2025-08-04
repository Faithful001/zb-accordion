import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { LocalStorage } from "../utils/local-storage.util";

interface ThemeContextProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeState, setThemeState] = useState<"light" | "dark" | "system">(
    LocalStorage.get("theme") || "system"
  );

  // Compute effective theme based on themeState and system preference
  const effectiveTheme = useMemo(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    return themeState === "system"
      ? mediaQuery.matches
        ? "dark"
        : "light"
      : themeState;
  }, [themeState]);

  useEffect(() => {
    const html = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      if (effectiveTheme === "dark") {
        html.classList.add("dark");
        html.classList.remove("light");
      } else {
        html.classList.add("light");
        html.classList.remove("dark");
      }
    };

    // Initial application of theme
    applyTheme();

    // Listen for system theme changes when using system preference
    const handleChange = () => {
      if (themeState === "system") {
        applyTheme();
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [effectiveTheme, themeState]);

  const setTheme = (newTheme: "light" | "dark" | "system") => {
    setThemeState(newTheme);
    LocalStorage.set("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme: effectiveTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
