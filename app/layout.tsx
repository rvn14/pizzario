import type { Metadata } from "next";
import "./globals.css";
import Provider from "./Provider";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Pizzario",
  description: "Taste the best pizza in town",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Provider>
          <Preloader />
          {children}
        </Provider>
      </body>
    </html>
  );
}
