import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { DMSans } from "@/fonts";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Frame by Frame",
  description: "Become More Profitable as a Video Editor Today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${DMSans.className} text-xs md:text-body md:font-normal antialiased`}
      >
        <Header />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
