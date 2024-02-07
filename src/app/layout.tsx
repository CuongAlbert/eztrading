import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EZTRADING",
  description: "A Leading B2B Gateway to Vietnam's Sustainable Supply Chain",
  openGraph: {
    title: "EZTRADING",
    description: "A Leading B2B Gateway to Vietnam's Sustainable Supply Chain",
    type: "website",
    locale: "en_US",
    url: "https://eztrading.ca/og-image.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          suppressHydrationWarning
          className={`${inter.className} h-screen antialiased overflow-scroll`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
