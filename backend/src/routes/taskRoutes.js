const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Task Routes
router.post('/create/:moduleId', taskController.createTask);
// router.get('/tasks', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
// router.patch('/tasks/:id/status', taskController.updateTaskStatus);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
