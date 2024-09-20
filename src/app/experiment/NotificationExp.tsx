"use client"
import { useState } from "react";
import Notification from "@/components/Notification";

const NotificationExp: React.FC = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handleShowNotification = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div>
      <button onClick={handleShowNotification}>Show Notification</button>
      <Notification 
        show={showNotification} 
        message="This is a notification! longlonglognversion 日本語はどうかな" 
        onClose={handleCloseNotification} 
      />
    </div>
  );
};

export default NotificationExp;
