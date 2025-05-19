import { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext";
import wbsApi from "../api/wbsApi";

export const ProjectContext = createContext();

export const ProjectContextProvider = (props) => {
  const [projectStructure, setProjectStructure] = useState(null);
  const [taskMember, setTaskMember] = useState(null);
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

  const createModule = async (parentId, module, submodule) => {
    try {
      const response = await wbsApi.createModule(parentId, module);
      if (response.data.success) {
        if (submodule) {
          setProjectStructure((prev) => {
            const updatedModules = prev.modules.map((item) => {
              if (item._id === parentId) {
                return {
                  ...item,
                  submodules: [...(item.submodules || []), response.data.data],
                };
              }
              return item;
            });

            return {
              ...prev,
              modules: updatedModules,
            };
          });
        } else {
          setProjectStructure((prev) => ({
            ...prev,
            modules: [...(prev.modules || []), response.data.data],
          }));
        }
      } else {
        console.error("Error creating module:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  const updateModule = async (moduleId, module, parentId) => {
    try {
      const response = await wbsApi.updateModule(moduleId, module);
      if (response.data.success) {
        if (parentId) {
          setProjectStructure((prev) => {
            const updatedModules = prev.modules.map((item) => {
              if (item._id === parentId) {
                const updatedSubmodules = (item.submodules || []).map((submodule) => {
                  if (submodule._id === moduleId) {
                    return {
                      ...submodule,
                      name: module.name,
                      description: module.description,
                    };
                  }
                  return submodule;
                }
                );
                return {
                  ...item,
                  submodules: updatedSubmodules,
                };
              }
              return item;
            });
            return {
              ...prev,
              modules: updatedModules,
            };
          });
        } else {
          setProjectStructure((prev) =>
          ({
            ...prev,
            modules: prev.modules.map((item) => {
              if (item._id === moduleId) {
                return {
                  ...item,
                  name: module.name,
                  description: module.description,
                };
              }
              return item;
            }),
          })
          );
        }
      } else {
        console.error("Error updating module:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating module:", error);
    }
  };

  const deleteModule = async (moduleId, parentId) => {
    try {
      const response = await wbsApi.deleteModule(moduleId);
      if (response.data.success) {
        if (parentId) {
          setProjectStructure((prev) => {
            const updatedModules = prev.modules.map((item) => {
              if (item._id === parentId) {
                const updatedSubmodules = (item.submodules || []).filter((submodule) => submodule._id !== moduleId);
                return {
                  ...item,
                  submodules: updatedSubmodules,
                };
              }
              return item;
            });

            return {
              ...prev,
              modules: updatedModules,
            };
          });
        } else {
          setProjectStructure((prev) => ({
            ...prev,
            modules: prev.modules.filter((item) => item._id !== moduleId),
          }));
        }
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

  const createTask = async (moduleId, task, parentId) => {
    try {
      const response = await wbsApi.createTask(moduleId, task);
      if (response.data.success) {
        if (parentId) {
          setProjectStructure((prev) => {
            const updatedModules = prev.modules.map((item) => {
              if (item._id === parentId) {
                const updatedSubmodules = (item.submodules || []).map((submodule) => {
                  if (submodule._id === moduleId) {
                    return {
                      ...submodule,
                      tasks: [...(submodule.tasks || []), response.data.data],
                    };
                  }
                  return submodule;
                });

                return {
                  ...item,
                  submodules: updatedSubmodules,
                };
              }
              return item;
            });

            return {
              ...prev,
              modules: updatedModules,
            };
          });
        } else {
          setProjectStructure((prev) => ({
            ...prev,
            modules: prev.modules.map((item) => {
              if (item._id === moduleId) {
                return {
                  ...item,
                  tasks: [...(item.tasks || []), response.data.data],
                };
              }
              return item;
            }),
          }));
        }
      } else {
        console.error("Error creating task:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTask = async (taskId, task, moduleId, parentId) => {
    try {
      const response = await wbsApi.updateTask(taskId, task);
      if (response.data.success) {
        if (parentId) {
          setProjectStructure((prev) => {
            const updatedModules = prev.modules.map((item) => {
              if (item._id === parentId) {
                const updatedSubmodules = (item.submodules || []).map((submodule) => {
                  if (submodule._id === moduleId) {
                    const updatedTasks = (submodule.tasks || []).map((t) => {
                      if (t._id === taskId) {
                        return {
                          ...t,
                          name: task.name,
                          description: task.description,
                          start_date: task.start_date,
                          due_date: task.due_date,
                        };
                      }
                      return t;
                    });
                    return {
                      ...submodule,
                      tasks: updatedTasks,
                    };
                  }
                  return submodule;
                });

                return {
                  ...item,
                  submodules: updatedSubmodules,
                };
              }
              return item;
            });

            return {
              ...prev,
              modules: updatedModules,
            };
          });
        } else {
          setProjectStructure((prev) =>
          ({
            ...prev,
            modules: prev.modules.map((item) => {
              if (item._id === moduleId) {
                const updatedTasks = (item.tasks || []).map((t) => {
                  if (t._id === taskId) {
                    return {
                      ...t,
                      name: task.name,
                      description: task.description,
                      start_date: task.start_date,
                      due_date: task.due_date,
                    };
                  }
                  return t;
                });
                return {
                  ...item,
                  tasks: updatedTasks,
                };
              }
              return item;
            }),
          })
          );
        }
      } else {
        console.error("Error updating task:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  const deleteTask = async (taskId, moduleId, parentId) => {
    try {
      const response = await wbsApi.deleteTask(taskId);
      if (response.data.success) {
        if (parentId) {
          setProjectStructure((prev) => {
            const updatedModules = prev.modules.map((item) => {
              if (item._id === parentId) {
                const updatedSubmodules = (item.submodules || []).map((submodule) => {
                  if (submodule._id === moduleId) {
                    const updatedTasks = (submodule.tasks || []).filter((task) => task._id !== taskId);
                    return {
                      ...submodule,
                      tasks: updatedTasks,
                    };
                  }
                  return submodule;
                });

                return {
                  ...item,
                  submodules: updatedSubmodules,
                };
              }
              return item;
            });

            return {
              ...prev,
              modules: updatedModules,
            };
          });
        } else {
          setProjectStructure((prev) => ({
            ...prev,
            modules: prev.modules.map((item) => {
              if (item._id === moduleId) {
                const updatedTasks = (item.tasks || []).filter((task) => task._id !== taskId);
                return {
                  ...item,
                  tasks: updatedTasks,
                };
              }
              return item;
            }),
          }));
        }
      } else {
        console.error("Error deleting task:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

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

  const assignTask = async (taskId, userId) => {
    try {
      const response = await wbsApi.assignTask(taskId, userId);
      if (response.data.success) {
        toast.success("Task assigned successfully");
        setTaskMember(response.data.data.member);
        setProjectStructure((prev) => {
          const updatedModules = prev.modules.map((item) => {
            const updatedSubmodules = (item.submodules || []).map((submodule) => {
              const updatedTasks = (submodule.tasks || []).map((task) => {
                if (task._id === taskId) {
                  return {
                    ...task,
                    members: response.data.data.member,
                  };
                }
                return task;
              });
              return {
                ...submodule,
                tasks: updatedTasks,
              };
            });
            return {
              ...item,
              submodules: updatedSubmodules,
            };
          });

          return {
            ...prev,
            modules: updatedModules,
          };
        });
          
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

  const getProjectMembers = async () => {
    try {
      const response = await wbsApi.getProjectMembers(projectId);
      if (response.data.success) {
        return response.data.data;
      } else {
        console.error("Error fetching project members:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching project members:", error);
    }
  }


  useEffect(() => {
    if (projectId) {
      fetchProjectStructure();
    }
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
        updateTask,
        deleteTask,
        getModuleById,
        getTaskById,
        getTaskMembers,
        assignTask,
        unassignTask,
        getProjectMembers,
        taskMember,
        setTaskMember
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};
