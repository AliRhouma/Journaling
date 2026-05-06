"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "../context/LangContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useLang();

  const navItems = [
    {
      group: t("navJournal"),
      links: [
        { href: "/",        label: t("navHome"),        icon: "🏠" },
        { href: "/new",     label: t("navNewEntry"),    icon: "✏️" },
        { href: "/search",  label: t("navSearch"),      icon: "🔍" },
        { href: "/calendar",label: t("navCalendar"),    icon: "📅" },
      ],
    },
    {
      group: t("navReflect"),
      links: [
        { href: "/mood",    label: t("navMood"),        icon: "🌈" },
        { href: "/insights",label: t("navInsights"),    icon: "💡" },
      ],
    },
    {
      group: t("navSettings"),
      links: [
        { href: "/lock",    label: t("navLock"),        icon: "🔒" },
        { href: "/settings",label: t("navSettingsLink"),icon: "⚙️" },
      ],
    },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <svg width="24" height="34" viewBox="0 0 110 160" fill="none" className="wobble">
          <ellipse cx="55" cy="38" rx="25" ry="28" fill="#F5C842" stroke="#1a1a1a" strokeWidth="3.5"/>
          <circle cx="46" cy="35" r="2.5" fill="#1a1a1a"/>
          <circle cx="64" cy="35" r="2.5" fill="#1a1a1a"/>
          <path d="M46 47 Q55 56 64 47" stroke="#1a1a1a" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
          <line x1="55" y1="66" x2="55" y2="118" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="55" y1="82" x2="28" y2="104" stroke="#1a1a1a" strokeWidth="3.2" strokeLinecap="round"/>
          <line x1="55" y1="82" x2="82" y2="104" stroke="#1a1a1a" strokeWidth="3.2" strokeLinecap="round"/>
          <line x1="55" y1="118" x2="36" y2="152" stroke="#1a1a1a" strokeWidth="3.2" strokeLinecap="round"/>
          <line x1="55" y1="118" x2="74" y2="152" stroke="#1a1a1a" strokeWidth="3.2" strokeLinecap="round"/>
        </svg>
        <span>{t("appName")}</span>
      </div>
      <div className="sidebar-tagline">{t("appTagline")}</div>

      {navItems.map((section) => (
        <div key={section.group}>
          <span className="nav-group-label">{section.group}</span>
          {section.links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${isActive ? " active" : ""}`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
