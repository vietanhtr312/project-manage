const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const Project = require('../models/Project');
const ProjectMember = require('../models/ProjectMember');

const projectService = {
    getProjectById: async (projectId) => {
        const project = await Project.findById(projectId).populate('leader');
        if (!project) {
            throw new ResourceNotFoundError("Project not found");
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
    },
    updateProject: async (id, title, description, start_date, due_date) => {
        const updatedProject = Project.findByIdAndUpdate (
            id,
            {$set : {title, description, start_date, due_date}},
            {new: true, runValidators: true});
        if (!updatedProject) throw new ResourceNotFoundError("Project not found");
        return updatedProject;
    },
    getMembers: async (id) => {
        const projectMembers = await ProjectMember.find({project : id}).populate("member", "name email"). select('member role');
        if (!projectMembers) throw new ResourceNotFoundError("This project doesnt have members");
        const members = projectMembers.map((pm, index) => ({
            index: index + 1,
            ...pm.member.toObject(), 
        role: pm.role}))
        return {
            count: members.length, 
            members: members
        }
    }
};
module.exports = projectService;