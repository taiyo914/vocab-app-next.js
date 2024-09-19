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

  function ticks1to9(i:number){
    return(
      <div key={i} onClick={()=>  onChange(i)} className=" pt-[10px] pb-[20px] xs:z-10">
        <div className={`${commonStyle} text-center hover:bg-[backgroundColor]`}>{i}</div>
      </div>
    )
  }
  return (
    <div className="w-full">  {/* 親要素の幅を変えることで調整できます */}
      
      <div className="flex -mb-[27px] short:-mb-[25px]">
        <div className="w-[7.5px]"></div> {/* つまみの半分の大きさをココに置くことでgridでぴったりになる */}
        <div className="slider-ticks">
            <div onClick={()=>  onChange(0)} className=" -ml-[14px] pt-[10px] pb-[20px] z-10">
              <div className={`${commonStyle} hover:bg-sliderColor-0 pl-[10px]`}>0</div>
            </div>
            <div onClick={()=>  onChange(1)} className=" pt-[10px] pb-[20px] xs:z-10">
              <div className={`${commonStyle} text-center hover:bg-sliderColor-1`}>1</div>
            </div>
            <div onClick={()=>  onChange(2)} className=" pt-[10px] pb-[20px] xs:z-10">
              <div className={`${commonStyle} text-center hover:bg-sliderColor-2`}>2</div>
            </div>
            <div onClick={()=>  onChange(3)} className=" pt-[10px] pb-[20px] xs:z-10">
              <div className={`${commonStyle} text-center hover:bg-sliderColor-3`}>3</div>
            </div>
            <div onClick={()=>  onChange(4)} className=" pt-[10px] pb-[20px] xs:z-10">
              <div className={`${commonStyle} text-center hover:bg-sliderColor-4`}>4</div>
            </div>
            <div onClick={()=>  onChange(5)} className=" pt-[10px] pb-[20px] xs:z-10">
              <div className={`${commonStyle} text-center hover:bg-sliderColor-5`}>5</div>
            </div>
            <div onClick={()=>  onChange(6)} className=" pt-[10px] pb-[20px] xs:z-10">
              <div className={`${commonStyle} text-center hover:bg-sliderColor-6`}>6</div>
            </div>
            <div onClick={()=>  onChange(7)} className=" pt-[10px] pb-[20px] xs:z-10">
              <div className={`${commonStyle} text-center hover:bg-sliderColor-7`}>7</div>
            </div>
            <div onClick={()=>  onChange(8)} className=" pt-[10px] pb-[20px] xs:z-10">
              <div className={`${commonStyle} text-center hover:bg-sliderColor-8`}>8</div>
            </div>
            <div onClick={()=>  onChange(9)} className=" pt-[10px] pb-[20px] xs:z-10">
              <div className={`${commonStyle} text-center hover:bg-sliderColor-9`}>9</div>
            </div>
            <div onClick={()=>  onChange(10)} className="-mr-[14px] text-end pt-[10px] pb-[20px] z-10">
              <div className={`${commonStyle} hover:bg-sliderColor-10 pr-[7px]`}>10</div>
            </div>
        </div>
        <div className="w-[7.5px]"></div>  {/* つまみの半分の大きさをココに置くことでgridでぴったりになる */}
      </div>

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
        
    </div>
  );
}

const commonStyle = "rounded-full transition-all duration-200 hover:bg-opacity-30 cursor-pointer text-gray-400"