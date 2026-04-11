'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { categories } from '@/lib/products';
import { useLangStore, useProductStore } from '@/lib/store';
import { ProductCard } from '@/components/ProductCard';

function CatalogContent() {
  const params = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(params.get('cat') || 'all');
  const { lang } = useLangStore();
  const products = useProductStore((s) => s.products);

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.categoryId === activeCategory);

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl font-extrabold text-slate-900">
        {lang === 'uz' ? 'Katalog' : 'Каталог'}
      </h1>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => setActiveCategory('all')}
          className={`btn whitespace-nowrap border px-3 py-1.5 text-xs font-semibold transition-all ${
            activeCategory === 'all'
              ? 'border-brand bg-brand text-white'
              : 'border-slate-200 bg-white text-slate-600'
          }`}
        >
          🛒 {lang === 'uz' ? 'Hammasi' : 'Все'}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`btn whitespace-nowrap border px-3 py-1.5 text-xs font-semibold transition-all ${
              activeCategory === cat.id
                ? 'border-brand bg-brand text-white'
                : 'border-slate-200 bg-white text-slate-600'
            }`}
          >
            {cat.emoji} {cat.name[lang]}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400">
        {lang === 'uz' ? `${filtered.length} ta mahsulot` : `${filtered.length} товаров`}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">⏳</div>}>
      <CatalogContent />
    </Suspense>
  );
}
