import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast';
import { Providers } from "@/components/Providers";
import SyncObserver from "@/components/SyncObserver";
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linkle | URL Kısaltıcı",
  description: "Hızlı ve basit URL kısaltıcı.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-gray-900 text-white antialiased`}>
        <Providers>
          <SyncObserver />{children}</Providers>
        <Toaster position="top-right" reverseOrder={false} />
        <Footer/>
      </body>
    </html>
  );
}
