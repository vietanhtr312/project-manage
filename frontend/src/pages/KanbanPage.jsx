import React, { useContext, useEffect, useState } from "react";
import { Board } from "../components/kaban/Board";
import { ProjectContext } from "../context/ProjectContext";
import useUserStore from "../store/userStore";

export const KanbanPage = () => {
  const { projectStructure, getProjectMembers } = useContext(ProjectContext);
  const user = useUserStore((state) => state.user);
  const [viewMode, setViewMode] = useState("all");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const members = await getProjectMembers();
        setMembers(members?.members);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, [getProjectMembers]);

  return (
    <div className="px-36">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold text-white tracking-tight py-5">
          <span className="text-blue-800">Kanban Board</span>{" "}
          {projectStructure?.title}
        </h2>

        <div className="flex justify-end mb-4 mt-7 relative">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 custom_select truncate w-36"
          >
            <option value="all">All Tasks</option>
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name || member.email}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-3">
        <Board
          viewMode={viewMode}
          userId={viewMode === "all" ? null : viewMode}
        />
      </div>
    </div>
  );
};
