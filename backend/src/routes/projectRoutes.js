const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const projectValidator = require('../middlewares/projectValidator');
const projectController = require('../controllers/projectController');

router.use(authMiddleware)
router.get('/:id', projectController.getProjectById);
router.post('/', projectValidator.validate, projectController.createProject);
router.put('/:id', projectValidator.validate, projectController.updateProject);
// router.delete('/:id')

router.get('/:id/members', projectController.getMembers)
// router.post('/:id/members')
// router.post('/:id/members/:userId')

module.exports = router;