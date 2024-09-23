"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactCardFlip from 'react-card-flip';

const GridFlipCards = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleClick = (index: number) => {
    setFlippedCards((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <motion.div
      layout  // グリッド全体のレイアウトにもアニメーションを適用
      className="grid grid-cols-3 gap-4 p-6 border-2 m-10 rounded-xl"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      }}
    >
      {Array.from({ length: 6 }, (_, index) => (
        <motion.div
          layout  // 各カードのサイズ変更にもアニメーションを適用
          whileHover={{ scale: 1.03 }}
          key={index}
          className="flex items-center justify-center"
        >
          <ReactCardFlip
            isFlipped={flippedCards.includes(index)}
            flipDirection="vertical"
          >
            {/* 表側のカード */}
            <div
              className="
                flip-card
                shadow-md w-[200px] h-[100px]
                px-6 py-6
                rounded-lg border border-gray-200 
                flex items-center justify-center"
              onClick={() => handleClick(index)}
              key="front"
            >
              <h2 className="text-[1.4rem] font-bold text-center bg-white">
                表 {index + 1}
              </h2>
            </div>

            {/* 裏側のカード（サイズを異なるものにする） */}
            <div
              className="
                flip-card
                shadow-md w-[250px] h-[150px]
                px-6 py-6
                rounded-lg border border-gray-200 
                flex items-center justify-center"
              onClick={() => handleClick(index)}
              key="back"
            >
              <h2 className="text-[1.4rem] font-bold text-center bg-white">
                裏 {index + 1}
              </h2>
            </div>
          </ReactCardFlip>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GridFlipCards;
