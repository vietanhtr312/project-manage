import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext";
import wbsApi from "../api/wbsApi";

export const ProjectContext = createContext();

export const ProjectContextProvider = (props) => {
    const [projectStructure, setProjectStructure] = useState(null);
    const { projectId } = useContext(AppContext);

    const fetchProjectStructure = async () => {
        try {
            const response = await wbsApi.getProjectStructure(projectId);
            if (response.data.success) {
                setProjectStructure(response.data.data);
            } else {
                console.error("Error fetching project structure:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching project structure:", error);
        }
    }

    const createModule = async (parentId, module) => {
        try {
            const response = await wbsApi.createModule(parentId, module);
            if (response.data.success) {
                setProjectStructure((prev) => [...prev, response.data.data]);
            } else {
                console.error("Error creating module:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating module:", error);
        }
    }

    const updateModule = async (projectId, moduleId, module) => {
        try {
            const response = await wbsApi.updateModule(projectId, moduleId, module);
            if (response.data.success) {
                setProjectStructure((prev) =>
                    prev.map((item) => (item.id === moduleId ? response.data.data : item))
                );
            } else {
                console.error("Error updating module:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating module:", error);
        }
    }

    const deleteModule = async (projectId, moduleId) => {
        try {
            const response = await wbsApi.deleteModule(projectId, moduleId);
            if (response.data.success) {
                setProjectStructure((prev) =>
                    prev.filter((item) => item.id !== moduleId)
                );
            } else {
                console.error("Error deleting module:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting module:", error);
        }
    }

    const createTask = async (projectId, moduleId, task) => {
        try {
            const response = await wbsApi.createTask(projectId, moduleId, task);
            if (response.data.success) {
                setProjectStructure((prev) =>
                    prev.map((item) =>
                        item.id === moduleId
                            ? { ...item, tasks: [...item.tasks, response.data.data] }
                            : item
                    )
                );
            } else {
                console.error("Error creating task:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
    }

    const updateTask = async (projectId, moduleId, taskId, task) => {
        try {
            const response = await wbsApi.updateTask(projectId, moduleId, taskId, task);
            if (response.data.success) {
                setProjectStructure((prev) =>
                    prev.map((item) =>
                        item.id === moduleId
                            ? {
                                ...item,
                                tasks: item.tasks.map((t) =>
                                    t.id === taskId ? response.data.data : t
                                ),
                            }
                            : item
                    )
                );
            } else {
                console.error("Error updating task:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }

    const deleteTask = async (projectId, moduleId, taskId) => {
        try {
            const response = await wbsApi.deleteTask(projectId, moduleId, taskId);
            if (response.data.success) {
                setProjectStructure((prev) =>
                    prev.map((item) =>
                        item.id === moduleId
                            ? {
                                ...item,
                                tasks: item.tasks.filter((t) => t.id !== taskId),
                            }
                            : item
                    )
                );
            } else {
                console.error("Error deleting task:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    useEffect(() => {
        fetchProjectStructure();
    }, [projectId]);


    return (
        <ProjectContext.Provider value={{ fetchProjectStructure, projectStructure, createModule, updateModule, deleteModule, createTask, updateTask, deleteTask }}>
            {props.children}
        </ProjectContext.Provider>
    );
}