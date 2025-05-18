import React, { useContext, useEffect, useState } from "react";
import { Minus } from "lucide-react";
import { ProjectContext } from "../../context/ProjectContext";

export default function WBSBoard() {
  const { projectStructure } = useContext(ProjectContext);
  const [projectName, setProjectName] = useState(projectStructure?.title);
  const [modules, setModules] = useState(projectStructure?.modules || []);
  const [selectedItem, setSelectedItem] = useState(null);
  const [details, setDetails] = useState(null);
  const { createModule, createTask, updateModule, deleteModule, getModuleById, getTaskById, updateTask, deleteTask } = useContext(ProjectContext);

  useEffect(() => {
    if (projectStructure) {
      setProjectName(projectStructure.title);
      setModules(projectStructure.modules || []);
    }
  }, [projectStructure]);

  const addModule = () => {
    createModule(projectStructure._id, {
      name: "test",
      description: "test",
    });
  };

  const addTask = (moduleId, parentId) => {
    createTask(moduleId, {
      name: "test",
      description: "test",
      start_date: "2023-10-01",
      due_date: "2023-10-31",
    }, parentId);
  };

  const addSubModule = (moduleId) => {
    createModule(moduleId, {
      name: "test",
      description: "test",
    }, moduleId);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    const { type, moduleId, taskId, submoduleId } = item;
    if (type === "module") {
      const module = modules.find((mod) => mod._id === moduleId);
      setDetails({
        name: module.name,
        description: module.description,
      });
    } else if (type === "submodule") {
      const module = modules.find((mod) => mod._id === moduleId);
      const submodule = module.submodules.find((sub) => sub._id === submoduleId);
      setDetails({
        name: submodule.name,
        description: submodule.description,
      });
    } else if (type === "task") {
      const module = modules.find((mod) => mod._id === moduleId);
      let task;
      if (!submoduleId) {
        task = module.tasks.find((task) => task._id === taskId);
      } else {
        const submodule = module.submodules.find((sub) => sub._id === submoduleId);
        task = submodule.tasks.find((task) => task._id === taskId);
      }

      setDetails({
        name: task.name,
        description: task.description,
        start_date: task.start_date,
        due_date: task.due_date,
      });
    } else {
      setDetails(null);
    }
  };

  const updateItem = async (newName) => {
    if (!selectedItem) return;
    const { type, moduleId, taskId, submoduleId } = selectedItem;

    if (type === "module") {
      const module = await getModuleById(moduleId);
      updateModule(moduleId, {
        name: "test1",
        description: "test1",
      });
    } else if (type === "submodule") {
      const submodule = await getModuleById(submoduleId);
      updateModule(submoduleId, {
        name: "test1",
        description: "test1",
      }, moduleId);
    } else if (type === "task") {
      const task = await getTaskById(taskId);
      if (!submoduleId) {
        updateTask(taskId, {
          name: "test1",
          description: "test1",
          start_date: "2023-10-01",
          due_date: "2023-10-31",
        }, moduleId,);
      } else {
        updateTask(taskId, {
          name: "test1",
          description: "test1",
          start_date: "2023-10-01",
          due_date: "2023-10-31",
        }, submoduleId, moduleId);
      }
    };
  }

  const deleteItem = () => {
    if (!selectedItem) return;
    const { type, moduleId, taskId, submoduleId } = selectedItem;

    if (type === "module") {
      deleteModule(moduleId);
    } else if (type === "submodule") {
      deleteModule(submoduleId, moduleId);
    } else if (type === "task") {
      if (!submoduleId) {
        deleteTask(taskId, moduleId);
      } else {
        deleteTask(taskId, submoduleId, moduleId);
      }
    }

    setSelectedItem(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 p-4 border-b flex flex-col items-center ml-[380px] border-2 border-b-0 rounded-tl-lg rounded-tr-lg bg-yellow-50">
        <div className="text-xl font-bold border bg-orange-200 p-2 rounded w-64 text-center flex gap-4 justify-center">
          {projectName}
          <button
            className="bg-blue-500 text-white px-2 py-0 rounded shadow"
            onClick={addModule}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[360px] bg-black/20 px-6 py-4 overflow-auto rounded h-[500px]">
          <h2 className="text-xl font-bold mb-2 text-white">{selectedItem ? selectedItem.type.toUpperCase() : ""}</h2>
          {selectedItem ? (
            <div className="space-y-4 text-white">
              {selectedItem.type === "module" ? (
                <>
                  <button
                    className="mt-1 bg-purple-500 text-white px-4 py-2 rounded"
                    onClick={() => addSubModule(selectedItem.moduleId)}
                  >
                    + Add Submodule
                  </button>
                  <button
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded ml-2"
                    onClick={() => addTask(selectedItem.moduleId)}
                  >
                    + Add Task
                  </button>
                </>
              ) : selectedItem.type === "submodule" ? (
                <button
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() =>
                    addTask(selectedItem.submoduleId, selectedItem.moduleId)
                  }
                >
                  + Add Task
                </button>
              ) : null}
              <input
                className="w-full p-2 border rounded text-black"
                value={selectedItem.name}
                readOnly
              />
              <div>
                <strong>Details:</strong>
                <textarea
                  className="w-full p-2 border rounded text-black"
                  rows="4"
                  value={details?.description}
                  readOnly
                />
                {selectedItem.type === "task" && (
                  <>
                    <strong>Start Date:</strong>
                    <input
                      type="date"
                      className="w-full p-2 border rounded text-black"
                      value={details?.start_date}
                      readOnly
                    />
                    <strong>Due Date:</strong>
                    <input
                      type="date"
                      className="w-full p-2 border rounded text-black"
                      value={details?.due_date}
                      readOnly
                    />
                  </>
                )}
              </div>
              <div className="flex gap-10 pt-8">
                <button
                  onClick={updateItem}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  onClick={deleteItem}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <p className="text-white">Select a item to see details</p>
          )}
        </div>
        <div className="flex-1 p-6 overflow-auto border-2 ml-[20px] border-t-0 rounded-b-lg bg-yellow-50">
          <div className="flex gap-6 justify-start items-start relative">
            {modules.map((mod) => (
              <div key={mod._id} className="relative w-60">
                <div
                  className="bg-green-100 border rounded p-3 shadow text-center cursor-pointer hover:bg-green-200 mb-4"
                  onClick={() =>
                    selectItem({
                      type: "module",
                      moduleId: mod._id,
                      name: mod.name,
                    })
                  }
                >
                  <strong>{mod.name}</strong>
                </div>

                {mod.tasks && mod.tasks.length > 0 && (
                  <div className="ml-4 border-l-2 border-gray-400 space-y-2 relative">
                    {mod.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-gray-100 p-2 pl-0 rounded cursor-pointer hover:bg-gray-200 flex items-center text-sx"
                        onClick={() =>
                          selectItem({
                            type: "task",
                            moduleId: mod._id,
                            taskId: task._id,
                            name: task.name,
                          })
                        }
                      >
                        <Minus color="rgb(156 163 175)" /> {task.name}
                      </div>
                    ))}
                  </div>
                )}

                {mod.submodules && mod.submodules.length > 0 && (
                  <div className="ml-4 border-l-2 border-blue-400 space-y-2 text-sx">
                    {mod.submodules.map((sub) => (
                      <div key={sub.id} className="relative">
                        <div
                          className="bg-blue-100 p-2 pl-0 rounded cursor-pointer hover:bg-blue-200 flex items-center"
                          onClick={() =>
                            selectItem({
                              type: "submodule",
                              moduleId: mod._id,
                              submoduleId: sub._id,
                              name: sub.name,
                            })
                          }
                        >
                          <Minus color="rgb(96 165 250)" /> {sub.name}
                        </div>

                        {sub.tasks && sub.tasks.length > 0 && (
                          <div className="mt-2 ml-4 space-y-1 border-l-2 border-gray-400">
                            {sub.tasks.map((task) => (
                              <div
                                key={task.id}
                                className="bg-gray-100 p-2 pl-0 rounded cursor-pointer hover:bg-gray-200 flex items-center"
                                onClick={() =>
                                  selectItem({
                                    type: "task",
                                    moduleId: mod._id,
                                    submoduleId: sub._id,
                                    taskId: task._id,
                                    name: task.name,
                                  })
                                }
                              >
                                <Minus color="rgb(156 163 175)" /> {task.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
