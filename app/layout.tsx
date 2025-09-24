import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/Footer";
import { ReactLenis } from 'lenis/react';

export const metadata: Metadata = {
  title: "Pizzario - Taste the best pizza in town",
  description: "Taste the best pizza in town",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased w-full min-h-screen overflow-x-hidden`}>
        <ReactLenis root>
          {children}
          <Footer />
        </ReactLenis>
        <Toaster />
      </body>
    </html>
  );
}
