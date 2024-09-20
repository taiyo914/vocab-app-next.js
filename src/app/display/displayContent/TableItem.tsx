import React from "react";
import { WordType } from "@/types/Types";
import { motion } from "framer-motion";

const VocabListItem = ({ word } : {word : WordType}) => {
  const getSliderColorClass = (index: number) => {
    switch (index) {
      case 0: return 'bg-sliderColor-0';
      case 1: return 'bg-sliderColor-1';
      case 2: return 'bg-sliderColor-2';
      case 3: return 'bg-sliderColor-3';
      case 4: return 'bg-sliderColor-4';
      case 5: return 'bg-sliderColor-5';
      case 6: return 'bg-sliderColor-6';
      case 7: return 'bg-sliderColor-7';
      case 8: return 'bg-sliderColor-8';
      case 9: return 'bg-sliderColor-9';
      case 10: return 'bg-sliderColor-10';
      default: return 'bg-gray-300'; // デフォルトの色
    }
  };

  return (
    <motion.div className="flex items-center" 
      whileHover={{ scale: 1.01}} 
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex-1 grid grid-cols-5 border-gray-200 bg-white border shadow-sm xs:shadow rounded-xl py-3 hover:shadow-md transition-all duration-300">
        <div className="col-span-1 flex items-center border-r border-gray-200 pl-3 pr-3 font-bold text-lg ">
          <div className={`flex justify-center items-center min-h-10 min-w-10 bg-gray-300 rounded-full text-lg font-bold mr-3 bg-opacity-65 ${getSliderColorClass(word.index)}`}>
            {word.index}
          </div>
          <div className="text-start">
            {word.word}
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center border-r border-gray-200 px-2 font-semibold ">
          {word.meaning}
        </div>
        <div className="col-span-1 flex items-center justify-center border-r border-gray-200 pl-3 pr-2 ">
          {word.example}
        </div>
        <div className="col-span-1 flex items-center justify-center border-r border-gray-200 px-3 ">
          {word.example_translation}
        </div>
        <div className="col-span-1 flex items-center px-3 text-sm text-gray-700">
          {word.memo}
        </div>
      </div>
    </motion.div>
  );
};

export default VocabListItem;

