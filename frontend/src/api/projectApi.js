import axiosClient from "./axiosClient";

const projectApi = {
    getProjects: (userId) => axiosClient.get(`/projects?userId=${userId}&role=all`),
    getProjectById: (projectId) => axiosClient.get(`/projects/${projectId}`),
    createProject: (project) => axiosClient.post("/projects", project),
    updateProject: (projectId, project) => axiosClient.put(`/projects/${projectId}`, project),
}

export default projectApi;