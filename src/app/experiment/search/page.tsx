"use client"
import DisplayHeader from '@/app/display/displayHeader/DisplayHeader';
import Tabs from '@/app/display/displayHeader/Tabs';
import Spinner from '@/components/Spiner';
import { useState, useEffect } from 'react';
import XSearchInput from './XSearchInput';
import SettingsButton from '@/app/display/displayHeader/SettingsButton';
import SimpleSearchInput from './SimpleInput';

export default function SearchWords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [counter, setCounter] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!searchTerm.trim()) {
        setResults([]); // 検索ワードが空の時は結果をクリア
        return; // 処理を中断
      }

      setIsLoading(true); // データ取得開始時にローディング状態をオン
      const res = await fetch(`/api/search?searchQuery=${searchTerm}`);
      const data = await res.json();
      setResults(data);
      setIsLoading(false); // データ取得完了時にローディング状態をオフ
      setCounter(counter+1)
    }, 10); // 0.01秒のデバウンス（）
    
    return () => clearTimeout(delayDebounceFn); // 前回のタイマーをクリア
  }, [searchTerm]);

  return (
    <div className='p-10'>
      {/* <Spinner/>
      <div>{counter}</div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        placeholder="単語を入力" 
        className="border p-2"
      />
      <ul>
        {isLoading ? (
          <Spinner/>
        ) : (
          // 結果が空の時の表示
          searchTerm && results.length === 0 ? (
            <p>結果なし</p> // 結果がない時
          ) : (
            results.map((word: any) => (
              <li key={word.id}>{word.word}</li>
            ))
          )
        )}
          
      </ul> */}
          <div className="flex items-center justify-between">
            <Tabs/>
            <div className="flex ">
              <XSearchInput/>
              {/* <SimpleSearchInput/> */}
              <SettingsButton/>
            </div>
          </div>
    </div>
  );
}
