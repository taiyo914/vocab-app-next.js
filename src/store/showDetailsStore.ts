import { create } from "zustand";

type ShowDetailsState = {
  showDetails: boolean;
  toggleDetails: () => void;
};

const useShowDetailsStore = create<ShowDetailsState>((set) => ({
  showDetails: false,
  toggleDetails: () => set((state) => ({ showDetails: !state.showDetails })),
}));

export default useShowDetailsStore;
