const Module = require('../models/Module');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');

const moduleService = {
    getModulesByProject: async (projectId) => {
        return await Module.find({ parent: projectId });
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