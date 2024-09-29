import { create } from "zustand";

interface NotificationState {
  show: boolean;
  message: string;
  duration: number;
  backgroundColor: string; 
  messageType?: "success" | "error" | "delete";
  showNotification: (message: string, messageType?: "success" | "error" | "delete") => void;
  hideNotification: () => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  show: false,
  message: "",
  duration: 4000,
  backgroundColor: "white", 
  icon: null, 
  showNotification: (message: string, messageType?: "success" | "error" | "delete" ) => {
    let bgColor = "white"; 
    let duration = 4000;   

    switch (messageType) {
      case "success":
        bgColor = "#e4f7e8";
        duration = 4000;
        break;
      case "error":
        bgColor = "#fcdfe2";
        duration = 10000;
        break;
      case "delete":
        bgColor = "#eaf0fb";
        duration = 4000;
        break;
    }
    
    set({ show: true, message, duration, backgroundColor: bgColor, messageType })
    console.log()
  },
  hideNotification: () => set({ show: false, message: "", duration: 4000,  backgroundColor: "white" }),
}));

export default useNotificationStore;