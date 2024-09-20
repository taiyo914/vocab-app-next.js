"use client";
import { useState } from "react";
import { WordType } from "@/types/Types";
import TableItem from "./TableItem";
import { motion } from "framer-motion";
import DisplayEditModal from "./DisplayEditModal";

const TableDisplay = ({ words }: { words: WordType[] }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editWord, setEditWord] = useState<WordType | null>(null);
  const handleEditClick = (word: WordType) => {
    setEditWord(word);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setEditWord(null);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      <div className="px-4 xs:px-3 pb-4 bg-white overflow-x-auto">
        <div className="min-w-[1080px] xs:min-w-[1750px]">
          <div className="flex items-center mb-1 ">
            <div className="flex-1 grid grid-cols-5">
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">単語 </div>
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">意味 </div>
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">例文</div>
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">例文訳</div>
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">メモ</div>
            </div>
          </div>
          <div className="space-y-2">
            {words.map((word) => (
                <TableItem  key={word.id} word={word} onClick={() => handleEditClick(word)}/>
            ))}
          </div>
        </div>
      </div>

      <DisplayEditModal
        isOpen={isEditModalOpen}
        onClose={closeModal}
        editWord={editWord}
        setEditWord={setEditWord}
      />

    </motion.div>
  );
};

export default TableDisplay;
