const Module = require('../models/Module');
const Task = require('../models/Task');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');

exports.getModulesByProject = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const modules = await Module.find({ parent: projectId });
        res.status(200).json({ success: true, data: modules });
    } catch (error) {
        next(error);
    }
};

exports.createModule = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const { name, description } = req.body;

        const module = await Module.create({
            parent: projectId,
            name,
            description
        });

        res.status(201).json({ success: true, data: module });
    } catch (error) {
        next(error);
    }
};

exports.updateModule = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const module = await Module.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );

        if (!module) throw new ResourceNotFoundError("Module not found");
        
        res.status(200).json({ success: true, data: module });
    } catch (error) {
        next(error);
    }
};

exports.deleteModule = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Module.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Module deleted" });
    } catch (error) {
        next(error);
    }
};
