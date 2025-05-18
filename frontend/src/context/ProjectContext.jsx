import { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext";
import wbsApi from "../api/wbsApi";

export const ProjectContext = createContext();

export const ProjectContextProvider = (props) => {
  const [projectStructure, setProjectStructure] = useState(null);
  const { projectId } = useContext(AppContext);
  console.log(projectId);

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
  };

  const getModuleById = async (moduleId) => {
    try {
      const response = await wbsApi.getModuleById(moduleId);
      if (response.data.success) {
        return response.data.data;
      } else {
        console.error("Error fetching module:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching module:", error);
    }
  };

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
  };

  const updateModule = async (moduleId, module) => {
    try {
      const response = await wbsApi.updateModule(moduleId, module);
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
  };

  const deleteModule = async (moduleId) => {
    try {
      const response = await wbsApi.deleteModule(moduleId);
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
  };

  const getTaskById = async (taskId) => {
    try {
      const response = await wbsApi.getTaskById(taskId);
      if (response.data.success) {
        return response.data.data;
      } else {
        console.error("Error fetching task:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const createTask = async (moduleId, task) => {
    try {
      const response = await wbsApi.createTask(moduleId, task);
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
  };

  // const updateTask = async (taskId, task) => {
  //     try {
  //         const response = await wbsApi.updateTask(taskId, task);
  //         if (response.data.success) {
  //             setProjectStructure((prev) =>
  //                 prev.map((item) =>
  //                     item.id === moduleId
  //                         ? {
  //                             ...item,
  //                             tasks: item.tasks.map((t) =>
  //                                 t.id === taskId ? response.data.data : t
  //                             ),
  //                         }
  //                         : item
  //                 )
  //             );
  //         } else {
  //             console.error("Error updating task:", response.statusText);
  //         }
  //     } catch (error) {
  //         console.error("Error updating task:", error);
  //     }
  // }

  // const deleteTask = async (taskId) => {
  //     try {
  //         const response = await wbsApi.deleteTask(taskId);
  //         if (response.data.success) {
  //             setProjectStructure((prev) =>
  //                 prev.map((item) =>
  //                     item.id === moduleId
  //                         ? {
  //                             ...item,
  //                             tasks: item.tasks.filter((t) => t.id !== taskId),
  //                         }
  //                         : item
  //                 )
  //             );
  //         } else {
  //             console.error("Error deleting task:", response.statusText);
  //         }
  //     } catch (error) {
  //         console.error("Error deleting task:", error);
  //     }
  // }

  const getTaskMembers = async (taskId) => {
    try {
      const response = await wbsApi.getTaskMembers(taskId);
      if (response.data.success) {
        return response.data.data;
      } else {
        console.error("Error fetching task members:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching task members:", error);
    }
  };

  const assignTask = async (taskId, userEmail) => {
    try {
      const response = await wbsApi.assignTask(taskId, userEmail);
      if (response.data.success) {
        toast.success("Task assigned successfully");
      } else {
        console.error("Error assigning task:", response.statusText);
      }
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  const unassignTask = async (taskId, userId) => {
    try {
      const response = await wbsApi.unassignTask(taskId, userId);
      if (response.data.success) {
        toast.success("Task unassigned successfully");
      } else {
        console.error("Error unassigning task:", response.statusText);
      }
    } catch (error) {
      console.error("Error unassigning task:", error);
    }
  };

  useEffect(() => {
    fetchProjectStructure();
  }, [projectId]);

  return (
    <ProjectContext.Provider
      value={{
        fetchProjectStructure,
        projectStructure,
        createModule,
        updateModule,
        deleteModule,
        createTask,
        getModuleById,
        getTaskById,
        getTaskMembers,
        assignTask,
        unassignTask,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};
