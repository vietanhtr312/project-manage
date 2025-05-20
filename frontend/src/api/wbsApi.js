import axiosClient from "./axiosClient";

const wbsApi = {
    getProjectStructure: (projectId) => axiosClient.get(`/projects/${projectId}/structure`),
    getProjectMembers: (projectId) => axiosClient.get(`/projects/${projectId}/members`),

    createModule: (parentId, module) => axiosClient.post(`/modules/projects/${parentId}/modules`, module),
    updateModule: (moduleId, module) => axiosClient.put(`/modules/${moduleId}`, module),
    deleteModule: (moduleId) => axiosClient.delete(`/modules/${moduleId}`),
    getModuleById: (moduleId) => axiosClient.get(`/modules/${moduleId}`),

    createTask: (moduleId, task) => axiosClient.post(`/tasks/create/${moduleId}`, task),
    updateTask: (taskId, task) => axiosClient.put(`/tasks/${taskId}`, task),
    deleteTask: (taskId) => axiosClient.delete(`/tasks/${taskId}`),
    getTaskById: (taskId) => axiosClient.get(`/tasks/${taskId}`),

    getTaskMembers: (taskId) => axiosClient.get(`/taskmembers/tasks/${taskId}/members`),
    assignTask: (taskId, userId, projectId) => axiosClient.post(`/taskmembers/tasks/${taskId}/members`, { userId, projectId }),
    unassignTask: (taskId, userId) => axiosClient.post(`/taskmembers/tasks/${taskId}/members/${userId}`),
}

export default wbsApi;