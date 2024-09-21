import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { motion } from "framer-motion"
// import "./ReactCardFlip.css"

const MyCardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <motion.div
       whileHover={{scale: 1.03}}
      >
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" >
          <div
            className="
              flip-card
              shadow-md min-h-32 w-[200px] h-[100px]
              px-6 py-6
              rounded-lg border border-gray-200 
              flex items-center justify-center"
            onClick={handleClick} 
            key="front"
          >
            <h2 className="text-[1.4rem] font-bold text-center bg-white">こんにちは</h2>
          </div>

          <div
            className="
              flip-card
              shadow-md min-h-32 w-[200px] h-[100px]
              px-6 py-6
              rounded-lg border border-gray-200 
              flex items-center justify-center"
            onClick={handleClick} 
            key="back"
          >
            <h2 className="text-[1.4rem] font-bold text-center bg-white">裏です</h2>
          </div>
        </ReactCardFlip>
      </motion.div>
    </div>
  );
};

export default MyCardFlip;
