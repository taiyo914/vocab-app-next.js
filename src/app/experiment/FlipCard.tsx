import { motion } from "framer-motion";
import { useState } from "react";
import "./flip-card-style.css";

export default function FlipCard() {
  const [isFlipped, setisFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false)

  const handleFlip = () => {
    if(!isAnimating){
      setisFlipped(!isFlipped)
      setIsAnimating(true)
    }
  }
  return (<>
    <div className="flex items-center justify-center">
      <div className="flip-card relative w-[600px] h-[400px]" onClick={handleFlip}>
        <motion.div
          className="flip-card-inner w-full h-full"
          initial={false}
          animate={{rotateY:isFlipped? 180: 360 }}
          transition ={{duration:0.3, animationDIrection:"normal" }}
          onAnimationComplete={()=>setIsAnimating(false)}
        >
          <div 
            className={`${isFlipped ? "" : "z-10"}  absolute flip-card-front w-full h-full bg-cover border p-5 bg-red-200`}
          >
            表
          </div>

          <div
            className="absolute top-0 flip-card-back w-full h-full bg-cover border p-5 bg-blue-200"
          >
            裏
          </div>
          

        </motion.div>
      </div>
    </div>
  </>);

}
