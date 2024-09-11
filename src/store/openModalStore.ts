import { create } from 'zustand';

type OpenModalState = {
  isOpen: boolean;
  toggleModal: () => void;
};

const useOpenModalStore = create<OpenModalState>((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useOpenModalStore;
