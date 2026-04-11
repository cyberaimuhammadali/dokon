'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore, useLangStore, useProductStore } from '@/lib/store';
import { fmt } from '@/components/ProductCard';
import { useTelegram } from '@/components/TelegramProvider';
import { Product } from '@/lib/types';

export default function CheckoutPage() {
  const router       = useRouter();
  const { lang }     = useLangStore();
  const { user }     = useTelegram();
  const { items, clearCart } = useCartStore();
  const products = useProductStore((s) => s.products);

  const cartItems = Object.entries(items)
    .map(([id, qty]) => ({ product: products.find((p) => p.id === Number(id)), qty }))
    .filter((v): v is { product: Product; qty: number } => !!v.product);

  const total = cartItems.reduce((s, { product, qty }) => s + product.price * qty, 0);

  const [fullName, setFullName] = useState(
    user ? `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}` : ''
  );
  const [phone,   setPhone]   = useState('');
  const [address, setAddress] = useState('');
  const [note,    setNote]    = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  if (!cartItems.length) {
    return (
      <div className="p-6 text-center">
        <p className="card p-6 text-sm text-slate-500">
          {lang === 'uz' ? "Savatiz bo'sh" : 'Корзина пуста'}
        </p>
        <Link href="/catalog" className="btn mt-3 inline-block bg-brand px-4 py-2.5 text-sm font-semibold text-white">
          {lang === 'uz' ? 'Katalogga qaytish' : 'Вернуться в каталог'}
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id:     user?.id ?? 0,
          full_name:   fullName.trim(),
          phone:       phone.trim(),
          address:     address.trim(),
          note:        note.trim(),
          total_price: total,
          language:    lang,
          items: cartItems.map(({ product, qty }) => ({
            product_id:   product.id,
            product_name: product.name[lang],
            quantity:     qty,
            price:        product.price,
          })),
        }),
      });

      if (!res.ok) throw new Error();
      clearCart();
      router.push('/orders');
    } catch {
      setError(
        lang === 'uz'
          ? "Xatolik yuz berdi. Qayta urinib ko'ring."
          : 'Произошла ошибка. Попробуйте ещё раз.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-3">
        <Link href="/cart" className="text-xl text-brand">←</Link>
        <h1 className="text-xl font-extrabold text-slate-900">
          {lang === 'uz' ? 'Buyurtma berish' : 'Оформление заказа'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Contact */}
        <div className="card space-y-3 p-4">
          <h2 className="text-sm font-bold text-slate-700">
            {lang === 'uz' ? "Ma'lumotlar" : 'Ваши данные'}
          </h2>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder={lang === 'uz' ? 'Ism-familiya' : 'Имя и фамилия'}
            className="input"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            type="tel"
            placeholder="+998 XX XXX XX XX"
            className="input"
          />
        </div>

        {/* Address */}
        <div className="card space-y-3 p-4">
          <h2 className="text-sm font-bold text-slate-700">
            {lang === 'uz' ? 'Yetkazib berish manzili' : 'Адрес доставки'}
          </h2>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows={3}
            placeholder={
              lang === 'uz'
                ? "Ko'cha, uy, kvartira raqami..."
                : 'Улица, дом, квартира...'
            }
            className="input resize-none"
          />
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder={lang === 'uz' ? 'Izoh (ixtiyoriy)' : 'Примечание (необязательно)'}
            className="input resize-none"
          />
        </div>

        {/* Summary */}
        <div className="card p-4">
          <h2 className="mb-3 text-sm font-bold text-slate-700">
            {lang === 'uz' ? 'Buyurtma tarkibi' : 'Состав заказа'}
          </h2>
          <div className="space-y-1.5">
            {cartItems.map(({ product, qty }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span className="text-slate-600 truncate pr-2">
                  {product.name[lang]} × {qty}
                </span>
                <span className="font-semibold whitespace-nowrap">{fmt(product.price * qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 font-bold">
            <span>{lang === 'uz' ? 'Jami' : 'Итого'}</span>
            <span className="text-brand">{fmt(total)}</span>
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn w-full bg-brand py-4 text-base font-bold text-white disabled:opacity-60"
        >
          {loading
            ? (lang === 'uz' ? 'Yuborilmoqda...' : 'Отправка...')
            : (lang === 'uz' ? '✅ Buyurtmani tasdiqlash' : '✅ Подтвердить заказ')}
        </button>
      </form>
    </div>
  );
}
