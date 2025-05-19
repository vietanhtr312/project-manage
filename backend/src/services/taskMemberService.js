const TaskMember = require('../models/TaskMember');
const User = require('../models/User');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');

const taskMemberService = {
    addTaskMember: async (taskId, userId) => {
        const user = await User.findById(userId);
        if (!user) {
            throw new ResourceNotFoundError("User not found");
        }

        return await TaskMember.create({
            task: taskId,
            member: user._id
        });
    },

    getTaskMembers: async (taskId) => {
        return await TaskMember.find({ task: taskId }).populate("member", "name email");
    },

    removeTaskMember: async (taskId, userId) => {
        await TaskMember.findOneAndDelete({ task: taskId, member: userId });
    }
};

module.exports = taskMemberService;