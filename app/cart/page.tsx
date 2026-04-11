'use client';

import Link from 'next/link';
import { useCartStore, useLangStore, useProductStore } from '@/lib/store';
import { fmt } from '@/components/ProductCard';
import { Product } from '@/lib/types';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const { lang } = useLangStore();
  const products = useProductStore((s) => s.products);

  const cartItems = Object.entries(items)
    .map(([id, qty]) => ({ product: products.find((p) => p.id === Number(id)), qty }))
    .filter((v): v is { product: Product; qty: number } => !!v.product);

  const total      = cartItems.reduce((s, { product, qty }) => s + product.price * qty, 0);
  const totalCount = cartItems.reduce((s, { qty }) => s + qty, 0);

  if (!cartItems.length) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 text-6xl">🛒</div>
        <p className="text-lg font-bold text-slate-900">
          {lang === 'uz' ? "Savat bo'sh" : 'Корзина пуста'}
        </p>
        <p className="mt-1 text-sm text-slate-400">
          {lang === 'uz' ? "Mahsulot tanlash uchun katalogga o'ting" : 'Добавьте товары из каталога'}
        </p>
        <Link href="/catalog" className="btn mt-5 bg-brand px-6 py-3 font-semibold text-white">
          {lang === 'uz' ? "Katalogga o'tish" : 'Перейти в каталог'}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-slate-900">
          {lang === 'uz' ? 'Savat' : 'Корзина'} ({totalCount})
        </h1>
        <button onClick={clearCart} className="text-xs font-medium text-red-400">
          {lang === 'uz' ? 'Tozalash' : 'Очистить'}
        </button>
      </div>

      <div className="space-y-2">
        {cartItems.map(({ product, qty }) => (
          <div key={product.id} className="card flex items-center gap-3 p-3">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 text-3xl">
              {product.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{product.name[lang]}</p>
              <p className="text-[10px] text-slate-400">{product.unit}</p>
              <p className="text-sm font-bold text-brand">{fmt(product.price * qty)}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <button onClick={() => removeItem(product.id)} className="text-xs text-red-400">
                ✕
              </button>
              <div className="flex items-center gap-1 rounded-lg border border-slate-200">
                <button
                  onClick={() => updateQuantity(product.id, qty - 1)}
                  className="btn px-2.5 py-1 text-sm font-bold text-slate-600"
                >
                  −
                </button>
                <span className="w-5 text-center text-sm font-semibold">{qty}</span>
                <button
                  onClick={() => updateQuantity(product.id, qty + 1)}
                  className="btn px-2.5 py-1 text-sm font-bold text-brand"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-slate-500">
            <span>{lang === 'uz' ? 'Mahsulotlar' : 'Товары'} ({totalCount})</span>
            <span>{fmt(total)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>{lang === 'uz' ? 'Yetkazib berish' : 'Доставка'}</span>
            <span className="font-medium text-green-600">
              {lang === 'uz' ? 'Operatorda hisoblash' : 'По тарифу'}
            </span>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-bold">
            <span>{lang === 'uz' ? 'Jami' : 'Итого'}</span>
            <span className="text-brand">{fmt(total)}</span>
          </div>
        </div>
        <Link
          href="/checkout"
          className="btn mt-4 block w-full bg-accent py-3.5 text-center font-bold text-white"
        >
          {lang === 'uz' ? 'Buyurtma berish' : 'Оформить заказ'} →
        </Link>
      </div>
    </div>
  );
}
