import React from "react";
import { WordType } from "@/types/Types";
import { motion } from "framer-motion";

const VocabListItem = ({ word } : {word : WordType}) => {

  return (
    <motion.div className="flex items-center" 
      whileHover={{ scale: 1.01}} 
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex-1 grid grid-cols-5 border-gray-200 bg-white border shadow-sm xs:shadow rounded-xl py-3 hover:shadow-md transition-all duration-300">
        <div className="col-span-1 flex items-center border-r border-gray-200 pl-3 pr-3 font-bold text-lg ">
          <div className={`flex justify-center items-center min-h-10 min-w-10 bg-gray-300 rounded-full text-lg font-bold mr-3 `}>
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

