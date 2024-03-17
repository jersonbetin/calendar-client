import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import './globals.css';
import UiProvider from '@/providers/UiProvider';
import { AuthContextProvider } from '@/contexts/user.context';
import AppProvider from '@/providers/AppProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Etyalab',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UiProvider>
          <AuthContextProvider>
            <AppProvider>{children}</AppProvider>
          </AuthContextProvider>
        </UiProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
