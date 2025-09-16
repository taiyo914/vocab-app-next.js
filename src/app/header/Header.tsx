"use client";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Menubar from "./Menubar";
import Logo from "@/components/Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-[2000px] mx-auto py-3 xs:py-2 px-5 xs:px-4 flex justify-between items-center">
        <h1>
          <Logo />
        </h1>
        <nav>
          <div className="flex space-x-4 items-center">
            {/* ハンバーガーメニューボタン */}
            <button onClick={toggleMenu} className="">
              <Bars3Icon className="cursor-pointer h-8 text-gray-600 hover:text-gray-400 transition-all duration-200" />
            </button>
          </div>
        </nav>
      </div>
      <Menubar isMenuOpen={isMenuOpen} onClose={toggleMenu} />
    </header>
  );
};

export default Header;
