'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore, useLangStore } from '@/lib/store';

const navItems = [
  { href: '/',        icon: '🏠', label: { uz: 'Bosh',     ru: 'Главная' } },
  { href: '/catalog', icon: '🛍️', label: { uz: 'Katalog',  ru: 'Каталог' } },
  { href: '/cart',    icon: '🛒', label: { uz: 'Savat',    ru: 'Корзина' } },
  { href: '/orders',  icon: '📦', label: { uz: 'Buyurtma', ru: 'Заказы'  } },
];

export function BottomNav() {
  const pathname   = usePathname();
  const totalItems = useCartStore((s) => Object.values(s.items).reduce((a, b) => a + b, 0));
  const { lang }   = useLangStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center gap-0.5 rounded-xl px-4 py-1.5 transition-all ${
                active ? 'text-brand' : 'text-slate-400'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`text-[10px] font-medium ${active ? 'text-brand' : ''}`}>
                {item.label[lang]}
              </span>
              {item.href === '/cart' && totalItems > 0 && (
                <span className="absolute -right-1 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
