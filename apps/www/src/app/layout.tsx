import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { Inter } from '@/fonts';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Frame by Frame',
  description: 'Become More Profitable as a Video Editor Today',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${Inter.className} md:text-body text-xs antialiased md:font-normal`}
      >
        <Header />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
