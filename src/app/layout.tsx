import Header from "@/components/Header";
import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yousef Saeed Portfolio",
  description:
    "Discover the portfolio of Yousef Saeed, a skilled web developer specializing in modern web technologies like Reactjs, Next.js, Nestjs and Tailwind CSS. Explore his projects, skills, and professional journey.",
  openGraph: {
    title: "Yousef Saeed Portfolio",
    description:
      "Discover the portfolio of Yousef Saeed, a skilled web developer specializing in modern web technologies like Reactjs, Next.js, Nestjs and Tailwind CSS. Explore his projects, skills, and professional journey.",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1280,
        height: 720,
        alt: "Portfolio Open Graph Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${spaceGrotesk.variable} antialiased overflow-x-hidden`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
