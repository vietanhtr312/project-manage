import React, { useContext, useEffect, useState } from "react";
import Column from "./Column";
import kabanApi from "../../api/kabanApi";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

export const Board = ({ viewMode = "all", userId }) => {
  const { projectId } = useContext(AppContext);

  const [kanbanData, setKanbanData] = useState({
    Todo: [],
    Doing: [],
    Done: [],
  });

  const fetchTasks = async () => {
    if (!projectId) return;
    try {
      let response;
      if (viewMode === "me") {
        response = await kabanApi.getTasksByUserAndProject(userId, projectId);
      } else {
        response = await kabanApi.getTasksByProjectId(projectId);
      }

      if (response.data.success) {
        const tasks = response.data.data;
        console.log(tasks);

        const grouped = {
          Todo: [],
          Doing: [],
          Done: [],
        };

        tasks.forEach((task) => {
          const status = task.status;
          if (status === "to-do") grouped.Todo.push(task);
          else if (status === "in-progress") grouped.Doing.push(task);
          else if (status === "done") grouped.Done.push(task);
        });

        setKanbanData(grouped);
      } else {
        toast.error("Không thể lấy danh sách công việc");
      }
    } catch (error) {
      toast.error("Lỗi server khi lấy tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId, viewMode]);

  return (
    <div className="flex gap-4 items-start">
      {Object.entries(kanbanData).map(([colTitle, tasks]) => (
        <div className="w-1/3" key={colTitle}>
          <Column title={colTitle} tasks={tasks} fetchTasks={fetchTasks} />
        </div>
      ))}
    </div>
  );
};
