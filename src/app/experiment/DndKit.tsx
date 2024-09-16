"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  closestCorners,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function App() {
  const [items, setItems] = useState(["item-1", "item-2", "item-3", "item-4"]);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <p>{items}</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col justify-center items-center p-10 m-10 border rounded">
            {items.map((id) => (
              <SortableItem key={id} id={id} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Primitive />
      <MultipleDroppableZone />
      {/* <OfficialExample /> */}
      <SortItemExercise />
    </>
  );
}

import { horizontalListSortingStrategy, rectSortingStrategy } from "@dnd-kit/sortable";
function SortItemExercise() {
  const initialItems = ["Item 1", "Item 2", "Item 3", "Item 4"];
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = ({ active, over }: any) => {
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="border w-[600px] ">
          {/* <div className="flex gap-3 flex-wrap"> */}
          <div>
            {items.map((item) => (
              <SortableItem key={item} id={item} />
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function SortableItem({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ? `transform 0.3s ease ` : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-4 mb-2 bg-gray-200 rounded w-[200px]"
    >
      {id}
    </div>
  );
}

// ---------------------------Primitive Example ---------------------------------//
import { useDraggable, useDroppable } from "@dnd-kit/core";
function Primitive() {
  const [isDropped, setIsDropped] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
    transform,
  } = useDraggable({
    id: "draggable",
  });

  const handleDragEnd = (event: any) => {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <PriDroppable isDropped={isDropped} />
      <PriDraggable />
    </DndContext>
  );
}

function PriDroppable({ isDropped }: { isDropped: any }) {
  const { isOver, setNodeRef: droppableRef } = useDroppable({
    id: "droppable",
  });

  return (
    <div
      ref={droppableRef}
      className="h-40 w-40 bg-blue-100 border-2 border-dashed border-blue-500"
    >
      {isDropped ? "Dropped!" : "Drop here"}
    </div>
  );
}

function PriDraggable() {
  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
    transform,
  } = useDraggable({
    id: "draggable",
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
      ref={draggableRef}
      {...listeners}
      {...attributes}
      style={style}
      className="mt-4 p-4 bg-red-300 w-32 text-center"
    >
      Drag me
    </div>
  );
}
//------------------------------------------------------------------------------ //

//-------------------------Multiple Zone Example-------------------------------//
function MultipleDroppableZone() {
  const [droppedZone, setDroppedZone] = useState<string | null>(null);
  function handleDragEnd(event: any) {
    const { over } = event;
    setDroppedZone(over ? over.id : null);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4">
        <MultiDroppable droppedZone={droppedZone} />
        <MultiDraggable />
      </div>
    </DndContext>
  );
}

function MultiDroppable({ droppedZone }: any) {
  // Droppableの設定（ゾーン1）
  const { isOver: isOverZone1, setNodeRef: zone1Ref } = useDroppable({
    id: "zone-1",
  });

  // Droppableの設定（ゾーン2）
  const { isOver: isOverZone2, setNodeRef: zone2Ref } = useDroppable({
    id: "zone-2",
  });

  return (
    <>
      {/* ドロップゾーン1 */}
      <div
        ref={zone1Ref}
        className={`
            h-40 w-40 bg-blue-100 
            border-2 border-dashed border-blue-500 
            text-center flex items-center justify-center
            ${isOverZone1 ? "opacity-50" : ""}`}
      >
        {droppedZone === "zone-1" ? "Dropped here!" : "Drop here (Zone 1)"}
      </div>

      {/* ドロップゾーン2 */}
      <div
        ref={zone2Ref}
        className={`
         h-40 w-40 bg-green-100 
         border-2 border-dashed border-green-500 
         text-center flex items-center justify-center
          ${isOverZone2 ? "opacity-50" : ""}`}
      >
        {droppedZone === "zone-2" ? "Dropped here!" : "Drop here (Zone 2)"}
      </div>
    </>
  );
}

function MultiDraggable() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="mt-4 p-4 bg-red-300 w-32 h-16 text-center"
    >
      Drag me
    </div>
  );
}
//-----------------------------------------------------------------------------//

//---------------------------------OfficialDocument---------------------------------------//

function OfficialExample() {
  const [parent, setParent] = useState(null);

  const draggable = <Draggable id="draggable">.Go ahead, drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <Droppable id="droppable">{parent === "droppable" ? draggable : "Drop here"}</Droppable>
    </DndContext>
  );

  function handleDragEnd({ over }: any) {
    setParent(over ? over.id : null);
  }
}

function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
//----------------------------------------------------------------------------------------//
