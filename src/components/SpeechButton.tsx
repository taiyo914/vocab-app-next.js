"use client"
import React from 'react';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline'; 

interface SpeechProps {
  word: string; 
  accent: string; 
}

const SpeechButton: React.FC<SpeechProps> = ({ word, accent }) => {
  const handleSpeak = () => {
    if (!word) return;

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = accent;  
    if(accent == "ja-JP"){
      utterance.rate = 1.5;
    }
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={handleSpeak}
      aria-label="Speak"
      
    >
      <SpeakerWaveIcon className='w-full h-full'/>
    </button>
  );
};

export default SpeechButton;
