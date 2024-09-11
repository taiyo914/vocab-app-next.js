import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import useOpenModalStore from "@/store/openModalStore";
const SettingsButton = () => {
  const { toggleModal } = useOpenModalStore();

  return (
    <button
      onClick={toggleModal}
      className="cursor-pointer flex items-center text-gray-500 hover:bg-gray-100 duration-300 rounded-lg p-1 px-2"
    >
      <AdjustmentsHorizontalIcon className="h-6 text-gray-400 " />
      設定
    </button>
  );
};

export default SettingsButton;

