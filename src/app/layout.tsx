import { authOptions } from "@/lib/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import Providers from "./Providers";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chit Chat Chit",
  description: "Stay connected with your friends through this app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);
  // if (!session) notFound();

  return (
    <html lang="en">
      <body className={inter.className}>
          <Providers>
            <Navbar session={session} />
            {children}
          </Providers>
      </body>
    </html>
  );
}
