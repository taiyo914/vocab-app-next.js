"use client"
import { useState, useEffect } from 'react';

export default function SearchWords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm) {
        const res = await fetch(`/api/search?searchQuery=${searchTerm}`);
        const data = await res.json();
        setResults(data);
      } else {
        setResults([]); // 検索ワードが空の時は結果をクリア
      }
      setCounter(counter+1)
    }, 10); // 0.01秒のデバウンス（）
    
    return () => clearTimeout(delayDebounceFn); // 前回のタイマーをクリア
  }, [searchTerm]);


  return (
    <div>
      <div>{counter}</div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        placeholder="単語を入力" 
        className="border p-2"
      />
      {/* <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
        検索
      </button> */}
      <ul>
        {results
          ? results.map((word: any) => (
          <li key={word.id}>{word.word}</li>
        ))
         : <p>結果なし</p>
        }
      </ul>
      
    </div>
  );
}
