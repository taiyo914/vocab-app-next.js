"use client";

import { DndContext, DragOverlay, closestCenter, useDroppable} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const initialTasks: Record<TaskCategories, string[]> = {
  todo: ["Task 1", "Task 2", "Task 3"],
  inProgress: ["Task 4", "Task 5"],
  done: ["Task 6"],
};

type TaskCategories = "todo" | "inProgress" | "done";

function SortableItem({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition,
    opacity:isDragging ? 0.5 : 1, // ドラッグ中に少し透明にする
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 bg-blue-200 border rounded mt-2"
    >
      {id}
    </div>
  );
}

function Category({ id, tasks }: { id: TaskCategories, tasks: string[] }) {
  // useDroppableを使用してドロップ可能な領域を確保
  const { setNodeRef, isOver } = useDroppable({ id });
  const style = {
    backgroundColor: isOver ? 'lightgreen' : 'lightgray',
  };
  return (
    <div ref={setNodeRef} style={style} className="p-4 bg-gray-200 border rounded w-60 min-h-[100px]">
      <h3 className="font-bold text-center mb-2">{id}</h3>
      <SortableContext items={tasks.length > 0 ? tasks : ["dummy"]}  strategy={verticalListSortingStrategy}>
        {tasks.length > 0 ? (
          tasks.map((task) => <SortableItem key={task} id={task} />)
        ) : (
          <div className="p-4 text-center text-gray-500">Drop items here</div>
        )}
      </SortableContext>
    </div>
  );
}

export default function TaskManager() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null); 

  const findContainer = (id: string): TaskCategories | undefined => {
    return Object.keys(tasks).find((category) => tasks[category as TaskCategories].includes(id)) as
      | TaskCategories
      | undefined;
  };

  const handleDragStart = ({ active }: any) => {
    setActiveId(active.id); 
  };

  const handleDragEnd = ({ active, over }: any) => {
    if (!over) return;
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (activeContainer && overContainer) {
      setTasks((prevTasks) => {
        if (activeContainer === overContainer) {
          const items = arrayMove(
            prevTasks[activeContainer],
            prevTasks[activeContainer].indexOf(active.id),
            prevTasks[activeContainer].indexOf(over.id)
          );
          return { ...prevTasks, [activeContainer]: items };
        } else {
          const activeItems = prevTasks[activeContainer].filter((item) => item !== active.id);
          const overItems = [...prevTasks[overContainer], active.id];
          return { ...prevTasks, [activeContainer]: activeItems, [overContainer]: overItems };
        }
      });
      setActiveId(null);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null); // ドラッグがキャンセルされた場合もリセット
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex space-x-4">
        {Object.keys(tasks).map((category) => (
          <Category
            key={category}
            id={category as TaskCategories}
            tasks={tasks[category as TaskCategories]}
          />
        ))}
      </div>

      <DragOverlay>
         <div className="p-4 bg-blue-200 border rounded mt-2">{activeId}</div> 
      </DragOverlay>
    </DndContext>
  );
}
