"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "../../context/LangContext";

export default function MoodPage() {
  const router = useRouter();
  const { t } = useLang();
  const [selected, setSelected] = useState(null);
  const [note, setNote]         = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastFading,  setToastFading]  = useState(false);

  const MOODS = [
    { emoji: "😊", labelKey: "moodHappy",   label: "happy" },
    { emoji: "😌", labelKey: "moodCalm",    label: "calm" },
    { emoji: "😐", labelKey: "moodNeutral", label: "neutral" },
    { emoji: "😔", labelKey: "moodSad",     label: "sad" },
    { emoji: "😣", labelKey: "moodStressed",label: "stressed" },
  ];

  function handleLog() {
    if (!selected) return;
    setToastVisible(true);
    setTimeout(() => setToastFading(true), 1400);
    setTimeout(() => router.push("/"), 2000);
  }

  return (
    <>
      {/* ── TOAST ── */}
      {toastVisible && (
        <div
          style={{
            position: "fixed",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 28px",
            background: "var(--black)",
            color: "var(--yellow)",
            border: "var(--stroke) solid var(--black)",
            borderRadius: 999,
            fontFamily: "var(--font-display)",
            fontSize: "1.05rem",
            fontWeight: 700,
            boxShadow: "var(--shadow-lg)",
            opacity: toastFading ? 0 : 1,
            transition: "opacity .5s ease",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {t("moodLogged")}
        </div>
      )}

      {/* ── FULL-SCREEN CHECK-IN ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 80px)",
          textAlign: "center",
          gap: 0,
          padding: "0 24px",
        }}
      >
        {/* Big question */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3rem",
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 48,
            maxWidth: 520,
          }}
        >
          {t("moodTitle")}
        </h1>

        {/* 5 mood buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 44,
            flexWrap: "wrap",
          }}
        >
          {MOODS.map((m) => {
            const active = selected?.label === m.label;
            return (
              <button
                key={m.label}
                onClick={() => setSelected(active ? null : m)}
                title={t(m.labelKey)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  width: 90,
                  padding: "16px 0 14px",
                  border: "var(--stroke) solid var(--black)",
                  borderRadius: "var(--radius-md)",
                  background: active ? "var(--yellow)" : "var(--white)",
                  boxShadow: active ? "var(--shadow-lg)" : "var(--shadow)",
                  cursor: "pointer",
                  transform: active ? "scale(1.12) translateY(-4px)" : "scale(1)",
                  transition: "transform .18s ease, background .15s, box-shadow .15s",
                }}
              >
                <span style={{ fontSize: "2.6rem", lineHeight: 1 }}>{m.emoji}</span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: ".82rem",
                    fontWeight: 700,
                    color: "var(--black)",
                    textTransform: "lowercase",
                    letterSpacing: ".02em",
                  }}
                >
                  {t(m.labelKey)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Optional note */}
        <div
          style={{
            width: "100%",
            maxWidth: 440,
            marginBottom: 32,
            opacity: selected ? 1 : 0.38,
            transition: "opacity .25s",
          }}
        >
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("moodNote")}
            disabled={!selected}
            style={{
              width: "100%",
              padding: "12px 18px",
              border: "var(--stroke) solid var(--black)",
              borderRadius: 999,
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              background: "var(--white)",
              boxShadow: "var(--shadow)",
              outline: "none",
              color: "var(--black)",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Log it button */}
        <button
          onClick={handleLog}
          disabled={!selected}
          style={{
            padding: "14px 52px",
            border: "var(--stroke) solid var(--black)",
            borderRadius: 999,
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 700,
            cursor: selected ? "pointer" : "not-allowed",
            background: selected ? "var(--yellow)" : "var(--gray-200)",
            color: "var(--black)",
            boxShadow: selected ? "var(--shadow-lg)" : "none",
            opacity: selected ? 1 : 0.5,
            transform: selected ? "translate(-2px, -2px)" : "none",
            transition: "background .2s, opacity .2s, transform .2s, box-shadow .2s",
          }}
          onMouseEnter={(e) => { if (selected) { e.currentTarget.style.transform = "translate(-3px,-3px)"; }}}
          onMouseLeave={(e) => { if (selected) { e.currentTarget.style.transform = "translate(-2px,-2px)"; }}}
        >
          {t("moodLog")}
        </button>
      </div>
    </>
  );
}
