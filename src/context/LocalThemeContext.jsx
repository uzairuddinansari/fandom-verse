import { createContext, useContext, useEffect, useState } from "react";
import { defaultAppearanceSettings } from "../config/appearanceSettings";

const ThemeContext = createContext(null);

const loadSettings = () => {
  try {
    return JSON.parse(localStorage.getItem("lunaAppearanceSettings")) || defaultAppearanceSettings;
  } catch {
    return defaultAppearanceSettings;
  }
};

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);
  const [customFonts, setCustomFonts] = useState([]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", settings.theme.primary);
    root.style.setProperty("--color-secondary", settings.theme.secondary);
    root.style.setProperty("--color-background", settings.theme.background);
    root.style.setProperty("--color-text", settings.theme.text);
    root.style.setProperty("--color-muted", settings.theme.mutedText);
    root.style.setProperty("--color-muted-text", settings.theme.mutedText);
    root.style.setProperty("--color-border", settings.theme.border);
    root.style.setProperty("--color-accent", settings.theme.accent || "#e32636");
    root.style.setProperty("--font-heading", settings.typography.headingFont);
    root.style.setProperty("--font-body", settings.typography.bodyFont);
    root.style.setProperty("--heading-weight", settings.typography.headingWeight);
    root.style.setProperty("--body-weight", settings.typography.bodyWeight);
    localStorage.setItem("lunaAppearanceSettings", JSON.stringify(settings));
  }, [settings]);

  const updateTheme = (key, value) =>
    setSettings((current) => ({
      ...current,
      theme: { ...current.theme, [key]: value },
    }));

  const updateTypography = (key, value) =>
    setSettings((current) => ({
      ...current,
      typography: { ...current.typography, [key]: value },
    }));

  const resetSettings = () => setSettings(defaultAppearanceSettings);

  const addCustomFont = async (file) => {
    if (!file) return;
    const name = file.name.replace(/\.(woff2?|ttf)$/i, "").replace(/[-_]/g, " ");
    const url = URL.createObjectURL(file);
    const fontFace = new FontFace(name, `url(${url})`);
    await fontFace.load();
    document.fonts.add(fontFace);
    setCustomFonts((current) => [...current, { id: name, name, url }]);
  };

  const deleteCustomFont = (fontId) =>
    setCustomFonts((current) => current.filter((font) => font.id !== fontId));

  return (
    <ThemeContext.Provider
      value={{
        settings,
        updateTheme,
        updateTypography,
        resetSettings,
        customFonts,
        addCustomFont,
        deleteCustomFont,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// The hook intentionally lives beside its provider to preserve the original API.
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
