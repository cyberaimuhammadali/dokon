import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { products as staticProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return NextResponse.json(staticProducts);

    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('id');

    if (error || !data?.length) return NextResponse.json(staticProducts);

    const products = data.map((row) => ({
      id: row.id,
      name: { uz: row.name_uz, ru: row.name_ru },
      price: row.price,
      categoryId: row.category_id,
      unit: row.unit,
      emoji: row.emoji,
      image_url: row.image_url ?? null,
    }));

    return NextResponse.json(products);
  } catch {
    return NextResponse.json(staticProducts);
  }
}
