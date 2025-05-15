const PermissionDeniedError = require("../errors/PermissionDeniedError");
const projectMemberService = require("../services/projectMemberService");

const roleMiddleware = {
    requireProjectLeader : async(req, res, next) => {
        try {
            const {userId} = req.user.id;
            const {id: projectId} = req.params;
            const result = projectMemberService.isLeader(projectId, userId);
            if (!result) {
                throw PermissionDeniedError("You must be the project's leader to be allowed");
            }
            next();
        } catch (error) {
            next(error);
        }
    },
    requireProjectMember: async(req, res, next) => {
        try {
            const {userId} = req.user.id;
            const {id: projectId} = req.params;
            const result = projectMemberService.isMember(projectId, userId);
            if (!result) {
                throw PermissionDeniedError("You must be the project's member to be allowed");
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = roleMiddleware;