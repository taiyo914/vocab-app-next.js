import { create } from 'zustand';

type SettingsModalState = {
  isOpen: boolean;
  toggleModal: () => void;
};

const useSettingsModalStore = create<SettingsModalState>((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSettingsModalStore;
