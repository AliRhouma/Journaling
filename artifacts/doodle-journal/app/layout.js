import "./globals.css";
import { LangProvider } from "../context/LangContext";
import Sidebar from "../components/Sidebar";
import LangSwitcher from "../components/LangSwitcher";
import PageWrapper from "../components/PageWrapper";
import DemoBadge from "../components/DemoBadge";

export const metadata = {
  title: "Doodle Journal",
  description: "Your personal hand-drawn journaling space",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <LangProvider>
          <Sidebar />
          <LangSwitcher />
          <main className="main-content">
            <PageWrapper>{children}</PageWrapper>
          </main>
          <DemoBadge />
        </LangProvider>
      </body>
    </html>
  );
}
