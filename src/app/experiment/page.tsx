"use client";
import React, { useState } from "react";
import CustomSlider from "./CustomSlider";
import DndKit from "./DndKit";
// import DND from './react-beautiful-dnd'
import Exercise from "./Exercise";
import TaskManager from "./TaskManager";
import ReviewSettingsModal from "../review/ReviewSettingsModal";
import WordSpeaker from "./WordSpeaker";
import SpeechButton from "@/components/SpeechButton";
import Spinner from "@/components/Spiner";
import SwiperEndSlide from "./SwiperEndSlide";
import NotificationExp from "./NotificationExp";
import DisplayEditModal from "../display/displayContent/DisplayEditModal";

export default function page() {
  const wordSample = {
    created_at:  "2024-09-20T09:53:25.150091+00:00",
    updated_at: "2024-09-21T00:19:27.770028+00:00",
    deleted_at: null,
    example: "I have to keep my schedule",
    example_translation: "スケジュールを守らなきゃ",
    id: "2719e019-0e75-44de-b3fc-0c5ea2bbc9b5",
    favorite:false, 
    index: 3,
    meaning: "スケジュール",
    memo: "have to とscheduleの違いに注目",
    review_count: 0,
    reviewed_at: null,
    word: "schedule",
  }
  return (
    <>
    <DisplayEditModal
      isOpen ={true}
      onClose={()=> {}}
      editWord={wordSample}
      setEditWord={()=>{}}
    />
     {/* <NotificationExp/> */}
      {/* <SwiperEndSlide/> */}
      {/* <SpeechButton word="Hello" accent = "en-US"/> */}
      {/* <CustomSlider/> */}
      {/* <DND/> */}
      {/* <DndKit /> */}
      {/* <Exercise/> */}
      {/* <TaskManager /> */}
      {/* <ReviewSettingsModal/> */}
    </>
  );
}
