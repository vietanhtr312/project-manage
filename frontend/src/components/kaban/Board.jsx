import React from "react";
import Column from "./Column";

export const Board = () => {
  const boardData = {
    Todo: [
      { id: 1, title: "ITSS1", progress: 10 },
      { id: 2, title: "Task1", progress: 30 },
      { id: 3, title: "Task3", progress: 5 },
    ],
    Doing: [
      { id: 4, title: "Phát triển API", progress: 60 },
      { id: 5, title: "Kết nối frontend", progress: 40 },
    ],
    Done: [
      { id: 4, title: "Phát triển API", progress: 100 },
      { id: 5, title: "Kết nối frontend", progress: 100 },
    ],
  };
  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(boardData).map(([colTitle, tasks]) => (
        <Column key={colTitle} title={colTitle} tasks={tasks} />
      ))}
    </div>
  );
};
