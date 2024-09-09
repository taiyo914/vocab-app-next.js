import { motion } from "framer-motion";
import {
  XMarkIcon,
  HomeIcon,
  ArrowLeftStartOnRectangleIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import SignOutBtn from "./SignOutBtn";

interface MenuProps {
  isMenuOpen: boolean;
  onClose: () => void;
}

const Menubar = ({ isMenuOpen, onClose }: MenuProps) => {
  return (
    <div>
      <motion.div
        initial={{ x: "120%", opacity:0}}
        animate={{ x: isMenuOpen ? "0%" : "120%", opacity:1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-0 right-0 h-full w-1/2  bg-gray-100 shadow-2xl px-5 py-4 z-40"
      >
        <div className="flex justify-end">
          <XMarkIcon className="h-9 text-gray-400 cursor-pointer hover:bg-gray-200 rounded-full p-1 transition-all duration-300" onClick={onClose} />
        </div>
        <div className="p-4">
          <h2 className="text-3xl p-3 pt-0 font-bold ">Menu</h2>
          <div className="text-lg text-gray-700 rounded-lg p-3 duration-200 transition-all hover:bg-gray-200  flex items-center">
            <HomeIcon className="h-5 mr-1" />
            <a href="#">Home</a>
          </div>
          <div className="text-lg text-gray-700 rounded-lg p-3 duration-200 transition-all hover:bg-gray-200  flex items-center">
            <UserCircleIcon className="h-5 mr-1" />
            <a href="#">Profile</a>
          </div>
          <div className="text-lg text-gray-700 rounded-lg p-3 duration-200 transition-all hover:bg-gray-200  flex items-center">
            <InformationCircleIcon className="h-5 mr-1" />
            <a href="#">About</a>
          </div>
          <div className="text-lg text-gray-700 rounded-lg p-3 duration-200 transition-all hover:bg-gray-200  flex items-center">
            <QuestionMarkCircleIcon className="h-5 mr-1" />
            <a href="#">Help</a>
          </div>
          <div className="text-lg text-gray-700 rounded-lg p-3 duration-200 transition-all hover:bg-gray-200  flex items-center">
            <EnvelopeIcon className="h-5 mr-1" />
            <a href="#">Contact</a>
          </div>
          <div className="my-1 border"></div>
          <div className="text-lg text-gray-700 rounded-lg p-3 duration-200 transition-all hover:bg-gray-200  flex items-center">
            <ArrowLeftStartOnRectangleIcon className="h-5 mr-1" />
            <SignOutBtn />
          </div>
        </div>
      </motion.div>

      {/* サイドバーが開いているときのオーバーレイ */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={onClose} // オーバーレイをクリックすると閉じる
        ></div>
      )}
    </div>
  );
};

export default Menubar;
