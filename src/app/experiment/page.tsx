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

export default function page() {
  return (
    <>
      <SpeechButton word="Hello" accent = "en-US"/>
      {/* <CustomSlider/> */}
      {/* <DND/> */}
      {/* <DndKit /> */}
      {/* <Exercise/> */}
      {/* <TaskManager /> */}
      {/* <ReviewSettingsModal/> */}
    </>
  );
}
