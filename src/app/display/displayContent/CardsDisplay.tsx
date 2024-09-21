import { WordType } from "@/types/Types";
import CardsItem from "./CardsItem";
import { motion } from "framer-motion";

const CardsDisplay = ({ words }: { words: WordType[] }) => {
  return (
    <motion.div
      className="grid gap-4 xs:gap-2 px-4 py-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      }}
    >
      {words.map((word, index) => (
        <CardsItem key={index} word={word} />
      ))}
    </motion.div>
  );
};

export default CardsDisplay;
