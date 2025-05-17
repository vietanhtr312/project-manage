const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);
router.get('/projects/:projectId/modules', moduleController.getModulesByProject);
router.get('/:moduleId', moduleController.getModuleById);
router.post('/projects/:projectId/modules', moduleController.createModule);
router.put('/:id', moduleController.updateModule);
router.delete('/:id', moduleController.deleteModule);

module.exports = router;