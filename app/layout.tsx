import type { Metadata } from "next";
import "./globals.css";
import Provider from "./Provider";


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
          
          {children}
        </Provider>
      </body>
    </html>
  );
}
