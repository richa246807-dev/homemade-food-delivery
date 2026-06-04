import { create } from "zustand";
import type { Dish } from "./data";

type CartItem = { dish: Dish; qty: number };
type CartState = {
  items: CartItem[];
  add: (d: Dish) => void;
  remove: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (d) =>
    set((s) => {
      const found = s.items.find((i) => i.dish.id === d.id);
      if (found) return { items: s.items.map((i) => (i.dish.id === d.id ? { ...i, qty: i.qty + 1 } : i)) };
      return { items: [...s.items, { dish: d, qty: 1 }] };
    }),
  dec: (id) =>
    set((s) => ({
      items: s.items.flatMap((i) => (i.dish.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i])),
    })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.dish.id !== id) })),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((s, i) => s + i.dish.price * i.qty, 0),
  count: () => get().items.reduce((s, i) => s + i.qty, 0),
}));
