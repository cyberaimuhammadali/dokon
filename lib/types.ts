export type Language = 'uz' | 'ru';

export interface Category {
  id: string;
  name: { uz: string; ru: string };
  emoji: string;
}

export interface Product {
  id: number;
  name: { uz: string; ru: string };
  price: number;
  categoryId: string;
  unit: string;
  emoji: string;
}

export interface OrderItem {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user_id?: number;
  full_name: string;
  phone: string;
  address: string;
  note?: string;
  total_price: number;
  status: string;
  created_at: string;
}
