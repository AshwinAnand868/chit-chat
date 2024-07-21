import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./Providers";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chit Chat Chit",
  description: "Stay connected with your friends through this app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
        </body>
    </html>
  );
}
