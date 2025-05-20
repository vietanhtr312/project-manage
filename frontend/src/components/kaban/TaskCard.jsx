import React, { useState } from "react";
import { PenLine, Trash } from "lucide-react";
import { Progress } from "antd";
import TaskEditPopup from "./TaskEditPopup";
import kabanApi from "../../api/kabanApi";
import { toast } from "react-toastify";

export const TaskCard = ({ task, fetchTasks }) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);

  const getColor = () => {
    if (currentTask?.progress >= 100) return "#52c41a";
    if (currentTask?.progress < 30) return "#ff4d4f";
    return "#1890ff";
  };
  const handleEdit = () => {
    setShowEditPopup(true);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const res = await kabanApi.updateTask(currentTask._id, updatedTask);

      if (res.data.success) {
        setCurrentTask(res.data.data);
        fetchTasks();
      }
    } catch (err) {
      toast.error("Update failed");
    }
    setShowEditPopup(false);
  };

  const handleDelete = async () => {
    try {
      const res = await kabanApi.deleteTask(currentTask._id);
      if (res.data.success) {
        setCurrentTask(res.data.data);
        fetchTasks();
      }
    } catch (error) {
      toast.error("delete faild");
    }
  };

  return (
    <div className="bg-white p-2 shadow-sm rounded-lg flex flex-col gap-3">
      <h4 className="font-bold text-xs text-blue-900 mr-auto">
        {currentTask?.name}
      </h4>
      <div className="">
        <Progress
          percent={currentTask?.progress}
          size="small"
          status="active"
          strokeColor={getColor()}
        />
      </div>
      <div className="flex justify-between">
        <Trash
          className="cursor-pointer hover:text-red-500"
          size={14}
          onClick={handleDelete}
        />
        <PenLine
          className="cursor-pointer hover:text-blue-500"
          size={14}
          onClick={handleEdit}
        />
      </div>

      {showEditPopup && (
        <TaskEditPopup
          task={currentTask}
          onClose={() => setShowEditPopup(false)}
          onSave={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default TaskCard;
