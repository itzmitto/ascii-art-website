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
  title: "ASCII Studio | Image & GIF to ASCII Art",
  description:
    "Turn images and GIFs into beautiful ASCII art directly in your browser. Fast, free and private.",
  keywords: [
    "ASCII art",
    "ASCII converter",
    "image to ASCII",
    "GIF to ASCII",
    "ASCII generator",
    "ASCII Studio",
  ],
  authors: [
    {
      name: "André",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
