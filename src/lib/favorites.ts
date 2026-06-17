import { create } from "zustand";

type FavoriteStore = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavorites = create<FavoriteStore>((set, get) => ({
  favorites: [],

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((x) => x !== id)
        : [...state.favorites, id],
    })),

  isFavorite: (id) => get().favorites.includes(id),
}));