const Module = require('../models/Module');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');

const moduleService = {
    getModulesByProject: async (projectId) => {
        return await Module.find({ parent: projectId });
    },

    getModuleById: async (moduleId) => {
        const module = await Module.findOne({ _id: moduleId});
        if (!module) {
            throw new ResourceNotFoundError("Module not found");
        }
        return module;
    },

    createModule: async (projectId, name, description) => {
        return await Module.create({ parent: projectId, name, description });
    },

    updateModule: async (moduleId, name, description) => {
        const module = await Module.findByIdAndUpdate(
            moduleId,
            { name, description },
            { new: true }
        );

        if (!module) {
            throw new ResourceNotFoundError("Module not found");
        }

        return module;
    },

    deleteModule: async (moduleId) => {
        await Module.findByIdAndDelete(moduleId);
    }
};

module.exports = moduleService;