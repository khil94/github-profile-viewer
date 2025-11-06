import type { Metadata } from "next";
import ThemeProvider from "./components/themeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Github Viewer",
  description: "Get Github user's info",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`antialiased`}>
        <ThemeProvider />
        {children}
      </body>
    </html>
  );
}
