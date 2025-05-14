const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const projectValidator = require('../middlewares/projectValidator');
const projectController = require('../controllers/projectController');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware)
router.post('/', projectValidator.validate, projectController.createProject);
router.get('/:id', projectController.getProjectById);
router.put('/:id', roleMiddleware.requireProjectLeader, projectValidator.validate, projectController.updateProject);

router.get('/', projectController.getProjectsByUserId);
router.get('/:id/members', roleMiddleware.requireProjectMember, projectController.getMembers)
router.post('/:id/members', roleMiddleware.requireProjectLeader, projectController.addMember)
router.delete('/:id/members/:userId', roleMiddleware.requireProjectLeader, projectController.removeMember)

module.exports = router;