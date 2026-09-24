import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "LocalTrip | Local experiences in New Zealand",
  description:
    "Meet LocalTrip, a fictional New Zealand activity operator. A portfolio preview; activities and reservations are not yet available.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-NZ">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
