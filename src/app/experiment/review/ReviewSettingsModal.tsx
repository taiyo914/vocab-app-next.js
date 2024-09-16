import React from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useSortable, SortableContext, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import useReviewSettingsStore from "@/store/reviewSettingsStore"
import useUserStore from "@/store/userStore";

interface SettingsModalProps {
  isSettingsOpen: boolean;
  onClose: () => void;
}

const ReviewSettingsModal = ({ isSettingsOpen, onClose }: SettingsModalProps) => {
  const { fields, showEmptyCards, setFields, saveReviewSettings, setShowEmptyCards } =
    useReviewSettingsStore();
  if (!fields || showEmptyCards === null) {
    console.log("fieldsとshowEmptyCardsが取得できていません");
    return;
  }
  const visibleFields = fields.filter((field: string) => !field.startsWith("-"));
  const hiddenFields = fields.filter((field: string) => field.startsWith("-")).map((f:string) => f.slice(1));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.indexOf(active.id as string);
      const newIndex = fields.indexOf(over?.id as string);
      const newFields = arrayMove(fields, oldIndex, newIndex);
      setFields(newFields);
    }
  };

  const toggleVisibility = (field: string) => {
    let updatedFields: string[];
    if (fields.includes(`-${field}`)) {
      updatedFields = fields.filter((f: string) => f !== `-${field}`).concat(field);
    } else {
      updatedFields = fields.filter((f: string) => f !== field).concat(`-${field}`);
    }
    setFields(updatedFields);
  };

  const handleSave = () => {
    const userId = "example-user-id"; // 実際のユーザーIDを取得
    saveReviewSettings(userId, fields, showEmptyCards);
    onClose();
  };

  return (
    <div>
      <h3>表示順と非表示の設定</h3>
      <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
        <SortableContext items={visibleFields}>
          {visibleFields.map((field: string) => (
            <SortableItem key={field} field={field} toggleVisibility={toggleVisibility} />
          ))}
        </SortableContext>
        <h4>非表示のフィールド</h4>
        {hiddenFields.map((field :string ) => (
          <div key={field} className="p-2 border">
            {field} <button onClick={() => toggleVisibility(field)}>表示</button>
          </div>
        ))}
      </DndContext>
      <button onClick={handleSave}>保存</button>
    </div>
  );
};

interface SortableItemProps {
  field: string;
  toggleVisibility: (field: string) => void;
}

const SortableItem = ({ field, toggleVisibility }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: `translateY(${transform?.y}px)`, transition }}
      className="p-2 border mb-2"
    >
      {field} <button onClick={() => toggleVisibility(field)}>非表示</button>
    </div>
  );
};

export default ReviewSettingsModal;
