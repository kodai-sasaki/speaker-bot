import "./globals.css";

import { Nav } from "@/components/nav";
import type { Metadata } from "next";

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
