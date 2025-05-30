import React, { useEffect, useState } from "react";
const AddProjectPopup = ({ type = "module", onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    due_date: "",
    description: "",
    member: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onAdd(type, formData);
    onClose();
  };

  const getTitleText = () => {
    switch (type) {
      case "submodule":
        return "Add Submodule";
      case "task":
        return "Add Task";
      default:
        return "Add Module";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md p-6 pb-2 w-full max-w-md min-h-[500px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-blue-900">
              {getTitleText()}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="p-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-md p-2 h-24"
              />
            </div>

            {type == "task" && (
              <div className="flex gap-4 mb-8">
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-2">Start</label>
                  <input
                    type="date"
                    name="start_date"
                    value={
                      formData.start_date
                        ? formData.start_date.slice(0, 10)
                        : ""
                    }
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-2">End</label>
                  <input
                    type="date"
                    name="due_date"
                    value={
                      formData.due_date ? formData.due_date.slice(0, 10) : ""
                    }
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-6 pr-4 mb-8">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectPopup;
