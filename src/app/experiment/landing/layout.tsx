"use client"

import React from 'react'
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { 
  Bars3Icon, 
} from "@heroicons/react/24/outline";
import Link from "next/link"

export default function Layout({children}:{children: React.ReactNode}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div className='text-black'>
      <header className="max-w-[2000px] mx-auto py-4 xs:py-3 px-5 xs:px-4 fixed w-full bg-white z-50 shadow-md flex items-center justify-between">
        <Link className="" href="#">
          <span className="xs:ml-0 text-3xl font-bold">VocabApp</span>
        </Link>
        <nav className="ml-auto hidden sm:flex gap-4 sm:gap-6">
          <Link className="text-gray-500 font-medium hover:text-blue-500 transition-colors cursor-pointer" href="#">
            使い方
          </Link>
          <Link className="text-gray-500 font-medium hover:text-blue-500 transition-colors cursor-pointer" href="#">
            ログイン
          </Link>
        </nav>
        <button
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Bars3Icon className="h-8 w-8" />
        </button>
      </header>

    <AnimatePresence>
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
    </AnimatePresence>
      {children}
    </div>
  );
}
