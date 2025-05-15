import React, { useState } from "react";
import { Minus } from 'lucide-react';

export default function WBSBoard() {
    const [projectName, setProjectName] = useState("New Project");
    const [modules, setModules] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const addModule = () => {
        const newModule = {
            id: Date.now(),
            name: `Module ${modules.length + 1}`,
            tasks: [],
            submodules: [],
        };
        setModules([...modules, newModule]);
    };

    const addTask = (moduleId, submoduleId) => {
        setModules((prev) =>
            prev.map((mod) => {
                if (mod.id === moduleId) {
                    if (submoduleId === undefined) {
                        return {
                            ...mod,
                            tasks: [
                                ...mod.tasks,
                                {
                                    id: Date.now(),
                                    name: `Task ${mod.tasks.length + 1}`,
                                },
                            ],
                        };
                    } else {
                        return {
                            ...mod,
                            submodules: mod.submodules.map((sub) =>
                                sub.id === submoduleId
                                    ? {
                                        ...sub,
                                        tasks: [
                                            ...sub.tasks,
                                            {
                                                id: Date.now(),
                                                name: `Task ${sub.tasks.length + 1}`,
                                            },
                                        ],
                                    }
                                    : sub
                            ),
                        };
                    }
                }
                return mod;
            })
        );
    };

    const addSubModule = (moduleId) => {
        setModules((prev) =>
            prev.map((mod) =>
                mod.id === moduleId
                    ? {
                        ...mod,
                        submodules: [
                            ...mod.submodules,
                            {
                                id: Date.now(),
                                name: `Submodule ${mod.submodules.length + 1}`,
                                tasks: [],
                            },
                        ],
                    }
                    : mod
            )
        );
    };

    const selectItem = (item) => setSelectedItem(item);

    const updateItemName = (newName) => {
        if (!selectedItem) return;
        const { type, moduleId, taskId, submoduleId } = selectedItem;

        setModules((prev) =>
            prev.map((mod) => {
                if (type === "module" && mod.id === moduleId) {
                    return { ...mod, name: newName };
                }
                if (type === "task" && mod.id === moduleId && !submoduleId) {
                    return {
                        ...mod,
                        tasks: mod.tasks.map((t) =>
                            t.id === taskId ? { ...t, name: newName } : t
                        ),
                    };
                }
                if (type === "task" && mod.id === moduleId && submoduleId) {
                    return {
                        ...mod,
                        submodules: mod.submodules.map((sub) =>
                            sub.id === submoduleId
                                ? {
                                    ...sub,
                                    tasks: sub.tasks.map((t) =>
                                        t.id === taskId ? { ...t, name: newName } : t
                                    ),
                                }
                                : sub
                        ),
                    };
                }
                if (type === "submodule" && mod.id === moduleId) {
                    return {
                        ...mod,
                        submodules: mod.submodules.map((sub) =>
                            sub.id === submoduleId ? { ...sub, name: newName } : sub
                        ),
                    };
                }
                return mod;
            })
        );

        setSelectedItem({ ...selectedItem, name: newName });
    };

    const deleteItem = () => {
        if (!selectedItem) return;
        const { type, moduleId, taskId, submoduleId } = selectedItem;

        if (type === "module") {
            setModules((prev) => prev.filter((m) => m.id !== moduleId));
        } else if (type === "task") {
            if (submoduleId) {
                setModules((prev) =>
                    prev.map((mod) =>
                        mod.id === moduleId
                            ? {
                                ...mod,
                                submodules: mod.submodules.map((sub) =>
                                    sub.id === submoduleId
                                        ? {
                                            ...sub,
                                            tasks: sub.tasks.filter((t) => t.id !== taskId),
                                        }
                                        : sub
                                ),
                            }
                            : mod
                    ))
            } else {
                setModules((prev) => prev.map((mod) =>
                    mod.id === moduleId
                        ? {
                            ...mod,
                            tasks: mod.tasks.filter((t) => t.id !== taskId),
                        }
                        : mod
                ))
            }
        } else if (type === "submodule") {
            setModules((prev) =>
                prev.map((mod) =>
                    mod.id === moduleId
                        ? {
                            ...mod,
                            submodules: mod.submodules.filter((sub) => sub.id !== submoduleId),
                        }
                        : mod
                )
            );
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
                <div className="w-[360px] bg-gray-100 p-4 border-r overflow-auto bg-white rounded h-[500px]">
                    <h2 className="text-xl font-bold mb-4">Details</h2>
                    {selectedItem ? (
                        <div className="space-y-4">
                            <p>
                                <strong>Type:</strong> {selectedItem.type}
                            </p>
                            <input
                                className="w-full p-2 border rounded"
                                value={selectedItem.name}
                                onChange={(e) => updateItemName(e.target.value)}
                            />
                            {
                                selectedItem.type === "module" ? (
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
                                    </>) : selectedItem.type === "submodule" ? (
                                        <button
                                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded mr-2"
                                            onClick={() => addTask(selectedItem.moduleId, selectedItem.submoduleId)}
                                        >
                                            + Add Task
                                        </button>
                                    ) : null
                            }
                            <button
                                onClick={deleteItem}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    ) : (
                        <p>Select a item to see details</p>
                    )}
                </div>

                <div className="flex-1 p-6 overflow-auto border-2 ml-[20px] border-t-0 rounded-br-lg bg-yellow-50">
                    <div className="flex gap-6 justify-start items-start relative">
                        {modules.map((mod) => (
                            <div key={mod.id} className="relative w-60">
                                <div
                                    className="bg-green-100 border rounded p-3 shadow text-center cursor-pointer hover:bg-green-200 mb-4"
                                    onClick={() =>
                                        selectItem({ type: "module", moduleId: mod.id, name: mod.name })
                                    }
                                >
                                    <strong>{mod.name}</strong>
                                </div>

                                {mod.tasks.length > 0 && (
                                    <div className="ml-4 border-l-2 border-gray-400 space-y-2 relative">
                                        {mod.tasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="bg-gray-100 p-2 pl-0 rounded cursor-pointer hover:bg-gray-200 flex items-center text-sx"
                                                onClick={() =>
                                                    selectItem({
                                                        type: "task",
                                                        moduleId: mod.id,
                                                        taskId: task.id,
                                                        name: task.name,
                                                    })
                                                }
                                            >
                                                <Minus color="rgb(156 163 175)" /> {task.name}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {mod.submodules.length > 0 && (
                                    <div className="ml-4 border-l-2 border-blue-400 space-y-2 text-sx">
                                        {mod.submodules.map((sub) => (
                                            <div key={sub.id} className="relative">
                                                <div
                                                    className="bg-blue-100 p-2 pl-0 rounded cursor-pointer hover:bg-blue-200 flex items-center"
                                                    onClick={() =>
                                                        selectItem({
                                                            type: "submodule",
                                                            moduleId: mod.id,
                                                            submoduleId: sub.id,
                                                            name: sub.name,
                                                        })
                                                    }
                                                >
                                                    <Minus color="rgb(96 165 250)" /> {sub.name}
                                                </div>

                                                {sub.tasks.length > 0 && (
                                                    <div className="mt-2 ml-4 space-y-1 border-l-2 border-gray-400">
                                                        {sub.tasks.map((task) => (
                                                            <div
                                                                key={task.id}
                                                                className="bg-gray-100 p-2 pl-0 rounded cursor-pointer hover:bg-gray-200 flex items-center"
                                                                onClick={() =>
                                                                    selectItem({
                                                                        type: "task",
                                                                        moduleId: mod.id,
                                                                        submoduleId: sub.id,
                                                                        taskId: task.id,
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
