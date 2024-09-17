"use client"
import React from 'react';
import { motion } from 'framer-motion';

const LoadingDots = () => {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2, // 子要素のアニメーション開始を0.2秒遅らせる
      },
    },
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -8, 0], // 上下に移動
      backgroundColor: ["rgb(96 165 250)", "rgb(59 130 246)", "rgb(96 165 250)"], // 色の変化
      transition: {
        duration: 0.6,
        repeat: Infinity, // 無限ループ
        repeatDelay: 1, // 1秒間止まる
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex space-x-2">
        <motion.span
          className="h-4 w-4 bg-blue-400 rounded-full"
          variants={dotVariants}
        />
        <motion.span
          className="h-4 w-4 bg-blue-400 rounded-full"
          variants={dotVariants}
        />
        <motion.span
          className="h-4 w-4 bg-blue-400 rounded-full"
          variants={dotVariants}
        />
      </motion.div>
    </div>
  );
};

export default LoadingDots;


