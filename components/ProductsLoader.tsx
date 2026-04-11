'use client';

import { useEffect } from 'react';
import { useProductStore } from '@/lib/store';

export function ProductsLoader() {
  const loadProducts = useProductStore((s) => s.loadProducts);
  useEffect(() => { loadProducts(); }, [loadProducts]);
  return null;
}
