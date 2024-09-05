"use client";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { csvParseRows, tsvParseRows } from "d3-dsv";
import { createClient } from "../../../utils/supabase/client";

const DataForm: React.FC = () => {
  const [isTSV, setIsTSV] = useState<boolean>(true);
  const [data, setData] = useState<string>("");
  const router = useRouter();
  const supabase = createClient();

  const handleToggle = (format: "csv" | "tsv"): void => {
    setIsTSV(format === "tsv");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setData(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      console.log("ユーザー情報の取得に失敗しました:", userError.message);
    } else {
      console.log("ユーザー情報の取得に成功しました:", user);
    }
    const parsedData = isTSV
      ? tsvParseRows(data.trim(), (row, i) => ({
          user_id: user?.id,
          word: row[0] || "",
          meaning: row[1] || "",
          example: row[2] || "",
          example_translation: row[3] || "",
          memo: row[4] || "",
          index: row[5] ? parseInt(row[5], 10) : null,
        }))
      : csvParseRows(data.trim(), (row, i) => ({
          user_id: user?.id,
          word: row[0] || "",
          meaning: row[1] || "",
          example: row[2] || "",
          example_translation: row[3] || "",
          memo: row[4] || "",
          index: row[5] ? parseInt(row[5], 10) : 0,
        }));
    console.log(parsedData);
    const { error } = await supabase.from("words").insert(parsedData);
    if (error) {
      console.log("インサートエラー:", error.message);
    } else {
      alert(`単語の保存に成功しました！`);
    }
    router.push("/");
  };

  return (
    <div className="py-4 md:px-6 px-4 mx-auto max-w-3xl">
      <div className="px-1 my-2">
        <Link href="/new" className="hover:opacity-65 transition duration-300 ">
          ⬅ 戻る
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-6 bg-white text-black rounded-md shadow-lg border">
        <div className="flex items-center mb-3 space-x-2">
          <button type="button" onClick={() => handleToggle("tsv")} className={`px-4 py-2 rounded-md font-medium ${isTSV ? "bg-black text-white" : "bg-gray-300 text-black"}`}>
            TSV
          </button>
          <button type="button" onClick={() => handleToggle("csv")} className={`px-4 py-2 rounded-md font-medium ${!isTSV ? "bg-black text-white" : "bg-gray-300 text-black"}`}>
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
        <textarea className="min-h-80 w-full p-3 h-32 text-gray-800 border border-gray-400 rounded-md focus:outline-none focus:border-black" placeholder={isTSV ? "word1   meaning1   sentence1   sentence_translation1   memo1\nword2   meaning2   sentence2   sentence_translation2   memo2" : "word1,meaning1,sentence1,sentence_translation1,memo1\nword2,meaning2,sentence2,sentence_translation2,memo2"} value={data} onChange={handleChange} />
        <button type="submit" className="w-2/3 mt-4 px-6 py-2 bg-black text-white font-semibold rounded-md hover:opacity-75 focus:outline-none transition">
          {isTSV ? "TSV" : "CSV"}からインポート
        </button>
      </form>
    </div>
  );
};

export default DataForm;
