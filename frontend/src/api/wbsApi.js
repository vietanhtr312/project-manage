import axiosClient from "./axiosClient";

const wbsApi = {
    getProjectStructure: (projectId) => axiosClient.get(`/projects/${projectId}/structure`),

    createModule: (parentId, module) => axiosClient.post(`/projects/${parentId}/modules`, module),
    updateModule: (projectId, moduleId, module) => axiosClient.put(`/projects/${projectId}/modules/${moduleId}`, module),
    deleteModule: (projectId, moduleId) => axiosClient.delete(`/projects/${projectId}/modules/${moduleId}`),
    getModuleById: (projectId, moduleId) => axiosClient.get(`/projects/${projectId}/modules/${moduleId}`),

    createTask: (projectId, moduleId, task) => axiosClient.post(`/projects/${projectId}/modules/${moduleId}/tasks`, task),
    updateTask: (projectId, moduleId, taskId, task) => axiosClient.put(`/projects/${projectId}/modules/${moduleId}/tasks/${taskId}`, task),
    deleteTask: (projectId, moduleId, taskId) => axiosClient.delete(`/projects/${projectId}/modules/${moduleId}/tasks/${taskId}`),
    getTaskById: (projectId, moduleId, taskId) => axiosClient.get(`/projects/${projectId}/modules/${moduleId}/tasks/${taskId}`),

    assignTask: (projectId, moduleId, taskId, userId) => axiosClient.post(`/projects/${projectId}/modules/${moduleId}/tasks/${taskId}/assign`, { userId }),
    unassignTask: (projectId, moduleId, taskId, userId) => axiosClient.post(`/projects/${projectId}/modules/${moduleId}/tasks/${taskId}/unassign`, { userId }),
}

export default wbsApi;