"use client"
import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

export default function Exercise() {
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <Draggable id="draggable" parent={parent}>
      {parent ? `Dragged on ${parent}!`: "Drag me!"}
    </Draggable>
  );
  function handleDragEnd(event:any) {
    const {over} = event;
    setParent(over ? over.id : null);
    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}
       {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          {id} container: {parent === id ? draggableMarkup : 'Drop here'}
        </Droppable>
      ))}
    </DndContext>
  )
}

import {useDroppable} from '@dnd-kit/core';
function Droppable(props: any) {
  const {isOver, setNodeRef} = useDroppable({
    id:  props.id,
  });
  const style = {
    backgroundColor: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style} className='w-64 h-32 bg-gray-400 m-3'>
     {props.children}
    </div>
  );
}

import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
function Draggable(props: any ) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id:  props.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    color: props.parent ? "green" : undefined
  }

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}
      className='border p-2 rounded bg-red-300'>
      {props.children}
    </button>
  );
}
