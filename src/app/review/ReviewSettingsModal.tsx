"use client";
import React,{useState, useEffect} from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useSortable, SortableContext, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import useReviewSettingsStore from "@/store/reviewSettingsStore";
import useUserStore from "@/store/userStore";
import {  EyeSlashIcon, ArrowsUpDownIcon, XMarkIcon, XCircleIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { FiLayers } from "react-icons/fi";
import Modal from "@/components/Modal";
import { RiDraggable } from "react-icons/ri";
import useNotificationStore from "@/store/useNotificationStore";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  goToFirstSlide: ()=> void;
}

const fieldLabelMap: { [key: string]: string } = {
  word: "単語",
  meaning: "意味",
  example: "例文",
  example_translation: "例文訳",
  memo: "メモ",
};

const sortOrder = ["word", "meaning", "example", "example_translation", "memo"];

const ReviewSettingsModal = ({ isOpen, onClose, goToFirstSlide }: SettingsModalProps) => {
  // const ReviewSettingsModal = () => {
  const { userId } = useUserStore()
  const { fields, showEmptyCards, accent, saveReviewSettings } = useReviewSettingsStore();
  const [error, setError] = useState<string | null>(null); 
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance:5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay:100, 
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  
  const [temporaryFields, setTemporaryFields] = useState<string[]>([]);  
  const [temporaryShowEmptyCards, setTemporaryShowEmptyCards] = useState<boolean>(false);  
  const [temporaryAccent, setTemporaryAccent] = useState<string>("en-US");
  
  const showNotification = useNotificationStore(state => state.showNotification)
  
  //一時的なfieldsとshowEmptyCardsを設定し、useEffectで初期値をセット（
  useEffect(() => {
    if (fields && showEmptyCards !== null && isOpen) {
      setTemporaryFields(fields);
      setTemporaryShowEmptyCards(showEmptyCards);
      setTemporaryAccent(accent || "en-US");
    }
  }, [isOpen, fields, showEmptyCards, accent]);
  
  if (!fields || showEmptyCards === null) {
    // alert("fieldsとshowEmptyCardsが取得できていません");
    return;
  }

  const visibleFields = temporaryFields.filter((field: string) => !field.startsWith("-"));
  const hiddenFields = temporaryFields
    .filter((field: string) => field.startsWith("-"))
    .map((f: string) => f.slice(1))
    .sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = temporaryFields.indexOf(active.id as string);
      const newIndex = temporaryFields.indexOf(over?.id as string);
      const newFields = arrayMove(temporaryFields, oldIndex, newIndex);
      setTemporaryFields(newFields);
    }
  };

  const toggleVisibility = (field: string) => {
    if (visibleFields.length === 1 && !temporaryFields.includes(`-${field}`)) {
      setError("表示される項目が最低1つ必要です。");
      return;
    }
    setError(null);
    let updatedFields: string[];
    if (temporaryFields.includes(`-${field}`)) {
      updatedFields = temporaryFields.filter((f: string) => f !== `-${field}`).concat(field);
    } else {
      updatedFields = temporaryFields.filter((f: string) => f !== field).concat(`-${field}`);
    }
    setTemporaryFields(updatedFields);
  };

  const handleSave = async () => {
    if (!userId) {
      console.log("userIdがありません")
      return
    }

    const isFieldsChanged = JSON.stringify(fields) !== JSON.stringify(temporaryFields);
    const isShowEmptyCardsChanged = showEmptyCards !== temporaryShowEmptyCards;
    const isAccentChanged = accent !== temporaryAccent;

    //アクセントのみが変更されたときは最初のスライドに戻らない
    if (!isFieldsChanged && !isShowEmptyCardsChanged && isAccentChanged) {
      try{
        await saveReviewSettings(userId, temporaryFields, temporaryShowEmptyCards, temporaryAccent);
        onClose(); 
      } catch (err:any) {
        showNotification(`設定の保存に失敗しました...エラーメッセージ:${err.message}`, "error");
      }
      return;
    }

    // 全く変更がない場合もモーダルを閉じるだけで終了
    if (!isFieldsChanged && !isShowEmptyCardsChanged && !isAccentChanged) {
      onClose();
      return;
    }

    // fieldsかshowEmptyCardsは枚数や順番が変わるので最初のスライドに戻る
    try {
      await saveReviewSettings(userId, temporaryFields, temporaryShowEmptyCards, temporaryAccent);
      goToFirstSlide(); 
      onClose(); 
    } catch (err:any) {
      showNotification(`設定の保存に失敗しました...エラーメッセージ:${err.message}`, "error");
    }
  };

  const handleCancel = () => {
    setTemporaryFields(fields); // Zustandの値に戻す
    setTemporaryShowEmptyCards(showEmptyCards);
    setTemporaryAccent(accent || "en-US");
    setError(null)
    onClose(); 
  };

  const handleAccentSelect = (accent: string) => {
    setTemporaryAccent(accent);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="w-3/5 max-w-lg">
      <h3 className="text-xl font-bold mt-1 mb-6 text-center">復習画面の設定</h3>

      <h4 className="font-semibold mb-1 flex items-center gap-1">
        <ArrowsUpDownIcon className="h-5"/>
        表示順
      </h4>
      {error && <div className="text-red-500 mb-1 ml-0.5 text-sm">{error}</div>}
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
        collisionDetection={closestCorners}
      >
        <SortableContext items={visibleFields}>
          {visibleFields.map((field: string) => (
            <SortableItem key={field} field={field} toggleVisibility={toggleVisibility} />
          ))}
        </SortableContext>
      </DndContext>
      
      <div className="mb-8">
        <h4 className=" ml-1 mt-6 font-semibold flex items-center gap-1 mb-1">
          <EyeSlashIcon className="h-5"/>
          非表示
        </h4>
        {hiddenFields.length === 0 && (
          <div className="text-sm pl-3 my-2 text-gray-400 border-l">右の<XCircleIcon className="h-5 inline mb-0.5"/>ボタンで非表示にできます</div>
        )} 
        {hiddenFields.map((field: string) => (
          <div
            key={field}
            className="
              py-2 pl-4 pr-3 mb-2 w-full 
              bg-gray-100 rounded border
              flex justify-between items-center 
              text-gray-400 font-semibold"
          >
            {fieldLabelMap[field]}
            <button
              onClick={() => toggleVisibility(field)}
              className="py-1 px-3 rounded-full shadow bg-gray-300 text-gray-700 font-[550] hover:opacity-70 flex items-center"
            >
              表示
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-8">
        <h4 className="ml-1 font-semibold flex items-center gap-1.5">
          <FiLayers className="text-lg"/>
          未入力のカードも表示
        </h4>
        <label className="relative inline-flex items-center cursor-pointer mr-0.5">
          <input type="checkbox" checked={temporaryShowEmptyCards} onChange={()=>setTemporaryShowEmptyCards(!temporaryShowEmptyCards)} className="sr-only peer" />
          <div className="
            w-11 h-6 bg-gray-200 rounded-full 
            peer  dark:bg-gray-700 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all duration-300 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
        </label>
      </div>

      <div className="mb-8">
        <h4 className="ml-1 font-semibold flex items-center gap-1.5">
          <SpeakerWaveIcon className="h-5"/>
          読み上げのアクセント
        </h4>
        <div className="flex gap-1.5 mt-2">
          <button
            onClick={() => handleAccentSelect("en-US")}
            className={`
              p-1 w-full text-center rounded-lg
              border transition duration-200
              flex justify-center items-center gap-1 ${
              temporaryAccent === "en-US"
                ? "bg-gray-200"
                : "hover:bg-gray-100 "
            }`}
          >
            <Image alt="Country Flag" src = "/images/icon-us.png" width={17} height={17}/>
            US
          </button>
          <button
            onClick={() => handleAccentSelect("en-GB")}
            className={` 
                p-1 w-full text-center rounded-lg
                border transition duration-200
                flex justify-center items-center gap-1 ${
              temporaryAccent === "en-GB"
                ? "bg-gray-200"
                : "hover:bg-gray-100  "
            }`}
          >
            <Image alt="Country Flag" src = "/images/icon-uk.png" width={17} height={17}/>
            UK
          </button>
          <button
            onClick={() => handleAccentSelect("en-AU")}
            className={` 
                p-1 w-full text-center rounded-lg
                border transition duration-200
                flex justify-center items-center gap-1 ${
              temporaryAccent === "en-AU"
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            <Image alt="Country Flag" src = "/images/icon-aus.png" width={17} height={17}/>
            AUS
          </button>
      </div>
      </div>
        
      <div className="flex mt-3 gap-3">
        <button
          onClick={handleSave}
          className="py-2 border rounded-xl text-white w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 font-semibold"
        >
          保 存
        </button>
        <button
          onClick = {handleCancel} 
          className="py-3 border rounded-xl text-white w-full bg-gray-500 hover:bg-gray-600 transition-colors duration-300 font-semibold" 
        >
          キャンセル
        </button>
      </div>
    </Modal>
  );
};

import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

interface SortableItemProps {
  field: string;
  toggleVisibility: (field: string) => void;
}

const SortableItem = ({ field, toggleVisibility }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ? `transform 0.4s ease ` : undefined,
    opacity: isDragging ? 0.6 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="
        py-2 pl-1 pr-3 mb-2
        rounded shadow border
        w-full font-[550] xs:font-semibold
        flex justify-between items-center 
        focus:bg-gray-100
        cursor-grab
        select-none"
    >
      <div className="flex items-center gap-1">
        <RiDraggable className="hover:bg-gray-200 rounded-full p-1.5 size-8 text-gray-500 transition-colors duration-200"/>
        {fieldLabelMap[field]}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // クリックイベントがドラッグとして認識されないようにする
          toggleVisibility(field);
        }}
        className="rounded-full shadow bg-gray-200 font-[550] hover:bg-gray-300 transition duration-200"
      >
          <XMarkIcon className="h-7 p-1" />
      </button>
    </div>
  );
};

export default ReviewSettingsModal;