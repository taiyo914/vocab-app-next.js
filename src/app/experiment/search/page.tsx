"use client"
import { useState } from 'react';

export default function SearchWords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/search?searchQuery=${searchTerm}`);
    const data = await res.json();
    setResults(data);
    console.log("Here",data)
  };

  return (
    <div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        placeholder="単語を入力" 
        className="border p-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
        検索
      </button>
      <ul>
        {results.map((word: any) => (
          <li key={word.id}>{word.word}</li>
        ))}
      </ul>
    </div>
  );
}
