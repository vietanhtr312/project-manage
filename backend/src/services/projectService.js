const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const Project = require('../models/Project');
const ProjectMember = require('../models/ProjectMember');
const AppError = require('../errors/AppError'); // Assuming AppError is a custom error class
const Module = require('../models/Module');
const Task = require('../models/Task');
const User = require('../models/User');

const buildModuleTree = async (parentId, moduleMap) => {
    const children = await Module.find({ parent: parentId }).lean();

    for (let child of children) {
        child.submodules = await buildModuleTree(child._id, moduleMap);
        child.tasks = await Task.find({ module: child._id }).lean();
        moduleMap[child._id.toString()] = child;
    }

    return children;
};

const projectService = {
    getProjectById: async (projectId) => {
        try {
            const project = await Project.findById(projectId).populate('leader').lean();
            if (!project) {
                throw new ResourceNotFoundError("Project not found");
            }

            const members = await ProjectMember.find({ project: projectId })
                .populate('member')
                .lean();

            project.members = members
                .filter(m => String(m.member._id) !== String(project.leader._id))
                .map(m => ({
                    _id: m.member._id,
                    name: m.member.name,
                    email: m.member.email,
                    role: m.role,
                }));

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
                const users = await Promise.all(
                    members.map((userEmail) => User.findOne({ email: userEmail }))
                );
                const memberDocsArray = users
                    .filter(user => user) 
                    .map((user) => ({
                        member: user._id,
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
        // 1. Lấy thông tin Project
        const project = await Project.findById(projectId).lean();
        if (!project) throw new Error("Project not found");

        const moduleMap = {};

        // 2. Lấy tất cả các module gốc (parent là project)
        const topModules = await buildModuleTree(projectId, moduleMap);

        // 3. Gắn vào project
        project.modules = topModules;

        return project;
    },
};

module.exports = projectService;
