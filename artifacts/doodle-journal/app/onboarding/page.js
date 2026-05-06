"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useLang } from "../../context/LangContext";

function ProgressDots({ current, total }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? 28 : 8,
            height: 8,
            borderRadius: 999,
            background: i <= current ? "var(--black)" : "var(--gray-200)",
            border: "1.5px solid var(--black)",
            transition: "width .25s ease, background .25s ease",
          }}
        />
      ))}
    </div>
  );
}

function StepNav({ onBack, onNext, nextLabel, showBack = true, nextDisabled = false }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36 }}>
      {showBack ? (
        <Button variant="ghost" onClick={onBack}>{nextLabel /* unused – passed separately */}</Button>
      ) : (
        <div />
      )}
      <Button variant="primary" onClick={onNext} disabled={nextDisabled}>
        {nextLabel}
      </Button>
    </div>
  );
}

/* ── STEP 1: WELCOME ── */
function Step1({ onNext, t }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: 140, height: 140, borderRadius: "50%",
          border: "var(--stroke) solid var(--black)",
          background: "var(--yellow-light)", boxShadow: "var(--shadow)",
          margin: "0 auto 32px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "4rem",
          animation: "float 3s ease-in-out infinite",
        }}
      >
        📓
      </div>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 6vw, 3rem)",
          fontWeight: 700, lineHeight: 1.2, marginBottom: 16,
        }}
      >
        {t("onboardingHey")}
      </h1>

      <p style={{ color: "var(--gray-600)", fontSize: "1.05rem", maxWidth: 380, margin: "0 auto 8px", lineHeight: 1.6 }}>
        {t("onboardingDesc")}
      </p>

      <p style={{ color: "var(--gray-400)", fontSize: ".9rem", marginBottom: 0 }}>
        {t("onboardingTime")}
      </p>

      <div style={{ marginTop: 36 }}>
        <Button variant="primary" onClick={onNext}>
          {t("onboardingStart")}
        </Button>
      </div>
    </div>
  );
}

/* ── STEP 2: PICK A STYLE ── */
function Step2({ selected, onSelect, onBack, onNext, t }) {
  const STYLES = [
    { id: "free",      emoji: "✍️", labelKey: "styleFreeLabel",      descKey: "styleFreeDesc" },
    { id: "gratitude", emoji: "🌻", labelKey: "styleGratitudeLabel", descKey: "styleGratitudeDesc" },
    { id: "dream",     emoji: "🌙", labelKey: "styleDreamLabel",      descKey: "styleDreamDesc" },
    { id: "morning",   emoji: "☀️", labelKey: "styleMorningLabel",   descKey: "styleMorningDesc" },
  ];

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: 10 }}>
          {t("onboardingStyleTitle")}
        </h1>
        <p style={{ color: "var(--gray-600)", fontSize: "1rem" }}>
          {t("onboardingStyleSub")}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
        {STYLES.map((s) => {
          const isActive = selected === s.id;
          return (
            <Card
              key={s.id}
              onClick={() => onSelect(s.id)}
              style={{
                cursor: "pointer",
                background: isActive ? "var(--yellow)" : "var(--white)",
                transition: "background .15s, transform .15s, box-shadow .15s",
                transform: isActive ? "translate(-2px,-2px)" : "none",
                boxShadow: isActive ? "var(--shadow-lg)" : "var(--shadow)",
                userSelect: "none",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: 10 }}>{s.emoji}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 6 }}>
                {t(s.labelKey)}
              </div>
              <div style={{ fontSize: ".88rem", color: "var(--gray-600)", lineHeight: 1.4 }}>
                {t(s.descKey)}
              </div>
            </Card>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36 }}>
        <Button variant="ghost" onClick={onBack}>{t("btnBack")}</Button>
        <Button variant="primary" onClick={onNext} disabled={!selected}>{t("btnNext")}</Button>
      </div>
    </div>
  );
}

