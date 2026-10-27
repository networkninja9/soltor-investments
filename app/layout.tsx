import type { Metadata } from "next";
import InvestmentAssistant from "./components/InvestmentAssistant";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soltor Capital | International Real Asset Investment",
  description: "A considered international investment perspective on private aviation, exceptional estates, land, and real estate development.",
  metadataBase: new URL(process.env.APP_BASE_URL || "https://soltorcapital.com")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<InvestmentAssistant /></body></html>;
}
