import React, { useContext, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import ProjectCard from "./ProjectCard";
import projectApi from "../../api/projectApi";
import useUserStore from "../../store/userStore";

const ProjectFolder = ({ onAddNewClick, setProject, onUpdateClick }) => {
  const { projectId, setProjectId, projects, setProjects, onRefresh, setOnRefresh } = useContext(AppContext);
  const [projectDetails, setProjectDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails(projectId);
      setShowDetails(true);
    }
  }, [projectId]);

  const handlefetchProjects = async () => {
    try {
      const response = await projectApi.getProjects(user.id);
      if (response.data.success) setProjects(response.data.data);
      else console.error(response.data.message);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  useEffect(() => {
    handlefetchProjects();
    setOnRefresh(false);
  }, [onRefresh]);

  const fetchProjectDetails = async (projectId) => {
    try {
      const response = await projectApi.getProjectById(projectId);
      if (response.data.success) setProjectDetails(response.data.data);
      else console.error(response.data.message);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const handleUpdateProject = async () => {
    setProject({
      id: projectId,
      title: projectDetails.title,
      description: projectDetails.description,
      start_date: projectDetails.start_date,
      due_date: projectDetails.due_date,
      status: projectDetails.status,
      members: projectDetails.members.map((member) => (
        member.email
      )),
    });
    onUpdateClick(projectId);
  };


  const navigate = useNavigate();

  const handleManageClick = () => {
    setProjectId(projectId);
    navigate("/wbs");
  };

  const AddNewProjectCard = () => (
    <div className="relative z-10 flex flex-col justify-center items-center w-64 h-40 mb-16 bg-white rounded-2xl rounded-tl-none shadow-md">
      <div className="absolute left-0 top-[-40px] bg-white rounded-2xl rounded-b-none cursor-pointer group-hover:bg-gray-300 h-10 w-28"></div>
      <button
        className="text-black py-2 px-4 rounded-lg bg-blue-300 hover:bg-blue-500 hover:text-white"
        onClick={onAddNewClick} // Thêm sự kiện onClick gọi đến onAddNewClick
      >
        Add New Project
      </button>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-white/10 pt-20 pl-10 pr-0 flex">
      <div className="w-3/4 flex flex-row flex-wrap mb-4 gap-8">
        {projects &&
          projects.length > 0 &&
          projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onClick={() => setProjectId(project.project._id)}
            />
          ))}
        <AddNewProjectCard />
      </div>

      <div className="mr-8 w-80 z-1 bg-white rounded-2xl max-h-[500px]">
        <div className="flex justify-between items-center px-8 mt-10 mb-3">
          <h2 className="text-left text-2xl font-bold">Details</h2>
        </div>
        {!showDetails ? (
          <div className="text-left my-2 text-gray-500 ml-8">
            Select a project to view details
          </div>
        ) : (
          projectDetails && (
            <div
              className={`ml-8 mr-4 mb-4 h-[calc(100%-100px)] flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-left my-2 text-lg font-bold">
                  {projectDetails?.title}
                </h3>
                <p className="text-left my-2 text-gray-500">
                  {projectDetails?.description}
                </p>
                <p className="text-left my-2 text-gray-500">
                  <span className="font-semibold">Start At:</span>{" "}
                  {projectDetails?.start_date
                    ? projectDetails?.start_date.split("T")[0]
                    : ""}
                </p>
                <p className="text-left my-2 text-gray-500">
                  <span className="font-semibold">Due date:</span>{" "}
                  {projectDetails?.due_date
                    ? projectDetails?.due_date.split("T")[0]
                    : ""}
                </p>
                <p className="text-left my-2 text-gray-500">
                  <span className="font-semibold">Owner:</span>{" "}
                  {projectDetails?.leader?.name}
                </p>
                <p className="text-left my-2 text-gray-500">
                  <span className="font-semibold">Members:</span>{" "}
                  {projectDetails?.members?.map((member, index) => (
                    <span key={index}>
                      {member.name}
                      {index < projectDetails.members.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>
              <div className="mt-auto mb-10 flex flex-row gap-10">
                <button className="text-black py-2 px-4 rounded-lg bg-yellow-100 hover:bg-yellow-500 hover:text-white" onClick={handleUpdateProject}>
                  Update
                </button>
                <button
                  onClick={handleManageClick}
                  className="h-10 text-black py-2 pl-4 pr-2 rounded-lg bg-green-100 hover:bg-green-500 hover:text-white flex items-center"
                >
                  <span className="mb-1" onClick={() => { }}>
                    Manage
                  </span>
                  <ChevronRight />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProjectFolder;