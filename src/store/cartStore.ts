import { create } from "zustand";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

export const useCartStore = create<{
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}>((set) => ({
  items: [],
  addToCart: (item) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
  clearCart: () => set({ items: [] }),
}));
