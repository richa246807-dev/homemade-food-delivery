import { create } from "zustand";

type RewardStore = {
  coins: number;
  addCoins: (amount: number) => void;
};

export const useRewards = create<RewardStore>((set) => ({
  coins: 240,

  addCoins: (amount) =>
    set((state) => ({
      coins: state.coins + amount,
    })),
}));