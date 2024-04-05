import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
