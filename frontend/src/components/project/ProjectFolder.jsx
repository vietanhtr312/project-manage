import React, { useState } from "react";
const project = {
    title: "Project 1",
    description: "This is a sample project",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-02",
    owner: "John Doe",
    members: ["John Doe", "Jane Smith"],
    tasks: ["Task 1", "Task 2"],
    status: "In Progress",
    priority: "High"
};

const ProjectFolder = ({ onClick }) => {
    const [projectDetails, setProjectDetails] = useState(project);
    const [showDetails, setShowDetails] = useState(false);
    const handleCardClick = () => {
        setShowDetails(true);
    };

    const ProjectCard = () => (
        <div>
            <div
                className="relative flex flex-col justify-left w-64 h-40 mb-16 bg-gray-200 rounded-2xl rounded-tl-none shadow-md cursor-pointer group hover:bg-gray-300"
                onClick={handleCardClick}
            >
                <div className="absolute left-0 top-[-40px] bg-gray-200 rounded-2xl rounded-b-none cursor-pointer group-hover:bg-gray-300 h-10 w-28"></div>
                <p className="text-left mt-2 ml-4 text-lg font-bold">{project.title}</p>
                <p className="text-left mt-auto mb-10 ml-4 text-xs text-gray-500">
                    <span className={`w-2 h-2 rounded-full inline-block mr-2 ${project.status === 'In Progress' ? 'bg-yellow-500' : 'bg-green-300'}`}></span>
                    {project.status}
                </p>
            </div>
        </div>
    );

    const AddNewProjectCard = () => (
        <div className="relative flex flex-col justify-center items-center w-64 h-40 mb-16 bg-gray-200 rounded-2xl rounded-tl-none shadow-md">
            <div className="absolute left-0 top-[-40px] bg-gray-200 rounded-2xl rounded-b-none cursor-pointer group-hover:bg-gray-300 h-10 w-28">
            </div>
            <button className="text-black py-2 px-4 rounded-lg bg-blue-300 hover:bg-blue-500 hover:text-white">Add New Project</button>
        </div>
    );

    return (
        <div className="h-screen w-[75%] bg-gray-100 p-20 pr-0">
            <div className="w-100 flex flex-row flex-wrap items-center mb-4 gap-10">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <AddNewProjectCard />
            </div>

            <div className="fixed right-10 top-[100px] bottom-32 w-80 z-10 bg-white rounded-2xl">
                <h2 className="text-left mb-3 text-2xl font-bold mt-10 ml-8">Details</h2>
                {
                    !showDetails ? (
                        <div className="text-left my-2 text-gray-500 ml-8">
                            Select a project to view details
                        </div>
                    ) :
                        (
                            <div className={`ml-8 mr-4 mb-4`}>
                                <h3 className="text-left my-2 text-lg font-bold">{project.title}</h3>
                                <p className="text-left my-2 text-gray-500">{project.description}</p>
                                <p className="text-left my-2 text-gray-500"><span className="font-semibold">Start At:</span> {project.createdAt}</p>
                                <p className="text-left my-2 text-gray-500"><span className="font-semibold">Due date:</span> {project.updatedAt}</p>
                                <p className="text-left my-2 text-gray-500"><span className="font-semibold">Owner:</span> {project.owner}</p>
                                <p className="text-left my-2 text-gray-500"><span className="font-semibold">Members:</span> {project.members.join(", ")}</p>
                                <p className="text-left my-2 text-gray-500"><span className="font-semibold">Tasks:</span> {project.tasks.join(", ")}</p>
                                <p className="text-left my-2 text-gray-500"><span className="font-semibold">Priority:</span> {project.priority}</p>
                                <div className="mt-10 flex flex-row gap-10">
                                    <button className="text-black py-2 px-4 rounded-lg bg-yellow-100 hover:bg-yellow-500 hover:text-white">Update</button>
                                    <button className="text-black py-2 px-4 rounded-lg bg-red-100 hover:bg-red-500 hover:text-white">Delete</button>
                                </div>
                            </div>
                        )
                }

            </div>
        </div>
    );
}

export default ProjectFolder;