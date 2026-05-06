"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "../../context/LangContext";

const AUTO_TAGS = [
  { icon: "📍", label: "Tunis" },
  { icon: "☀️", label: "24°C" },
  { icon: "🎵", label: "lo-fi" },
];

const TAG_SUGGESTIONS = [
  "morning", "work", "gratitude", "nature", "friends",
  "reflection", "dream", "travel", "food", "health",
];

/* Template content (language-neutral structure) */
const TEMPLATE_CONTENTS = {
  morning:   "Today I woke up feeling…\n\nThe first thing on my mind is…\n\nSomething I want to let go of today…\n\nWhat I'm looking forward to…",
  gratitude: "Three things I'm grateful for today:\n\n1. \n\n2. \n\n3. \n\nThe one that means most to me right now is… because…",
  dream:     "Last night I dreamed about…\n\nThe feeling was…\n\nImages I remember clearly…\n\nI think it might connect to…",
  cbt:       "Situation: (what happened?)\n\nAutomatic thought: (what went through my mind?)\n\nEmotion: (what did I feel, and how intense 0–100%?)\n\nEvidence FOR this thought:\n—\n\nEvidence AGAINST this thought:\n—\n\nBalanced thought:\n\nHow do I feel now? (0–100%)",
  travel:    "Where I am:\n\nWhat I see around me…\n\nSounds and smells…\n\nThe highlight so far…\n\nSomething unexpected…\n\nI want to remember this because…",
  custom:    "",
};

const TEMPLATES_META = [
  { id: "morning",   emoji: "🌅", nameKey: "tmplMorningName",   descKey: "tmplMorningDesc" },
  { id: "gratitude", emoji: "🙏", nameKey: "tmplGratitudeName", descKey: "tmplGratitudeDesc" },
  { id: "dream",     emoji: "🌙", nameKey: "tmplDreamName",      descKey: "tmplDreamDesc" },
  { id: "cbt",       emoji: "🧠", nameKey: "tmplCBTName",        descKey: "tmplCBTDesc" },
  { id: "travel",    emoji: "✈️", nameKey: "tmplTravelName",    descKey: "tmplTravelDesc" },
  { id: "custom",    emoji: "➕", nameKey: "tmplCustomName",    descKey: "tmplCustomDesc" },
];

function now(locale) {
  const d = new Date();
  return d.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", { weekday: "long", month: "long", day: "numeric" });
}

function clock(locale) {
  const d = new Date();
  return d.toLocaleTimeString(locale === "ar" ? "ar-SA" : "en-US", { hour: "2-digit", minute: "2-digit" });
}

/* ─── INLINE PANELS ─────────────────────────────────────────────── */

function PhotoPanel({ t }) {
  return (
    <div style={{ padding: "20px 0" }}>
      <div
        style={{
          border: "var(--stroke) dashed var(--black)", borderRadius: "var(--radius-md)",
          padding: "36px 24px", textAlign: "center", background: "var(--gray-100)", cursor: "pointer",
        }}
      >
        <div style={{ fontSize: "2.2rem", marginBottom: 10 }}>📷</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700 }}>
          {t("newDropPhoto")}
        </div>
        <div style={{ fontSize: ".88rem", color: "var(--gray-600)", marginTop: 4 }}>
          {t("newDropPhotoSub")}
        </div>
      </div>
    </div>
  );
}

function VoicePanel({ t }) {
  const [recording, setRecording] = useState(false);
  return (
    <div style={{ padding: "20px 0", textAlign: "center" }}>
      <button
        onClick={() => setRecording((r) => !r)}
        style={{
          width: 80, height: 80, borderRadius: "50%",
          border: "var(--stroke) solid var(--black)",
          background: recording ? "#e53935" : "var(--yellow)",
          boxShadow: recording ? "0 0 0 8px rgba(229,57,53,.18)" : "var(--shadow)",
          cursor: "pointer", fontSize: "2rem",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          transition: "background .2s, box-shadow .2s",
          animation: recording ? "pop 1.5s ease-in-out infinite" : "none",
        }}
      >
        {recording ? "⏹" : "🎙️"}
      </button>
      <div style={{ marginTop: 14, fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700 }}>
        {recording ? t("newRecordStop") : t("newRecordStart")}
      </div>
      <div style={{ fontSize: ".82rem", color: "var(--gray-400)", marginTop: 4 }}>
        {t("newTranscribed")}
      </div>
    </div>
  );
}

