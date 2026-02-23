"use client";
import jsCookie from "js-cookie";
import { useEffect, useState } from "react";

const SELECTABLE_THEMES = ["light", "dark", "cupcake", "synthwave"];

export const ThemeSwitcher = () => {
  const initialTheme = jsCookie.get("theme");
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useState(
    initialTheme || (isDarkMode ? "dark" : "light"),
  ); // default theme

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    jsCookie.set("theme", theme);
  }, [theme]);

  return (
    <ul>
      {SELECTABLE_THEMES.map((theme) => (
        <li key={theme}>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            data-theme={theme}
            onClick={() => setTheme(theme)}
          >
            {theme.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
