import axiosClient from "./axiosClient";

const kabanApi = {
    getTasksByProjectId: (projectId) => axiosClient.get(`/tasks/project/${projectId}`)
}

export default kabanApi