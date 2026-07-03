import type { Metadata } from "next";
import "../css-reset/reset.css";

export const metadata: Metadata = {
  title: "limsystem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
