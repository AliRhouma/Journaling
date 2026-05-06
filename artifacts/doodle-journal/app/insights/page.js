"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { mockInsights } from "../../data/mock";
import { useLang } from "../../context/LangContext";

const MOOD_TIMELINE = [
  { day: "Apr 3",  score: 3 }, { day: "Apr 4",  score: 4 },
  { day: "Apr 5",  score: 2 }, { day: "Apr 6",  score: 3 },
  { day: "Apr 7",  score: 5 }, { day: "Apr 8",  score: 4 },
  { day: "Apr 9",  score: 3 }, { day: "Apr 10", score: 2 },
  { day: "Apr 11", score: 2 }, { day: "Apr 12", score: 4 },
  { day: "Apr 13", score: 5 }, { day: "Apr 14", score: 4 },
  { day: "Apr 15", score: 3 }, { day: "Apr 16", score: 1 },
  { day: "Apr 17", score: 2 }, { day: "Apr 18", score: 3 },
  { day: "Apr 19", score: 4 }, { day: "Apr 20", score: 4 },
  { day: "Apr 21", score: 5 }, { day: "Apr 22", score: 3 },
  { day: "Apr 23", score: 2 }, { day: "Apr 24", score: 4 },
  { day: "Apr 25", score: 5 }, { day: "Apr 26", score: 2 },
  { day: "Apr 27", score: 3 }, { day: "Apr 28", score: 5 },
  { day: "Apr 29", score: 3 }, { day: "Apr 30", score: 1 },
  { day: "May 1",  score: 3 }, { day: "May 2",  score: 2 },
];

function MoodTooltip({ active, payload, label, labels }) {
  if (!active || !payload?.length) return null;
  const score = payload[0].value;
  return (
    <div
      style={{
        border: "var(--stroke) solid var(--black)",
        borderRadius: "var(--radius-sm)",
        padding: "8px 14px",
        background: "var(--white)",
        boxShadow: "var(--shadow)",
        fontFamily: "var(--font-display)",
        fontSize: ".85rem",
        fontWeight: 700,
      }}
    >
      <div style={{ color: "var(--gray-400)", marginBottom: 2 }}>{label}</div>
      <div>{labels[score]} ({score}/5)</div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
      {children}
    </h2>
  );
}

