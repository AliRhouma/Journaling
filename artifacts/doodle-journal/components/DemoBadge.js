"use client";
import { useLang } from "../context/LangContext";

export default function DemoBadge() {
  const { t } = useLang();
  return (
    <div className="demo-badge">
      <span>🎨</span>
      <span>{t("demoBadge")}</span>
    </div>
  );
}
