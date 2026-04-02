import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Old School Ink | Best Tattoo Studio in Bangalore | Custom Tattoos & Professional Artists",
  description: "Old School Ink is a top-rated professional tattoo studio in Bangalore (Vasanth Nagar), specializing in custom tattoo designs, blackwork, geometric, and fine line tattoos. Safe, hygienic, and creative tattoo artists at Bengaluru's best tattoo shop.",
  keywords: [
    "Bangalore tattoo studio", "Tattoo studio in Bangalore", "Best tattoo artists Bangalore", 
    "Custom tattoos Bangalore", "Professional tattoo studio Bangalore", "Tattoo shop Bangalore", 
    "Tattoo cover up Bangalore", "Tattoo touch up Bangalore", "Tattoo consultation Bangalore", 
    "Custom tattoo design Bangalore", "Safe tattoo studio Bangalore", "Hygienic tattoo Bangalore", 
    "Tattoo studio vasanth nagar Bangalore", "Tattoo studio Malleshwaram Bangalore", 
    "Blackwork tattoo Bangalore", "Geometric tattoo Bangalore", "Traditional tattoo Bangalore", 
    "Fine line tattoo Bangalore", "Top rated tattoo studio Bangalore", 
    "Creative tattoo artists Bangalore", "Unique tattoo designs Bangalore"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
