import React from "react";
import { useState } from "react";
import { WordType } from "@/types/Types";
import { motion } from "framer-motion";
import EditWordModal from "@/components/EditWordModal";
import { isMobile } from "react-device-detect";

const parseCustomMarkup = (text: string, lang:string = "en" ): React.ReactNode[] => {
  let parts: React.ReactNode[] = [];

  if (!text) {
    text = "";
  }

  const fontWeight = isMobile ? "font-[700]" : "font-[650]"
  const underlineOffset = isMobile 
    ? lang === "ja" ? "underline underline-offset-[3.3px]" : "underline underline-offset-[2px]"  
    : lang === "ja" ? "underline underline-offset-[3.6px]" : "underline underline-offset-[2.2px]" ;
  const underlineThickness = ""
  // まず**で分割
  let boldSplit = text.split(/(\*\*)/);
  let isBold = false;
  let isUnderline = false;

  boldSplit.forEach((part, index) => {
    //**が来るたびに太字にするかどうかを切り替える/
    if (part === '**') {
      isBold = !isBold;  
      return;
    }

    //次に__で分割
    let underlineSplit = part.split(/(__)/);
    underlineSplit.forEach((subPart, subIndex) => {
      //__が来るたびに下線にするかどうかを切り替える
      if (subPart === '__') {
        isUnderline = !isUnderline;  
        return;
      }

      //isBoldもisUnderlineもfalseのときはif文に引っかからないのでこのまま/
      let element = <span key={`${index}-${subIndex}`}>{subPart}</span>;

      if (isBold && isUnderline) {
        // 両方がtrueの場合（太字+下線）
        element = (
          <span 
            key={`${index}-${subIndex}`} 
            className={`${fontWeight}  ${underlineOffset}`}
            style={{ textDecorationThickness: underlineThickness }}
          >
            {subPart}
          </span>
        );
      } else if (isBold) {
        // 太字のみ
        element = (
          <span key={`${index}-${subIndex}`} className={`${fontWeight}`}>
            {subPart}
          </span>
        );
      } else if (isUnderline) {
        // 下線のみ
        element = (
          <span 
            key={`${index}-${subIndex}`} 
            className={`${underlineOffset}`}
            style={{ textDecorationThickness: underlineThickness }}
          >
            {subPart}
          </span>
        );
      } 

      parts.push(element);
    });
  });

  return parts;
};

const VocabListItem = ({ word }: { word: WordType }) => {
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
    <>
      <motion.div
        className="flex items-center"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div
          onClick={() => handleEditClick(word)}
          className="min-h-[5.8rem] cursor-pointer flex-1 grid grid-cols-5 border-gray-200 bg-white border shadow-sm xs:shadow rounded-xl py-3 hover:shadow-md transition-all duration-300"
        >
          <div className="col-span-1 flex items-center border-r border-gray-200 pl-3 pr-3 font-bold text-lg ">
            <div
              className={`flex justify-center items-center min-h-10 min-w-10 bg-gray-300 rounded-full text-lg font-bold mr-3`}
            >
              {word.index}
            </div>
            <div className="text-start text-xl overflow-auto">{parseCustomMarkup(word.word)}</div>
          </div>
          <div className="col-span-1 flex justify-center items-center text-center border-r border-gray-200 px-2 font-semibold text-lg">
            <div> {/*このdivタグはスタイルを保つうえで必要です。消さないで下さい*/}
            {parseCustomMarkup(word.meaning, "ja")}
            </div>
          </div>
          <div className="col-span-1 border-r flex justify-center items-center border-gray-200 pl-3 pr-2 text-center ">
            <div> {/*このdivタグはスタイルを保つうえで必要です。消さないで下さい*/}
              {parseCustomMarkup(word.example)}
            </div>
          </div>
          <div className="col-span-1  border-r flex justify-center items-center border-gray-200 px-3 ">
            <div> {/*このdivタグはスタイルを保つうえで必要です。消さないで下さい*/}
              {parseCustomMarkup(word.example_translation, "ja")}
            </div>
          </div>
          <div className="col-span-1 flex justify-center items-center px-3 text-[0.95rem] text-gray-700 ">
            <div> {/*このdivタグはスタイルを保つうえで必要です。消さないで下さい*/}
               {parseCustomMarkup(word.memo, "ja")}
            </div>
          </div>
        </div>
      </motion.div>

      <div> {/*space-yを打ち消すために必要です*/}
        <EditWordModal
          isOpen={isEditModalOpen}
          onClose={closeModal}
          editWord={editWord}
          setEditWord={setEditWord}
          showDeleteBtn={true}
        />
      </div>
    </>
  );
};

export default VocabListItem;
