const taskMemberService = require('../services/taskMemberService');
const notificationService = require('../services/notificationService');
exports.addTaskMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const oldMember = await taskMemberService.getTaskMembers(id);

        if (oldMember.length > 0) {
            if (userId === oldMember[0].member._id) {
                return res.status(400).json({ success: false, message: "User is already a member of this task" });
            } else
                await taskMemberService.removeTaskMember(id, oldMember[0].member._id);
        }

        if (userId) {
            const taskMember = await taskMemberService.addTaskMember(id, userId);
            await notificationService.createNotification(userId, "You have been assigned a new task", "INFO", `tasks/${id}`)
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
        await notificationService.createNotification(userId, "You have been removed from a task", "INFO", `tasks/${id}`)
        res.status(200).json({ success: true, message: "Member removed from task" });
    } catch (error) {
        next(error);
    }
};