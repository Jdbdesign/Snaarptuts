import type { Metadata } from "next";
import { JetBrains_Mono, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";

// Used only by the Cloudflare dashboard illustration (third-party screens keep their own typeface).
const openSans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Snaarp Tutorials",
  description: "Step-by-step tutorials for Snaarp products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetbrains.variable} ${openSans.variable} h-full antialiased`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
