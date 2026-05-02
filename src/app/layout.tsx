
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Support Chat",
  description: "Intelligent customer support powered by AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}