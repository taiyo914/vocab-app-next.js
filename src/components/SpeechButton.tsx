"use client"
import React from 'react';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline'; 

interface SpeechProps {
  props? :  string
  word: string | undefined; 
  accent?: string; 
}

export const handleSpeak = (word: string | undefined, accent: string ="en-US" ) => {
  if (!word) return;

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = accent;  
  if(accent == "ja-JP"){
    utterance.rate = 1.1;
  }
  window.speechSynthesis.speak(utterance);
};

const SpeechButton: React.FC<SpeechProps> = ({ props = "h-5", word, accent = "en-US" }) => {
  return (
      <SpeakerWaveIcon className={`${props} cursor-pointer`} onClick={() => handleSpeak(word, accent)}/>
  );
};

export default SpeechButton;
