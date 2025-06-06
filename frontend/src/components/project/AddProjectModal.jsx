import React from "react";

function AddProjectModal({
  show,
  onClose,
  project,
  onInputChange,
  onCreateProject,
  onAddMember,
  onRemoveMember,
  onUpdateProject,
  idUpdate,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-md shadow-lg px-2">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-blue-900">{ idUpdate ? "Update Project" : "Add New Project"}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl font-bold transition-colors duration-150"
          >
            &times;
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="title"
              value={project.title}
              onChange={onInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start<span className="ml-1 text-gray-500 text-sm">(must after today)</span></label>
              <div className="relative">
                <input
                  type="date"
                  name="start_date"
                  value={project.start_date ? project.start_date.slice(0, 10) : ''}
                  onChange={onInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Select date"
                  readOnly={idUpdate}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
              <div className="relative">
                <input
                  type="date"
                  name="due_date"
                  value={project.due_date ? project.due_date.slice(0, 10) : ''}
                  onChange={onInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Select date"
                  readOnly={idUpdate}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={project.description}
              onChange={onInputChange}
              className="w-full p-2 border rounded-md h-24"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Add member<span className="ml-1 text-gray-500 text-sm float-right mb-2">(must be user in system <br/>sample: cuonga2242002@gmail.com)</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="@member"
                className="w-full p-2 pl-10 border rounded-md"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = e.target.value.trim();
                    if (value) {
                      onAddMember(value);
                      e.target.value = '';
                    }
                  }
                }}
              />
            </div>

            {project.members.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {project.members.map((member, index) => (
                  <div key={index} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full flex items-center">
                    {member}
                    <button
                      onClick={() => onRemoveMember(member)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-red-500 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (idUpdate) {
                  onUpdateProject(idUpdate);
                } else {
                  onCreateProject();
                }
                onClose();
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {idUpdate ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProjectModal;