// import SettingsModal from "./SettingsModal";
import DisplayHeader from "./displayHeader/DisplayHeader";
// import CardsDisplay from "./content/CardsDisplay";
// import TableDisplay from "./content/TableDisplay";
// import { InitialInfoProps } from "@/types/Types";
// import DisplayContent from "./content/DisplayContent";

export default function Display() {

  return (
    <div> {/* Homeコンポーネントのflex-colの影響で、 これがないと画面幅に広がらないので消さないでください*/}
      <div className="px-3 xs:px-5 max-w-[2000px] mx-auto">
        <DisplayHeader/>
        {/* <DisplayContent userId={userId} initialUserWordsSettings={initialUserWordsSettings} initialWords={initialWords}/> */}
        display here
      </div>
    </div>
  );
}
