import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const BOT_TOKEN        = process.env.BOT_TOKEN!;
  const ORDER_CHANNEL_ID = process.env.ORDER_CHANNEL_ID!;

  try {
    const body = await req.json();
    const { user_id, full_name, phone, address, note, total_price, language, items } = body;

    // 1. Buyurtma yaratish
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert({
        user_id:     user_id || 0,
        full_name:   full_name.trim(),
        phone:       phone.trim(),
        address:     address.trim(),
        note:        note?.trim() || '',
        total_price,
        status:      'pending',
      })
      .select()
      .single();

    if (orderErr) throw orderErr;

    // 2. Buyurtma tarkibi
    await supabase.from('order_items').insert(
      items.map((item: { product_id: number; product_name: string; quantity: number; price: number }) => ({
        order_id:     order.id,
        product_id:   item.product_id,
        product_name: item.product_name,
        quantity:     item.quantity,
        price:        item.price,
      }))
    );

    // 3. Telegram kanalgа xabar yuborish
    if (BOT_TOKEN && ORDER_CHANNEL_ID) {
      const nf = (v: number) => new Intl.NumberFormat('uz-UZ').format(v);
      const isUz = language === 'uz';

      const itemsList = items
        .map((i: { product_name: string; quantity: number; price: number }) =>
          `• ${i.product_name} × ${i.quantity} = ${nf(i.price * i.quantity)} so'm`
        )
        .join('\n');

      const msg = [
        `🆕 *${isUz ? 'Yangi buyurtma' : 'Новый заказ'} #${order.id}* 🌐 Mini App`,
        '',
        `👤 ${full_name}`,
        `📞 ${phone}`,
        `📍 ${address}`,
        note ? `📝 ${note}` : null,
        '',
        itemsList,
        '',
        `💰 *${isUz ? 'Jami' : 'Итого'}: ${nf(total_price)} so'm*`,
      ]
        .filter((l) => l !== null)
        .join('\n');

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id:    ORDER_CHANNEL_ID,
          text:       msg,
          parse_mode: 'Markdown',
        }),
      });
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (err) {
    console.error('Order error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
