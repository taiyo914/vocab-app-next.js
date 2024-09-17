"use client"
import { div } from "framer-motion/client";
import { FaArrowUp } from "react-icons/fa";

const BottomButton = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex-grow"> {/* 親コンポーネントにflex-colがついているので、スクリーンが長いときはここが伸びます */}
      <div className="flex justify-center my-5 flex-grow">
        <button 
          onClick={handleScrollTop} 
          className="
            text-gray-600 rounded-full shadow border text-sm xs:text-base
            py-2 px-5 
            hover:bg-gray-100 transition-all duration-300
            flex gap-0.5 items-center"
        >
          <FaArrowUp /> トップに戻る
        </button>
      </div>
    </div>
  );
};

export default BottomButton;
