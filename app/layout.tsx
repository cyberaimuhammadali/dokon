import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TelegramProvider } from '@/components/TelegramProvider';
import { BottomNav } from '@/components/BottomNav';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Oltiariq Express',
  description: 'Tez va sifatli yetkazib berish — 30-60 daqiqa',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <head>
        {/* Telegram WebApp SDK */}
        <script src="https://telegram.org/js/telegram-web-app.js" />
      </head>
      <body className={inter.className}>
        <TelegramProvider>
          <main className="mx-auto min-h-screen max-w-md pb-24">
            {children}
          </main>
          <BottomNav />
        </TelegramProvider>
      </body>
    </html>
  );
}
