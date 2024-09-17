"use client";

import { useState } from "react";
import "./SliderStyle.css"

interface CustomSliderProps {
  sliderValue: number;
  onChange: (value: number) => void;
}

export default function CustomSlider({ sliderValue, onChange }:CustomSliderProps) {
  const handleSliderChange = (e: any) => {
    onChange(Number(e.target.value)); // スライダーの値を更新
  };

   const getSliderColor = () => {
  if (sliderValue == 0) return "#D3D3D3"; 
  if (sliderValue == 1) return "rgb(141, 238, 176)"; 
  if (sliderValue == 2) return "rgb(101, 229, 148)";
  if (sliderValue == 3) return "rgb(74, 222, 128)"; 
  if (sliderValue == 4) return "rgb(250, 227, 137)"; 
  if (sliderValue == 5) return "rgb(251, 217, 81)"; 
  if (sliderValue == 6) return "rgb(250, 204, 21)"; 
  if (sliderValue == 7) return "rgb(255, 170, 100)";
  if (sliderValue == 8) return "rgb(251, 146, 60)"; 
  if (sliderValue == 9) return "rgb(255, 116, 116)"; 
  return "rgb(253, 83, 83)"; 
  };

  return (
    <div className="w-full">  {/* 親要素の幅を変えることで調整できます */}
      <input
        type="range"
        value={sliderValue}
        min="0"
        max="10"
        onChange={handleSliderChange}
        className="w-full cursor-pointer"
        style={
          {
            "--range-percent": `${sliderValue * 10}%`,
            "--slider-color": getSliderColor(),
          } as React.CSSProperties
        }
      />
        <div className="slider-ticks">
          <span onClick={()=>  onChange(0)} className="tick-0"   >0</span>
          <span onClick={()=>  onChange(1)} className="tick-1to9">1</span>
          <span onClick={()=>  onChange(2)} className="tick-1to9">2</span>
          <span onClick={()=>  onChange(3)} className="tick-1to9">3</span>
          <span onClick={()=>  onChange(4)} className="tick-1to9">4</span>
          <span onClick={()=>  onChange(5)} className="tick-1to9">5</span>
          <span onClick={()=>  onChange(6)} className="tick-1to9">6</span>
          <span onClick={()=>  onChange(7)} className="tick-1to9">7</span>
          <span onClick={()=>  onChange(8)} className="tick-1to9">8</span>
          <span onClick={()=>  onChange(9)} className="tick-1to9">9</span>
          <span onClick={()=>  onChange(10)} className="tick-10 " >10</span>
      </div>
    </div>
  );
}


        // <div onClick={()=>  onChange(0)}  className="px-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full -ml-1.5 mr-0.5">0</div>
        // <div onClick={()=>  onChange(1)}  className="px-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full ">1</div>
        // <div onClick={()=>  onChange(2)}  className="px-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full">2</div>
        // <div onClick={()=>  onChange(3)}  className="px-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full">3</div>
        // <div onClick={()=>  onChange(4)}  className="px-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full">4</div>
        // <div onClick={()=>  onChange(5)}  className="px-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full">5</div>
        // <div onClick={()=>  onChange(6)}  className="px-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full">6</div>
        // <div onClick={()=>  onChange(7)}  className="px-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full">7</div>
        // <div onClick={()=>  onChange(8)}  className="px-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full">8</div>
        // <div onClick={()=>  onChange(9)}  className="px-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full ">9</div>
        // <div onClick={()=>  onChange(10)} className="px-1 cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full ml-1.5 -mr-2.5" >10</div>


        // <div className="grid grid-cols-10 text-gray-400 text-sm w-full">
        //   <div onClick={()=>  onChange(0)}  className="cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full pl-[3px]">0</div>
        //   <div onClick={()=>  onChange(1)}  className="cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full pl-[3px]">1</div>
        //   <div onClick={()=>  onChange(2)}  className="cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full pl-[3px]">2</div>
        //   <div onClick={()=>  onChange(3)}  className="cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full pl-[3px]">3</div>
        //   <div onClick={()=>  onChange(4)}  className="cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full pl-[3px]">4</div>
        //   <div onClick={()=>  onChange(5)}  className="cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full pl-[3.2px]">5</div>
        //   <div onClick={()=>  onChange(6)}  className="cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full pl-[3.2px]">6</div>
        //   <div onClick={()=>  onChange(7)}  className="cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full pl-[3.2px]">7</div>
        //   <div onClick={()=>  onChange(8)}  className="cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full pl-[3.2px]">8</div>
        //   <div onClick={()=>  onChange(9)}  className="cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full pl-[3.3px]">9</div>
        // </div>
        // <div onClick={()=>  onChange(10)} className="text-gray-400 text-sm cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-full" >10</div>