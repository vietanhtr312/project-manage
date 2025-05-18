import React, { useContext, useState } from "react";
import ProjectFolder from "../components/project/ProjectFolder";
import AddProjectModal from "../components/project/AddProjectModal";
import projectApi from "../api/projectApi";
import { AppContext } from "../context/AppContext";

function HomePage() {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [project, setProject] = useState({
    id: "",
    title: "",
    description: "",
    start_date: "",
    due_date: "",
    members: [],
  });

  const {setOnRefresh} = useContext(AppContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateProject = async () => {
    try {
      const response = await projectApi.createProject({
        title: project.title,
        description: project.description,
        start_date: project.start_date,
        due_date: project.due_date,
        status: project.status,
        members: project.members,
      });
      setMessage(response.data.message);
      setOnRefresh(true);
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const resetForm = () => {
    setProject({
      id: "",
      title: "",
      description: "",
      start_date: "",
      due_date: "",
      status: "In Progress",
      members: [],
    });
  };

  const handleUpdateProject = async (projectId) => {
    try {
      const response = await projectApi.updateProject(projectId, {
        title: project.title,
        description: project.description,
        start_date: project.start_date,
        due_date: project.due_date,
        status: project.status,
        members: project.members,
      });
      setMessage(response.data.message);
      setIsUpdate(false);
      setOnRefresh(true);
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleAddMember = (member) => {
    if (member && !project.members.includes(member)) {
      setProject(prev => ({
        ...prev,
        members: [...prev.members, member]
      }));
    }
  };

  const handleRemoveMember = (member) => {
    setProject(prev => ({
      ...prev,
      members: prev.members.filter(m => m !== member)
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <>
      <div className=''>
        <ProjectFolder onAddNewClick={() => setShowModal(true)} setProject={setProject} onUpdateClick={() => {setShowModal(true); setIsUpdate(true)}}/>
      </div>

      <AddProjectModal
        show={showModal}
        onClose={handleCloseModal}
        project={project}
        onInputChange={handleInputChange}
        onCreateProject={handleCreateProject}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
        onUpdateProject={() => handleUpdateProject(project.id)}
        idUpdate={isUpdate}
      />
    </>
  );
}

export default HomePage;