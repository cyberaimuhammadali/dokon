'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, Product } from './types';
import { products as staticProducts } from './products';

// ─── Cart ────────────────────────────────────────────────────────────────────
interface CartState {
  items: Record<number, number>;
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: {},
      addItem: (id) =>
        set((s) => ({ items: { ...s.items, [id]: (s.items[id] || 0) + 1 } })),
      removeItem: (id) =>
        set((s) => {
          const next = { ...s.items };
          delete next[id];
          return { items: next };
        }),
      updateQuantity: (id, qty) =>
        set((s) => {
          if (qty <= 0) {
            const next = { ...s.items };
            delete next[id];
            return { items: next };
          }
          return { items: { ...s.items, [id]: qty } };
        }),
      clearCart: () => set({ items: {} }),
    }),
    { name: 'cart' }
  )
);

// ─── Products (Supabase dan yuklanadi, fallback: static) ─────────────────────
interface ProductState {
  products: Product[];
  loadProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>()((set, get) => ({
  products: staticProducts,
  loadProducts: async () => {
    if (get().products !== staticProducts) return; // allaqachon yuklangan
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length) set({ products: data });
      }
    } catch { /* static qoladi */ }
  },
}));

// ─── Language ────────────────────────────────────────────────────────────────
interface LangState {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({ lang: 'uz', setLang: (lang) => set({ lang }) }),
    { name: 'lang' }
  )
);
