"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUturnLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import useNotificationStore from "@/store/useNotificationStore";
import { csvParseRows, tsvParseRows } from "d3-dsv";
import useUserStore from "@/store/userStore";

const DataForm: React.FC = () => {
  const supabase = createClient();
  const router = useRouter();
  const { userId, fetchUserId, fetchWords } = useUserStore()
  const [isTSV, setIsTSV] = useState<boolean>(true);
  const [data, setData] = useState<string>("");
  const [isReverse, setIsReverse] = useState(false);
  const showNotification = useNotificationStore(state => state.showNotification)

  useEffect(() => {
    fetchUserId(); // キャッシュ済みなら何もしない
  }, [fetchUserId]);

  const handleToggle = (format: "csv" | "tsv"): void => {
    setIsTSV(format === "tsv");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setData(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedData = isTSV
      ? tsvParseRows(data.trim(), (row, i) => ({
          user_id: userId,
          word: row[0] || "",
          meaning: row[1] || "",
          example: row[2] || "",
          example_translation: row[3] || "",
          memo: row[4] || "",
          index: row[5] ? parseInt(row[5], 10) : 0,
        }))
      : csvParseRows(data.trim(), (row, i) => ({
          user_id: userId,
          word: row[0] || "",
          meaning: row[1] || "",
          example: row[2] || "",
          example_translation: row[3] || "",
          memo: row[4] || "",
          index: row[5] ? parseInt(row[5], 10) : 0,
        }));
    const finalData = isReverse ? parsedData.reverse() : parsedData;
    const { error } = await supabase.from("words").insert(finalData);
    if (error) {
      showNotification(`単語の追加に失敗しました...エラーメッセージ: ${error.message}`, "error");
    } else {
      showNotification("単語の追加に成功しました", "success")
      await fetchWords()
      router.push("/");
    }
  };

  return (
    <div className="py-4 px-5 xs:p-0 mx-auto max-w-3xl">
      <div className="mb-1 xs:mb-0 xs:ml-3 xs:mt-3">
        <Link
          href="/new"
          className="
              text-gray-500 rounded-full
              py-2 px-3 w-fit
              hover:text-gray-700 hover:bg-gray-100 transition duration-200 
              flex items-center space-x-1"
        >
          <ArrowUturnLeftIcon className="h-4" />
          <div>戻る</div>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-6 xs:pt-0 bg-white text-black rounded-md shadow-lg xs:shadow-none border xs:border-none"
      >
        <div className="flex items-center mb-3 space-x-2">
          <button
            type="button"
            onClick={() => handleToggle("tsv")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ease-out ${
              isTSV ? "bg-black text-white" : "bg-gray-300 text-black"
            }`}
          >
            TSV
          </button>
          <button
            type="button"
            onClick={() => handleToggle("csv")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ease-out ${
              !isTSV ? "bg-black text-white" : "bg-gray-300 text-black"
            }`}
          >
            CSV
          </button>
        </div>
        <h3 className="text-lg font-bold mb-2">{isTSV ? "TSV" : "CSV"}形式でテキストを入力</h3>
        <p className="mb-4 text-gray-500 text-sm">
          {isTSV ? (
            <>
              TSVはデータを<strong>タブ</strong>で区切って記述するファイル形式です
            </>
          ) : (
            <>
              CSVはデータを<strong>カンマ</strong>で区切って記述するファイル形式です
            </>
          )}
        </p>
        <textarea
          className="h-80 w-full p-3 h-32 text-gray-800 border border-gray-400 rounded-md focus:outline-none focus:border-black"
          placeholder={
            isTSV
              ? "word1   meaning1   sentence1   sentence_translation1   memo1   priority1\nword2   meaning2   sentence2   sentence_translation2   memo2   priority2"
              : "word1,meaning1,sentence1,sentence_translation1,memo1,priority1\nword2,meaning2,sentence2,sentence_translation2,memo2,priority2"
          }
          value={data}
          onChange={handleChange}
          required
        />

        <div className="mt-4 flex items-center space-x-2">
          <div className="text-sm text-gray-600">下から順番に追加する</div>
          <div 
            className="h-5 w-5" 
            onClick={() => setIsReverse(!isReverse)}
          >
            {isReverse 
            ? <CheckIcon className="h-5 w-5 border-blue-500 border rounded bg-blue-100"/>
            : <div className="h-5 w-5 rounded border  border-gray-600"></div>
          }
          </div>
        </div>

        <button
          type="submit"
          className="w-2/3 mt-4 py-3 bg-black text-white font-semibold rounded-full hover:opacity-75 focus:outline-none transition"
        >
          {isTSV ? "TSV" : "CSV"}からインポート
        </button>
      </form>
    </div>
  );
};

export default DataForm;
