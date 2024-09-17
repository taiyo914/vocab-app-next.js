"use client"; 
import { WordType } from "@/types/Types";
import { motion } from "framer-motion";

const CardsItem = ({ word }:{ word: WordType}) => {
  return (
    <motion.div
      className="
        shadow-md 
        px-4 py-6 
        rounded-lg border border-gray-200 
        flex items-center justify-center"
      whileHover={{ scale: 1.07 }}
    >
      <h2 className="text-lg font-bold">{word.word}</h2>
    </motion.div>
  );
};

export default CardsItem;
