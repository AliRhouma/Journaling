"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { mockEntries } from "../../data/mock";
import { useLang } from "../../context/LangContext";

const MOOD_COLORS = {
  happy:      "#F5C842",
  joyful:     "#FFA94D",
  content:    "#74C0FC",
  inspired:   "#B197FC",
  tired:      "#ADB5BD",
  anxious:    "#FF8787",
  frustrated: "#FF6B6B",
};

function Highlight({ text, query }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "var(--yellow)", borderRadius: 3, padding: "0 2px", fontWeight: 700 }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function ResultCard({ entry, query, t }) {
  const lower    = entry.content.toLowerCase();
  const qLower   = query.toLowerCase();
  const matchIdx = lower.indexOf(qLower);
  let snippet;
  if (matchIdx !== -1) {
    const start = Math.max(0, matchIdx - 40);
    snippet = (start > 0 ? "…" : "") + entry.content.slice(start, start + 110) + "…";
  } else {
    snippet = entry.content.slice(0, 110) + "…";
  }

  return (
    <Link href={`/entry/${entry.id}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        style={{
          display: "flex", gap: 14, padding: "14px 16px",
          border: "var(--stroke) solid var(--black)",
          borderRadius: "var(--radius-md)",
          background: entry.color ?? "var(--white)",
          boxShadow: "var(--shadow)", cursor: "pointer",
          transition: "transform .13s, box-shadow .13s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-1px,-1px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
      >
        <div style={{ paddingTop: 4, flexShrink: 0 }}>
          <span style={{ display: "inline-block", width: 11, height: 11, borderRadius: "50%", background: MOOD_COLORS[entry.mood] ?? "var(--gray-300)", border: "1.5px solid rgba(0,0,0,.4)" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, marginBottom: 4, color: "var(--black)" }}>
            <Highlight text={entry.title} query={query} />
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: ".88rem", color: "var(--gray-600)", lineHeight: 1.5, marginBottom: 8, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
            <Highlight text={snippet} query={query} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: ".76rem", color: "var(--gray-400)", fontWeight: 600 }}>
              {entry.moodEmoji} {entry.mood} · {entry.date} · {t("searchWords", entry.wordCount)}
            </span>
            {entry.tags.slice(0, 3).map((tag) => (
              <span key={tag} style={{ padding: "1px 8px", border: "1.5px solid rgba(0,0,0,.18)", borderRadius: 999, fontFamily: "var(--font-display)", fontSize: ".72rem", fontWeight: 600, color: "var(--gray-600)" }}>
                #{tag}
              </span>
            ))}
            {entry.isFavorite && <span style={{ fontSize: ".9rem", marginLeft: "auto" }}>★</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function SearchPage() {
  const { t, lang } = useLang();
  const [query,      setQuery]      = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const TIME_FILTERS = [
    { id: "all",        label: t("searchAll") },
    { id: "last-week",  label: t("searchLastWeek") },
    { id: "last-month", label: t("searchLastMonth") },
    { id: "by-mood",    label: t("searchByMood") },
    { id: "by-tag",     label: t("searchByTag") },
  ];

  const SUGGESTED = t("searchSuggested");

  /* Arabic entries */
  const arMockEntries = t("arMockEntries");
  const entries = lang === "ar" && arMockEntries.length ? arMockEntries : mockEntries;

  const trimmed = query.trim();
  const results = trimmed
    ? entries.filter(
        (e) =>
          e.title.toLowerCase().includes(trimmed.toLowerCase()) ||
          e.content.toLowerCase().includes(trimmed.toLowerCase())
      )
    : [];

  return (
    <>
      {/* ── TITLE ── */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>
          {t("searchTitle")}
        </h1>
        <p style={{ color: "var(--gray-400)", fontFamily: "var(--font-display)", fontSize: ".95rem" }}>
          {t("searchSub")}
        </p>
      </div>

      {/* ── SEARCH INPUT ── */}
      <div style={{ position: "relative", marginBottom: 18 }}>
        <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", fontSize: "1.2rem", pointerEvents: "none", zIndex: 1 }}>
          🔍
        </span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          style={{
            width: "100%", padding: "15px 18px 15px 50px",
            border: "var(--stroke) solid var(--black)", borderRadius: 999,
            fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 600,
            background: "var(--white)", boxShadow: "var(--shadow-lg)",
            outline: "none", color: "var(--black)", boxSizing: "border-box",
            transition: "box-shadow .15s",
          }}
          onFocus={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-lg), 0 0 0 3px rgba(245,200,66,.35)"; }}
          onBlur={(e) =>  { e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            style={{
              position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", fontSize: "1rem", cursor: "pointer",
              color: "var(--gray-400)", fontFamily: "var(--font-display)", fontWeight: 700,
              lineHeight: 1, padding: "4px 8px",
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* ── FILTER CHIPS ── */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {TIME_FILTERS.map((f) => {
          const active = timeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setTimeFilter(f.id)}
              style={{
                padding: "7px 18px",
                border: "var(--stroke) solid var(--black)", borderRadius: 999,
                fontFamily: "var(--font-display)", fontSize: ".9rem", fontWeight: 700,
                cursor: "pointer",
                background: active ? "var(--black)" : "var(--white)",
                color: active ? "var(--yellow)" : "var(--black)",
                boxShadow: active ? "var(--shadow)" : "2px 2px 0 rgba(0,0,0,.1)",
                transition: "background .13s, color .13s",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* ── EMPTY STATE ── */}
      {!trimmed && (
        <div style={{ paddingTop: 12 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: ".78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--gray-400)", marginBottom: 14 }}>
            {t("searchTrySuggestions")}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => { setQuery(s); setTimeout(() => inputRef.current?.focus(), 10); }}
                style={{
                  padding: "10px 22px",
                  border: "var(--stroke) dashed var(--black)", borderRadius: 999,
                  fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600,
                  cursor: "pointer", background: "transparent", color: "var(--black)",
                  boxShadow: "none", transition: "background .13s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--yellow-light)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                {s}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: ".78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--gray-400)", marginBottom: 14 }}>
              {t("searchRecent")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {entries.slice(0, 3).map((e) => (
                <Link key={e.id} href={`/entry/${e.id}`} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                      border: "1.5px solid rgba(0,0,0,.12)", borderRadius: "var(--radius-md)",
                      background: "var(--white)", cursor: "pointer",
                      transition: "border-color .13s, background .13s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--black)"; e.currentTarget.style.background = "var(--gray-100)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,.12)"; e.currentTarget.style.background = "var(--white)"; }}
                  >
                    <span style={{ fontSize: "1.1rem" }}>{e.moodEmoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: ".95rem", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {e.title}
                      </div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: ".75rem", color: "var(--gray-400)" }}>
                        {e.date}
                      </div>
                    </div>
                    <span style={{ color: "var(--gray-300)", fontSize: "1rem" }}>{t("searchArrow")}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {trimmed && (
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: ".82rem", color: "var(--gray-400)", fontWeight: 600, marginBottom: 14 }}>
            {results.length === 0 ? t("searchNoResults") : t("searchFound", results.length)}
          </div>

          {results.length === 0 && (
            <div style={{ textAlign: "center", padding: "56px 24px", border: "var(--stroke) dashed rgba(0,0,0,.2)", borderRadius: "var(--radius-lg)" }}>
              <div style={{ fontSize: "2.8rem", marginBottom: 12 }}>🔦</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, marginBottom: 6 }}>
                {t("searchNothingFound", trimmed)}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: ".9rem", color: "var(--gray-400)", marginBottom: 24 }}>
                {t("searchNothingFoundSub")}
              </div>
              <button
                onClick={() => setQuery("")}
                style={{
                  padding: "9px 24px", border: "var(--stroke) solid var(--black)", borderRadius: 999,
                  fontFamily: "var(--font-display)", fontSize: ".95rem", fontWeight: 700,
                  cursor: "pointer", background: "var(--yellow)", boxShadow: "var(--shadow)",
                }}
              >
                {t("searchClear")}
              </button>
            </div>
          )}

          {results.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {results.map((entry) => (
                <ResultCard key={entry.id} entry={entry} query={trimmed} t={t} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
