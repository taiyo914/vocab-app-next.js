import { create } from "zustand";

type WordsSettingsModalState = {
  isOpen: boolean;
  toggleModal: () => void;
  showDetails: boolean;
  toggleDetails: () => void;
};

const useWordsSettingsModalStore = create<WordsSettingsModalState>((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  showDetails: false,
  toggleDetails: () => set((state) => ({ showDetails: !state.showDetails })),
}));

export default useWordsSettingsModalStore;
