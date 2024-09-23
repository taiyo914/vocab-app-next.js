import { useState } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, XCircleIcon } from "@heroicons/react/16/solid";

export default function NewHeader() {
  const [isExpanded, setIsExpanded] = useState(false);
  const commonProps = "rounded-t-lg font-semibold py-1 border-t";

  // アニメーションのためのバリアント設定
  const buttonVariants = {
    hidden: { opacity: 0, width: 0, transition: { duration: 0.5 } },
    visible: { opacity: 1, width: "auto", transition: { duration: 0.5 } },
  };

  const searchInputVariants = {
    collapsed: { width: 0, opacity: 0, transition: { duration: 0.5 } },
    expanded: { width: "70%", opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className="grid grid-cols-2">
        {/* タブ */}
        <div className="flex border">
          <div
            className={` ${commonProps}
          bg-gray-200 
          px-4 
          border-x`}
          >
            カード
          </div>
          <div
            className={`${commonProps}
          bg-gray-50 
          px-2 
          border-r`}
          >
            テーブル
          </div>
        </div>
        {/* 右側のボタン */}
        <div className="border flex justify-end gap-1 items-center">
          <MagnifyingGlassIcon
            className="h-[20px] cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          {!isExpanded && (
            <div className="py-1 flex items-center">
              <AdjustmentsHorizontalIcon className="h-[20px]" />
              <motion.div
                initial="visible"
                animate={isExpanded ? "hidden" : "visible"}
                variants={buttonVariants}
                className="overflow-hidden"
              >
                設定
              </motion.div>
            </div>
          )}
          <motion.input
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={searchInputVariants}
            className="border h-[20px] ml-2"
            placeholder="検索"
          />
          {isExpanded && <XCircleIcon className="h-[20px] cursor-pointer" onClick={() => setIsExpanded(false)} />}
        </div>
      </div>

      {/* コンテンツ */}
      <div className="border h-screen bg-gray-100">コンテンツ</div>
    </>
  );
}
