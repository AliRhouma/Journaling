"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { mockEntries } from "../../../data/mock";
import { notFound } from "next/navigation";
import { useLang } from "../../../context/LangContext";

const MOCK_PHOTOS = {
  "1": [
    { id: "p1", caption: "Morning light through the window", color: "#D4E9C7", emoji: "🌅" },
    { id: "p2", caption: "The cat on the windowsill",        color: "#FDE8B8", emoji: "🐱" },
  ],
  "5": [
    { id: "p3", caption: "Rooftop view at golden hour", color: "#FCCFCF", emoji: "🌆" },
    { id: "p4", caption: "Layla's birthday cake",       color: "#D6C5F4", emoji: "🎂" },
  ],
  "7": [
    { id: "p5", caption: "The painting — grey with a red dot", color: "#E8E8E8", emoji: "🎨" },
  ],
};

function formatDate(dateStr, locale) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

const MOOD_COLORS = {
  happy:      "#F5C842",
  joyful:     "#FFA94D",
  content:    "#74C0FC",
  inspired:   "#B197FC",
  tired:      "#ADB5BD",
  anxious:    "#FF8787",
  frustrated: "#FF6B6B",
  stressed:   "#FF8787",
  calm:       "#63E6BE",
  neutral:    "#DEE2E6",
};

function iconBtn(bg) {
  return {
    width: 38, height: 38,
    border: "var(--stroke) solid var(--black)",
    borderRadius: "var(--radius-sm)",
    background: bg ?? "var(--white)",
    boxShadow: "var(--shadow)", cursor: "pointer",
    fontSize: "1rem",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "transform .13s, box-shadow .13s",
  };
}

