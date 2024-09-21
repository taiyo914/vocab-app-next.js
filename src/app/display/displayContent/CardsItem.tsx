"use client"; 
import { WordType } from "@/types/Types";
import { motion } from "framer-motion";

const CardsItem = ({ word }:{ word: WordType}) => {
  return (
    <motion.div
      className="
        shadow-md min-h-32
        px-6 py-6
        rounded-lg border border-gray-200 
        flex items-center justify-center"
      whileHover={{ scale: 1.03 }}
    >
      <h2 className="text-[1.4rem] font-bold text-center">{word.word}</h2>
    </motion.div>
  );
};

export default CardsItem;
