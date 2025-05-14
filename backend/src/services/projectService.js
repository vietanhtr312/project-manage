const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const Project = require('../models/Project');
const ProjectMember = require('../models/ProjectMember');
const AppError = require('../errors/AppError'); // Assuming AppError is a custom error class

const projectService = {
    getProjectById: async (projectId) => {
        try {
            const project = await Project.findById(projectId).populate('leader');
            if (!project) {
                throw new ResourceNotFoundError("Project not found");
            }
            return project;
        } catch (error) {
            throw new AppError("Failed to fetch project by ID");
        }
    },

    createProject: async (leaderId, title, description, start_date, due_date, members) => {
        try {
            const newProject = await Project.create({
                leader: leaderId,
                title,
                description,
                start_date: new Date(start_date),
                due_date: new Date(due_date)
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
        } catch (error) {
            throw new AppError("Failed to create project");
        }
    },

    updateProject: async (id, title, description, start_date, due_date) => {
        try {
            const updatedProject = await Project.findByIdAndUpdate(
                id,
                { $set: { title, description, start_date, due_date } },
                { new: true, runValidators: true }
            );
            if (!updatedProject) throw new ResourceNotFoundError("Project not found");
            return updatedProject;
        } catch (error) {
            throw new AppError("Failed to update project");
        }
    }
};

module.exports = projectService;
