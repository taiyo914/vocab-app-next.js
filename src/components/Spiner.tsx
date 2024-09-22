import React from "react";

interface SpinnerProps {
  borderColor? : string;
  size? : string;
  borderWeight? : string;
  props? : string;
}

const Spinner: React.FC<SpinnerProps> = ({ borderColor = "border-gray-200 border-t-blue-300", size = "h-5 w-5", borderWeight = "border-[0.25rem]", props = "" }) => {
  return (
    <div className={`${size} ${borderWeight} ${borderColor} ${props} animate-spin rounded-full`}></div>
  );
};

export default Spinner;
