import React, {useState}from "react";
import { createClient } from "@/utils/supabase/client";
import CustomSlider from "@/components/CustomSlider";
import useUserStore from "@/store/userStore";
import { WordType } from "@/types/Types";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Modal";

interface ReviewEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editWord: WordType | null;
  setEditWord: React.Dispatch<React.SetStateAction<WordType | null>>;
}

const ReviewEditModal: React.FC<ReviewEditModalProps> = ({
  isOpen,
  onClose,
  editWord,
  setEditWord,
}) => {
  const supabase = createClient();
  const { words, setWords } = useUserStore();

  const handleSaveChanges = async () => {
    try {
      const { error } = await supabase.from("words").update(editWord).eq("id", editWord!.id);

      if (error) throw new Error(error.message);
      else console.log("変更に成功しました！");

      const updateWords = words!.map((word) => (word.id === editWord!.id ? { ...editWord } : word));

      setWords(updateWords as WordType[]);

      onClose(); // 保存後にモーダルを閉じる
    } catch (err: any) {
      console.error("更新エラー:", err.message);
    }
  };

  return (
   <Modal isOpen ={isOpen} onClose={onClose}>
      <div className="relative flex items-center justify-center mt-2 mb-3">
        <PencilSquareIcon className="h-5" />
        <h2 className="font-bold text-xl ">カードを編集</h2>
      </div>

      <div>
        <div className="mb-5">
          <label className="text-gray-600 ml-1">単語</label>
          <input
            type="text"
            value={editWord?.word}
            onChange={(e) =>
              setEditWord((prev) => prev && { ...prev, word: e.target.value })
            }
            className="
              w-full px-3 py-2 
              border rounded-lg 
              font-[500]
              focus:outline-none focus:border-gray-700 focus:border-1 transition-colors"
          />
        </div>

        <div className="mb-5">
          <label className="text-gray-600 ml-1">意味</label>
          <input
            type="text"
            value={editWord?.meaning}
            onChange={(e) =>
              setEditWord((prev) => prev && { ...prev, meaning: e.target.value })
            }
            className="
              w-full px-3 py-2 
              border rounded-lg
              focus:outline-none focus:border-gray-700 focus:border-1 transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-600 ml-1">例文</label>
          <textarea
            value={editWord?.example}
            onChange={(e) =>
              setEditWord((prev) => prev && { ...prev, example: e.target.value })
            }
            className="
              w-full px-3 py-2 
              border rounded-lg 
              focus:outline-none focus:border-gray-700 focus:border-1 transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-600 ml-1">例文訳</label>
          <textarea
            value={editWord?.example_translation}
            onChange={(e) =>
              setEditWord(
                (prev) => prev && { ...prev, example_translation: e.target.value }
              )
            }
            className="
              w-full px-3 py-2 
              border rounded-lg 
              focus:outline-none focus:border-gray-700 focus:border-1 transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-600 ml-1">メモ</label>
          <textarea
            value={editWord?.memo}
            onChange={(e) =>
              setEditWord((prev) => prev && { ...prev, memo: e.target.value })
            }
            className="
              w-full px-3 py-2 
              border rounded-lg 
              text-gray-600 
              focus:outline-none focus:border-gray-700 focus:border-1 transition-colors"
          />
        </div>
        <div className="mb-8 xs:mb-6 pl-1">
          <div className="flex items-center gap-2">
            <label className="text-gray-600 ml-0.5">優先度</label>
            <div className="">{editWord?.index}</div>
          </div>
          <CustomSlider
            sliderValue={editWord?.index || 0}
            onChange={(value) => setEditWord((prev) => prev && { ...prev, index: value })}
          />
        </div>
      </div>

    {/* ボタン */}
      <div className="flex gap-3 -mr-1 mb-1 xs:mb-0">
        <button
          onClick={handleSaveChanges}
          className="py-2 border rounded-xl text-white w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 font-semibold"
        >
          保 存
        </button>
        <button
          onClick = {onClose} 
          className="py-3 border rounded-xl text-white w-full bg-gray-500 hover:bg-gray-600 transition-colors duration-300 font-semibold" 
        >
          キャンセル
        </button>
      </div>
  </Modal>
  );
};

export default ReviewEditModal;
