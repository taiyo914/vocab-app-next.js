"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  //後ろの画面をスクロールできなくする設定
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* オーバーレイ */}
          <motion.div
            className="absolute inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5}}
            onClick={onClose}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5}}
            className="
              rounded-2xl shadow-lg
              z-50
              w-3/5 max-w-2xl min-w-[400px] xs:min-w-[340px] 
              overflow-hidden
              max-h-[75vh]
              relative"
          >
            <div className="bg-white px-10 xs:px-7 py-7 max-h-[75vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
