import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";
const TaskEditPopup = ({ task, onClose, onSave, isSeeDetail }) => {
  const { projectStructure, getTaskById } = useContext(ProjectContext);
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
    if (name === "status" && value === "done") {
      setFormData((prev) => ({
        ...prev,
        status: value,
        progress: "100",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 popup-overlay bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            {task?.name || "New Task"}
          </h2>
          {member && member.name}
        </div>

        <div className="text-blue-800 font-medium flex items-center">
          <span className="text-black mr-2">From: </span>
          {formData.start_date}
          <span className="text-black mx-2">To: </span>
          {formData.due_date}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <label className="block mb-1 font-medium">Details:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={isSeeDetail}
              className="w-full border px-3 py-2 rounded"
              rows="3"
              placeholder="// To do"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1 font-medium">Progress (%)</label>
            <input
              type="number"
              name="progress"
              value={formData.progress}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              disabled={isSeeDetail}
              min="0"
              max="100"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                isSeeDetail && "custom_select"
              }`}
              disabled={isSeeDetail}
            >
              <option value="to-do">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="space-x-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border text-red-500 border-gray-300 rounded hover:bg-gray-100"
            >
              {isSeeDetail ? "Close" : "Cancel"}
            </button>
            {!isSeeDetail && (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskEditPopup;
