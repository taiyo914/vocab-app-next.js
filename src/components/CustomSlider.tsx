"use client";

import { useState } from "react";
import "./SliderStyle.css";

interface CustomSliderProps {
  sliderValue: number;
  onChange: (value: number) => void;
}

export default function CustomSlider({ sliderValue, onChange }: CustomSliderProps) {
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

  function ticks1to9(i: number) {
    const hoverColor = `hover:bg-sliderColor-${i}`;
    return (
      <>
        <div key={i} className="z-10">
          <div
            onClick={() => {
              onChange(i);
            }}
            className={`pt-[10px] pb-[3px]  
            ${i === 0 && "-ml-[14px]"}
            ${i === 10 && "-mr-[14px] text-end"}`}
          >
            <div
              className={`
              ${commonStyle} 
              ${hoverColor} 
              ${i === 0 && "pl-[10px]"}
              ${i !== 0 && i !== 10 && "text-center"}
              ${i === 10 && "pr-[7px]"}
              `}
            >
              {i}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="w-full">
      {" "}
      {/* 親要素の幅を変えることで調整できます */}
      <div className="flex -mb-[9px] short:-mb-[11px]">
        <div className="w-[7.5px]"></div>{" "}
        {/* つまみの半分の大きさをココに置くことでgridでぴったりになる */}
        <div className="slider-ticks">
          {Array.from({ length: 11 }, (_, i) => i).map((i) => ticks1to9(i))}
        </div>
        <div className="w-[7.5px]"></div>{" "}
        {/* つまみの半分の大きさをココに置くことでgridでぴったりになる */}
      </div>
      <input
        type="range"
        value={sliderValue}
        min="0"
        max="10"
        onChange={handleSliderChange}
        className="w-full cursor-pointer "
        style={
          {
            "--range-percent": `${sliderValue * 10}%`,
            "--slider-color": getSliderColor(),
          } as React.CSSProperties
        }
      />
      <div className="flex -mt-[6.3px]">
        <div className="w-[7.5px]"></div>{" "}
        {/* つまみの半分の大きさをココに置くことでgridでぴったりになる */}
        <div className="slider-ticks">
          {Array.from({ length: 11 }, (_, i) => i).map((i) => (
            <div
              key={i}
              onClick={() => onChange(i)}
              className={`
                  h-[15px]
                  ${i === 0 && "pl-[10px] -ml-[14px]"}
                  ${i === 10 && "pr-[7px] -mr-[14px]"}
                  `}
            ></div>
          ))}
        </div>
        <div className="w-[7.5px]"></div>{" "}
        {/* つまみの半分の大きさをココに置くことでgridでぴったりになる */}
      </div>
    </div>
  );
}

const commonStyle =
  "rounded-full transition-all duration-200 hover:bg-opacity-30 cursor-pointer text-gray-400";
