import React from "react";
import { Board } from "../components/kaban/Board";
export const KanbanPage = () => {
  return (
    <div className="px-36">
      <h2 className="text-2xl font-bold py-5 text-blue-800">Manage Project</h2>
      <div className=" bg-white rounded-xl p-3">
        <Board />
      </div>
    </div>
  );
};
