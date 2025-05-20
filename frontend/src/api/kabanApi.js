import axiosClient from "./axiosClient";

const kabanApi = {
    getTasksByProjectId: (projectId) => axiosClient.get(`/tasks/project/${projectId}`),
    updateTask: (taskId, updatedTask) => axiosClient.put(`/tasks/${taskId}`, updatedTask),
    deleteTask: (taskId) => axiosClient.delete(`/tasks/${taskId}`),
    getTasksByUserAndProject: (userId, projectId) => axiosClient.get(`/tasks/user/${userId}/project/${projectId}`),
}

export default kabanApi