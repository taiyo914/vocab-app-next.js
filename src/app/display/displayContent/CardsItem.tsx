"use client"; 
import { useState } from "react";
import { WordType } from "@/types/Types";
import { motion } from "framer-motion";
import ReactCardFlip from 'react-card-flip';
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import DisplayEditModal from "./DisplayEditModal";

const CardsItem = ({ word }:{ word: WordType}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editWord, setEditWord] = useState<WordType | null>(null);
  const handleEditClick = ( event:any, word: WordType) => {
    event.stopPropagation(); 
    setEditWord(word);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setEditWord(null);
  };

  const handleClick = (event:React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // クリックイベントの伝播を防止
    setIsFlipped(!isFlipped);
  };

  return (<>
    <motion.div
      layout
      whileHover={{ scale: 1.03 }}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" flipSpeedBackToFront={0.4} flipSpeedFrontToBack={0.4} infinite={false}>
        <div
            className="
              shadow-md min-h-32
              px-6 py-8 
              rounded-lg border border-gray-200 
              flex items-center justify-center"
            onClick={handleClick} 
            key="front"
          >
            
            <h2 className="text-[1.4rem] font-bold text-center overflow-auto">{word.word}</h2>
          </div>

          <div
            className="
              shadow-md min-h-32
              px-6 py-8 relative
              rounded-lg border border-gray-200 
              flex items-center justify-center"
            onClick={handleClick} 
            key="back"
          >
            <button onClick={(e)=>handleEditClick(e, word)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition duration-200"><PencilSquareIcon className="h-5"/></button>
            <h2 className="text-[1.2rem] font-semibold text-center bg-white">{word.meaning}</h2>
          </div>
        
      </ReactCardFlip>
    </motion.div>

    <DisplayEditModal
      isOpen={isEditModalOpen}
      onClose={closeModal}
      editWord={editWord}
      setEditWord={setEditWord}
    />
  </>);
};

export default CardsItem;
