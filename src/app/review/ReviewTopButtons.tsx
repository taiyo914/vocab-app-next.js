import Link from 'next/link'
import React from 'react'
import { BiHomeAlt2 } from "react-icons/bi";
import { ArrowUturnLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

interface ReviewTopButtonsProps{
  goToFirstSlide: () => void;
  toggleSettingsModal: () => void
}


export default function ReviewTopButtons({goToFirstSlide, toggleSettingsModal}: ReviewTopButtonsProps) {
  return (
    <div className="w-full short:hidden">
          <div className="flex justify-between items-center">
            <div className="w-full">
              <Link
                href="/"
                className="
                  text-gray-600 text-lg short:text-base
                  w-full bg-gray-100
                  py-3
                  hover:bg-gray-200 hover:shadow-sm
                  transition duration-200 ease-in-out
                  flex items-center justify-center gap-1"
              >
                <BiHomeAlt2 />
                <div>ホームへ</div>
              </Link>
            </div>
            <button
              onClick={goToFirstSlide}
              className="
                text-gray-600 text-lg short:text-base 
                w-full bg-gray-100 border-x-2
                py-3
                hover:bg-gray-200 hover:shadow-sm
                transition duration-200 ease-in-out
                flex items-center justify-center gap-1"
            >
              <ArrowUturnLeftIcon className="h-4" />
              最初から
            </button>
            <button
              onClick={toggleSettingsModal}
              className="
                text-gray-600 text-lg short:text-base
                w-full bg-gray-100
                py-3
                hover:bg-gray-200 hover:shadow-sm
                transition duration-200 ease-in-out
                flex items-center justify-center gap-1"
            >
              <Cog6ToothIcon className="h-5" />
              設定
            </button>
          </div>
        </div>
  )
}
