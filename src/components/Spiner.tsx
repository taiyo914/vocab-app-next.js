import React from "react";

interface SpinnerProps {
  borderColor? : string;
  size? : string;
  borderWeight? : string;
}

const Spinner: React.FC<SpinnerProps> = ({ borderColor = "border-gray-100 border-t-gray-300", size = "h-8 w-8", borderWeight = "border-2" }) => {
  return (
    <div className={`flex justify-center items-center`}>
      <div className="flex justify-center" >
        <div className={`${size} ${borderWeight} ${borderColor} animate-spin rounded-full`}></div>
      </div>
    </div>
  );
};

export default Spinner;
