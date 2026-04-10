'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from './types';

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
