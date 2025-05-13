const Project = require('../models/Project');
const ProjectMember = require('../models/ProjectMember');

const projectService = {
    getProjectById: async (projectId) => {
        const project = await Project.findById(projectId).populate('leader');
        if (!project) {
            throw new ResourceNotFound("Project not found");
        }
        return project;
    },
    createProject: async (leaderId, title, description, start_date, due_date, members) => {

        const newProject = await Project.create({
            leader: leaderId,
            title,
            description,
            start_date : new Date(start_date),
            due_date : new Date(due_date)
        });
        const projectId = newProject.id;

        // Always insert the leader first
        const memberDocs = [
            {
                member: leaderId,  
                project: projectId, 
                role: 'leader',     
            },
        ];

        if (members && members.length > 0) {
            const memberDocsArray = members.map((userId) => ({
                member: userId,
                project: projectId,
                role: 'member',  
            }));

            memberDocs.push(...memberDocsArray);  
        }
        await ProjectMember.insertMany(memberDocs);  
        return newProject;
    }

};
module.exports = projectService;