import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sachin Jaiswal",
  description: "Sachin Jaiswal",
  keywords: ["Sachin Jaiswal", "Sachin Jaiswal Portfolio", "Sachin Jaiswal Portfolio", "Sachin Jaiswal Portfolio", "Sachin Jaiswal Portfolio", "Sachin Jaiswal Portfolio" ],
  authors: [{ name: "Sachin Jaiswal" }],
  themeColor: "#000000",
  icons: {
    icon: "/logo.png",
  },
  viewport: {
    themeColor: "#000000",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
