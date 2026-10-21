import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Nav from "@/components/Nav";
import CommandMenu from "@/components/CommandMenu";
import Motion from "@/components/Motion";
import { SITE_URL } from "@/data/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description =
  "Sachin Jaiswal — full stack developer building MERN apps, real-time products and AI agents. B.Tech (AI) student at Newton School of Technology, competitive programmer and hackathon finalist at IIT Roorkee.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sachin Jaiswal — Full Stack Developer",
  description,
  keywords: [
    "Sachin Jaiswal",
    "Full Stack Developer",
    "MERN Stack",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
  ],
  authors: [{ name: "Sachin Jaiswal" }],
  openGraph: {
    title: "Sachin Jaiswal — Full Stack Developer",
    description,
    type: "website",
    locale: "en_US",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Runs before paint so the saved/system theme applies without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}document.documentElement.classList.add('js')})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="scroll-progress" aria-hidden />
        <Nav />
        <CommandMenu />
        {children}
        <Motion />
        <Analytics />
      </body>
    </html>
  );
}
