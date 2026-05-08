import { useState, useEffect } from "react";
import { ThemeContext, THEMES } from "./theme";

const applyTheme = (theme) => {
  const root = window.document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const resolved =
    theme === THEMES.SYSTEM
      ? media.matches
        ? THEMES.DARK
        : THEMES.LIGHT
      : theme;

  root.classList.toggle("dark", resolved === THEMES.DARK);
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || THEMES.SYSTEM,
  );

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== THEMES.SYSTEM) return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme(THEMES.SYSTEM);

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
