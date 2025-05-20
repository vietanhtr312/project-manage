import React from "react";
import { Board } from "../components/kaban/Board";
import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
export const KanbanPage = () => {
  const { projectStructure } = useContext(ProjectContext);
  console.log(projectStructure);

  return (
    <div className="px-36">
      <h2 className="text-2xl font-bold py-5 text-white">
        Manage Project {projectStructure?.title}
      </h2>
      <div className=" bg-white/10 rounded-xl p-3">
        <Board />
      </div>
    </div>
  );
};
