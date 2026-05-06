"use client";

import { usePathname } from "next/navigation";

export default function PageWrapper({ children }) {
  const key = usePathname();
  return (
    <div key={key} className="page-enter">
      {children}
    </div>
  );
}
