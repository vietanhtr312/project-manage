const projectService = require('../services/projectService');
const projectMemberService = require('../services/projectMemberService');
const MissingFieldError = require('../errors/MissingFieldError');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const UserAlreadyExistsError = require('../errors/UserAlreadyExistsError');

const projectController = {
    getProjectById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const project = (await projectService.getProjectById(id))
            return res.status(200).json({
                success: true,
                message: "Data fetched successfully",
                data: project
            })
        } catch (error) {
            next(error)
        }
    },
    createProject: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { title, description, start_date, due_date, members = [] } = req.body;
            if (members != [] && members.includes(userId)) throw new UserAlreadyExistsError("Can not add myself")
            const newProject = await projectService.createProject(userId, title, description, start_date, due_date, members);
            res.status(201).json({
                success: true,
                message: "Project created",
                data: {
                    id: newProject.id,
                    title: newProject.title
                }
            })
        } catch (error) {
            next(error)
        }
    },
    updateProject: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, description, start_date, due_date } = req.body;
            const updatedProject = await projectService.updateProject(id, title, description, start_date, due_date);
            return res.status(200).json({
                success: true,
                message: 'Updated Successfully',
                data: {
                    id: updatedProject.id
                }
            })
        } catch (error) {
            next(error);
        }
    },
    getMembers: async (req, res, next) => {
        try {
            const { id } = req.params;
            const membersList = await projectMemberService.getProjectMembers(id);
            return res.status(200).json({
                success: true,
                message: "Data fetched successfully",
                data: membersList
            })
        } catch (error) {
            next(error);
        }

    },

    addMember: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            const projectMember = await projectMemberService.addProjectMember(id, userId);
            return res.status(201).json({
                success: true,
                message: "Added successfully",
                data: {
                    id: projectMember.id
                }
            })
        } catch (error) {
            next(error);
        }
    },
    removeMember: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            const result = await projectMemberService.removeProjectMember(id, userId);
            if (result.deletedCount > 0)
                return res.status(200).json({
                    success: true,
                    message: "Removed successfully",
                    data: null
                })
        } catch (error) {
            next(error);
        }
    },
    getProjectsByUserId: async (req, res, next) => {
        try {
            const userId = req.query.userId;
            const role = req.query.role;
            if (!userId)
                throw new MissingFieldError("Missing user id");
            if (role === "leader") {
                ledProjects = await projectMemberService.getLedProjects(userId);
                res.status(200).json({
                    success: true,
                    message: "Led projects fetched",
                    data: ledProjects
                })
            }
            if (role === "member") {
                participatedProjects = await projectMemberService.getParticipatedProjects(userId);
                res.status(200).json({
                    success: true,
                    message: "Participated projects fetched",
                    data: participatedProjects
                })
            }
            if (role === "all") {
                const [ledProjects, participatedProjects] = await Promise.allSettled([
                    projectMemberService.getLedProjects(userId),
                    projectMemberService.getParticipatedProjects(userId)
                ]);
                if (ledProjects.status === 'rejected' && participatedProjects.status === 'rejected') {
                    throw new ResourceNotFoundError("Project not found");
                }
                
                res.status(200).json({
                    success: true,
                    message: "All projects fetched",
                    data: {
                        ledProjects: ledProjects.value || [] , 
                        participatedProjects: participatedProjects.value || []
                    }
                });
            }

        }
        catch (error) {
            next(error)
        }
    }
};

module.exports = projectController;