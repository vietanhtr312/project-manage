import React, { useContext, useState } from "react";
import { Board } from "../components/kaban/Board";
import { ProjectContext } from "../context/ProjectContext";
import useUserStore from "../store/userStore";

export const KanbanPage = () => {
  const { projectStructure } = useContext(ProjectContext);
  const user = useUserStore((state) => state.user);
  const [viewMode, setViewMode] = useState("all");

  const toggleMode = () => {
    setViewMode((prev) => (prev === "all" ? "me" : "all"));
  };

  return (
    <div className="px-36">
      <h2 className="text-2xl font-extrabold text-white tracking-tight py-5">
        <span className="text-blue-800">Kanban Board</span> {projectStructure?.title}
      </h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={toggleMode}
          className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {viewMode === "all" ? "All Tasks" : "My Tasks"}
        </button>
      </div>

      <div className="bg-white/10 rounded-xl p-3">
        <Board viewMode={viewMode} userId={user?.id} />
      </div>
    </div>
  );
};
