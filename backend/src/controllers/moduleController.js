const moduleService = require('../services/moduleService');

exports.getModulesByProject = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const modules = await moduleService.getModulesByProject(projectId);
        res.status(200).json({ success: true, data: modules });
    } catch (error) {
        next(error);
    }
};

exports.createModule = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const { name, description } = req.body;
        const module = await moduleService.createModule(projectId, name, description);
        res.status(201).json({ success: true, data: module });
    } catch (error) {
        next(error);
    }
};

exports.updateModule = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const module = await moduleService.updateModule(id, name, description);
        res.status(200).json({ success: true, data: module });
    } catch (error) {
        next(error);
    }
};

exports.deleteModule = async (req, res, next) => {
    try {
        const { id } = req.params;
        await moduleService.deleteModule(id);
        res.status(200).json({ success: true, message: "Module deleted" });
    } catch (error) {
        next(error);
    }
};