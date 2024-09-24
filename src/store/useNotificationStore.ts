import { create } from "zustand";

interface NotificationState {
  show: boolean;
  message: string;
  duration: number;
  showNotification: (message: string, duration? :number) => void;
  hideNotification: () => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  show: false,
  message: "",
  duration: 3000,
  showNotification: (message: string, duration: number = 3000) => set({ show: true, message, duration }),
  hideNotification: () => set({ show: false, message: "", duration: 3000 }),
}));

export default useNotificationStore;