/* ── STEP 3: FREQUENCY ── */
function Step3({ selected, onSelect, onBack, onNext, t }) {
  const FREQUENCIES = [
    { id: "daily",    labelKey: "freqDaily" },
    { id: "few",      labelKey: "freqFew" },
    { id: "whenever", labelKey: "freqWhenever" },
  ];

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: "3rem", marginBottom: 20, animation: "wobble 3s ease-in-out infinite", display: "inline-block", transformOrigin: "bottom center" }}>
          📅
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: 10 }}>
          {t("onboardingFreqTitle")}
        </h1>
        <p style={{ color: "var(--gray-600)", fontSize: "1rem" }}>
          {t("onboardingFreqSub")}
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
        {FREQUENCIES.map((f) => {
          const isActive = selected === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onSelect(f.id)}
              style={{
                padding: "16px 32px",
                border: "var(--stroke) solid var(--black)",
                borderRadius: 999,
                fontFamily: "var(--font-display)",
                fontSize: "1.15rem", fontWeight: 600,
                cursor: "pointer",
                background: isActive ? "var(--yellow)" : "var(--white)",
                boxShadow: isActive ? "var(--shadow-lg)" : "var(--shadow)",
                transform: isActive ? "translate(-2px,-2px)" : "none",
                transition: "background .15s, transform .15s, box-shadow .15s",
                color: "var(--black)",
              }}
            >
              {t(f.labelKey)}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36 }}>
        <Button variant="ghost" onClick={onBack}>{t("btnBack")}</Button>
        <Button variant="primary" onClick={onNext} disabled={!selected}>{t("btnNext")}</Button>
      </div>
    </div>
  );
}

/* ── STEP 4: PRIVACY ── */
function Step4({ pinLock, localOnly, onTogglePin, onToggleLocal, onBack, onFinish, t }) {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: "3rem", marginBottom: 20, animation: "pop 2s ease-in-out infinite", display: "inline-block" }}>
          🔒
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: 10 }}>
          {t("onboardingPrivacyTitle")}
        </h1>
        <p style={{ color: "var(--gray-600)", fontSize: "1rem" }}>
          {t("onboardingPrivacySub")}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 480, margin: "0 auto" }}>
        <Card style={{ padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, marginBottom: 4 }}>
                {t("onboardingPinLock")}
              </div>
              <div style={{ fontSize: ".88rem", color: "var(--gray-600)" }}>
                {t("onboardingPinDesc")}
              </div>
            </div>
            <VisualToggle on={pinLock} onToggle={onTogglePin} />
          </div>
        </Card>

        <Card style={{ padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, marginBottom: 4 }}>
                {t("onboardingLocal")}
              </div>
              <div style={{ fontSize: ".88rem", color: "var(--gray-600)" }}>
                {t("onboardingLocalDesc")}
              </div>
            </div>
            <VisualToggle on={localOnly} onToggle={onToggleLocal} />
          </div>
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36 }}>
        <Button variant="ghost" onClick={onBack}>{t("btnBack")}</Button>
        <Button variant="primary" onClick={onFinish}>{t("btnFinish")}</Button>
      </div>
    </div>
  );
}

function VisualToggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={on}
      style={{
        flexShrink: 0, width: 52, height: 28, borderRadius: 999,
        border: "var(--stroke) solid var(--black)",
        background: on ? "var(--yellow)" : "var(--gray-200)",
        position: "relative", cursor: "pointer",
        transition: "background .2s", boxShadow: "var(--shadow)",
      }}
    >
      <div
        style={{
          position: "absolute", top: 4,
          left: on ? "calc(100% - 22px)" : 4,
          width: 16, height: 16,
          borderRadius: "50%", background: "var(--black)",
          transition: "left .2s",
        }}
      />
    </button>
  );
}

/* ── MAIN COMPONENT ── */
export default function OnboardingPage() {
  const router = useRouter();
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [style, setStyle] = useState(null);
  const [frequency, setFrequency] = useState(null);
  const [pinLock, setPinLock] = useState(false);
  const [localOnly, setLocalOnly] = useState(true);

  const totalSteps = 4;

  function next() { setStep((s) => Math.min(s + 1, totalSteps - 1)); }
  function back() { setStep((s) => Math.max(s - 1, 0)); }
  function finish() { router.push("/"); }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ maxWidth: 560, width: "100%" }}>
        <ProgressDots current={step} total={totalSteps} />

        <div
          style={{
            border: "var(--stroke) solid var(--black)",
            borderRadius: "var(--radius-lg)",
            padding: "40px 36px",
            background: "var(--white)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {step === 0 && <Step1 onNext={next} t={t} />}
          {step === 1 && <Step2 selected={style} onSelect={setStyle} onBack={back} onNext={next} t={t} />}
          {step === 2 && <Step3 selected={frequency} onSelect={setFrequency} onBack={back} onNext={next} t={t} />}
          {step === 3 && (
            <Step4
              pinLock={pinLock} localOnly={localOnly}
              onTogglePin={() => setPinLock((v) => !v)}
              onToggleLocal={() => setLocalOnly((v) => !v)}
              onBack={back} onFinish={finish} t={t}
            />
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 20, fontFamily: "var(--font-display)", fontSize: ".88rem", color: "var(--gray-400)" }}>
          {t("stepOf", step + 1, totalSteps)}
        </div>
      </div>
    </div>
  );
}