function TagPanel({ activeTags, onToggle, t }) {
  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: ".82rem", fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 12 }}>
        {t("newSuggestedTags")}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {TAG_SUGGESTIONS.map((tag) => {
          const active = activeTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onToggle(tag)}
              style={{
                padding: "5px 14px", border: "var(--stroke) solid var(--black)", borderRadius: 999,
                fontFamily: "var(--font-display)", fontSize: ".9rem", fontWeight: 600,
                cursor: "pointer",
                background: active ? "var(--yellow)" : "var(--white)",
                boxShadow: active ? "var(--shadow)" : "2px 2px 0 rgba(0,0,0,.15)",
                transition: "background .15s", color: "var(--black)",
              }}
            >
              #{tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AIPanel({ onUse, t }) {
  const prompts = t("aiPrompts");
  const [idx, setIdx] = useState(0);
  return (
    <div style={{ padding: "16px 0" }}>
      <div
        style={{
          border: "var(--stroke) solid var(--black)", borderRadius: "var(--radius-md)",
          padding: "18px 20px", background: "var(--yellow-light)", boxShadow: "var(--shadow)",
          animation: "float 3.5s ease-in-out infinite",
        }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: ".78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--gray-600)", marginBottom: 8 }}>
          {t("newAITryPrompt")}
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>
          "{prompts[idx % prompts.length]}"
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => onUse(prompts[idx % prompts.length])}
            style={{
              padding: "8px 20px", border: "var(--stroke) solid var(--black)", borderRadius: 999,
              fontFamily: "var(--font-display)", fontSize: ".95rem", fontWeight: 600,
              cursor: "pointer", background: "var(--black)", color: "var(--yellow)", boxShadow: "var(--shadow)",
            }}
          >
            {t("newAIUse")}
          </button>
          <button
            onClick={() => setIdx((i) => (i + 1) % prompts.length)}
            style={{
              padding: "8px 20px", border: "var(--stroke) solid var(--black)", borderRadius: 999,
              fontFamily: "var(--font-display)", fontSize: ".95rem", fontWeight: 600,
              cursor: "pointer", background: "var(--white)", boxShadow: "var(--shadow)",
            }}
          >
            {t("newAIAnother")}
          </button>
        </div>
      </div>
    </div>
  );
}

