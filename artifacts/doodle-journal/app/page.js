"use client";

import Link from "next/link";
import Card from "../components/Card";
import { mockEntries, mockOnThisDay, mockInsights, mockUser } from "../data/mock";
import { useLang } from "../context/LangContext";

function formatDate(d, locale) {
  return d.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function snippet(text, max = 100) {
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

export default function HomePage() {
  const { t, lang } = useLang();
  const today = new Date();

  const h = today.getHours();
  const greeting =
    h < 12 ? t("greetingMorning") : h < 18 ? t("greetingAfternoon") : t("greetingEvening");

  /* Arabic mock data */
  const arMockEntries = t("arMockEntries");
  const arMockOnThisDay = t("arMockOnThisDay");
  const entries = lang === "ar" && arMockEntries.length ? arMockEntries : mockEntries;
  const onThisDay = lang === "ar" && arMockOnThisDay ? arMockOnThisDay : mockOnThisDay;

  const recentEntries = entries.slice(0, 5);

  const QUICK_ACTIONS = [
    { label: t("qaNewEntry"),   href: "/new?type=text" },
    { label: t("qaVoiceNote"),  href: "/new?type=voice" },
    { label: t("qaPhotoEntry"), href: "/new?type=photo" },
    { label: t("qaMoodCheck"),  href: "/mood" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>

      {/* ── 1. GREETING HERO ── */}
      <section>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3rem",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          {greeting}, {mockUser.name}
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--gray-600)" }}>
          {formatDate(today, lang)}
        </p>
      </section>

      {/* ── 2. STREAK CARD ── */}
      <section>
        <Card
          style={{
            background: "var(--yellow)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 28px",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.8rem",
                fontWeight: 700,
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              {t("streakLabel", mockInsights.currentStreak)}
            </div>
            <div style={{ fontSize: ".9rem", color: "var(--gray-600)" }}>
              {t("streakSub")}
            </div>
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "3.5rem",
              lineHeight: 1,
              opacity: 0.18,
              userSelect: "none",
              fontWeight: 700,
            }}
          >
            {mockInsights.currentStreak}
          </div>
        </Card>
      </section>

      {/* ── 3. QUICK ACTIONS ── */}
      <section>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: ".78rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: ".07em",
            color: "var(--gray-400)",
            marginBottom: 14,
          }}
        >
          {t("quickActions")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {QUICK_ACTIONS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 22px",
                border: "var(--stroke) solid var(--black)",
                borderRadius: 999,
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                fontWeight: 600,
                cursor: "pointer",
                background: "var(--yellow)",
                boxShadow: "var(--shadow)",
                transition: "transform .15s, box-shadow .15s",
                color: "var(--black)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px,-2px)";
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "var(--shadow)";
              }}
            >
              {a.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── 4. ON THIS DAY ── */}
      <section>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: ".78rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: ".07em",
            color: "var(--gray-400)",
            marginBottom: 14,
          }}
        >
          {t("onThisDay")}
        </div>
        <Link
          href={`/entry/${onThisDay.id}`}
          style={{ textDecoration: "none", color: "inherit", display: "block" }}
        >
          <Card
            style={{
              background: onThisDay.color,
              transition: "transform .15s, box-shadow .15s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translate(-2px,-2px)";
              e.currentTarget.style.boxShadow = "var(--shadow-lg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "var(--shadow)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "3px 10px",
                  border: "var(--stroke) solid var(--black)",
                  borderRadius: 999,
                  fontFamily: "var(--font-display)",
                  fontSize: ".82rem",
                  fontWeight: 700,
                  background: "var(--black)",
                  color: "var(--yellow)",
                }}
              >
                {t("yearAgo", onThisDay.yearAgo)}
              </span>
              <span style={{ fontSize: ".82rem", color: "var(--gray-600)" }}>
                {onThisDay.date}
              </span>
            </div>

            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              {onThisDay.moodEmoji} {onThisDay.title}
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: ".95rem",
                color: "var(--gray-600)",
                lineHeight: 1.55,
              }}
            >
              {snippet(onThisDay.content, 120)}
            </p>
          </Card>
        </Link>
      </section>

      {/* ── 5. RECENT ENTRIES ── */}
      <section style={{ paddingBottom: 40 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: ".78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".07em",
              color: "var(--gray-400)",
            }}
          >
            {t("recentEntries")}
          </div>
          <Link
            href="/search"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: ".88rem",
              fontWeight: 600,
              color: "var(--gray-600)",
              textDecoration: "none",
              borderBottom: "1.5px dashed var(--gray-400)",
            }}
          >
            {t("viewAll")}
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {recentEntries.map((entry) => (
            <Link
              key={entry.id}
              href={`/entry/${entry.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="demo-post"
                style={{ background: entry.color, maxWidth: "100%" }}
              >
                <div className="demo-post-dot" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <span className="demo-post-title">{entry.title}</span>
                    <span style={{ fontSize: "1rem" }}>{entry.moodEmoji}</span>
                  </div>
                  <div className="demo-post-meta">{entry.date}</div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: ".88rem",
                      color: "var(--gray-600)",
                      marginTop: 4,
                      lineHeight: 1.45,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {entry.content}
                  </p>
                </div>
                {entry.isFavorite && (
                  <span
                    style={{
                      color: "var(--yellow)",
                      fontSize: "1.1rem",
                      flexShrink: 0,
                      filter: "drop-shadow(0 0 0 #1a1a1a)",
                      WebkitTextStroke: ".5px var(--black)",
                    }}
                  >
                    ★
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
