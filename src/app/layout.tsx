import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UiProvider from "@/providers/UiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Etyalab",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><UiProvider>{children}</UiProvider></body>
    </html>
  );
}
