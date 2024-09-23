import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import useWordsSettingsModalStore from "@/store/wordsSettingsModalStore";
import useSearchStore from "@/store/searchStore";
const SettingsButton = () => {
  const { toggleModal } = useWordsSettingsModalStore();
  const { searchTriggered } = useSearchStore();
  const handleClick = () =>{
    if( searchTriggered ){
      alert("検索結果を表示している間は設定を開くことはできません...[ただいま改良中]")
    } else {
      toggleModal()
    }
  }

  return (
    <div
      onClick={handleClick}
      className={` ${searchTriggered ? "cursor-not-allowed" :"hover:bg-gray-100 cursor-pointer" }
        flex items-center text-gray-500 
        duration-300 rounded-lg p-1 px-2`}
    >
      <AdjustmentsHorizontalIcon className="h-6 text-gray-400 " />
      設定
    </div>
  );
};

export default SettingsButton;

