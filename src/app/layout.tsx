import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import MuiProvider from '@/components/ui/MUIProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'GV-UGGFC',
  description:
    'A Next.js app with MUI and Zustand integration for state management and custom fonts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MuiProvider>
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </MuiProvider>
      </body>
    </html>
  );
}
