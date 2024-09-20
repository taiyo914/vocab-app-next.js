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

export default function page() {
  return (
    <>
     {/* <NotificationExp/> */}
      {/* <SwiperEndSlide/> */}
      {/* <SpeechButton word="Hello" accent = "en-US"/> */}
      <CustomSlider/>
      {/* <DND/> */}
      {/* <DndKit /> */}
      {/* <Exercise/> */}
      {/* <TaskManager /> */}
      {/* <ReviewSettingsModal/> */}
    </>
  );
}
