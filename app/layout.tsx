import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "보름 — YoungCoreCrew 독서 모임",
  description: "AI 시대, 문학의 힘을 믿는 청년들의 독서 모임 플랫폼",
  openGraph: {
    title: "보름",
    description: "AI 시대, 문학의 힘을 믿는 청년들의 독서 모임",
    siteName: "보름",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSerifKR.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
