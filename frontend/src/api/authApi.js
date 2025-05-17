import axiosInstance from "./axiosInstance";

export const registerUser = async ({ username, gmail, password }) => {
    const response = await axiosInstance.post("/api/v1/auth/register", {
        name: username,
        email: gmail,
        password,
    });
    return response.data;
};

export const loginUser = async ({ gmail, password }) => {
    const response = await axiosInstance.post("/api/v1/auth/login", {
        email: gmail,
        password,
    });
    return response.data;
};
