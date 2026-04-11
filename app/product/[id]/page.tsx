'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useCartStore, useLangStore, useProductStore } from '@/lib/store';
import { fmt } from '@/components/ProductCard';

export default function ProductPage({ params }: { params: { id: string } }) {
  const products = useProductStore((s) => s.products);
  const product = products.find((p) => p.id === Number(params.id));
  if (!product) return notFound();

  const { items, addItem, updateQuantity } = useCartStore();
  const { lang } = useLangStore();
  const qty = items[product.id] || 0;

  return (
    <div className="space-y-4 p-4">
      <Link href="/catalog" className="flex items-center gap-1 text-sm font-medium text-brand">
        ← {lang === 'uz' ? 'Katalogga qaytish' : 'Вернуться в каталог'}
      </Link>

      <div className="card overflow-hidden p-5">
        <div className="mb-5 flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 text-8xl">
          {product.emoji}
        </div>

        <h1 className="text-xl font-extrabold text-slate-900">{product.name[lang]}</h1>
        <p className="mt-1 text-sm text-slate-400">{product.name[lang === 'uz' ? 'ru' : 'uz']}</p>
        <p className="mt-2 text-sm text-slate-500">
          {lang === 'uz' ? 'O\'lchov birligi' : 'Единица измерения'}: <b>{product.unit}</b>
        </p>
        <p className="mt-3 text-3xl font-extrabold text-brand">{fmt(product.price)}</p>

        {qty === 0 ? (
          <button
            onClick={() => addItem(product.id)}
            className="btn mt-5 w-full bg-brand py-3.5 text-base font-bold text-white"
          >
            🛒 {lang === 'uz' ? "Savatga qo'shish" : 'Добавить в корзину'}
          </button>
        ) : (
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between rounded-xl border-2 border-brand p-1">
              <button
                onClick={() => updateQuantity(product.id, qty - 1)}
                className="btn flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-xl font-bold text-brand"
              >
                −
              </button>
              <div className="text-center">
                <span className="text-xl font-bold text-slate-900">{qty}</span>
                <p className="text-xs text-slate-400">{fmt(product.price * qty)}</p>
              </div>
              <button
                onClick={() => updateQuantity(product.id, qty + 1)}
                className="btn flex h-11 w-11 items-center justify-center rounded-lg bg-brand text-xl font-bold text-white"
              >
                +
              </button>
            </div>
            <Link
              href="/cart"
              className="btn block w-full bg-accent py-3 text-center font-bold text-white"
            >
              {lang === 'uz' ? "Savatga o'tish" : 'Перейти в корзину'} →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
