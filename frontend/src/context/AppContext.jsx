import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

    const [userData, setUserData] = useState(null);
    const token = localStorage.getItem('token');

    const [projectId, setProjectId] = useState(null);
    const [projects, setProjects] = useState([]);
    const [onRefresh, setOnRefresh] = useState(false);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }

            const { data } = await axios.get(backendUrl + '/api/v1/users/me/profile',
                { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setUserData(data.data)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <AppContext.Provider value={{ userData, setUserData, token, backendUrl, projectId, setProjectId, projects, setProjects, onRefresh, setOnRefresh }}>
            {props.children}
        </AppContext.Provider>
    );
}