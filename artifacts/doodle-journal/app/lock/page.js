"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLang } from "../../context/LangContext";

const PAD = ["1","2","3","4","5","6","7","8","9","","0","⌫"];

export default function LockPage() {
  const router = useRouter();
  const { t } = useLang();
  const [pin,      setPin]      = useState("");
  const [shake,    setShake]    = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  function handleDigit(d) {
    if (pin.length >= 4 || unlocked) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      setUnlocked(true);
      setTimeout(() => router.push("/"), 650);
    }
  }

  function handleDelete() {
    if (unlocked) return;
    setPin((p) => p.slice(0, -1));
  }

  function handleKey(k) {
    if (k === "⌫") { handleDelete(); return; }
    if (k === "")  return;
    handleDigit(k);
  }

  return (
    <>
      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          15%{transform:translateX(-6px)}
          30%{transform:translateX(6px)}
          45%{transform:translateX(-5px)}
          60%{transform:translateX(5px)}
          75%{transform:translateX(-3px)}
          90%{transform:translateX(3px)}
        }
        @keyframes popIn {
          0%  { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.15); }
          100%{ transform: scale(1);   opacity: 1; }
        }
      `}</style>

      <div
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        <div style={{ maxWidth: 340, width: "100%", textAlign: "center" }}>

          {/* ── Lock emoji ── */}
          <div
            style={{
              fontSize: "4.5rem",
              lineHeight: 1,
              marginBottom: 18,
              display: "inline-block",
              animation: unlocked ? "popIn .4s ease forwards" : undefined,
            }}
          >
            {unlocked ? "🔓" : "🔒"}
          </div>

          {/* ── Heading ── */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: unlocked ? 0 : 8,
            }}
          >
            {unlocked ? t("lockWelcome") : t("lockTitle")}
          </h1>

          {!unlocked && (
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: ".9rem",
                color: "var(--gray-400)",
                marginBottom: 32,
              }}
            >
              {t("lockHint")}
            </p>
          )}

          {/* ── PIN dots ── */}
          {!unlocked && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 18,
                marginBottom: 40,
                animation: shake ? "shake .4s ease" : undefined,
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "var(--stroke) solid var(--black)",
                    background: i < pin.length ? "var(--black)" : "transparent",
                    boxShadow: i < pin.length ? "var(--shadow)" : "none",
                    transition: "background .12s, box-shadow .12s",
                  }}
                />
              ))}
            </div>
          )}

          {/* ── Number pad ── */}
          {!unlocked && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                maxWidth: 280,
                margin: "0 auto 32px",
              }}
            >
              {PAD.map((k, i) => {
                const isBlank  = k === "";
                const isDel    = k === "⌫";
                return (
                  <button
                    key={i}
                    onClick={() => handleKey(k)}
                    disabled={isBlank}
                    style={{
                      height: 60,
                      border: isBlank ? "none" : "var(--stroke) solid var(--black)",
                      borderRadius: 999,
                      fontFamily: "var(--font-display)",
                      fontSize: isDel ? "1.3rem" : "1.6rem",
                      fontWeight: 700,
                      cursor: isBlank ? "default" : "pointer",
                      background: isBlank
                        ? "transparent"
                        : isDel
                        ? "var(--gray-100)"
                        : "var(--white)",
                      boxShadow: isBlank ? "none" : "var(--shadow)",
                      color: "var(--black)",
                      transition: "transform .08s, box-shadow .08s, background .1s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseDown={(e) => {
                      if (!isBlank) {
                        e.currentTarget.style.transform = "translate(2px,2px)";
                        e.currentTarget.style.boxShadow = "1px 1px 0 var(--black)";
                        e.currentTarget.style.background = isDel
                          ? "var(--gray-200)"
                          : "var(--yellow-light)";
                      }
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.boxShadow = isBlank ? "none" : "var(--shadow)";
                      e.currentTarget.style.background = isBlank
                        ? "transparent"
                        : isDel
                        ? "var(--gray-100)"
                        : "var(--white)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.boxShadow = isBlank ? "none" : "var(--shadow)";
                      e.currentTarget.style.background = isBlank
                        ? "transparent"
                        : isDel
                        ? "var(--gray-100)"
                        : "var(--white)";
                    }}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Skip link ── */}
          {!unlocked && (
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: ".9rem",
                fontWeight: 600,
                color: "var(--gray-400)",
                textDecoration: "none",
                borderBottom: "1.5px dashed rgba(0,0,0,.25)",
              }}
            >
              {t("lockSkip")}
            </Link>
          )}

          {/* ── Unlocked state ── */}
          {unlocked && (
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                color: "var(--gray-400)",
                marginTop: 14,
              }}
            >
              {t("lockOpening")}
            </p>
          )}

        </div>
      </div>
    </>
  );
}
