// "use client"
import { useEffect , useState} from'react';
import { motion } from "framer-motion";
import useTabStore from "@/store/currentTabStore";

const Tabs = () => {
  const { currentTab, setTab } = useTabStore();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(()=>{
    const savedTab = localStorage.getItem('currentTab');
  //アニメーションが早くかかりすぎないように最低0.5秒は遅延させる（ちゃんとsetTabはセットされてる)
    const loadTabFromStorage = new Promise<void>((resolve) => {
      if (savedTab) {
        setTab(savedTab); 
      }
      resolve(); 
    });

    const delay = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve(); 
      }, 500);
    });

    Promise.all([loadTabFromStorage, delay]).then(() => {
      setIsLoading(false); 
    });
  },[setTab])

  const handleTabChange = (tab: string) => {
    setTab(tab); 
    localStorage.setItem('currentTab', tab); 
  };

  return (
    <div className="flex">
      <motion.div
        onClick={() => handleTabChange('cards')}
        className={`
          cursor-pointer 
          py-2 px-5
          border-t border-l 
          rounded-tl-lg rounded-tr-lg
          duration-300
          ease-out
          transition-all
          ${isLoading
            ? 'text-gray-400 font-semibold border-r' 
            : currentTab === 'cards' 
            ? 'border-r font-bold bg-gray-100' 
            : 'hover:bg-gray-50 text-gray-400 font-semibold '}`}
      >
        カード
      </motion.div>
      <div
        onClick={() => handleTabChange('table')}
        className={`
          cursor-pointer 
          py-2 px-3 
          border-t border-r 
          rounded-tl-lg rounded-tr-lg
          transition-all
          duration-300
          ${isLoading
            ? 'text-gray-400 font-semibold' 
            : currentTab === 'table' 
            ? 'bg-gray-100 font-bold border-l' 
            : 'hover:bg-gray-50 text-gray-400 font-semibold '}`}
      >
        テーブル
      </div>
    </div>
  );
};

export default Tabs;
