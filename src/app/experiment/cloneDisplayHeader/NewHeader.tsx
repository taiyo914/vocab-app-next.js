import React from 'react'
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function NewHeader() {
  const commonProps = "rounded-t-lg font-semibold py-1 border-t"
  return (<>
    <div className='grid grid-cols-2'>
    {/* タブ */}
      <div className='flex border'>
        <div className={` ${commonProps}
          bg-gray-200 
          px-4 
          border-x`}>
          カード
        </div>
        <div className={`${commonProps}
          bg-gray-50 
          px-2 
          border-r`}>
          テーブル
        </div>
      </div>
    {/* 右側のボタン */}
      <div className='border flex justify-end gap-1'>
        <div className='py-1 flex items-center'>
          <MagnifyingGlassIcon className='h-[20px]'/>
          <div>検索</div>
        </div>
        <div className='py-1 flex items-center'>
          <AdjustmentsHorizontalIcon className='h-[20px]'/>
          <div>設定</div>
        </div>
      </div>
    </div>

    <div className='grid grid-cols-2'>
    {/* タブ */}
      <div className='flex border' >
        <div className={` ${commonProps}
          bg-gray-200 
          px-4 
          border-x`}>
          カード
        </div>
        <div className={`${commonProps}
          bg-gray-50 
          px-2 
          border-r`}>
          テーブル
        </div>
      </div>
    {/* 右側のボタン */}
      <div className='border flex items-center justify-end gap-0.5 py-1'>
        <MagnifyingGlassIcon className='h-[20px] '/>
        <input className="w-[70%] border h-[20px]"/> {/* max-w-[150px] */}
        <XCircleIcon className='h-[20px]'/>
      </div>
    </div>

  {/* コンテンツ */}
    <div className='border h-screen bg-gray-100'>
      コンテンツ
    </div>
  </>)
}
