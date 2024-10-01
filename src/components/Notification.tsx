"use client"
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useNotificationStore from "@/store/useNotificationStore";
import { CheckCircleIcon, ExclamationTriangleIcon, TrashIcon, BellIcon } from "@heroicons/react/24/outline";

const Notification = () => {
  const { show, message, duration, backgroundColor, messageType, hideNotification } = useNotificationStore();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        hideNotification();
      }, duration); 
      return () => clearTimeout(timer);
    }
  }, [show, hideNotification]);

  const renderIcon = () => {
    switch (messageType) {
      case "success":
        return <CheckCircleIcon className="h-[22px] text-green-700" />;
      case "error":
        return <ExclamationTriangleIcon className="h-[22px] text-red-700 " />;
      case "delete":
        return <TrashIcon className="h-[22px] text-blue-600 " />;
      default:
        return <BellIcon className="h-[22px] " />; // デフォルトの通知アイコン
    }
  };


  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }} 
          exit={{ opacity: 0, x: "100%" }} 
          transition={{type: "spring", stiffness: 240, damping: 30}}
          // transition ={{duration: 0.3}}
          className="fixed top-4 right-4 rounded-xl shadow-lg border z-100 text-black"
          style={{ backgroundColor }}
        >
          <div className="relative py-[25px] pr-[30px] pl-[30px] max-w-[350px]">
            <span className="inline-block align-text-bottom mr-1">
              {renderIcon()} 
            </span>
            <span className="text-[1.1rem]">{message}</span>
            <button
              onClick={hideNotification}
              className="absolute top-[5px] right-[5px]"
            >
              <XMarkIcon className="h-[20px] text-gray-400 hover:bg-gray-100 p-[3px] rounded-full"/>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
