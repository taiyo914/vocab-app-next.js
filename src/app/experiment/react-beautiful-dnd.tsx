// "use client";
// import React, { useState } from "react";
// import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

//  // リストをシャッフルする関数
//  const reorder = (list: any[], startIndex: number, endIndex: number) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   return result;
// };

// export default function DND() {
//   const [items, setItems] = useState([
//     { id: "item-1", content: "アイテム 1" },
//     { id: "item-2", content: "アイテム 2" },
//     { id: "item-3", content: "アイテム 3" },
//   ]);


//   const onDragEnd = (result: DropResult) => {
//     const { source, destination } = result;

//     // ドロップ先がない（リスト外にドロップされた場合）は何もしない
//     if (!destination) {
//       return;
//     }

//     // ドロップ先がドラッグ元と同じなら何もしない
//     if (source.index === destination.index) {
//       return;
//     }

//     // アイテムの並び順を更新
//     const reorderedItems = reorder(items, source.index, destination.index);
//     setItems(reorderedItems);
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="droppable">
//         {(provided) => (
//           // providedはレンダリング時に提供されるツール
//           // divタグを返し、その中に{...provided.droppableProps} ref={provided.innerRef}と記述する
//           <div {...provided.droppableProps} ref={(el) => provided.innerRef(el)}  className="min-h-[100px]">
//             {/* ↓Draggableコンポーネントをマップで展開 */}
//             {items.map((item, index) => (
//               // Draggableコンポーネントは、key, draggableId, indexが必要
//               <Draggable key={item.id} draggableId={item.id} index={index}>
//                 {/* Draggableコンポーネントの中でもprovidedを使う */}
//                 {(provided) => (
//                   <div
//                     // このdivタグが、ドラッグするアイテムとなる
//                     // この3つをprovidedから展開
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     // tailwindのスタイル
//                     // className="p-4 mb-2 bg-gray-200 rounded"
//                   >
//                     {item.content}
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {/* ↑Draggableコンポーネントをマップで展開 */}

//             {provided.placeholder}
//             {/* placehodlerはアイテムのドラッグ中にもともとあったスペースを確保するための要素 */}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// }