export default function EntryPage({ params }) {
  const router        = useRouter();
  const { t, lang }   = useLang();
  const { id }        = use(params);

  /* Use Arabic entries when lang=ar */
  const arMockEntries = t("arMockEntries");
  const allEntries    = lang === "ar" && arMockEntries.length ? arMockEntries : mockEntries;
  const entry         = allEntries.find((e) => e.id === id) ?? mockEntries.find((e) => e.id === id);

  if (!entry) notFound();

  const totalEntries = allEntries.length;
  const idx          = allEntries.findIndex((e) => e.id === id);
  const prevEntry    = idx > 0                 ? allEntries[idx - 1] : null;
  const nextEntry    = idx < totalEntries - 1  ? allEntries[idx + 1] : null;

  const photos = MOCK_PHOTOS[entry.id] ?? [];

  const [reactions, setReactions] = useState(7);
  const [reacted,   setReacted]   = useState(false);
  const [deleted,   setDeleted]   = useState(false);
  const [locked,    setLocked]    = useState(false);

  function handleReact() {
    setReactions((r) => reacted ? r - 1 : r + 1);
    setReacted((r) => !r);
  }

  if (deleted) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 16, textAlign: "center" }}>
        <div style={{ fontSize: "3rem" }}>🗑️</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700 }}>
          {t("entryDeletedTitle")}
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: ".95rem", color: "var(--gray-400)" }}>
          {t("entryDeletedSub")}
        </div>
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "10px 28px", border: "var(--stroke) solid var(--black)", borderRadius: 999,
            fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700,
            background: "var(--yellow)", cursor: "pointer", boxShadow: "var(--shadow)",
          }}
        >
          {t("entryGoHome")}
        </button>
      </div>
    );
  }

  return (
    <>
      {/* ── SIDE NAV ARROWS ── */}
      {prevEntry && (
        <button
          onClick={() => router.push(`/entry/${prevEntry.id}`)}
          title={prevEntry.title}
          style={{
            position: "fixed", left: 244, top: "50%", transform: "translateY(-50%)", zIndex: 50,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            width: 44, height: 72,
            border: "var(--stroke) solid var(--black)", borderRadius: "var(--radius-md)",
            background: "var(--white)", boxShadow: "var(--shadow)", cursor: "pointer",
            fontFamily: "var(--font-display)", fontSize: "1.3rem", justifyContent: "center",
            transition: "transform .14s, box-shadow .14s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(calc(-50% - 2px))"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(-50%)";              e.currentTarget.style.boxShadow = "var(--shadow)"; }}
        >
          ←
          <span style={{ fontSize: ".6rem", color: "var(--gray-400)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em" }}>prev</span>
        </button>
      )}

      {nextEntry && (
        <button
          onClick={() => router.push(`/entry/${nextEntry.id}`)}
          title={nextEntry.title}
          style={{
            position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 50,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            width: 44, height: 72,
            border: "var(--stroke) solid var(--black)", borderRadius: "var(--radius-md)",
            background: "var(--white)", boxShadow: "var(--shadow)", cursor: "pointer",
            fontFamily: "var(--font-display)", fontSize: "1.3rem", justifyContent: "center",
            transition: "transform .14s, box-shadow .14s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(calc(-50% - 2px))"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(-50%)";              e.currentTarget.style.boxShadow = "var(--shadow)"; }}
        >
          →
          <span style={{ fontSize: ".6rem", color: "var(--gray-400)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em" }}>next</span>
        </button>
      )}

      {/* ── TOP BAR ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
        <button
          onClick={() => router.back()}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            border: "var(--stroke) solid var(--black)", borderRadius: 999,
            padding: "7px 18px", fontFamily: "var(--font-display)",
            fontSize: "1rem", fontWeight: 600, background: "var(--white)",
            cursor: "pointer", boxShadow: "var(--shadow)", color: "var(--black)", flexShrink: 0,
          }}
        >
          {t("newBack")}
        </button>

        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--gray-600)", flex: 1, textAlign: "center" }}>
          {formatDate(entry.date, lang)}
        </div>

        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button onClick={() => router.push("/new")} title={t("entryEdit")} style={iconBtn()}>✏️</button>
          <button onClick={() => setLocked((l) => !l)} title={t("entryLock")} style={iconBtn(locked ? "var(--yellow)" : undefined)}>
            {locked ? "🔒" : "🔓"}
          </button>
          <button onClick={() => setDeleted(true)} title={t("entryDelete")} style={iconBtn()}>🗑️</button>
        </div>
      </div>

      {/* ── PAPER CARD ── */}
      <div
        style={{
          border: "var(--stroke) solid var(--black)",
          borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)",
          background: entry.color ?? "var(--white)", overflow: "hidden", marginBottom: 24,
        }}
      >
        {/* Title strip */}
        <div style={{ borderBottom: "var(--stroke) dashed rgba(0,0,0,.15)", padding: "20px 28px 16px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: 12 }}>
            {entry.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 14px", border: "var(--stroke) solid var(--black)", borderRadius: 999,
                fontFamily: "var(--font-display)", fontSize: ".9rem", fontWeight: 700,
                background: MOOD_COLORS[entry.mood] ?? "var(--gray-200)", boxShadow: "var(--shadow)",
              }}
            >
              <span style={{ fontSize: "1.15rem" }}>{entry.moodEmoji}</span>
              {entry.mood}
            </span>

            {entry.tags.map((tag) => (
              <span key={tag} style={{ padding: "4px 12px", border: "var(--stroke) solid var(--black)", borderRadius: 999, fontFamily: "var(--font-display)", fontSize: ".82rem", fontWeight: 600, background: "rgba(255,255,255,.75)", color: "var(--black)" }}>
                #{tag}
              </span>
            ))}

            {entry.isFavorite && (
              <span style={{ padding: "4px 12px", border: "var(--stroke) solid var(--black)", borderRadius: 999, fontFamily: "var(--font-display)", fontSize: ".82rem", fontWeight: 700, background: "var(--yellow)", color: "var(--black)" }}>
                ★ favourite
              </span>
            )}

            <span style={{ marginLeft: "auto", fontFamily: "var(--font-display)", fontSize: ".78rem", color: "var(--gray-400)", fontWeight: 600 }}>
              {t("entryWords", entry.wordCount)}
            </span>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(150,150,150,.2) 31px, rgba(150,150,150,.2) 32px)",
            backgroundSize: "100% 32px",
            padding: "20px 28px 28px",
          }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem", lineHeight: "32px", color: "var(--black)", whiteSpace: "pre-wrap", margin: 0 }}>
            {entry.content}
          </p>
        </div>

        {/* Photos */}
        {photos.length > 0 && (
          <div style={{ borderTop: "var(--stroke) dashed rgba(0,0,0,.15)", padding: "20px 28px", display: "flex", gap: 16, flexWrap: "wrap" }}>
            {photos.map((photo) => (
              <div key={photo.id} style={{ width: 160, border: "var(--stroke) solid var(--black)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", overflow: "hidden", background: photo.color, flexShrink: 0 }}>
                <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", borderBottom: "var(--stroke) solid var(--black)" }}>
                  {photo.emoji}
                </div>
                <div style={{ padding: "8px 10px", fontFamily: "var(--font-display)", fontSize: ".75rem", color: "var(--gray-600)", lineHeight: 1.3 }}>
                  {photo.caption}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", paddingBottom: 40 }}>
        <button
          onClick={handleReact}
          style={{
            display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 20px",
            border: "var(--stroke) solid var(--black)", borderRadius: 999,
            fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700,
            cursor: "pointer",
            background: reacted ? "var(--yellow)" : "var(--white)",
            boxShadow: reacted ? "var(--shadow)" : "2px 2px 0 rgba(0,0,0,.12)",
            transform: reacted ? "translate(-1px,-1px)" : "none",
            transition: "background .15s, transform .15s, box-shadow .15s", color: "var(--black)",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>💛</span>
          {reactions}
        </button>

        <span style={{ fontFamily: "var(--font-display)", fontSize: ".82rem", color: "var(--gray-400)", fontWeight: 600 }}>
          {idx + 1} of {totalEntries}
        </span>

        <button
          onClick={() => router.push("/new")}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px",
            border: "var(--stroke) solid var(--black)", borderRadius: 999,
            fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700,
            cursor: "pointer", background: "var(--yellow)", color: "var(--black)",
            boxShadow: "var(--shadow)", transition: "transform .15s, box-shadow .15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-2px,-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
        >
          ✏️ {t("entryEdit")}
        </button>
      </div>
    </>
  );
}
