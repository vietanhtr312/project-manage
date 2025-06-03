import React, { useState } from "react";
import { PenLine, Eye } from "lucide-react";
import { Progress } from "antd";
import TaskEditPopup from "./TaskEditPopup";
import kabanApi from "../../api/kabanApi";
import { toast } from "react-toastify";
import moment from "moment";
import useUserStore from "../../store/userStore";
import { useEffect } from "react";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";
export const TaskCard = ({ task, fetchTasks }) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);
  const [isSeeDetail, setIsSeeDetail] = useState(false);
  const user = useUserStore((state) => state.user);
  const { projectStructure, getTaskById } = useContext(ProjectContext);

  const [member, setMember] = useState(null);

  const fetchTaskDetails = async () => {
    try {
      const res = await getTaskById(task._id);
      setMember(res.member);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTaskDetails();
  }, [task._id]);
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

  const handleSeeDetails = () => {
    setShowEditPopup(true);
    setIsSeeDetail(true);
  };

  const isNew = moment().diff(moment(currentTask?.createdAt), "days") < 1;

  return (
    <div className="bg-white p-2 shadow-sm rounded-lg flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-xs text-blue-900 mr-auto">
          {currentTask?.name}
        </h4>
        {isNew && <span className="text-xs text-red-500">new</span>}
      </div>
      <div className="">
        <Progress
          percent={currentTask?.progress}
          size="small"
          status="active"
          strokeColor={getColor()}
        />
      </div>
      <div className="flex justify-between">
        <Eye
          className="cursor-pointer hover:text-red-500"
          size={14}
          onClick={handleSeeDetails}
        />
        {member?._id === user.id && (
          <PenLine
            className="cursor-pointer hover:text-blue-500"
            size={14}
            onClick={handleEdit}
          />
        )}
      </div>

      {showEditPopup && (
        <TaskEditPopup
          task={currentTask}
          onClose={() => {
            setShowEditPopup(false);
            setIsSeeDetail(false);
          }}
          onSave={handleUpdateTask}
          isSeeDetail={isSeeDetail}
        />
      )}
    </div>
  );
};

export default TaskCard;
