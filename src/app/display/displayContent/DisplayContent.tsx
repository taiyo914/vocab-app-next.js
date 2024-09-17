"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { InitialInfoProps, WordType } from "@/types/Types";
import Pagination from "./Pagination";
import TableDisplay from "./TableDisplay";
//ZustandからStoreを取得
import useUserStore from "@/store/userStore";
import useTabStore from "@/store/currentTabStore";
//offsetの更新を遅らせるためのデバウンズライブラリ
import { debounce } from "lodash"; 
import CardsDisplay from "./CardsDisplay";
import LoadingDots from "@/app/LoadingDots";
import useReviewSettingsStore from "@/store/reviewSettingsStore"


const DisplayContent = () => {
  const { currentTab } = useTabStore();
  const { userId, wordsSettings, words, fetchingKey, 
          fetchUserId, fetchUserWordsSettings, fetchWords, } = useUserStore();
  const { fields, showEmptyCards, fetchReviewSettings } = useReviewSettingsStore()

  useEffect(() => {
    fetchUserId(); // 初回のみ取得、キャッシュ済みなら何もしない
  }, [fetchUserId]);

  // userIdに基づいてuserWordsSettingsを取得（初回のみ）
  useEffect(() => {
    if (userId) {
      fetchUserWordsSettings(); // userIdがある場合のみ実行
    }
  }, [userId, fetchUserWordsSettings]);
  
   // userWordsSettingsの変更を監視してwordsを取得
   useEffect(() => {
    if (userId && wordsSettings) {
      fetchWords(); // userWordsSettingsの変更に連動してwordsを取得
      updatePageOffsetInSupabase(wordsSettings.page_offset);
    }
  }, [userId, wordsSettings, fetchWords]);

  useEffect(() => {
    if (userId && !fields && showEmptyCards === null) {
      fetchReviewSettings(userId); // userId が存在し、fields がまだ取得されていない場合に取得
      console.log("設定の取得", fields, showEmptyCards)
    }
  }, [userId, fields, showEmptyCards, fetchReviewSettings]);

  //ページネーションを更新する関数
  const updatePageOffsetInSupabase = useCallback(
    debounce(async (newOffset) => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("user_words_settings")
          .update({ page_offset: newOffset })
          .eq("user_id", userId);
        if (error) {
          console.error("Error updating page_offset in Supabase:", error.message);
        } else{
          console.log("デバウンズが実行されました")
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }, 500), //0.5秒後にデバウンズ
    [userId]
  );

  if (!userId || !wordsSettings || !words) {
    return <div  className="border rounded rounded-tl-none shadow py-20 ">
      <LoadingDots/>
    </div>
  }

  return (
    <div className="border rounded rounded-tl-none shadow">
      <div className="flex justify-end items-start mt-2 mr-1 mb-0.5 ">
        <Pagination/>
      </div>
      {currentTab === 'cards' ? (
        <CardsDisplay key={fetchingKey}  words = {words}/>
      ) : (
        <TableDisplay key={fetchingKey}  words = {words}/>
      )}
      <div className="flex justify-end items-start mb-2 mr-1 mt-0.5 ">
        <Pagination/>
      </div>
    </div>
  );
};

export default DisplayContent;
