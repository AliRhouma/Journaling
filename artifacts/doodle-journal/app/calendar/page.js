"use client";

import { useState } from "react";
import Link from "next/link";
import { mockEntries, mockTags } from "../../data/mock";
import { useLang } from "../../context/LangContext";

const TODAY_YEAR  = 2026;
const TODAY_MONTH = 4;
const TODAY_DAY   = 3;

const MOOD_COLORS = {
  happy:      "#F5C842",
  joyful:     "#FFA94D",
  content:    "#74C0FC",
  inspired:   "#B197FC",
  tired:      "#ADB5BD",
  anxious:    "#FF8787",
  frustrated: "#FF6B6B",
  stressed:   "#FF8787",
  sad:        "#91A7C7",
  calm:       "#63E6BE",
  neutral:    "#DEE2E6",
  okay:       "#DEE2E6",
};

const MOOD_FILTER_OPTIONS = [
  { emoji: "😊", label: "happy" },
  { emoji: "😌", label: "calm" },
  { emoji: "😐", label: "neutral" },
  { emoji: "😔", label: "sad" },
  { emoji: "😣", label: "stressed" },
  { emoji: "🥳", label: "joyful" },
  { emoji: "🌟", label: "inspired" },
  { emoji: "😴", label: "tired" },
];

const TAG_FILTER_OPTIONS = mockTags.slice(0, 8);

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function moodDot(mood, size = 9) {
  return (
    <span
      style={{
        display: "inline-block", width: size, height: size,
        borderRadius: "50%",
        background: MOOD_COLORS[mood] ?? "var(--gray-300)",
        border: "1.5px solid rgba(0,0,0,.35)", flexShrink: 0,
      }}
    />
  );
}

function formatMonthYear(dateStr, locale) {
  const [y, m] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", { month: "long", year: "numeric" });
}

function formatDate(dateStr, locale) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    weekday: "short", month: "short", day: "numeric",
  });
}

function groupByMonth(entries, locale) {
  const groups = {};
  entries.forEach((e) => {
    const key = formatMonthYear(e.date, locale);
    if (!groups[key]) groups[key] = [];
    groups[key].push(e);
  });
  return groups;
}

const entryByDate = {};
mockEntries.forEach((e) => { entryByDate[e.date] = e; });

/* ─── FILTERS ───────────────────────────────────────────────────── */

function FilterRow({ activeMoods, onToggleMood, activeTags, onToggleTag, t }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20, alignItems: "center" }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--gray-400)", marginRight: 2 }}>
        {t("calendarMoodLabel")}
      </span>

      {MOOD_FILTER_OPTIONS.map((m) => {
        const on = activeMoods.includes(m.label);
        return (
          <button
            key={m.label}
            onClick={() => onToggleMood(m.label)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 12px",
              border: "var(--stroke) solid var(--black)", borderRadius: 999,
              fontFamily: "var(--font-display)", fontSize: ".82rem", fontWeight: 600,
              cursor: "pointer",
              background: on ? "var(--yellow)" : "var(--white)",
              boxShadow: on ? "var(--shadow)" : "2px 2px 0 rgba(0,0,0,.1)",
              color: "var(--black)", transition: "background .13s",
            }}
          >
            <span style={{ fontSize: ".95rem" }}>{m.emoji}</span>
            {m.label}
          </button>
        );
      })}

      <span style={{ width: 1, height: 20, background: "rgba(0,0,0,.15)", margin: "0 4px", flexShrink: 0 }} />

      <span style={{ fontFamily: "var(--font-display)", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--gray-400)", marginRight: 2 }}>
        {t("calendarTagLabel")}
      </span>

      {TAG_FILTER_OPTIONS.map((tag) => {
        const on = activeTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onToggleTag(tag)}
            style={{
              padding: "4px 12px",
              border: "var(--stroke) solid var(--black)", borderRadius: 999,
              fontFamily: "var(--font-display)", fontSize: ".82rem", fontWeight: 600,
              cursor: "pointer",
              background: on ? "var(--black)" : "var(--white)",
              color: on ? "var(--yellow)" : "var(--black)",
              boxShadow: on ? "var(--shadow)" : "2px 2px 0 rgba(0,0,0,.1)",
              transition: "background .13s, color .13s",
            }}
          >
            #{tag}
          </button>
        );
      })}
    </div>
  );
}

/* ─── CALENDAR VIEW ─────────────────────────────────────────────── */

