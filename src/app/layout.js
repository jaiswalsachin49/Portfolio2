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
  title: "Sachin Jaiswal — Full Stack Developer & Freelancer",
  description:
    "Portfolio of Sachin Jaiswal, a Full Stack Developer specializing in React, Next.js, Node.js, and modern web applications. Available for freelance projects.",
  keywords: [
    "Sachin Jaiswal",
    "Full Stack Developer",
    "Freelancer",
    "React Developer",
    "Next.js Developer",
    "Web Developer Portfolio",
    "MERN Stack",
  ],
  authors: [{ name: "Sachin Jaiswal" }],
  openGraph: {
    title: "Sachin Jaiswal — Full Stack Developer & Freelancer",
    description:
      "Full Stack Developer specializing in React, Next.js, and modern web applications. Available for freelance projects.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/logo.png",
  },
};

export const viewport = {
  themeColor: "#000000",
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
