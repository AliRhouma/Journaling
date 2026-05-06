"use client";

import { useLang } from "../context/LangContext";

export default function LangSwitcher() {
  const { lang, toggleLang } = useLang();

  return (
    <div className="lang-switcher">
      <button
        className={`lang-btn${lang === "en" ? " active" : ""}`}
        onClick={() => toggleLang("en")}
      >
        EN
      </button>
      <div className="lang-divider" />
      <button
        className={`lang-btn${lang === "ar" ? " active" : ""}`}
        onClick={() => toggleLang("ar")}
      >
        عربي
      </button>
    </div>
  );
}
