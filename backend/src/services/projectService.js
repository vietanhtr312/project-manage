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
            console.log(error);

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
    },

    getProjectStructure: async (projectId) => {
        const project = await Project.findById(projectId).lean();
        if (!project) throw new Error("Project not found");

        const allModules = await Module.find({ project_id: projectId }).lean();

        const moduleMap = {};
        const topModules = [];

        allModules.forEach(mod => {
            mod.submodules = [];
            mod.tasks = [];
            moduleMap[mod._id.toString()] = mod;

            if (!mod.parent_id) {
                topModules.push(mod);
            }
        });

        allModules.forEach(mod => {
            if (mod.parent_id) {
                const parent = moduleMap[mod.parent_id.toString()];
                if (parent) {
                    parent.submodules.push(mod);
                }
            }
        });

        const allTasks = await Task.find({
            module_id: { $in: allModules.map(m => m._id) }
        }).lean();

        allTasks.forEach(task => {
            const mod = moduleMap[task.module_id.toString()];
            if (mod) {
                mod.tasks.push(task);
            }
        });

        project.modules = topModules;

        return project;
    },
};

module.exports = projectService;
