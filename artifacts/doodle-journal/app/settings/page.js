"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "../../context/LangContext";
import { mockUser } from "../../data/mock";

/* ─── TOGGLE ────────────────────────────────────────────────────── */

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={on}
      style={{
        width: 50,
        height: 28,
        borderRadius: 999,
        border: "var(--stroke) solid var(--black)",
        background: on ? "var(--yellow)" : "var(--gray-200)",
        position: "relative",
        cursor: "pointer",
        flexShrink: 0,
        transition: "background .18s",
        boxShadow: on ? "var(--shadow)" : "2px 2px 0 rgba(0,0,0,.1)",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 4,
          left: on ? "calc(100% - 22px)" : 4,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "var(--black)",
          transition: "left .18s",
          display: "block",
        }}
      />
    </button>
  );
}

function Row({ icon, label, desc, danger, children, last }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "17px 20px",
        borderBottom: last ? "none" : "1.5px dashed rgba(0,0,0,.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
        {icon && (
          <span
            style={{
              fontSize: "1.2rem",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: danger ? "#FFF0F0" : "var(--gray-100)",
              border: `1.5px solid ${danger ? "#F5C0C0" : "rgba(0,0,0,.1)"}`,
              borderRadius: "var(--radius-sm)",
              flexShrink: 0,
            }}
          >
            {icon}
          </span>
        )}
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              fontWeight: 700,
              color: danger ? "#C0392B" : "var(--black)",
            }}
          >
            {label}
          </div>
          {desc && (
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: ".78rem",
                color: "var(--gray-400)",
                marginTop: 1,
              }}
            >
              {desc}
            </div>
          )}
        </div>
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

function Section({ title, danger, children }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: ".72rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: ".08em",
          color: danger ? "#C0392B" : "var(--gray-400)",
          marginBottom: 10,
          paddingLeft: 4,
        }}
      >
        {title}
      </div>
      <div
        style={{
          border: `var(--stroke) solid ${danger ? "#E74C3C" : "var(--black)"}`,
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          background: "var(--white)",
          boxShadow: danger ? "4px 4px 0 #E74C3C" : "var(--shadow)",
        }}
      >
        {children}
      </div>
    </section>
  );
}

function ActionBtn({ label, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 18px",
        border: `var(--stroke) solid ${danger ? "#E74C3C" : "var(--black)"}`,
        borderRadius: 999,
        fontFamily: "var(--font-display)",
        fontSize: ".9rem",
        fontWeight: 700,
        cursor: "pointer",
        background: danger ? "#FFF5F5" : "var(--white)",
        color: danger ? "#C0392B" : "var(--black)",
        boxShadow: danger ? "3px 3px 0 #E74C3C" : "var(--shadow)",
        transition: "transform .1s, box-shadow .1s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translate(-1px,-1px)";
        e.currentTarget.style.boxShadow = danger ? "4px 4px 0 #E74C3C" : "var(--shadow-lg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = danger ? "3px 3px 0 #E74C3C" : "var(--shadow)";
      }}
    >
      {label}
    </button>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────────── */

export default function SettingsPage() {
  const router = useRouter();
  const { lang, toggleLang, t } = useLang();

  const [pinLock,       setPinLock]       = useState(true);
  const [biometric,     setBiometric]     = useState(false);
  const [darkMode,      setDarkMode]      = useState(false);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [weeklyRecap,   setWeeklyRecap]   = useState(false);
  const [exported,      setExported]      = useState(false);
  const [deleted,       setDeleted]       = useState(false);

  function handleExport() {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  }

  return (
    <>
      {/* ── PAGE TITLE ── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: "1.6rem" }}>⚙️</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>
            {t("settingsTitle")}
          </h1>
        </div>
        <p style={{ color: "var(--gray-400)", fontFamily: "var(--font-display)", fontSize: ".95rem" }}>
          {t("settingsSub")}
        </p>
      </div>

      {/* ── PROFILE ── */}
      <Section title={t("settingsProfile")}>
        <Row icon="👤" label={mockUser.name} desc={t("settingsMemberSince", mockUser.joinDate)} last>
          <ActionBtn label={t("settingsEditProfile")} onClick={() => router.push("/onboarding")} />
        </Row>
      </Section>

      {/* ── SECURITY ── */}
      <Section title={t("settingsSecurity")}>
        <Row icon="🔒" label={t("settingsPinLock")} desc={t("settingsPinLockDesc")}>
          <Toggle on={pinLock} onToggle={() => setPinLock((v) => !v)} />
        </Row>
        <Row icon="👆" label={t("settingsBiometric")} desc={t("settingsBiometricDesc")}>
          <Toggle on={biometric} onToggle={() => setBiometric((v) => !v)} />
        </Row>
        <Row icon="🔑" label={t("settingsChangePIN")} desc={t("settingsChangePINDesc")} last>
          <ActionBtn label={t("settingsChangePINBtn")} onClick={() => router.push("/lock")} />
        </Row>
      </Section>

      {/* ── APPEARANCE ── */}
      <Section title={t("settingsAppearance")}>
        <Row icon="🌙" label={t("settingsDarkMode")} desc={t("settingsDarkModeDesc")}>
          <Toggle on={darkMode} onToggle={() => setDarkMode((v) => !v)} />
        </Row>
        <Row icon="🌐" label={t("settingsLanguage")} desc={t("settingsLanguageDesc")} last>
          <div style={{ display: "flex", gap: 6 }}>
            {[{ id: "en", label: "EN" }, { id: "ar", label: "عربي" }].map((l) => (
              <button
                key={l.id}
                onClick={() => toggleLang(l.id)}
                style={{
                  padding: "5px 14px",
                  border: "var(--stroke) solid var(--black)",
                  borderRadius: 999,
                  fontFamily: "var(--font-display)",
                  fontSize: ".85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: lang === l.id ? "var(--yellow)" : "var(--white)",
                  boxShadow: lang === l.id ? "var(--shadow)" : "2px 2px 0 rgba(0,0,0,.1)",
                  transition: "background .13s",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </Row>
      </Section>

      {/* ── NOTIFICATIONS ── */}
      <Section title={t("settingsNotifications")}>
        <Row icon="⏰" label={t("settingsDailyReminder")} desc={t("settingsDailyReminderDesc")}>
          <Toggle on={dailyReminder} onToggle={() => setDailyReminder((v) => !v)} />
        </Row>
        <Row icon="📧" label={t("settingsWeeklyRecap")} desc={t("settingsWeeklyRecapDesc")} last>
          <Toggle on={weeklyRecap} onToggle={() => setWeeklyRecap((v) => !v)} />
        </Row>
      </Section>

      {/* ── DATA ── */}
      <Section title={t("settingsData")}>
        <Row icon="📤" label={t("settingsExport")} desc={t("settingsExportDesc")} last>
          <ActionBtn
            label={exported ? t("settingsExportDone") : t("settingsExportBtn")}
            onClick={handleExport}
          />
        </Row>
      </Section>

      {/* ── DANGER ZONE ── */}
      <Section title={t("settingsDanger")} danger>
        <Row icon="🗑️" label={t("settingsDeleteAll")} desc={t("settingsDeleteAllDesc")} danger last>
          {deleted ? (
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: ".85rem",
                color: "var(--gray-400)",
              }}
            >
              {t("settingsDeleteDone")}
            </span>
          ) : (
            <ActionBtn
              label={t("settingsDeleteBtn")}
              danger
              onClick={() => setDeleted(true)}
            />
          )}
        </Row>
      </Section>
    </>
  );
}
