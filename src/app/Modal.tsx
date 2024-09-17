import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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
            transition={{ duration: 0.3 }}
            onClick={onClose}
          ></motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -50 }}  
            animate={{ opacity: 1, y: 0 }}    
            exit={{ opacity: 0, y: -50 }}      
            transition={{ duration: 0.3 }}  
            className="
              border shadow-lg rounded-2xl
              z-50
              xs:m-7 m-5 
              w-1/2 max-w-2xl xs:min-w-[400px] min-w-[300px] 
              overflow-hidden
              max-h-[90vh]
              relative"
          >
            <div className="bg-white p-5 xs:px-10 xs:py-7 max-h-[90vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
