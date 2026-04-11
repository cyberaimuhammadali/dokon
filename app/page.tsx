'use client';

import Link from 'next/link';
import { useLangStore, useProductStore } from '@/lib/store';
import { categories } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';

export default function HomePage() {
  const { lang, setLang } = useLangStore();
  const products = useProductStore((s) => s.products);
  const featured = products.slice(0, 6);

  return (
    <div className="space-y-5 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Oltiariq, Farg'ona</p>
          <h1 className="text-xl font-extrabold text-slate-900">Oltiariq Express</h1>
        </div>
        <button
          onClick={() => setLang(lang === 'uz' ? 'ru' : 'uz')}
          className="btn rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
        >
          {lang === 'uz' ? '🇷🇺 RU' : '🇺🇿 UZ'}
        </button>
      </div>

      {/* Hero */}
      <div className="card overflow-hidden bg-gradient-to-br from-brand via-green-600 to-emerald-700 p-5 text-white">
        <p className="text-xs font-medium opacity-80">
          🚚 {lang === 'uz' ? '30–60 daqiqada yetkazamiz' : 'Доставка за 30–60 минут'}
        </p>
        <h2 className="mt-1 text-2xl font-extrabold leading-tight">
          {lang === 'uz' ? 'Yangi va sifatli\nmahsulotlar' : 'Свежие и качественные\nпродукты'}
        </h2>
        <p className="mt-1.5 text-xs opacity-70">
          {lang === 'uz'
            ? 'Uyingiz oldiga toza mahsulotlar yetkazib beramiz'
            : 'Доставляем прямо к вашей двери'}
        </p>
        <Link
          href="/catalog"
          className="btn mt-4 inline-flex items-center gap-1 bg-white px-4 py-2 text-sm font-bold text-brand"
        >
          {lang === 'uz' ? "Katalogni ko'ring" : 'Смотреть каталог'} →
        </Link>
      </div>

      {/* Categories */}
      <section>
        <h2 className="mb-3 font-bold text-slate-900">
          {lang === 'uz' ? 'Kategoriyalar' : 'Категории'}
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalog?cat=${cat.id}`}
              className="card flex flex-col items-center gap-1 p-2.5 text-center transition-all active:scale-95"
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-[10px] font-medium leading-tight text-slate-700">
                {cat.name[lang]}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">
            {lang === 'uz' ? 'Mashhur mahsulotlar' : 'Популярные товары'}
          </h2>
          <Link href="/catalog" className="text-xs font-semibold text-brand">
            {lang === 'uz' ? 'Hammasi →' : 'Все →'}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Store info */}
      <div className="card p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🏪</span>
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-slate-900">Oltiariq Express</p>
            <p className="text-xs text-slate-500">🕐 {lang === 'uz' ? '24/7 ishlaydi' : 'Работает 24/7'}</p>
            <p className="text-xs text-slate-500">📞 +998 90 230 65 55</p>
            <p className="text-xs text-slate-500">
              📍 {lang === 'uz' ? 'Oltiariq tumani, Farg\'ona viloyati' : 'Алтиарыкский район, Ферганская область'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