export default function InsightsPage() {
  const { t } = useLang();

  const themeWords  = t("themeWords");
  const aprilRecap  = t("aprilRecap");
  const tooltipLabels = t("insightsMoodTooltipLabels");

  const STATS = [
    { emoji: "📝", labelKey: "insightsTotalEntries", value: mockInsights.totalEntries },
    { emoji: "✍️", labelKey: "insightsWords",        value: "2,444" },
    { emoji: "📖", labelKey: "insightsLongest",      value: t("insightsLongestValue") },
    { emoji: "😊", labelKey: "insightsTopMood",      value: `${mockInsights.topMoodEmoji} ${mockInsights.topMood}` },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

      {/* ── PAGE TITLE ── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: "1.6rem" }}>💡</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>
            {t("insightsTitle")}
          </h1>
        </div>
        <p style={{ color: "var(--gray-400)", fontFamily: "var(--font-display)", fontSize: ".95rem" }}>
          {t("insightsSub")}
        </p>
      </div>

      {/* ── 1. STREAK HERO ── */}
      <section
        style={{
          border: "var(--stroke) solid var(--black)",
          borderRadius: "var(--radius-lg)",
          padding: "36px 40px",
          background: "var(--yellow)",
          boxShadow: "var(--shadow-lg)",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 24, flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "4rem", fontWeight: 700, lineHeight: 1, marginBottom: 6 }}>
            {t("insightsDays", 14)}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "rgba(0,0,0,.65)" }}>
            {t("insightsStreakBest")}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: ".9rem", color: "rgba(0,0,0,.5)", marginTop: 8 }}>
            {t("insightsStreakCurrent", 7)}
          </div>
        </div>
        <div
          style={{
            width: 100, height: 100,
            border: "var(--stroke) solid var(--black)",
            borderRadius: "50%", background: "var(--white)",
            boxShadow: "var(--shadow)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "3rem", flexShrink: 0,
          }}
        >
          🔥
        </div>
      </section>

      {/* ── 2. MOOD OVER TIME ── */}
      <section>
        <SectionTitle>{t("insightsMoodTitle")}</SectionTitle>
        <div
          style={{
            border: "var(--stroke) solid var(--black)",
            borderRadius: "var(--radius-lg)",
            padding: "24px 20px 16px",
            background: "var(--white)", boxShadow: "var(--shadow)",
          }}
        >
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MOOD_TIMELINE} margin={{ top: 8, right: 12, left: -28, bottom: 0 }}>
              <XAxis
                dataKey="day"
                tick={{ fontFamily: "var(--font-display)", fontSize: 10, fill: "#888" }}
                tickLine={false}
                axisLine={{ stroke: "#000", strokeWidth: 1.5 }}
                interval={5}
              />
              <YAxis
                domain={[1, 5]} ticks={[1, 2, 3, 4, 5]}
                tickFormatter={(v) => ["", "😣", "😔", "😐", "😌", "😊"][v]}
                tick={{ fontFamily: "var(--font-display)", fontSize: 13 }}
                tickLine={false} axisLine={{ stroke: "#000", strokeWidth: 1.5 }} width={36}
              />
              <Tooltip content={<MoodTooltip labels={tooltipLabels} />} />
              <Line
                type="monotone" dataKey="score" stroke="#F5C842" strokeWidth={3}
                dot={{ r: 3, fill: "#F5C842", stroke: "#000", strokeWidth: 1.5 }}
                activeDot={{ r: 5, fill: "#F5C842", stroke: "#000", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10, alignItems: "center" }}>
            <span style={{ display: "inline-block", width: 28, height: 3, background: "#F5C842", border: "1px solid #000", borderRadius: 2 }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: ".78rem", color: "var(--gray-400)", fontWeight: 600 }}>
              {t("insightsMoodLegend")}
            </span>
          </div>
        </div>
      </section>

      {/* ── 3. THEME CLOUD ── */}
      <section>
        <SectionTitle>{t("insightsThemeTitle")}</SectionTitle>
        <div
          style={{
            border: "var(--stroke) solid var(--black)",
            borderRadius: "var(--radius-lg)", padding: "32px 28px",
            background: "var(--white)", boxShadow: "var(--shadow)",
            display: "flex", flexWrap: "wrap", gap: "12px 20px",
            alignItems: "center", justifyContent: "center", lineHeight: 1.1,
          }}
        >
          {themeWords.map(({ word, size }) => (
            <span
              key={word}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: `${size}rem`, fontWeight: 700,
                color: size > 2 ? "var(--black)" : size > 1.6 ? "rgba(0,0,0,.7)" : "rgba(0,0,0,.45)",
                cursor: "default", userSelect: "none",
                transition: "color .15s", letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--black)"; }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = size > 2 ? "var(--black)" : size > 1.6 ? "rgba(0,0,0,.7)" : "rgba(0,0,0,.45)";
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </section>

      {/* ── 4. MONTHLY RECAP ── */}
      <section>
        <SectionTitle>{t("insightsRecapTitle")}</SectionTitle>
        <div
          style={{
            border: "var(--stroke) solid var(--black)",
            borderRadius: "var(--radius-lg)", padding: "28px 32px",
            background: "var(--yellow)", boxShadow: "var(--shadow-lg)",
          }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "rgba(0,0,0,.5)", marginBottom: 16 }}>
            {t("insightsRecapLabel")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {aprilRecap.map((sentence, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "rgba(0,0,0,.4)", flexShrink: 0, lineHeight: 1.4, marginTop: 2 }}>
                  {i + 1}.
                </span>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", lineHeight: 1.55, color: "var(--black)", margin: 0 }}>
                  {sentence}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. STATS ROW ── */}
      <section>
        <SectionTitle>{t("insightsStatsTitle")}</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 14 }}>
          {STATS.map((s) => (
            <div
              key={s.labelKey}
              style={{
                border: "var(--stroke) solid var(--black)",
                borderRadius: "var(--radius-md)", padding: "20px 18px",
                background: "var(--white)", boxShadow: "var(--shadow)",
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: 10 }}>{s.emoji}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, lineHeight: 1, marginBottom: 6 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: ".82rem", color: "var(--gray-400)", fontWeight: 600 }}>
                {t(s.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
