const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const taskMiddleware = require('../middlewares/taskMiddleware');

router.use(authMiddleware);
router.get('/modules/:moduleId/tasks', taskController.getTasksByModule);
router.post('/modules/:moduleId/tasks', taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.post('/:id/members', taskController.assignTaskMember);
router.get('/:id/members', taskController.getTaskMembers);
router.delete('/:id/members/:userId', taskController.removeTaskMember);

module.exports = router;
