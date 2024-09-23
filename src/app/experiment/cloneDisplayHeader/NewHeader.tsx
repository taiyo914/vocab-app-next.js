"use client"
import React, {useState}  from "react";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import HeaderAnimation from "./HeaderAnimation";
import Hukugen from "./hukugen";
import { AnimatePresence, motion } from "framer-motion"


export default function NewHeader() {
  const [ isOpen, setIsOpen ] = useState(false);
  const commonProps = "rounded-t-lg font-semibold py-1 border-t";
  return (
    <>

      <div className="flex justify-between overflow-hidden">
        <div className="flex">
          <div className={` ${commonProps}  bg-gray-200 px-5 border-x`}>カード</div>
          <div className={`${commonProps} bg-gray-50 px-3 border-r`}>テーブル</div>
        </div>
        <div className="flex items-center">
          <MagnifyingGlassIcon className="h-[20px]" onClick={() => setIsOpen(prev => !prev)}/>
          <AnimatePresence> {isOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isOpen ? "130px" : 0, opacity: isOpen ? 1 : 0 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className=" flex items-center"
            >
              <input type="text" className="w-[110px]"/>
              <XCircleIcon className="h-[20px]"/>
            </motion.div>
          )}
          </AnimatePresence>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isOpen ? 0 : "28px", opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex overflow-hidden"
          >
            <AdjustmentsHorizontalIcon className="h-[25px] ml-[3px]" />
          </motion.div> 

        </div>
      </div>
      <div className="border h-screen bg-gray-100">コンテンツ</div>
    </>
  );

  // return (
  //   <>
  //     <div className="grid grid-cols-2">
  //       {/* タブ */}
  // <div className="flex border">
  //   <div
  //     className={` ${commonProps}
  //   bg-gray-200
  //   px-5
  //   border-x`}
  //   >
  //     カード
  //   </div>
  //   <div
  //     className={`${commonProps}
  //   bg-gray-50
  //   px-3
  //   border-r`}
  //   >
  //     テーブル
  //   </div>
  // </div>
  //       {/* 右側のボタン */}
  //       <div className="border flex justify-end gap-1">
  // <div className="py-1 flex items-center">
  //   <MagnifyingGlassIcon className="h-[20px]" />
  //   <div>検索</div>
  // </div>
  //         <div className="py-1 flex items-center">
  //           <AdjustmentsHorizontalIcon className="h-[20px]" />
  //           <div>設定</div>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="grid grid-cols-2">
  //       {/* タブ */}
  //       <div className="flex border">
  //         <div
  //           className={` ${commonProps}
  //         bg-gray-200
  //         px-4
  //         border-x`}
  //         >
  //           カード
  //         </div>
  //         <div
  //           className={`${commonProps}
  //         bg-gray-50
  //         px-2
  //         border-r`}
  //         >
  //           テーブル
  //         </div>
  //       </div>
  //       {/* 右側のボタン */}
  //       <div className="border flex items-center justify-end gap-0.5 py-1">
  //         <MagnifyingGlassIcon className="h-[20px] " />
  //         <input className="w-[70%] border h-[20px]" /> {/* max-w-[150px] */}
  //         <XCircleIcon className="h-[20px]" />
  //       </div>
  //     </div>

  //     {/* <HeaderAnimation/>
  //     <Hukugen/> */}
  //     {/* コンテンツ */}
  //     <div className="border h-screen bg-gray-100">コンテンツ</div>
  //   </>
  // );
}
