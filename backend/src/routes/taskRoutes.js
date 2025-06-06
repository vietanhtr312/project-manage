const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/project/:projectId', taskController.getTasksByProjectId);
router.get('/user/:userId/project/:projectId', taskController.getTasksByUserAndProject);

router.get('/modules/:moduleId/tasks', taskController.getTasksByModule);
router.post('/modules/:moduleId/tasks', taskController.createTask);

router.get('/tasks/:id', taskController.getTaskDetails);

router.get('/:id', taskController.getTaskById);
router.post('/create/:moduleId', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);


module.exports = router;
