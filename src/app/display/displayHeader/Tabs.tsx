// "use client"
import { motion } from "framer-motion";
import useTabStore from "@/store/currentTabStore";

const Tabs = () => {
  const { currentTab, setTab } = useTabStore();

  return (
    <div className="flex">
      <motion.div
        onClick={() => setTab('cards')}
        className={`
          cursor-pointer 
          py-2 px-5
          border-t border-l 
          rounded-tl-lg rounded-tr-lg
          duration-300
          ease-out
          transition-all
          ${currentTab === 'cards' 
            ? 'border-r font-bold bg-gray-100' 
            : 'hover:bg-gray-50 text-gray-400 font-semibold '}`}
      >
        カード
      </motion.div>
      <div
        onClick={() => setTab('table')}
        className={`
          cursor-pointer 
          py-2 px-3 
          border-t border-r 
          rounded-tl-lg rounded-tr-lg
          transition-all
          duration-300
          ${currentTab === 'table' 
            ? 'bg-gray-100 font-bold border-l' 
            : 'hover:bg-gray-50 text-gray-400 font-semibold '}`}
      >
        テーブル
      </div>
    </div>
  );
};

export default Tabs;
