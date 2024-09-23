"use client"
import { motion } from 'framer-motion';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';

const SingleFlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        layout  // このプロパティがサイズ変更をスムーズにします
        whileHover={{ scale: 1.03 }}  // ホバーでスケールを少し大きく
        transition={{ layout: { duration: 0.5 } }}  // アニメーションの速さ
        className='p-5 border '
      >
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          <div
            className="
              flip-card
              shadow-md
              w-[200px] h-[100px]
              px-6 py-6
              rounded-lg border border-gray-200 
              flex items-center justify-center"
            onClick={handleClick}
            key="front"
          >
            <h2 className="text-[1.4rem] font-bold text-center bg-white">
              こんにちは
            </h2>
          </div>

          <div
            className="
              flip-card
              shadow-md
              w-[250px] h-[150px]  // 裏面のサイズを変える
              px-6 py-6
              rounded-lg border border-gray-200 
              flex items-center justify-center"
            onClick={handleClick}
            key="back"
          >
            <h2 className="text-[1.4rem] font-bold text-center bg-white">
              裏です
            </h2>
          </div>
        </ReactCardFlip>
      </motion.div>
    </div>
  );
};

export default SingleFlipCard;
