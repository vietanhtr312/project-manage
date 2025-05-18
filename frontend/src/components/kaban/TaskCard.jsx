import React, { useState } from "react";
import { PenLine, Trash } from "lucide-react";
import { Progress } from "antd";
import TaskEditPopup from "./TaskEditPopup";

export const TaskCard = ({ 
  id,
  title = "Task 1", 
  progress = 45,
  description = "",
  start = "",
  end = "",
  members = [],
  onUpdate,
  onDelete
}) => {

  const [showEditPopup, setShowEditPopup] = useState(false);

  const getColor = () => {
    if (progress === 100) return "#52c41a";
    if (progress < 30) return "#ff4d4f";
    return "#1890ff";
  };

  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  const handleSaveTask = (updatedTask) => {
    if (onUpdate) {
      onUpdate({
        id,
        ...updatedTask,
        progress
      });
    }
    setShowEditPopup(false);
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white p-2 shadow-sm rounded-lg flex flex-col gap-3">
      <h4 className="font-bold text-xs text-blue-900 mr-auto">{title}</h4>
      <div className="">
        <Progress
          percent={progress}
          size="small"
          status="active"
          strokeColor={getColor()}
        />
      </div>
      <div className="flex justify-between">
        <Trash 
          className="cursor-pointer hover:text-red-500" 
          size={14} 
          onClick={handleDeleteClick}
        />
        <PenLine 
          className="cursor-pointer hover:text-blue-500" 
          size={14} 
          onClick={handleEditClick}
        />
      </div>

      {showEditPopup && (
        <TaskEditPopup
          task={{
            name: title,
            start,
            end,
            description,
            members
          }}
          onClose={() => setShowEditPopup(false)}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default TaskCard;