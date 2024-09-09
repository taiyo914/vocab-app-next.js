"use client"
import { div } from "framer-motion/client";
import { FaArrowUp } from "react-icons/fa";

const BottomButton = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex-grow"> {/* 親コンポーネントにflex-colがついているので、スクリーンが長いときはここが伸びます */}
      <div className="flex justify-center mt-5 mb-9 flex-grow">
        <button 
          onClick={handleScrollTop} 
          className="
            bg-gray-500 text-white rounded-full shadow-md
            py-2 px-5 
            hover:bg-gray-600 transition-all duration-300
            flex space-x-1"
        >
          <FaArrowUp size={20} /> <div>トップに戻る</div>
        </button>
      </div>
    </div>
  );
};

export default BottomButton;
