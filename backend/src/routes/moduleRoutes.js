const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);
router.get('/projects/:projectId/modules', moduleController.getModulesByProject);
router.post('/projects/:projectId/modules', moduleController.createModule);
router.put('/modules/:id', moduleController.updateModule);
router.delete('/modules/:id', moduleController.deleteModule);

module.exports = router;