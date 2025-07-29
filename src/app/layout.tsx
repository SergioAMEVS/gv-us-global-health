import type { Metadata } from 'next';
import './globals.css';
import MuiProvider from '@/components/ui/MUIProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

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
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <MuiProvider>
            <Navbar />
            <main style={{ flex: 1, padding: '0px 54px' }}>{children}</main>
            <Footer />
          </MuiProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
