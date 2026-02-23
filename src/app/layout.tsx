import "./globals.css";

import type { Metadata } from "next";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "SPEAKER BOT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="flex justify-between">
          <Nav />
          <main className="grow p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
