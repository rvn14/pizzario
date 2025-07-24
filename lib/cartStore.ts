/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";



interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image?: string; 
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItemQuantity: (id: string, quantity: any) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItemQuantity: (id: string, change: number) => set((state) => ({
    items: state.items.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
        : item
    )
  })),
  removeItem: (id) => set((state) => ({ items: state.items.filter(item => item.id !== id) })),
  clearCart: () => set({ items: [] }),
}));