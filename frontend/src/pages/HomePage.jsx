import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProjectFolder from "../components/project/ProjectFolder";
import { AppContext } from "../context/AppContext";

function HomePage() {
  const [message, setMessage] = useState("");
  const [project, setProject] = useState({
    title: "",
    description: "",
    start_date: "",
    due_date: "",
    members: [],
  });

  const { backendUrl, token } = useContext(AppContext);

  const handleCreateProject = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/projects`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
        {
          title: project.title,
          description: project.description,
          start_date: project.start_date,
          due_date: project.due_date,
          members: [],
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  }

  const handleUpdateProject = async (projectId) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/v1/projects/${projectId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
        {
          title: project.title,
          description: project.description,
          start_date: project.start_date,
          due_date: project.due_date,
          members: [],
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  }

  return <>
    <div className='h-[calc(100vh-4rem)]'>
      <ProjectFolder />
    </div>
  </>;
}

export default HomePage;
