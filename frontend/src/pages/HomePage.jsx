import React, { useState } from "react";
import ProjectFolder from "../components/project/ProjectFolder";
import projectApi from "../api/projectApi";

function HomePage() {
  const [message, setMessage] = useState("");
  const [project, setProject] = useState({
    title: "",
    description: "",
    start_date: "",
    due_date: "",
    members: [],
  });

  const handleCreateProject = async () => {
    try {
      const response = await projectApi.createProject({
        title: project.title,
        description: project.description,
        start_date: project.start_date,
        due_date: project.due_date,
        members: [],
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  }

  const handleUpdateProject = async (projectId) => {
    try {
      const response = await projectApi.updateProject(projectId, {
        title: project.title,
        description: project.description,
        start_date: project.start_date,
        due_date: project.due_date,
        members: [],
      });
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
