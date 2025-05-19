const taskMemberService = require('../services/taskMemberService');

exports.addTaskMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const memberId = await taskMemberService.getTaskMembers(id);

        if (userId === memberId) {
            return res.status(400).json({ success: false, message: "User is already a member of this task" });
        }

        if (memberId) {
            await taskMemberService.removeTaskMember(id, memberId);
        } 
        
        if (userId) {
            const taskMember = await taskMemberService.addTaskMember(id, userId);
            return res.status(201).json({ success: true, data: taskMember });
        }

        res.status(201).json({ success: true, message: "Member remove from task" });
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