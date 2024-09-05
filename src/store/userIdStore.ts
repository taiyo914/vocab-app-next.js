import { create } from 'zustand';

type UserIdState = {
  userId: string | null;
  setUserId: (id: string | null) => void;
  clearUserId: () => void;
};

const useUserIdStore = create<UserIdState>((set) => ({
  userId: null,

  setUserId: (id: string | null) => set({ userId: id }),
  clearUserId: () => set({ userId: null }),
}));

export default useUserIdStore;
