import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import useWordsSettingsModalStore from "@/store/wordsSettingsModalStore";
import useSearchStore from "@/store/searchStore";
const SettingsButton = () => {
  const { toggleModal } = useWordsSettingsModalStore();
  const { searchTriggered } = useSearchStore();

  return (<>
    {!searchTriggered && (
      <button
        onClick={toggleModal}
        className={`hover:bg-gray-100 
          flex items-center text-gray-500 
          duration-300 rounded-lg p-1 px-2`}
      >
        <AdjustmentsHorizontalIcon className="h-6 text-gray-400 " />
        設定
      </button>
    )}
  </>);
};

export default SettingsButton;

