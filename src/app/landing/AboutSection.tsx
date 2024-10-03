"use client"
import { motion } from "framer-motion";
import { CheckCircleIcon, TableCellsIcon } from "@heroicons/react/24/outline";

export default function AboutSection() {
  return (
    <section id="about" className="w-full mx-auto max-w-[1500px] md:mt-12 lg:mt-16 pb-10 xs:pb-5 pt-2" >
      <div className="xs:px-5 px-8 md:px-10 lg:px-16">

          <div className="xs:space-y-4 space-y-6 w-full flex justify-center items-center mb-5">
            <h2 className="ml-8 text-4xl lg:text-5xl font-bold tracking-tight text-center  bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 ">
              しっかり整理、
              <div className="sm:hidden h-3 xs:h-2"></div>
              サクッと復習。
            </h2>
          </div> 

          <div className="xs:px-1 px-5 sm:px-10  mx-auto mb-10 xs:mb-7">
            <p className="text-gray-500 text-lg text-center">従来のアプリにはなかった、整理のしやすさと復習の手軽さを両立しました。</p>
          </div>

      <div className="flex items-center md:gap-8 gap-5  flex-col md:flex-row">

        <motion.div 
          whileHover={{scale: 1.01}}
          className="w-full flex flex-col items-center text-center py-5 px-5 bg-white rounded-xl shadow-lg border border-gray-200">
          
          <div className="p-3 rounded-full mb-3 bg-green-50">
            <TableCellsIcon className="h-12  text-green-500"/>
          </div>
          <h2 className="text-2xl font-bold mb-2">データベース管理</h2>
          <p className="text-gray-500">日々の単語を簡単に記録・整理</p>
          <p className="text-gray-500">検索や並び替えもスムーズ</p>

        </motion.div>
          
          <motion.div whileHover={{scale: 1.01}}
            className="w-full flex flex-col items-center text-center py-5 px-5 bg-white rounded-xl shadow-lg border border-gray-200">
            
            <div className="p-3 rounded-full mb-3 bg-green-50">
              <CheckCircleIcon className="h-12  text-green-500"/>
            </div>
            <h2 className="text-2xl font-bold mb-2">カードで復習</h2>
            <p className="text-gray-500">例文やメモも手軽に復習</p>
            <p className="text-gray-500">日→英の練習もラクラク</p>
   
        </motion.div>
      </div>


       
      </div>
    </section>
  );
}
