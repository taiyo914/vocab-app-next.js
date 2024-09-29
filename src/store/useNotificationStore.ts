import { create } from "zustand";

interface NotificationState {
  show: boolean;
  message: string;
  duration: number;
  backgroundColor: string; 
  showNotification: (message: string, duration? :number, backgroundColor?: "green" | "red" | "blue") => void;
  hideNotification: () => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  show: false,
  message: "",
  duration: 3000,
  backgroundColor: "white", 
  showNotification: (message: string, duration: number = 4000,  backgroundColor:string = "white") => {
    let bgColor = "white"; // デフォルトの色
    if (backgroundColor === "green") bgColor = "#d8f0dd";
    if (backgroundColor === "red") bgColor = "#ffdcdf";
    if (backgroundColor === "blue") bgColor = "#e0eafc";
    
    set({ show: true, message, duration, backgroundColor: bgColor })
  },
  hideNotification: () => set({ show: false, message: "", duration: 4000,  backgroundColor: "white" }),
}));

export default useNotificationStore;