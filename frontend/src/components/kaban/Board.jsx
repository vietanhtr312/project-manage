import React, { useContext, useEffect, useState } from "react";
import Column from "./Column";
import kabanApi from "../../api/kabanApi";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

export const Board = () => {
  const { projectId } = useContext(AppContext);
  console.log(projectId);

  const [kanbanData, setKanbanData] = useState({
    Todo: [],
    Doing: [],
    Done: [],
  });

  const fetchTasks = async () => {
    if (!projectId) return;
    try {
      const response = await kabanApi.getTasksByProjectId(projectId);
      console.log(response);

      if (response.data.success) {
        const tasks = response.data.data;

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
  }, [projectId]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(kanbanData).map(([colTitle, tasks]) => (
        <Column key={colTitle} title={colTitle} tasks={tasks} />
      ))}
    </div>
  );
};
