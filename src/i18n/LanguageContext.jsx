import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import en from "./locales/en";
import hi from "./locales/hi";

// Adding a new language later: add the locale file above and register it here.
const LOCALES = { en, hi };
const SUPPORTED_LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हि" },
];
const STORAGE_KEY = "swasti-language";
const DEFAULT_LANGUAGE = "en";

const LanguageContext = createContext(undefined);

function getInitialLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && LOCALES[stored]) return stored;
  } catch {
    // localStorage unavailable (privacy mode, etc.) — fall back silently
  }
  return DEFAULT_LANGUAGE;
}

function resolve(dict, key) {
  return key.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore storage failures
    }
  }, [language]);

  const t = useCallback(
    (key) => {
      const value = resolve(LOCALES[language], key);
      if (value !== undefined) return value;
      const fallback = resolve(LOCALES[DEFAULT_LANGUAGE], key);
      return fallback !== undefined ? fallback : key;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      languages: SUPPORTED_LANGUAGES,
    }),
    [language, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
