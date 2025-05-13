const projectService = require('../services/projectService')

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
            const {id} = req.params;
            const membersList = await projectService.getMembers(id);
            return res.status(200).json({
                success: true,
                message: "Data fetched successfully",
                data: membersList
            })
        } catch (error) {
            next(error);
        }

    }
}

module.exports = projectController;