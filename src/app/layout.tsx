import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "../components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Share Vibe",
  description: "Social media platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-gray-800`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
