'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TgCtx {
  user: TelegramUser | null;
  isReady: boolean;
  colorScheme: 'light' | 'dark';
}

const TelegramContext = createContext<TgCtx>({ user: null, isReady: false, colorScheme: 'light' });

export const useTelegram = () => useContext(TelegramContext);

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]               = useState<TelegramUser | null>(null);
  const [isReady, setIsReady]         = useState(false);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      setUser(tg.initDataUnsafe?.user ?? null);
      setColorScheme(tg.colorScheme ?? 'light');
    }
    setIsReady(true);
  }, []);

  return (
    <TelegramContext.Provider value={{ user, isReady, colorScheme }}>
      {children}
    </TelegramContext.Provider>
  );
}
