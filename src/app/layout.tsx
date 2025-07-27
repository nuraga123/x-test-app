import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "antd/dist/reset.css";
import ClientLayout from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "GPS BARN APP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="toast-container">
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
