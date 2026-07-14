import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammed Albadrani | Emergency & Security Operations Manager",
  description:
    "Portfolio of Mohammed Albadrani — Emergency and Security Operations Manager with 10+ years of experience in government emergency operations, control room management, emergency communications, physical security, and smart city systems at the Royal Commission Yanbu.",
  keywords: [
    "Emergency Operations",
    "Security Operations Manager",
    "Control Room Operations",
    "Public Safety",
    "Smart City",
    "Royal Commission Yanbu",
    "Saudi Vision 2030",
  ],
  openGraph: {
    title: "Mohammed Albadrani | Emergency & Security Operations Manager",
    description:
      "Emergency and Security Operations Manager with 10+ years in government operations, emergency communications, and physical security systems.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/portrait.jpg", alt: "Mohammed Albadrani" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
