import React from "react";
import { PenLine, Trash } from "lucide-react";
import { Progress } from "antd";

export const TaskCard = ({ title = "Task 1", progress = 45 }) => {
  const getColor = () => {
    if (progress === 100) return "#52c41a";
    if (progress < 30) return "#ff4d4f";
    return "#1890ff";
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
        <Trash className="cursor-pointer" size={14} />
        <PenLine className="cursor-pointer" size={14} />
      </div>
    </div>
  );
};
