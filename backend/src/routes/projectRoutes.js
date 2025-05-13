const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const projectCreationValidator = require('../middlewares/projectCreationValidator');
const projectController = require('../controllers/projectController');

router.use(authMiddleware)
router.get('/:id', projectController.getProjectById);
router.post('/', projectCreationValidator.validate, projectController.createProject);
// router.put(':id');
// router.delete('/:id')

// router.get('/:id/members')
// router.post('/:id/members')
// router.post('/:id/members/:userId')

module.exports = router;