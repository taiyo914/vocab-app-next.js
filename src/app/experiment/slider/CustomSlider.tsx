"use client";
import { useState } from "react";
import "./style.css"; // CSSは別ファイルで管理

export default function CustomSlider() {
  const [sliderValue, setSliderValue] = useState<number>(5); // スライダーの初期値
  const handleSliderChange = (e: any) => {
    setSliderValue(Number(e.target.value)); // スライダーの値を更新
  };

   const getSliderColor = () => {
  // if (sliderValue == 0) return "#ffffff"; 
  // if (sliderValue == 1) return "#7A99FF"; 
  // if (sliderValue == 2) return "#99B3FF"; 
  // if (sliderValue == 3) return "#A3CCFF";
  // if (sliderValue == 4) return "#A8E0FF"; 
  // if (sliderValue == 5) return "#A8F0B3)"; 
  // if (sliderValue == 6) return "#B3FF99"; 
  // if (sliderValue == 7) return "#E6FF99";
  // if (sliderValue == 8) return "#FFFFB3"; 
  // if (sliderValue == 9) return "#FFD699"; 
  // return "#FF9999 "; 

  // if (sliderValue == 0) return "#ffffff";
  // if (sliderValue == 1) return "#6699FF"; // 青
  // if (sliderValue == 2) return "#99CCFF"; // 明るい青
  // if (sliderValue == 3) return "#66CC99"; // 緑
  // if (sliderValue == 4) return "#99FF99"; // 明るい緑
  // if (sliderValue == 5) return "#FFFF99"; // 黄色
  // if (sliderValue == 6) return "#FFCC66"; // 明るいオレンジ
  // if (sliderValue == 7) return "#FF9966"; // オレンジ
  // if (sliderValue == 8) return "#FF6666"; // 明るい赤
  // if (sliderValue == 9) return "#FF3333"; // 赤
  // return "#FF0000"; // 強い赤

  if (sliderValue == 0) return "#ffffff"; 
  if (sliderValue == 1) return "#6699FF"; // 青
  if (sliderValue == 2) return "#99BBFF"; // 明るい青
  if (sliderValue == 3) return "#66CC99"; // 緑
  if (sliderValue == 4) return "#92ef92"; // 明るい緑
  if (sliderValue == 5) return "#FFEE99"; // 見やすい黄色
  if (sliderValue == 6) return "#fde364";
  if (sliderValue == 7) return "#FFD166"; // 明るいオレンジ
  if (sliderValue == 8) return "#FF9966"; // オレンジ
  if (sliderValue == 9) return "#FF6666"; // 明るい赤
  if (sliderValue == 10) return "#fb4040"; // やや強めの赤

  // if (sliderValue == 0) return "#ffffff"; 
  // if (sliderValue == 1) return "#6699FF"; // 青
  // if (sliderValue == 2) return "#99BBFF"; // 明るい青
  // if (sliderValue == 3) return "#5cc489"; // 緑
  // if (sliderValue == 4) return "#70cb70"; // 見やすい緑
  // if (sliderValue == 5) return "#f9ef61f1"; // 見やすい明るい緑
  // if (sliderValue == 6) return "#FFEE99"; // 見やすい黄色
  // if (sliderValue == 7) return "#FFD166"; // 明るいオレンジ
  // if (sliderValue == 8) return "#FF9966"; // オレンジ
  // if (sliderValue == 9) return "#FF6666"; // 明るい赤
  // return "#FF4D4D"; // やや強めの赤

  // if (sliderValue == 0) return "#ffffff";
  // if (sliderValue == 1) return "#0000FF"; // 青
  // if (sliderValue == 2) return "#0033FF"; // やや明るい青
  // if (sliderValue == 3) return "#0066FF"; // 青と緑の中間色
  // if (sliderValue == 4) return "#0099FF"; // 青緑
  // if (sliderValue == 5) return "#00CC66"; // 明るい緑
  // if (sliderValue == 6) return "#00FF00"; // 緑
  // if (sliderValue == 7) return "#99FF00"; // 黄緑
  // if (sliderValue == 8) return "#FFFF00"; // 黄色
  // if (sliderValue == 9) return "#FF9900"; // オレンジ
  // return "#FF0000"; // 赤

  // if (sliderValue == 0) return "#ffffff";
  // if (sliderValue == 1) return "#0000FF"; // 青
  // if (sliderValue == 2) return "#0066FF"; // 明るい青
  // if (sliderValue == 3) return "#00CC66"; // 緑
  // if (sliderValue == 4) return "#00FF00"; // 明るい緑
  // if (sliderValue == 5) return "#CCFF00"; // 黄緑
  // if (sliderValue == 6) return "#FFFF00"; // 黄色
  // if (sliderValue == 7) return "#FFCC00"; // 明るいオレンジ
  // if (sliderValue == 8) return "#FF9900"; // オレンジ
  // if (sliderValue == 9) return "#FF3300"; // 赤
  // return "#FF0000"; // 強い赤
  
  };

  // #7A99FF (優しい青)
  // #99B3FF (淡い青)
  // #A3CCFF (柔らかい青緑)
  // #A8E0FF (淡い青緑)
  // #A8F0B3 (柔らかい緑)
  // #B3FF99 (明るい緑)
  // #E6FF99 (淡い黄緑)
  // #FFFFB3 (優しい黄色)
  // #FFD699 (柔らかいオレンジ)
  // #FF9999 (優しい赤)

  return (
    <div className="h-screen w-100% flex flex-col justify-center items-center">
      <div className="w-2/3">
        <div>
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
          <div className="flex justify-between text-gray-400 -mt-1 text-sm">
            <div onClick={()=>  setSliderValue(0)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full -ml-2">0</div>
            <div onClick={()=>  setSliderValue(1)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full ml-1" >1</div>
            <div onClick={()=>  setSliderValue(2)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">2</div>
            <div onClick={()=>  setSliderValue(3)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">3</div>
            <div onClick={()=>  setSliderValue(4)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">4</div>
            <div onClick={()=>  setSliderValue(5)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">5</div>
            <div onClick={()=>  setSliderValue(6)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">6</div>
            <div onClick={()=>  setSliderValue(7)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">7</div>
            <div onClick={()=>  setSliderValue(8)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">8</div>
            <div onClick={()=>  setSliderValue(9)}  className="px-2 cursor-pointer hover:bg-gray-100 rounded-full">9</div>
            <div onClick={()=>  setSliderValue(10)} className="px-2 cursor-pointer hover:bg-gray-100 rounded-full -mr-3" >10</div>
          </div>
          <p>{sliderValue}</p>
        </div>
      </div>
    </div>
  );
}
