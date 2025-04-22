import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Coda Fofo",
  description: "Codando Fofo",
};

export default function RootLayout({ children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
