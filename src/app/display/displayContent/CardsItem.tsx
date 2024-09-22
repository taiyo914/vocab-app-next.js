"use client"; 
import { useState } from "react";
import { WordType } from "@/types/Types";
import { motion } from "framer-motion";
import ReactCardFlip from 'react-card-flip';
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import DisplayEditModal from "./DisplayEditModal";

const backgroundColors = [
  'rgb(250, 250, 250)',  // sliderColor-0
  'rgb(233, 255, 248)',  // sliderColor-1
  'rgb(227, 252, 242)',  // sliderColor-2
  'rgb(215, 248, 235)',  // sliderColor-3
  'rgb(255, 252, 235)',  // sliderColor-4
  'rgb(255, 250, 224)',  // sliderColor-5
  'rgb(255, 247, 213)',  // sliderColor-6
  'rgb(255, 240, 230)',  // sliderColor-7
  'rgb(255, 236, 220)',  // sliderColor-8
  'rgb(255, 232, 232)',  // sliderColor-9
  'rgb(255, 221, 221)'   // sliderColor-10
];

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
      className="cursor-pointer"
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.15}}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" flipSpeedBackToFront={0.35} flipSpeedFrontToBack={0.35} infinite={false}>
        <div
            className="
              shadow-md min-h-32
              px-6 py-8 bg-white
              rounded-lg border border-gray-200 
              flex items-center justify-center"
            onClick={handleClick} 
            key="front"
          >
            <h2 className="text-[1.4rem] font-bold text-center overflow-auto" >{word.word}</h2>
          </div>

          <div
            style={{
              backgroundColor: backgroundColors[word.index],
            }}
            className="
              shadow-md min-h-32
              px-6 py-8 relative
              rounded-lg border border-gray-200 
              flex items-center justify-center"
            onClick={handleClick} 
            key="back"
          >
            <button onClick={(e)=>handleEditClick(e, word)} className="absolute top-1 right-1 p-1 rounded-2xl text-gray-400 hover:text-gray-600 transition duration-200"><PencilSquareIcon className="h-5"/></button>
            <h2 className="text-[1.2rem] font-semibold text-center">{word.meaning}</h2>
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
