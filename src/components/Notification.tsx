import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface NotificationProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ show, message, onClose }) => {

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }} 
          exit={{ opacity: 0, x: "100%" }} 
          transition={{type: "spring", stiffness: 240, damping: 30}}
          // transition ={{duration: 0.3}}
          className="fixed top-4 right-4 rounded-lg shadow-lg border bg-white"
        >
          <div className="relative py-[25px] pr-[30px] pl-[30px] max-w-[350px]">
            <span>{message}</span>
            <button
              onClick={onClose}
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
