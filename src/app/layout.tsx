import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReduxProvider } from './redux-provider';
import "./globals.scss";
import { ToasterProvider } from "@/features/toaster/ToasterProvider";
import { ToasterContainer } from "@/features/toaster/ToasterContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyNews",
  description: "News Portal Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <ToasterProvider>
            <main style={{ paddingTop: '64px' }}>
              {children}
            </main>
            <ToasterContainer />
          </ToasterProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}