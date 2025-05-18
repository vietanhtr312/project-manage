const taskMemberService = require('../services/taskMemberService');

exports.addTaskMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        const taskMember = await taskMemberService.addTaskMember(id, email);
        res.status(201).json({ success: true, data: taskMember });
    } catch (error) {
        next(error);
    }
};

exports.getTaskMembers = async (req, res, next) => {
    try {
        const { id } = req.params;
        const members = await taskMemberService.getTaskMembers(id);
        res.status(200).json({ success: true, data: members });
    } catch (error) {
        next(error);
    }
};

exports.removeTaskMember = async (req, res, next) => {
    try {
        const { id, userId } = req.params;
        await taskMemberService.removeTaskMember(id, userId);
        res.status(200).json({ success: true, message: "Member removed from task" });
    } catch (error) {
        next(error);
    }
};