const ProjectMember = require('../models/ProjectMember');
const Project = require('../models/Project');
const User = require('../models/User');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const InvalidFormatError = require('../errors/InvalidFormatError');
const UserAlreadyExistsError = require('../errors/UserAlreadyExistsError');

const projectMemberService = {

    addProjectMember: async (projectId, userId, role = 'member') => {
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
        const existingMember = await ProjectMember.findOne({
            project: projectId,
            member: userId
        });

        if (existingMember) {
            throw new UserAlreadyExistsError('User is already a member of this project');
        }

        // Create new project member
        const projectMember = ProjectMember.create({
            project: projectId,
            member: userId,
            role
        });

        return projectMember;
    },

    removeProjectMember: async(projectId, userId) => {
        const projectMembers = await ProjectMember.find({project: projectId});

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
        
        const result = projectMembers.deleteOne({project: projectId, member: userId});
        return result;
    },

    getProjectMembers: async (projectId) => {
        const projectMembers = await ProjectMember.find({ project: projectId }).populate("member", "name email").select('member role');
        if (!projectMembers) throw new ResourceNotFoundError("This project doesnt have members");
        const members = projectMembers.map((pm, index) => ({
            index: index + 1,
            ...pm.member.toObject(),
            role: pm.role
        }))
        return {
            count: members.length,
            members: members
        }
    },
    isLeader: async (projectId, userId) => {
        const projectMember = await ProjectMember.find({
            project: projectId,
            member: userId
        });
        if (!projectMember) return false;
        return (projectMember.role === 'leader');
    },
    isMember: async(projectId, userId) => {
        const projectMember = await ProjectMember.find({
            project: projectId,
            member: userId
        });
        if (!projectMember) return false;
        return true;
    }
}

module.exports = projectMemberService;