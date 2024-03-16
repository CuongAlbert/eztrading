import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EZTRADING",
  description: "A Leading B2B Gateway to Vietnam's Sustainable Supply Chain",
  metadataBase: new URL("https://eztrading.ca"),
  openGraph: {
    title: "EZTRADING",
    description: "A Leading B2B Gateway to Vietnam's Sustainable Supply Chain",
    type: "website",
    locale: "en_US",
    images: "/og-image.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-screen overflow-clip">
        <head>
          <script async src="https://tally.so/widgets/embed.js"></script>
        </head>
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
