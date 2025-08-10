"use client"

import React from 'react'
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { 
  Bars3Icon, 
} from "@heroicons/react/24/outline";
import Link from "next/link"
import Footer from '@/app/Footer';

export default function Layout({children}:{children: React.ReactNode}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div className='text-black'>
      <header className='mx-auto py-3 xs:py-2 px-5 xs:px-4 fixed w-full bg-white z-50 shadow-md flex justify-center'>
        <div  className="max-w-[1400px] flex items-center justify-between w-full">
          <Link className="" href="#">
            <span className="xs:ml-0 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">VocabApp</span>
          </Link>
          <nav className="">
            <Link className="font-medium transition-colors cursor-pointer py-1.5 px-4  text-gray-500 border rounded-full hover:bg-gray-100 -mr-1" href="/signin">
              ログイン
            </Link>
          </nav>
          {/* <button
            className="sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Bars3Icon className="h-8 w-8" />
          </button> */}
        </div>
      </header>

    {/* とりあえずナビゲーションバーは保留 */}

    {/* <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-40 md:hidden"
        >
          <nav className="flex flex-col p-4">
            <Link className="text-sm font-medium py-2 hover:text-blue-500 transition-colors" href="#" onClick={() => setIsMenuOpen(false)}>
              使い方
            </Link>
            <Link className="text-sm font-medium py-2 hover:text-blue-500 transition-colors" href="#" onClick={() => setIsMenuOpen(false)}>
              ログイン
            </Link>
          </nav>
        </motion.div>
      )}
    </AnimatePresence> */}

      {children}

      <Footer/>
    </div>
  );
}
