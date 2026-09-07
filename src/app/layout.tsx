import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shailesh Jaiswal | Full Stack Developer & Gen AI Engineer",
  description: "Portfolio of Shailesh Jaiswal, showcasing full-stack MERN development, Generative AI agent integration (LangChain, LangGraph), and competitive programming accomplishments.",
  keywords: ["Shailesh Jaiswal", "Full Stack Developer", "MERN Stack", "Next.js", "Gen AI", "LangGraph", "React Developer", "Software Engineer Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
