import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = { title: "GPS BARN APP" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex">
        <Header />
        <div className="border-4 border-gray-200">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
