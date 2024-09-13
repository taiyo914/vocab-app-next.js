"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import useOpenModalStore from "@/store/openModalStore";
import useUserStore from "@/store/userStore";
import { WordsSettingsType } from "@/types/Types";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsModal() {
  const { isOpen, toggleModal } = useOpenModalStore();
  const { userId, wordsSettings, setWordsSettings } = useUserStore();
  const supabase = createClient();
  const [temporarySettings, setTemporarySettings] = useState<WordsSettingsType | null>(wordsSettings);
  const [showDetails, setShowDetails] = useState(false); // 詳細設定を表示するかどうかの状態
  const toggleDetails = () => setShowDetails((prev) => !prev); // トグルボタン用
  const onClose = () => {
    toggleModal()
    setTemporarySettings(wordsSettings)
  }


  useEffect(() => {
    if (wordsSettings) {
      setTemporarySettings(wordsSettings);
    }
  }, [
    wordsSettings?.sort_field,
    wordsSettings?.sort_order,
    wordsSettings?.start_index,
    wordsSettings?.end_index,
    wordsSettings?.start_review_count,
    wordsSettings?.end_review_count,
    wordsSettings?.date_field,
    wordsSettings?.start_date,
    wordsSettings?.end_date,
    wordsSettings?.display_count,
    //page_offset以外
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setTemporarySettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    } as WordsSettingsType)) 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Supabaseにデータを保存
    const { error } = await supabase
      .from("user_words_settings")
      .update({
        ...temporarySettings,
        page_offset: 1,
      })
      .eq("user_id", userId);

    if (error) {
      alert(`設定の更新に失敗しました...: ${error.message}`);
    } else {
      setWordsSettings({ ...temporarySettings, page_offset: 1 });
      console.log("submitが実行されました")
      toggleModal()
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* オーバーレイ */}
          <motion.div
            className="absolute inset-0 bg-black z-40"
            initial={{ opacity: 0 }}    
            animate={{ opacity: 0.5 }}   
            exit={{ opacity: 0 }}        
            transition={{ duration: 0.3 }}
            onClick={onClose}
          ></motion.div>
        <motion.div 
           initial={{ opacity: 0, y: -50 }}  
           animate={{ opacity: 1, y: 0 }}    
           exit={{ opacity: 0, y: -50 }}      
           transition={{ duration: 0.3 }}  
           className="
            border shadow-lg rounded-2xl
            z-50
            xs:m-7 m-5 
            w-1/2 max-w-2xl xs:min-w-[400px] min-w-[300px] 
            overflow-hidden
            max-h-[90vh]
            relative"
        >
          <div className="bg-white p-5 xs:px-10 xs:py-7 max-h-[90vh] overflow-y-auto " >
            <h1 className="text-2xl font-bold mb-5 text-center">設定</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 ">
              <div className="mb-4">
                <label className="block font-medium text-gray-500 xs:mb-1 xs:-mt-2 -mt-4 ">表示件数</label>
                <input
                  type="number"
                  name="display_count"
                  min = {1}
                  value={temporarySettings?.display_count}
                  onChange={handleChange}
                  className="
                    xs:py-2 py-1 px-3 w-full 
                    font-[550] 
                    border border-gray-300 rounded-lg 
                    focus:outline-none focus:border-black"
                />
              </div>
              <div className="mb-7">
                <label className="block font-medium xs:mb-1  text-gray-500">並び替え</label>
                <div className="flex items-center space-x-2">
                  <select
                    name="sort_field"
                    value={temporarySettings?.sort_field}
                    onChange={handleChange}
                    className="
                      xs:pl-3 pl-2 xs:py-3 py-2 pr-0 
                      border border-gray-300 rounded-lg 
                      w-full font-[580]
                      focus:outline-none focus:border-black"
                  >
                    <option value="increment">作成日</option>
                    <option value="index">優先度</option>
                    <option value="word">語句</option>
                    <option value="review_count">復習回数</option>
                    <option value="reviewed_at">復習日</option>
                    <option value="updated_at">更新日</option>
                  </select>
                  <span className=" text-gray-600 ">で</span>
                  <select
                    name="sort_order"
                    value={temporarySettings?.sort_order}
                    onChange={handleChange}
                    className="
                      xs:pl-3 pl-2 xs:py-3 py-2 pr-0 
                      border border-gray-300 rounded-lg 
                      w-full font-[580]
                      focus:outline-none focus:border-black"
                  >
                    <option value="ASC">昇順</option>
                    <option value="DESC">降順</option>
                  </select>
                  <span className=" text-gray-600 min-w-max ">にする</span>
                </div>
              </div>


                {/* トグルボタン */}
                <div className="flex justify-center text-sm">
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-700 px-5 py-2 text-center rounded-full"
                    onClick={toggleDetails}
                  >
                    {showDetails ? "閉じる" : "詳細設定"}
                  </button>
                </div>


              <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity:1}}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden"
                    >
                      <div className="mb-4 mt-1">
                        <label className="block font-medium xs:mb-1  text-gray-500">優先度</label>
                        <div className="flex items-center space-x-2 ">
                          <input
                            type="number"
                            name="start_index"
                            min={0}
                            max={temporarySettings?.end_index}
                            value={temporarySettings?.start_index}
                            onChange={handleChange}
                            className="
                             xs:py-2 py-1 px-3
                             w-full font-[550] 
                             border border-gray-300 rounded-lg  
                             focus:outline-none focus:border-black"
                          />
                          <span className=" text-gray-600 min-w-max ">から</span>
                          <input
                            type="number"
                            name="end_index"
                            min={temporarySettings?.start_index}
                            max={10}
                            value={temporarySettings?.end_index}
                            onChange={handleChange}
                            className="
                              xs:py-2 py-1 px-3
                              w-full font-[550] 
                              border border-gray-300 rounded-lg  
                              focus:outline-none focus:border-black"
                          />
                          <span className=" text-gray-600 min-w-max">まで</span>
                        </div>
                      </div>

                      <div className="mb-4 ">
                        <label className="block font-medium xs:mb-1 text-gray-500">復習回数</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            name="start_review_count"
                            min={0}
                            max={temporarySettings?.end_review_count}
                            value={temporarySettings?.start_review_count}
                            onChange={handleChange}
                            className="
                              xs:py-2 py-1 px-3
                              w-full font-[550] 
                              border border-gray-300 rounded-lg  
                              focus:outline-none focus:border-black"
                          />
                          <span className="min-w-max  text-gray-600">から</span>
                          <input
                            type="number"
                            name="end_review_count"
                            min={temporarySettings?.start_review_count}
                            max={100}
                            value={temporarySettings?.end_review_count}
                            onChange={handleChange}
                            className="
                              xs:py-2 py-1 px-3
                              w-full font-[550] 
                              border border-gray-300 rounded-lg  
                              focus:outline-none focus:border-black"
                          />
                          <span className="min-w-max text-gray-600 text-center">まで</span>
                        </div>
                      </div>

                      <div className="">
                        <label className="block font-medium xs:mb-1 text-gray-500">日付範囲</label>
                        <div className="flex flex-wrap items-baseline -mr-2">
                          <div className="flex flex-grow items-center mb-2">
                            <select
                              name="date_field"
                              value={temporarySettings?.date_field}
                              onChange={handleChange}
                              className="
                                xs:p-3 p-2 
                                font-[580] 
                                border border-gray-300 rounded-lg 
                                focus:outline-none focus:border-black 
                                flex-grow  max-w"
                            >
                              <option value="created_at">作成日</option>
                              <option value="updated_at">更新日</option>
                              <option value="reviewed_at">復習日</option>
                            </select>
                            <span className="text-gray-600 mx-2">を</span>
                          </div>
                          <div className="flex items-center flex-wrap flex-grow">
                            <div className="flex items-center flex-grow mb-2">
                              <input
                                type="date"
                                name="start_date"
                                value={temporarySettings?.start_date ?? ""}
                                onChange={handleChange}
                                className="
                                qxs:p-3 p-2 
                                font-[580] 
                                border border-gray-300 rounded-lg f
                                ocus:outline-none focus:border-black 
                                flex-grow"
                              />
                              <span className="text-gray-600 min-w-8 mx-2 ">から</span>
                            </div>
                            <div className="flex items-center flex-grow mb-2">
                              <input
                                type="date"
                                name="end_date"
                                value={temporarySettings?.end_date ?? ""}
                                onChange={handleChange}
                                className="
                                  xs:p-3 p-2 
                                  font-[580] 
                                  border border-gray-300 rounded-lg 
                                  focus:outline-none focus:border-black 
                                  flex-grow"
                              />
                              <span className="text-gray-600 min-w-8 mx-2">まで</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>)}
              </AnimatePresence>

              <div className="flex justify-between space-x-3 mt-7">
                <button
                  type="submit"
                  className="bg-blue-500 text-lg text-white px-3 xs:py-3 py-2 rounded-lg hover:bg-blue-600 transition-all w-full"
                >
                  設定を保存
                </button>
                <div
                  className="bg-gray-500 text-lg text-white px-3 xs:py-3 py-2 rounded-lg hover:bg-gray-600 transition-all mr-1 w-full text-center"
                  onClick={onClose}
                >
                  閉じる
                </div>
              </div>
            </form>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
