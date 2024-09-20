import React, {useState}from "react";
import { createClient } from "@/utils/supabase/client";
import CustomSlider from "../../../components/CustomSlider";
import useUserStore from "@/store/userStore";
import { WordType } from "@/types/Types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Modal";
import Spinner from "../../../components/Spiner";

interface DisplayEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editWord: WordType | null;
  setEditWord: React.Dispatch<React.SetStateAction<WordType | null>>;
}

const DisplayEditModal: React.FC<DisplayEditModalProps> = ({
  isOpen,
  onClose,
  editWord,
  setEditWord,
}) => {
  const supabase = createClient();
  const { words, setWords, fetchWords } = useUserStore();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); 
  const [ deleteLoading, setDeleteLoading] = useState(false)

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

  // const handleDelete = async () => {
  //   setDeleteLoading(true)
  //   try {
  //     const deleteRequest = supabase //awaitはつけない
  //       .from("words")
  //       .update({ deleted_at: new Date().toISOString() })
  //       .eq("id", editWord!.id);

  //     const delay = new Promise((resolve) => setTimeout(resolve, 500)); // 0.5秒の遅延
  //     // 削除処理と1秒の遅延を並列で実行し、両方が完了するまで待つ（最低0.5秒は待つ）
  //     const [{ error }] = await Promise.all([deleteRequest, delay]);

  //     if (error) throw new Error(error.message);
  //     else console.log("削除に成功しました！");

  //     await fetchWords();

  //     onClose();
  //   } catch (err: any) {
  //     console.error("削除エラー:", err.message);
  //   } finally {
  //     setDeleteLoading(false);
  //   }
  // };

  
  const handleDelete = async () => {
    setDeleteLoading(true)

    try {
      const response = await fetch("/api/deleteWord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wordId: editWord!.id }),
      });
      
      if (!response.ok) {
        throw new Error("Error deleting word");
      }

      await fetchWords();
      onClose(); 
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  // const handleDelete = async () => {
  //   setDeleteLoading(true)
  //   try {
  //     const { error } = await supabase
  //       .from("words")
  //       .update({ deleted_at: new Date().toISOString() }) // deleted_atを更新
  //       .eq("id", editWord!.id);

  //     if (error) {
  //       throw new Error("Error deleting word: " + error.message);
  //     }

  //     await fetchWords()
  //     onClose(); // モーダルを閉じる
  //   } catch (err: any) {
  //     console.error(err.message);
  //   } finally {
  //     setDeleteLoading(false);
  //   }
  // };

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
              text-gray-800 font-semibold
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
              text-gray-800 font-semibold
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
              text-gray-800 
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
              text-gray-800 
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
        <div className="mb-5">
          <label className="text-gray-600 ml-1">優先度</label>
          <CustomSlider
            sliderValue={editWord?.index || 0}
            onChange={(value) => setEditWord((prev) => prev && { ...prev, index: value })}
          />
        </div>
      </div>

      {/* ボタン */}
      <div className="flex justify-center gap-3 my-10">
        <button
          onClick={handleSaveChanges}
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-[550] rounded-lg transition duration-300"
        >
          変更を保存
        </button>
        <button
          onClick={onClose}
          className="w-full py-2  bg-gray-300 hover:bg-gray-400 text-black font-[550] rounded-lg transition duration-300"
        >
          閉じる
        </button>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsDeleteConfirmOpen(true)} 
          className="
            w-40 py-2 rounded-full text-sm -mb-1
            hover:bg-gray-200 text-gray-600 font-[580] transition duration-300
            flex items-center justify-center gap-0.5"
        >
          <TrashIcon className="h-5"/>
          単語を削除する
        </button>
      </div>

      {isDeleteConfirmOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full">
            <div className="bg-white p-6 rounded-xl shadow-lg w-4/5 max-w-sm">
              <h3 className="font-semibold mb-4 text-center">本当に削除しますか？</h3>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    handleDelete();
                  }}
                  className="
                    w-full py-2 
                    bg-gray-500 text-white font-[550] rounded-lg 
                    hover:bg-gray-600 transition duration-200
                    flex justify-center items-center gap-1"
                >
                  <span>削除</span>
                  {deleteLoading 
                    ? <Spinner size="h-5 w-5" borderColor="border-gray-100 border-t-gray-400" borderWeight="border-[3px]"/>
                    : <TrashIcon className="h-5"/>}
                </button>
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="
                    w-full py-2 bg-gray-300 text-black rounded-lg font-[550
                    hover:bg-gray-200 transition duration-200]"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}
  </Modal>
  );
};

export default DisplayEditModal;
