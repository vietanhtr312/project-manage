import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import useUserStore from "../../store/userStore";
const TaskEditPopup = ({ task, onClose, onSave }) => {
  const user = useUserStore((state) => state.user);
  const { projectStructure } = useContext(ProjectContext);
  const [errorMsg, setErrorMsg] = useState("");
  const isLeader = projectStructure.leader === user.id;

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return !isNaN(d) ? d.toISOString().split("T")[0] : "";
  };

  const [formData, setFormData] = useState({
    name: task?.name || "",
    start_date: formatDate(task?.start_date || task?.start),
    due_date: formatDate(task?.due_date || task?.end),
    description: task?.description || "",
    progress: task?.progress?.toString() || "0",
    status: task?.status || "to-do",
    members: task?.members || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (!isLeader && name !== "progress") {
      setErrorMsg("Chỉ Leader mới được chỉnh sửa thông tin này");
      return;
    }
    if (name === "status" && value === "done") {
      setFormData((prev) => ({
        ...prev,
        status: value,
        progress: "100",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrorMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 popup-overlay bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          {task?.name || "New Task"}
        </h2>

        {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            disabled={true}
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 mb-3 rounded"
            placeholder="Task name"
          />

          <div className="grid grid-cols-2 gap-4 mb-3">
            <input
              type="date"
              name="start_date"
              disabled={true}
              value={formData.start_date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="date"
              name="due_date"
              disabled={true}
              value={formData.due_date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 mb-3 rounded"
            rows="3"
            placeholder="Description"
          />

          <div className="mb-3">
            <label className="block mb-1 font-medium">Progress (%)</label>
            <input
              type="number"
              name="progress"
              value={formData.progress}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded ${
                  !isLeader ? "bg-gray-100 text-gray-500" : ""
                }`}
              >
                <option value="to-do">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border text-red-500 border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskEditPopup;