function CalendarView({ t, lang }) {
  const [selectedDay, setSelectedDay] = useState(null);

  const daysInMonth = getDaysInMonth(TODAY_YEAR, TODAY_MONTH);
  const firstDay    = getFirstDayOfMonth(TODAY_YEAR, TODAY_MONTH);
  const monthName   = new Date(TODAY_YEAR, TODAY_MONTH, 1).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", { month: "long", year: "numeric" });
  const WEEKDAYS    = t("weekdays");

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const selectedDate = selectedDay
    ? `${TODAY_YEAR}-${String(TODAY_MONTH + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`
    : null;
  const selectedEntries = selectedDate ? mockEntries.filter((e) => e.date === selectedDate) : [];

  return (
    <>
      <div
        style={{
          border: "var(--stroke) solid var(--black)", borderRadius: "var(--radius-lg)",
          overflow: "hidden", boxShadow: "var(--shadow)", background: "var(--white)", marginBottom: 28,
        }}
      >
        {/* Month header */}
        <div style={{ padding: "16px 24px", background: "var(--yellow)", borderBottom: "var(--stroke) solid var(--black)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button style={{ background: "none", border: "none", fontSize: "1.3rem", cursor: "pointer", fontFamily: "var(--font-display)", fontWeight: 700, lineHeight: 1 }}>←</button>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 700 }}>{monthName}</div>
          <button style={{ background: "none", border: "none", fontSize: "1.3rem", cursor: "pointer", fontFamily: "var(--font-display)", fontWeight: 700, lineHeight: 1 }}>→</button>
        </div>

        {/* Weekday labels */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "var(--stroke) solid rgba(0,0,0,.12)" }}>
          {WEEKDAYS.map((d) => (
            <div key={d} style={{ padding: "8px 0", textAlign: "center", fontFamily: "var(--font-display)", fontSize: ".72rem", fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: ".04em" }}>
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {cells.map((day, i) => {
            const dateStr   = day ? `${TODAY_YEAR}-${String(TODAY_MONTH + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : null;
            const entry     = dateStr ? entryByDate[dateStr] : null;
            const isToday   = day === TODAY_DAY;
            const isFuture  = day > TODAY_DAY;
            const isSelected = day === selectedDay;

            return (
              <div
                key={i}
                onClick={() => day && setSelectedDay(isSelected ? null : day)}
                style={{
                  aspectRatio: "1", padding: "6px",
                  borderBottom: "1px solid rgba(0,0,0,.07)",
                  borderRight: "1px solid rgba(0,0,0,.07)",
                  background: isSelected ? "var(--yellow-light)" : "transparent",
                  position: "relative", cursor: day ? "pointer" : "default",
                  transition: "background .12s",
                }}
              >
                {day && (
                  <>
                    <div
                      style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: 22, height: 22, borderRadius: "50%",
                        fontFamily: "var(--font-display)", fontSize: ".88rem",
                        fontWeight: isToday ? 700 : 400,
                        color: isFuture ? "var(--gray-300)" : "var(--black)",
                        background: isToday ? "var(--yellow)" : "transparent",
                        border: isToday ? "var(--stroke) solid var(--black)" : "none",
                        boxShadow: isToday ? "var(--shadow)" : "none",
                      }}
                    >
                      {day}
                    </div>
                    {entry && (
                      <div
                        style={{
                          position: "absolute", bottom: 5, left: "50%", transform: "translateX(-50%)",
                          width: 8, height: 8, borderRadius: "50%",
                          background: MOOD_COLORS[entry.mood] ?? "var(--gray-300)",
                          border: "1.5px solid rgba(0,0,0,.4)",
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", marginBottom: 28, padding: "10px 14px", border: "1.5px dashed rgba(0,0,0,.15)", borderRadius: "var(--radius-md)", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: ".72rem", fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: ".05em", marginRight: 4 }}>legend</span>
        {Object.entries({ happy: "#F5C842", inspired: "#B197FC", content: "#74C0FC", tired: "#ADB5BD", anxious: "#FF8787", joyful: "#FFA94D" }).map(([mood, color]) => (
          <div key={mood} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: color, border: "1.5px solid rgba(0,0,0,.35)", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: ".78rem", color: "var(--gray-600)" }}>{mood}</span>
          </div>
        ))}
      </div>

      {/* Selected day panel */}
      {selectedDay && (
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <span>
              {new Date(TODAY_YEAR, TODAY_MONTH, selectedDay).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", { weekday: "long", month: "long", day: "numeric" })}
            </span>
            <button onClick={() => setSelectedDay(null)} style={{ background: "none", border: "none", fontSize: ".85rem", color: "var(--gray-400)", cursor: "pointer", fontFamily: "var(--font-display)" }}>
              ✕
            </button>
          </div>
          {selectedEntries.length === 0 ? (
            <div style={{ padding: "24px", border: "1.5px dashed rgba(0,0,0,.2)", borderRadius: "var(--radius-md)", textAlign: "center", color: "var(--gray-400)", fontFamily: "var(--font-display)", fontSize: ".95rem" }}>
              No entries on this day
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {selectedEntries.map((e) => <EntryCard key={e.id} entry={e} lang={lang} />)}
            </div>
          )}
        </div>
      )}

      {/* All entries for month */}
      {!selectedDay && (
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 12 }}>
            {t("calendarEntriesCount", mockEntries.filter((e) => e.date.startsWith("2026-05")).length)} this month
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mockEntries.filter((e) => e.date.startsWith("2026-05")).map((e) => (
              <EntryCard key={e.id} entry={e} lang={lang} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* ─── TIMELINE VIEW ─────────────────────────────────────────────── */

function TimelineView({ t, lang }) {
  const groups = groupByMonth(mockEntries, lang);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      {Object.entries(groups).map(([month, entries]) => (
        <div key={month}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, whiteSpace: "nowrap" }}>
              {month}
            </div>
            <div style={{ flex: 1, height: "var(--stroke)", background: "rgba(0,0,0,.12)" }} />
            <div style={{ fontFamily: "var(--font-display)", fontSize: ".78rem", color: "var(--gray-400)", fontWeight: 600 }}>
              {t("calendarEntriesCount", entries.length)}
            </div>
          </div>

          <div className="timeline-branch">
            {entries.map((e) => (
              <div key={e.id} style={{ position: "relative" }}>
                <div className="timeline-dot" style={{ background: MOOD_COLORS[e.mood] ?? "var(--gray-300)" }} />
                <EntryCard entry={e} lang={lang} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── SHARED ENTRY CARD ─────────────────────────────────────────── */

function EntryCard({ entry, lang }) {
  return (
    <Link href={`/entry/${entry.id}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        style={{
          display: "flex", gap: 14, padding: "14px 16px",
          border: "var(--stroke) solid var(--black)", borderRadius: "var(--radius-md)",
          background: entry.color ?? "var(--white)", boxShadow: "var(--shadow)",
          transition: "transform .14s, box-shadow .14s", cursor: "pointer",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-1px,-1px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
      >
        <div style={{ paddingTop: 3, flexShrink: 0 }}>{moodDot(entry.mood, 11)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "var(--black)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
              {entry.title}
            </span>
          </div>
          <div style={{ fontSize: ".82rem", color: "var(--gray-600)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.4, marginBottom: 6 }}>
            {entry.content.slice(0, 90)}…
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: ".76rem", color: "var(--gray-400)", fontWeight: 600 }}>
              {entry.moodEmoji} {entry.mood} · {formatDate(entry.date, lang)}
            </span>
            {entry.tags.slice(0, 3).map((tag) => (
              <span key={tag} style={{ padding: "1px 8px", border: "1.5px solid rgba(0,0,0,.18)", borderRadius: 999, fontFamily: "var(--font-display)", fontSize: ".72rem", fontWeight: 600, color: "var(--gray-600)", background: "rgba(255,255,255,.7)" }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div style={{ flexShrink: 0, fontSize: "1.1rem", color: "var(--gray-300)", alignSelf: "center" }}>→</div>
      </div>
    </Link>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────────── */

export default function CalendarPage() {
  const { t, lang } = useLang();
  const [view,        setView]        = useState("calendar");
  const [activeMoods, setActiveMoods] = useState([]);
  const [activeTags,  setActiveTags]  = useState([]);

  function toggleMood(m) { setActiveMoods((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]); }
  function toggleTag(tag) { setActiveTags((prev) => prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]); }

  return (
    <>
      {/* ── PAGE TITLE ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: "1.6rem" }}>📅</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>
            {t("calendarTitle")}
          </h1>
        </div>
        <p style={{ color: "var(--gray-400)", fontFamily: "var(--font-display)", fontSize: ".95rem" }}>
          {t("calendarSub")}
        </p>
      </div>

      {/* ── VIEW TABS ── */}
      <div
        style={{
          display: "inline-flex", gap: 0,
          border: "var(--stroke) solid var(--black)", borderRadius: 999,
          overflow: "hidden", boxShadow: "var(--shadow)", marginBottom: 22, background: "var(--white)",
        }}
      >
        {[
          { id: "calendar", label: `📅 ${t("calendarTab")}` },
          { id: "timeline", label: `📜 ${t("timelineTab")}` },
        ].map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            style={{
              padding: "9px 26px", border: "none",
              borderRight: i === 0 ? "var(--stroke) solid var(--black)" : "none",
              fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700,
              cursor: "pointer",
              background: view === tab.id ? "var(--yellow)" : "transparent",
              color: "var(--black)", transition: "background .15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── FILTERS ── */}
      <FilterRow activeMoods={activeMoods} onToggleMood={toggleMood} activeTags={activeTags} onToggleTag={toggleTag} t={t} />

      {/* ── VIEWS ── */}
      {view === "calendar" ? <CalendarView t={t} lang={lang} /> : <TimelineView t={t} lang={lang} />}
    </>
  );
}
