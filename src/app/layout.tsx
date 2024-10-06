import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Notification from "@/components/Notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VocabApp",
  description: "シンプルで高機能な英単語帳アプリです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Notification />
        {children}
      </body>
    </html>
  );
}
