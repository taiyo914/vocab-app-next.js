import Link from 'next/link'
import React, { useState } from 'react'
import { BiHomeAlt2 } from "react-icons/bi";
import { ArrowUturnLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/userStore';
import Spinner from '@/components/Spiner';

interface ReviewTopButtonsProps{
  goToFirstSlide: () => void;
  toggleSettingsModal: () => void
}


export default function ReviewTopButtons({goToFirstSlide, toggleSettingsModal}: ReviewTopButtonsProps) {
  const router = useRouter();
  const fetchWords = useUserStore( state => state.fetchWords);
  const [isLoading, setIsLoading] = useState(false);
  const goToHome = async () =>{
    setIsLoading(true)
    await fetchWords()
    router.push("/")
    setIsLoading(false)
  }
  return (
    <div className="w-full short:hidden">
          <div className="flex justify-between items-center">
            <div className="w-full">
              <div
                onClick = {goToHome}
                className="
                  text-gray-600 text-lg short:text-base
                  w-full bg-gray-50 cursor-pointer
                  py-3
                  hover:bg-gray-200 hover:shadow-sm
                  transition duration-200 ease-in-out
                  flex items-center justify-center gap-1"
              >
                {isLoading ? <Spinner borderWeight='border-[0.25rem]'/> :<BiHomeAlt2 />}
                <div>ホームへ</div>
              </div>
            </div>
            <button
              onClick={goToFirstSlide}
              className="
                text-gray-600 text-lg short:text-base 
                w-full bg-gray-50 border-x-2
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
                w-full bg-gray-50
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
