import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { Inter } from '@/fonts';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Domicon',
  description:
    'Master the exact systems elite creators use to scale fast and monetize their brands without chasing trends.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${Inter.className} md:text-body overflow-x-hidden text-xs antialiased md:font-normal`}
      >
        <Header />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
