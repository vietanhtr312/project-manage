const ProjectMember = require('../models/ProjectMember');
const Project = require('../models/Project');
const User = require('../models/User');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const InvalidFormatError = require('../errors/InvalidFormatError');
const UserAlreadyExistsError = require('../errors/UserAlreadyExistsError');
const AppError = require('../errors/AppError');  // Assuming AppError is a custom error class

const projectMemberService = {

    addProjectMember: async (projectId, userId, role = 'member') => {
        try {
            // Check if project exists
            const project = await Project.findById(projectId);
            if (!project) {
                throw new ResourceNotFoundError('Project not found');
            }

            // Check if user exists
            const user = await User.findById(userId);
            if (!user) {
                throw new ResourceNotFoundError('User not found');
            }

            // Check if the member is already in the project
            const membership = await ProjectMember.findOne({
                project: projectId,
                member: userId
            });

            if (membership) {
                console.log(membership)
                throw new UserAlreadyExistsError('User is already a member of this project');
            }

            // Create new project member
            const projectMember = await ProjectMember.create({
                project: projectId,
                member: userId,
                role
            });

            return projectMember;
        } catch (error) {
            throw new AppError("Failed to add project member");
        }
    },

    removeProjectMember: async (projectId, userId) => {
        try {
            const projectMembers = await ProjectMember.find({ project: projectId });

            if (!projectMembers) {
                throw new ResourceNotFoundError("Project not found");
            }

            const membership = await ProjectMember.findOne({
                project: projectId,
                member: userId
            });

            if (!membership) {
                throw new ResourceNotFoundError("The user is not in this project");
            }

            const result = await membership.deleteOne({ project: projectId, member: userId });
            return result;
        } catch (error) {
            throw new AppError("Failed to remove project member");
        }
    },

    getAllProjectMembers: async (projectId) => {
        try {
            const projectMembers = await ProjectMember.find({ project: projectId })
                .populate("member", "name email")
                .select('member role');
            if (!projectMembers) throw new ResourceNotFoundError("This project doesn't have members");
            const members = projectMembers.map((pm, index) => ({
                index: index + 1,
                ...pm.member.toObject(),
                role: pm.role
            }));
            return {
                count: members.length,
                members: members
            };
        } catch (error) {
            throw new AppError("Failed to fetch project members");
        }
    },

    getProjectMembers: async (projectId) => {
        try {
            const projectMembers = await ProjectMember.find({ project: projectId, role: { $ne: 'leader' } })
                .populate("member", "name email")
                .select('member role');
            if (!projectMembers) throw new ResourceNotFoundError("This project doesn't have members");

            const members = projectMembers.map((pm, index) => ({
                index: index + 1,
                ...pm.member.toObject(),
                role: pm.role
            }));

            return {
                count: members.length,
                members: members
            };
        } catch (error) {
            throw new AppError("Failed to fetch project members");
        }
    },

    isLeader: async (projectId, userId) => {
        try {
            const projectMember = await ProjectMember.find({
                project: projectId,
                member: userId
            });
            if (!projectMember) return false;
            return (projectMember.role === 'leader');
        } catch (error) {
            throw new AppError("Failed to check if user is a leader");
        }
    },

    isMember: async (projectId, userId) => {
        try {
            const projectMember = await ProjectMember.find({
                project: projectId,
                member: userId
            });
            if (!projectMember) return false;
            return true;
        } catch (error) {
            throw new AppError("Failed to check if user is a member");
        }
    },

    getAllProjects: async (userId) => {
        try {
            const projects = await ProjectMember.find({ member: userId})
                .populate("project", "title")
                .select('project');
            if (!projects || projects.length === 0) throw new ResourceNotFoundError("Project not found");
            return projects;
        } catch (error) {
            throw new AppError("Failed to fetch projects led by the user");
        }
    },

    getLedProjects: async (userId) => {
        try {
            const projects = await ProjectMember.find({ member: userId, role: "leader" })
                .populate("project", "title")
                .select('project');
            console.log(projects)
            if (!projects || projects.length === 0) throw new ResourceNotFoundError("Project not found");
            return projects;
        } catch (error) {
            throw new AppError("Failed to fetch projects led by the user");
        }
    },

    getParticipatedProjects: async (userId) => {
        try {
            const projects = await ProjectMember.find({ member: userId, role: "member" })
                .populate("project", "title")
                .select('project');
            if (!projects || projects.length === 0) throw new ResourceNotFoundError("Project not found");
            return projects;
        } catch (error) {
            throw new AppError("Failed to fetch projects participated by the user");
        }
    }
};

module.exports = projectMemberService;
