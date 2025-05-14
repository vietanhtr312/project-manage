const express = require('express');
const { createTask, assignTask } = require('../controllers/taskController');
const router = express.Router();

router.post('/tasks', createTask);
router.post('/tasks/assign', assignTask);

module.exports = router;