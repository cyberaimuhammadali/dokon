'use client';

import Link from 'next/link';
import { useCartStore, useLangStore } from '@/lib/store';
import { Product } from '@/lib/types';

export const fmt = (v: number) => `${new Intl.NumberFormat('uz-UZ').format(v)} so'm`;

export function ProductCard({ product }: { product: Product }) {
  const { items, addItem, updateQuantity } = useCartStore();
  const { lang } = useLangStore();
  const qty = items[product.id] || 0;

  return (
    <div className="card flex flex-col overflow-hidden">
      <Link href={`/product/${product.id}`} className="block p-3">
        <div className="mb-2 flex h-24 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 text-4xl">
          {product.emoji}
        </div>
        <p className="line-clamp-2 text-xs font-semibold leading-tight text-slate-900">
          {product.name[lang]}
        </p>
        <p className="mt-0.5 text-[10px] text-slate-400">{product.unit}</p>
        <p className="mt-1.5 text-sm font-bold text-brand">{fmt(product.price)}</p>
      </Link>

      <div className="mt-auto p-3 pt-0">
        {qty === 0 ? (
          <button
            onClick={() => addItem(product.id)}
            className="btn w-full bg-brand py-2 text-xs font-semibold text-white"
          >
            + {lang === 'uz' ? "Qo'shish" : 'Добавить'}
          </button>
        ) : (
          <div className="flex items-center justify-between rounded-btn bg-slate-100">
            <button
              onClick={() => updateQuantity(product.id, qty - 1)}
              className="btn px-3 py-2 text-sm font-bold text-slate-700"
            >
              −
            </button>
            <span className="text-sm font-semibold text-slate-900">{qty}</span>
            <button
              onClick={() => updateQuantity(product.id, qty + 1)}
              className="btn px-3 py-2 text-sm font-bold text-brand"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
