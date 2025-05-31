import React, { useContext, useEffect, useState } from "react";
import { Minus, UserRoundCheck, UserRoundSearch } from "lucide-react";
import { ProjectContext } from "../../context/ProjectContext";
import useUserStore from "../../store/userStore";

export default function WBSBoard({
  setModuleId,
  setParentId,
  setShowAddProjectPopup,
  setShowAddMemberPopup,
  setTaskId,
}) {
  const {
    projectStructure,
    updateModule,
    deleteModule,
    updateTask,
    deleteTask,
    getTaskById,
    taskMember,
    setTaskMember,
  } = useContext(ProjectContext);
  const user = useUserStore((state) => state.user);
  const [projectName, setProjectName] = useState(projectStructure?.title);
  const [modules, setModules] = useState(projectStructure?.modules || []);
  const [selectedItem, setSelectedItem] = useState(null);
  const [details, setDetails] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLeader, setIsLeader] = useState(false);

  useEffect(() => {
    if (projectStructure) {
      setIsLeader(projectStructure.leader === user.id);
      setProjectName(projectStructure.title);
      setModules(projectStructure.modules || []);
    }
  }, [projectStructure]);

  const addModule = () => {
    setModuleId(null);
    setParentId(null);
    setShowAddProjectPopup(true);
  };

  const addTask = (moduleId, parentId) => {
    setModuleId(moduleId);
    setParentId(parentId);
    setShowAddProjectPopup(true);
  };

  const addSubModule = (moduleId) => {
    setModuleId(moduleId);
    setParentId(null);
    setShowAddProjectPopup(true);
  };

  const selectItem = async (item) => {
    setIsUpdate(false);
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
      const submodule = module.submodules.find(
        (sub) => sub._id === submoduleId
      );
      setDetails({
        name: submodule.name,
        description: submodule.description,
      });
    } else if (type === "task") {
      const task = await getTaskById(taskId);

      setDetails({
        name: task.name,
        description: task.description,
        start_date: task.start_date,
        due_date: task.due_date,
        member: task.member ? task.member.name : null,
      });
    } else {
      setDetails(null);
    }
  };

  const updateItem = async () => {
    if (!selectedItem) return;
    const { type, moduleId, taskId, submoduleId } = selectedItem;

    if (type === "module") {
      updateModule(moduleId, details);
    } else if (type === "submodule") {
      updateModule(submoduleId, details, moduleId);
    } else if (type === "task") {
      if (!submoduleId) {
        updateTask(taskId, details, moduleId);
      } else {
        updateTask(taskId, details, submoduleId, moduleId);
      }
    }

    setIsUpdate(false);
  };

  const onUpdate = () => {
    setIsUpdate(!isUpdate);
  };

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

  const assignMember = () => {
    if (!selectedItem) return;
    const { type, taskId } = selectedItem;
    setTaskId(taskId);
    setShowAddMemberPopup(true);
  };

  useEffect(() => {
    if (taskMember && selectedItem.type === "task") {
      setDetails({ ...details, member: taskMember.name });
      setTaskMember(null);
    }
  }, [taskMember]);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 p-4 border-b flex flex-col items-center ml-[380px] border-2 border-b-0 rounded-tl-lg rounded-tr-lg bg-yellow-50">
        {projectName ? (
          <div className="text-xl font-bold border bg-orange-200 p-2 rounded w-64 text-center flex gap-4 justify-center">
            {projectName}
            {isLeader && (
              <button
                className="bg-blue-500 text-white px-2 py-0 rounded shadow pb-1"
                onClick={addModule}
              >
                +
              </button>
            )}
          </div>
        ) : (
          <div className="text-gray-500">Create or select a project to view WBS</div>
        )}

        <div className="absolute top-4 right-4">
          <div className="relative group">
            <button
              className="bg-gray-300 rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold text-gray-700 hover:bg-gray-400 focus:outline-none"
              title="How to use WBS Board"
            >
              ?
            </button>
            <div className="hidden group-hover:block absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded shadow-lg p-4 z-50 text-sm text-gray-700">
              <strong>How to use WBS Board:</strong>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <span className="font-semibold">Add Modules/Submodules/Tasks:</span> Click the <span className="font-bold text-blue-600">+</span> button to add new modules.
                  You can also add submodules and tasks within modules.
                </li>
                <li>
                  <span className="font-semibold">Items:</span> Modules is <span className="text-green-400">green</span>, submodules are <span className="text-blue-300">light blue</span>, and tasks are <span className="text-gray-400">gray</span>.
                </li>
                <li>
                  <span className="font-semibold">Select an item:</span> Click on a module, submodule, or task to view or edit its details.
                </li>
                <li>
                  <span className="font-semibold">Edit/Delete:</span> Use the <span className="font-bold text-yellow-600">Edit</span> or <span className="font-bold text-red-600">Delete</span> buttons in the details panel.
                </li>
                <li>
                  <span className="font-semibold">Assign Members:</span> For tasks, click the member icon to assign or change the responsible member.
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[360px] bg-black/20 px-6 py-4 overflow-auto rounded h-[500px]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">
              {selectedItem ? selectedItem.type.toUpperCase() : ""}
            </h2>
            {selectedItem && selectedItem.type === "task" && (
              <>
                {details?.member ? (
                  <div
                    className={`flex items-center gap-2 text-white ${isLeader ? "cursor-pointer" : ""
                      }`}
                    onClick={() => {
                      if (isLeader) assignMember();
                    }}
                  >
                    {details?.member}
                    {isLeader && <UserRoundCheck className="text-white" />}
                  </div>
                ) : (
                  isLeader && (
                    <button onClick={assignMember}>
                      <UserRoundSearch className="text-white" />
                    </button>
                  )
                )}
              </>
            )}
          </div>

          {selectedItem ? (
            <div className="text-white mb-4">
              {isLeader && (
                <>
                  {selectedItem.type === "module" ? (
                    <div className="mt-4">
                      <button
                        className="bg-purple-500 text-white px-4 py-2 rounded"
                        onClick={() => addSubModule(selectedItem.moduleId)}
                      >
                        + Add Submodule
                      </button>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                        onClick={() =>
                          addTask(selectedItem.moduleId, selectedItem.moduleId)
                        }
                      >
                        + Add Task
                      </button>
                    </div>
                  ) : selectedItem.type === "submodule" ? (
                    <div className="mt-4">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() =>
                          addTask(
                            selectedItem.submoduleId,
                            selectedItem.moduleId
                          )
                        }
                      >
                        + Add Task
                      </button>
                    </div>
                  ) : null}
                </>
              )}
              <input
                className="mt-4 w-full p-2 border rounded text-black"
                value={details?.name}
                readOnly={!isUpdate}
                onChange={(e) =>
                  setDetails({ ...details, name: e.target.value })
                }
              />
              <div>
                <strong>Details:</strong>
                <textarea
                  className="w-full p-2 border rounded text-black"
                  rows="4"
                  value={details?.description}
                  readOnly={!isUpdate}
                  onChange={(e) =>
                    setDetails({ ...details, description: e.target.value })
                  }
                />
                {selectedItem.type === "task" && (
                  <>
                    <strong>Start Date:</strong>
                    <input
                      type="date"
                      className="w-full p-2 border rounded text-black"
                      value={
                        details?.start_date
                          ? details.start_date.split("T")[0]
                          : ""
                      }
                      readOnly={!isUpdate}
                      onChange={(e) =>
                        setDetails({ ...details, start_date: e.target.value })
                      }
                    />
                    <strong>Due Date:</strong>
                    <input
                      type="date"
                      className="w-full p-2 border rounded text-black"
                      value={
                        details?.due_date ? details.due_date.split("T")[0] : ""
                      }
                      readOnly={!isUpdate}
                      onChange={(e) =>
                        setDetails({ ...details, due_date: e.target.value })
                      }
                    />
                  </>
                )}
              </div>
              {isLeader && (
                <>
                  {
                    isUpdate ? (
                      <div className="flex justify-between pt-8">
                        <button
                          className="border border-gray-300 rounded-md bg-white text-red-500 hover:bg-gray-50 px-4 py-2 rounded"
                          onClick={() => setIsUpdate(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded"
                          onClick={updateItem}
                        >
                          Update
                        </button>

                      </div>
                    ) : (
                      <div className="flex gap-10 pt-8">
                        <button
                          onClick={onUpdate}
                          className="bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={deleteItem}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    )
                  }
                </>
              )}
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
                  className="bg-green-300 border rounded p-3 shadow text-center cursor-pointer hover:bg-green-400 mb-4"
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
                        key={task._id}
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
                  <div className="ml-4 border-l-2 border-blue-400  text-sx">
                    <div className="pt-2 space-y-2">
                      {mod.submodules.map((sub) => (
                        <div key={sub._id} className="relative">
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
                                  key={task._id}
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
