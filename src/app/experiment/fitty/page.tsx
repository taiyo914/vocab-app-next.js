// components/FittyText.tsx
"use client"; // クライアントサイドで動作するように指定

import { useEffect, useRef } from 'react';
import fitty from 'fitty';
// import CardsDisplay from './CardsDisplay';

const words = [
  { word: "cat", meaning: "A small domesticated carnivorous mammal" },
  { word: "flabbergasted", meaning: "Extremely surprised or shocked" },
  { word: "serendipity", meaning: "The occurrence of events by chance in a beneficial way" },
  { word: "hello", meaning: "A greeting" },
  { word: "extravaganza", meaning: "A spectacular event" },
  { word: "aberration", meaning: "A departure from what is normal or expected" },
  { word: "euphoria", meaning: "A feeling of intense happiness" },
  { word: "moonlight", meaning: "The light of the moon" },
  { word: "benevolent", meaning: "Well-meaning and kindly" },
  { word: "supercalifragilisticexpialidocious", meaning: "Something fantastic or wonderful" }
];


const FittyText = () => {
  return (
    <div  className="px-5 xs:px-3 max-w-[2000px] mx-auto" >
      <div className="border rounded rounded-tl-none shadow">
        {/* <CardsDisplay words={words} /> */}
      </div>
    </div>
  );
};

export default FittyText;
