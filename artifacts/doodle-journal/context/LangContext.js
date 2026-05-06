"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import translations from "../data/translations";

const LangContext = createContext({
  lang: "en",
  dir: "ltr",
  toggleLang: () => {},
  t: (key) => key,
});

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
  }, [lang, dir]);

  function toggleLang(newLang) {
    setLang(newLang);
  }

  const t = useCallback(
    (key, ...args) => {
      const val =
        translations[lang]?.[key] ?? translations.en[key] ?? key;
      if (typeof val === "function") return val(...args);
      return val;
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, dir, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
