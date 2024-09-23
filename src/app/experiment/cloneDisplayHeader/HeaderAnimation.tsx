"use client"
import React, { useState } from 'react'
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from 'framer-motion';

export default function HeaderAnimation() {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const commonProps = "rounded-t-lg font-semibold py-1 border-t";

  return (
    <>
      <div className='grid grid-cols-2'>
        {/* タブ */}
        <div className='flex border'>
          <div className={` ${commonProps} bg-gray-200 px-4 border-x`}>
            カード
          </div>
          <div className={`${commonProps} bg-gray-50 px-2 border-r`}>
            テーブル
          </div>
        </div>

        {/* 右側のボタン */}
        <div className='border flex items-center justify-end gap-1 py-1'>
          {/* 検索アイコン */}
          <div
            className='flex items-center cursor-pointer'
            onClick={() => setIsInputVisible(!isInputVisible)}
          >
            <MagnifyingGlassIcon className='h-[20px]' />
            {!isInputVisible && <div>検索</div>}
          </div>

          {/* アニメーション付きinput要素 */}
          <AnimatePresence>
            {isInputVisible && (
              <motion.input
                className='border h-[20px]'
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '70%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 10 }}
              />
            )}
          </AnimatePresence>

          {/* 閉じるアイコン */}
          {isInputVisible && (
            <XCircleIcon
              className='h-[20px] cursor-pointer'
              onClick={() => setIsInputVisible(false)}
            />
          )}

          {/* 設定アイコン（隠れるアニメーション付き） */}
          <AnimatePresence>
            {!isInputVisible && (
              <motion.div
                className='flex items-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 10 }}
              >
                <AdjustmentsHorizontalIcon className='h-[20px]' />
                <div>設定</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* コンテンツ */}
      <div className='border h-screen bg-gray-100'>
        コンテンツ
      </div>
    </>
  );
}
