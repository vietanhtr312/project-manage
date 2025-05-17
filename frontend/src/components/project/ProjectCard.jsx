const ProjectCard = ({project, onClick }) => (
    <div>
        <div
            className="relative flex flex-col justify-left w-64 h-40 mb-16 bg-white rounded-2xl rounded-tl-none shadow-md cursor-pointer group hover:bg-gray-300"
            onClick={() => onClick(project?.project?._id)}
        >
            <div className="absolute left-0 top-[-40px] bg-white rounded-2xl rounded-b-none cursor-pointer group-hover:bg-gray-300 h-10 w-28"></div>
            <p className="text-left mt-2 ml-4 text-lg font-bold">{project?.project?.title || "Project"}</p>
            <p className="text-left mt-auto mb-10 ml-4 text-xs text-gray-500">
                <span className={`w-2 h-2 rounded-full inline-block mr-2 ${project?.status === 'in progress' ? 'bg-yellow-500' : 'bg-green-300'}`}></span>
                {project?.status === 'in progress' ? 'In Progress' : 'Completed'}
            </p>
        </div>
    </div>
);

export default ProjectCard;