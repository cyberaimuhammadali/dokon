'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLangStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { fmt } from '@/components/ProductCard';
import { useTelegram } from '@/components/TelegramProvider';
import { Order } from '@/lib/types';

const STATUS_COLOR: Record<string, string> = {
  pending:   'bg-yellow-100 text-yellow-700',
  accepted:  'bg-blue-100   text-blue-700',
  delivered: 'bg-green-100  text-green-700',
  cancelled: 'bg-red-100    text-red-700',
};

const STATUS_LABEL: Record<string, { uz: string; ru: string }> = {
  pending:   { uz: 'Kutilmoqda',    ru: 'Ожидает'   },
  accepted:  { uz: 'Qabul qilindi', ru: 'Принят'    },
  delivered: { uz: 'Yetkazildi',    ru: 'Доставлен' },
  cancelled: { uz: 'Bekor qilindi', ru: 'Отменён'   },
};

export default function OrdersPage() {
  const { lang }   = useLangStore();
  const { user, isReady } = useTelegram();
  const [orders,  setOrders]  = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady) return;

    if (!user?.id) {
      setLoading(false);
      return;
    }

    supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(30)
      .then(({ data }) => {
        setOrders(data ?? []);
        setLoading(false);
      });
  }, [user, isReady]);

  if (loading) {
    return (
      <div className="flex h-52 items-center justify-center">
        <div className="text-center">
          <div className="mb-2 text-3xl">⏳</div>
          <p className="text-sm text-slate-400">
            {lang === 'uz' ? 'Yuklanmoqda...' : 'Загрузка...'}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
        <div className="mb-3 text-5xl">🔒</div>
        <p className="font-bold text-slate-900">
          {lang === 'uz' ? 'Telegram orqali kirish kerak' : 'Требуется вход через Telegram'}
        </p>
        <p className="mt-1 text-sm text-slate-400">
          {lang === 'uz'
            ? "Buyurtmalarni ko'rish uchun botdan mini appni oching"
            : 'Откройте мини-приложение через бота'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl font-extrabold text-slate-900">
        {lang === 'uz' ? 'Buyurtmalar tarixi' : 'История заказов'}
      </h1>

      {!orders.length ? (
        <div className="card p-8 text-center">
          <div className="mb-3 text-5xl">📦</div>
          <p className="font-bold text-slate-900">
            {lang === 'uz' ? "Hali buyurtmalar yo'q" : 'Заказов пока нет'}
          </p>
          <Link href="/catalog" className="btn mt-4 inline-block bg-brand px-5 py-2.5 text-sm font-semibold text-white">
            {lang === 'uz' ? "Xarid qilish" : 'Начать покупки'}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-slate-900">
                    #{order.id}
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(order.created_at).toLocaleString('uz-UZ')}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    STATUS_COLOR[order.status] ?? 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {STATUS_LABEL[order.status]?.[lang] ?? order.status}
                </span>
              </div>
              <div className="mt-3 space-y-1 border-t border-slate-50 pt-3">
                <p className="text-xs text-slate-500">📍 {order.address}</p>
                <p className="text-sm font-bold text-brand">{fmt(order.total_price)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
