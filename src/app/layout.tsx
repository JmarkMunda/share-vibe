import "./globals.css";
import type { Metadata } from "next";
import { Karla } from "next/font/google";
import Provider from "../components/Provider";

const inter = Karla({ subsets: ["latin"] });

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
      <body className={`${inter.className} text-gray-800 text-lg`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