function TemplatesModal({ onUse, onClose, t }) {
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(10,10,10,.6)", backdropFilter: "blur(2px)", zIndex: 300 }} />
      <div
        style={{
          position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          zIndex: 301, width: "min(640px, calc(100vw - 48px))", maxHeight: "80vh", overflowY: "auto",
          background: "var(--white)", border: "var(--stroke) solid var(--black)",
          borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", padding: "28px 28px 24px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, lineHeight: 1.1 }}>
              📋 {t("newTemplatesTitle")}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, border: "var(--stroke) solid var(--black)", borderRadius: "50%",
              background: "var(--white)", cursor: "pointer", fontFamily: "var(--font-display)",
              fontSize: "1rem", fontWeight: 700, boxShadow: "var(--shadow)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {TEMPLATES_META.map((tmpl) => (
            <div
              key={tmpl.id}
              style={{
                border: "var(--stroke) solid var(--black)", borderRadius: "var(--radius-md)",
                padding: "18px 18px 14px", background: "var(--white)", boxShadow: "var(--shadow)",
                display: "flex", flexDirection: "column", gap: 10,
              }}
            >
              <div>
                <div style={{ fontSize: "1.8rem", marginBottom: 6, lineHeight: 1 }}>{tmpl.emoji}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.2, marginBottom: 4 }}>
                  {t(tmpl.nameKey)}
                </div>
                <div style={{ fontSize: ".82rem", color: "var(--gray-600)", lineHeight: 1.4 }}>
                  {t(tmpl.descKey)}
                </div>
              </div>
              <button
                onClick={() => onUse(TEMPLATE_CONTENTS[tmpl.id])}
                style={{
                  marginTop: "auto", padding: "7px 0",
                  border: "var(--stroke) solid var(--black)", borderRadius: 999,
                  fontFamily: "var(--font-display)", fontSize: ".9rem", fontWeight: 700,
                  cursor: "pointer", background: "var(--yellow)", color: "var(--black)",
                  boxShadow: "var(--shadow)", transition: "transform .15s, box-shadow .15s", width: "100%",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-1px,-1px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
              >
                {t("newTemplatesUse")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────────── */

export default function NewEntryPage() {
  const router = useRouter();
  const { t, lang } = useLang();
  const textareaRef = useRef(null);

  const [content, setContent] = useState("");
  const [mood, setMood] = useState(null);
  const [activeTags, setActiveTags] = useState([]);
  const [openPanel, setOpenPanel] = useState(null);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [showStuck, setShowStuck] = useState(false);
  const [stuckIdx, setStuckIdx] = useState(0);
  const [saved, setSaved] = useState(false);
  const [timeStr, setTimeStr] = useState(() => clock(lang));

  useEffect(() => {
    const id = setInterval(() => setTimeStr(clock(lang)), 30000);
    return () => clearInterval(id);
  }, [lang]);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const MOODS = [
    { emoji: "😊", labelKey: "moodHappy",    label: "happy" },
    { emoji: "😌", labelKey: "moodCalm",     label: "calm" },
    { emoji: "😐", labelKey: "moodNeutral",  label: "neutral" },
    { emoji: "😔", labelKey: "moodSad",      label: "sad" },
    { emoji: "😣", labelKey: "moodStressed", label: "stressed" },
  ];

  const TOOLBAR = [
    { id: "photo",     icon: "📷", labelKey: "newPhotoLabel" },
    { id: "voice",     icon: "🎙️", labelKey: "newVoiceLabel" },
    { id: "tag",       icon: "🏷️", labelKey: "newTagLabel" },
    { id: "ai",        icon: "✨", labelKey: "newAILabel" },
    { id: "templates", icon: "📋", labelKey: "newTemplatesLabel" },
  ];

  const prompts = t("aiPrompts");

  function togglePanel(id) {
    if (id === "templates") { setShowTemplatesModal(true); setOpenPanel(null); return; }
    setOpenPanel((p) => (p === id ? null : id));
  }

  function toggleTag(tag) {
    setActiveTags((prev) => prev.includes(tag) ? prev.filter((tg) => tg !== tag) : [...prev, tag]);
  }

  function insertPrompt(text) {
    const prefix = content ? content + "\n\n" : "";
    setContent(prefix + text + "\n");
    setOpenPanel(null);
    setShowStuck(false);
    setTimeout(() => textareaRef.current?.focus(), 50);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => router.push("/"), 700);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)", gap: 0 }}>

      {/* ── TOP BAR ── */}
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 12, paddingBottom: 20, marginBottom: 4,
          borderBottom: "var(--stroke) dashed rgba(0,0,0,.15)",
          position: "sticky", top: 0, background: "var(--white)", zIndex: 10, paddingTop: 4,
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            border: "var(--stroke) solid var(--black)", borderRadius: 999,
            padding: "7px 16px", fontFamily: "var(--font-display)",
            fontSize: "1rem", fontWeight: 600, background: "var(--white)",
            cursor: "pointer", boxShadow: "var(--shadow)", color: "var(--black)", flexShrink: 0,
          }}
        >
          {t("newBack")}
        </button>

        <div style={{ textAlign: "center", flex: 1 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, lineHeight: 1.2 }}>
            {now(lang)}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: ".9rem", color: "var(--gray-400)" }}>
            {timeStr}
          </div>
        </div>

        <button
          onClick={handleSave}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            border: "var(--stroke) solid var(--black)", borderRadius: 999,
            padding: "8px 22px", fontFamily: "var(--font-display)",
            fontSize: "1rem", fontWeight: 700,
            background: saved ? "var(--black)" : "var(--yellow)",
            color: saved ? "var(--yellow)" : "var(--black)",
            cursor: "pointer", boxShadow: "var(--shadow)",
            transition: "background .2s, color .2s", flexShrink: 0,
          }}
        >
          {saved ? "✓" : t("newSave")}
        </button>
      </div>

      {/* ── MOOD STRIP ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 14, paddingBottom: 14, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: ".82rem", fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: ".06em", marginRight: 4 }}>
          {t("navMood")}
        </span>
        {MOODS.map((m) => {
          const active = mood === m.label;
          return (
            <button
              key={m.label}
              onClick={() => setMood(active ? null : m.label)}
              title={t(m.labelKey)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 14px",
                border: "var(--stroke) solid var(--black)", borderRadius: 999,
                fontFamily: "var(--font-display)", fontSize: ".95rem", fontWeight: 600,
                cursor: "pointer",
                background: active ? "var(--yellow)" : "var(--white)",
                boxShadow: active ? "var(--shadow)" : "2px 2px 0 rgba(0,0,0,.12)",
                transform: active ? "translate(-1px,-1px)" : "none",
                transition: "background .15s, transform .15s, box-shadow .15s", color: "var(--black)",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{m.emoji}</span>
              <span style={{ fontSize: ".85rem" }}>{t(m.labelKey)}</span>
            </button>
          );
        })}
      </div>

      {/* ── AUTO TAGS ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 18, borderBottom: "var(--stroke) dashed rgba(0,0,0,.1)", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: ".78rem", fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: ".06em" }}>
          detected
        </span>
        {AUTO_TAGS.map((tag) => (
          <span
            key={tag.label}
            style={{
              display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px",
              border: "1.5px solid rgba(0,0,0,.18)", borderRadius: 999,
              fontFamily: "var(--font-body)", fontSize: ".82rem",
              background: "var(--gray-100)", color: "var(--gray-600)",
            }}
          >
            {tag.icon} {tag.label}
          </span>
        ))}
        {activeTags.map((tag) => (
          <span
            key={tag}
            style={{
              display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px",
              border: "var(--stroke) solid var(--black)", borderRadius: 999,
              fontFamily: "var(--font-display)", fontSize: ".82rem", fontWeight: 600,
              background: "var(--yellow-light)", color: "var(--black)", cursor: "pointer",
            }}
            onClick={() => toggleTag(tag)}
          >
            #{tag} ×
          </span>
        ))}
      </div>

      {/* ── PAPER TEXTAREA ── */}
      <div
        style={{
          flex: 1, position: "relative",
          backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(170,170,170,.22) 31px, rgba(170,170,170,.22) 32px)",
          backgroundSize: "100% 32px", backgroundAttachment: "local",
          margin: "0 -4px", padding: "0 4px",
        }}
      >
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoFocus
          placeholder={t("newPlaceholder")}
          style={{
            width: "100%", minHeight: "42vh", background: "transparent",
            border: "none", outline: "none", resize: "none",
            fontFamily: "var(--font-body)", fontSize: "1.2rem", lineHeight: "32px",
            color: "var(--black)", paddingTop: "6px", paddingLeft: 0, paddingRight: 0,
            caretColor: "var(--black)",
          }}
        />
        <style>{`textarea::placeholder { color: var(--gray-400); }`}</style>
      </div>

      {/* Word count */}
      <div style={{ textAlign: "right", fontFamily: "var(--font-display)", fontSize: ".82rem", color: "var(--gray-400)", padding: "8px 0 4px" }}>
        {t("newWords", wordCount)}
      </div>

      {/* ── INLINE PANELS ── */}
      {openPanel === "photo" && <PhotoPanel t={t} />}
      {openPanel === "voice" && <VoicePanel t={t} />}
      {openPanel === "tag"   && <TagPanel activeTags={activeTags} onToggle={toggleTag} t={t} />}
      {openPanel === "ai"    && <AIPanel onUse={insertPrompt} t={t} />}

      {/* ── BOTTOM TOOLBAR ── */}
      <div
        style={{
          position: "sticky", bottom: 0, background: "var(--white)",
          borderTop: "var(--stroke) solid var(--black)", padding: "12px 0 14px",
          display: "flex", alignItems: "center", gap: 4, zIndex: 10,
        }}
      >
        {TOOLBAR.map((item) => {
          const active = openPanel === item.id;
          return (
            <button
              key={item.id}
              onClick={() => togglePanel(item.id)}
              title={t(item.labelKey)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                padding: "8px 14px",
                border: active ? "var(--stroke) solid var(--black)" : "var(--stroke) solid transparent",
                borderRadius: "var(--radius-sm)", fontFamily: "var(--font-display)",
                fontSize: ".78rem", fontWeight: 600, cursor: "pointer",
                background: active ? "var(--yellow)" : "transparent",
                boxShadow: active ? "var(--shadow)" : "none",
                color: active ? "var(--black)" : "var(--gray-600)",
                transition: "background .15s, border-color .15s, color .15s", flex: 1,
              }}
              onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "var(--gray-100)"; e.currentTarget.style.borderColor = "var(--gray-200)"; }}}
              onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}}
            >
              <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>{item.icon}</span>
              <span>{t(item.labelKey)}</span>
            </button>
          );
        })}
      </div>

      {/* ── "STUCK?" FLOATING BUTTON ── */}
      <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 200, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
        {showStuck && (
          <div style={{ border: "var(--stroke) solid var(--black)", borderRadius: "var(--radius-lg)", padding: "18px 20px", background: "var(--white)", boxShadow: "var(--shadow-lg)", width: 260 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: ".78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--gray-400)", marginBottom: 8 }}>
              {t("newAITryPrompt")}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.3, marginBottom: 14 }}>
              "{prompts[stuckIdx % prompts.length]}"
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => insertPrompt(prompts[stuckIdx % prompts.length])}
                style={{ flex: 1, padding: "7px 0", border: "var(--stroke) solid var(--black)", borderRadius: 999, fontFamily: "var(--font-display)", fontSize: ".9rem", fontWeight: 700, cursor: "pointer", background: "var(--black)", color: "var(--yellow)", boxShadow: "var(--shadow)" }}
              >
                {t("newAIUse")}
              </button>
              <button
                onClick={() => setStuckIdx((i) => (i + 1) % prompts.length)}
                style={{ flex: 1, padding: "7px 0", border: "var(--stroke) solid var(--black)", borderRadius: 999, fontFamily: "var(--font-display)", fontSize: ".9rem", fontWeight: 700, cursor: "pointer", background: "var(--white)", boxShadow: "var(--shadow)" }}
              >
                {t("newAIAnother")}
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowStuck((s) => !s)}
          style={{
            display: "flex", alignItems: "center", gap: 8, padding: "12px 22px",
            border: "var(--stroke) solid var(--black)", borderRadius: 999,
            fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700,
            cursor: "pointer",
            background: showStuck ? "var(--black)" : "var(--yellow)",
            color: showStuck ? "var(--yellow)" : "var(--black)",
            boxShadow: showStuck ? "var(--shadow-lg)" : "var(--shadow)",
            transition: "background .2s, color .2s, box-shadow .2s",
          }}
        >
          {showStuck ? `✕ ${t("newTemplatesClose")}` : `✨ ${t("newStuck")}`}
        </button>
      </div>

      {/* ── TEMPLATES MODAL ── */}
      {showTemplatesModal && (
        <TemplatesModal
          t={t}
          onClose={() => setShowTemplatesModal(false)}
          onUse={(text) => {
            setContent(text);
            setShowTemplatesModal(false);
            setTimeout(() => textareaRef.current?.focus(), 50);
          }}
        />
      )}

    </div>
  );
}
